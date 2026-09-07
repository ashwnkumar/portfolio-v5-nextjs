"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import {
  text,
  nullableText,
  bool,
  lines,
  csv,
  type ActionState,
} from "@/lib/admin/forms";

const LIST = "/admin/experience";

function parse(form: FormData) {
  return {
    company: text(form, "company"),
    role: text(form, "role"),
    location: text(form, "location"),
    start_date: text(form, "start_date"),
    end_date: nullableText(form, "end_date"),
    is_current: bool(form, "is_current"),
    description: text(form, "description"),
    achievements: lines(form, "achievements"),
    technologies: csv(form, "technologies"),
  };
}

/**
 * experience_single_current_idx allows only one row with is_current, so the
 * previous holder must be cleared first or the write fails on the constraint.
 */
async function clearOtherCurrent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  exceptId?: string,
) {
  let query = supabase.from("experience").update({ is_current: false }).eq("is_current", true);
  if (exceptId) query = query.neq("id", exceptId);
  await query;
}

export async function createExperience(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const values = parse(form);
  if (!values.company || !values.role) {
    return { error: "Company and role are required." };
  }

  const supabase = await createClient();
  if (values.is_current) await clearOtherCurrent(supabase);

  const { data: last } = await supabase
    .from("experience")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase
    .from("experience")
    .insert({ ...values, sort_order: (last?.sort_order ?? 0) + 1 });

  if (error) return { error: error.message };

  revalidateContent("experience");
  redirect(LIST);
}

export async function updateExperience(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const id = text(form, "id");
  const values = parse(form);
  if (!id) return { error: "Missing id." };
  if (!values.company || !values.role) {
    return { error: "Company and role are required." };
  }

  const supabase = await createClient();
  if (values.is_current) await clearOtherCurrent(supabase, id);

  const { error } = await supabase.from("experience").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidateContent("experience");
  redirect(LIST);
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateContent("experience");
  redirect(LIST);
}

/** Swaps sort_order with the adjacent row in the given direction. */
export async function moveExperience(id: string, direction: "up" | "down") {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("experience")
    .select("id, sort_order")
    .order("sort_order");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= rows.length) return;

  const a = rows[index];
  const b = rows[swapWith];

  await supabase.from("experience").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("experience").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidateContent("experience");
}
