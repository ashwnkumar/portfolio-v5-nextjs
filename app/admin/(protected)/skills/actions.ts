"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import { nextSortOrder, swapSortOrder } from "@/lib/admin/crud";
import { text, nullableText, type ActionState } from "@/lib/admin/forms";

const LIST = "/admin/skills";

// Both tables are tagged, and getSkills() reads both, so either invalidates it.
function bust() {
  revalidateContent("skills", "skill_categories");
}

// --- categories ---------------------------------------------------------

export async function createCategory(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const name = text(form, "name");
  if (!name) return { error: "Name is required." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("skill_categories")
    .insert({ name, sort_order: await nextSortOrder(supabase, "skill_categories") });

  if (error) {
    return {
      error: error.message.includes("duplicate key")
        ? "A category with that name already exists."
        : error.message,
    };
  }

  bust();
  redirect(LIST);
}

export async function updateCategory(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const id = text(form, "id");
  const name = text(form, "name");
  if (!id) return { error: "Missing id." };
  if (!name) return { error: "Name is required." };

  const supabase = await createClient();
  const { error } = await supabase.from("skill_categories").update({ name }).eq("id", id);
  if (error) return { error: error.message };

  bust();
  redirect(LIST);
}

/** Cascades: every skill in this category goes with it. */
export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("skill_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  bust();
  redirect(LIST);
}

export async function moveCategory(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  await swapSortOrder(supabase, "skill_categories", id, direction);
  bust();
}

// --- skills -------------------------------------------------------------

export async function addSkill(categoryId: string, form: FormData) {
  const name = text(form, "name");
  if (!name) return;

  const supabase = await createClient();
  const { data: last } = await supabase
    .from("skills")
    .select("sort_order")
    .eq("category_id", categoryId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("skills").insert({
    category_id: categoryId,
    name,
    icon_id: nullableText(form, "icon_id"),
    sort_order: (last?.sort_order ?? 0) + 1,
  });

  bust();
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  await supabase.from("skills").delete().eq("id", id);
  bust();
}

export async function moveSkill(id: string, direction: "up" | "down") {
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("skills")
    .select("category_id")
    .eq("id", id)
    .maybeSingle();
  if (!skill) return;

  // Reorder within the owning category only.
  const { data: rows } = await supabase
    .from("skills")
    .select("id, sort_order")
    .eq("category_id", skill.category_id)
    .order("sort_order");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= rows.length) return;

  const a = rows[index];
  const b = rows[target];
  await supabase.from("skills").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("skills").update({ sort_order: a.sort_order }).eq("id", b.id);

  bust();
}
