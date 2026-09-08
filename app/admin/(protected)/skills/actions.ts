"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import type { ActionState } from "@/lib/admin/forms";

// getSkills() reads both tables, so either tag invalidates it.
function bust() {
  revalidateContent("skills", "skill_categories");
}

// --- categories ---------------------------------------------------------

export async function createCategory(name: string): Promise<ActionState> {
  if (!name.trim()) return { error: "Name is required." };

  const supabase = await createClient();
  const { data: last } = await supabase
    .from("skill_categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("skill_categories")
    .insert({ name: name.trim(), sort_order: (last?.sort_order ?? 0) + 1 });

  if (error) {
    return {
      error: error.message.includes("duplicate key")
        ? "A category with that name already exists."
        : error.message,
    };
  }
  bust();
  return { error: null, ok: true };
}

export async function renameCategory(id: string, name: string): Promise<ActionState> {
  if (!name.trim()) return { error: "Name is required." };
  const supabase = await createClient();
  const { error } = await supabase
    .from("skill_categories")
    .update({ name: name.trim() })
    .eq("id", id);
  if (error) return { error: error.message };
  bust();
  return { error: null, ok: true };
}

/** Cascades: every skill in the category goes with it. */
export async function deleteCategory(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("skill_categories").delete().eq("id", id);
  if (error) return { error: error.message };
  bust();
  return { error: null, ok: true };
}

// --- skills -------------------------------------------------------------

export type SkillInput = {
  name: string;
  iconId: string | null;
  iconVariant: string | null;
  invertDark: boolean;
};

export async function addSkill(categoryId: string, input: SkillInput): Promise<ActionState> {
  if (!input.name.trim()) return { error: "Skill name is required." };

  const supabase = await createClient();
  const { data: last } = await supabase
    .from("skills")
    .select("sort_order")
    .eq("category_id", categoryId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("skills").insert({
    category_id: categoryId,
    name: input.name.trim(),
    icon_id: input.iconId,
    icon_variant: input.iconVariant ?? "original",
    invert_dark: input.invertDark,
    sort_order: (last?.sort_order ?? 0) + 1,
  });

  if (error) return { error: error.message };
  bust();
  return { error: null, ok: true };
}

export async function updateSkill(id: string, input: SkillInput): Promise<ActionState> {
  if (!input.name.trim()) return { error: "Skill name is required." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("skills")
    .update({
      name: input.name.trim(),
      icon_id: input.iconId,
      icon_variant: input.iconVariant ?? "original",
      invert_dark: input.invertDark,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  bust();
  return { error: null, ok: true };
}

export async function deleteSkill(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { error: error.message };
  bust();
  return { error: null, ok: true };
}
