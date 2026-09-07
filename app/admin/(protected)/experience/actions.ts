"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import { text, bool, lines, csv, type ActionState } from "@/lib/admin/forms";

function num(form: FormData, key: string): number | null {
  const raw = String(form.get(key) ?? "").trim();
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function parse(form: FormData) {
  const isCurrent = bool(form, "is_current");
  return {
    company: text(form, "company"),
    role: text(form, "role"),
    location: text(form, "location"),
    start_month: num(form, "start_month"),
    start_year: num(form, "start_year"),
    // A current role has no end date; clear it rather than leaving a stale one.
    end_month: isCurrent ? null : num(form, "end_month"),
    end_year: isCurrent ? null : num(form, "end_year"),
    is_current: isCurrent,
    description: text(form, "description"),
    achievements: lines(form, "achievements"),
    technologies: csv(form, "technologies"),
  };
}

function validate(v: ReturnType<typeof parse>): string | null {
  if (!v.role) return "Role is required.";
  if (!v.company) return "Company is required.";
  if (!v.start_month || !v.start_year) return "A start month and year are required.";
  if (!v.is_current && (!v.end_month || !v.end_year)) {
    return "Set an end date, or mark this as the current role.";
  }
  if (!v.is_current && v.end_year && v.start_year) {
    const start = v.start_year * 12 + v.start_month;
    const end = v.end_year * 12 + v.end_month!;
    if (end < start) return "The end date is before the start date.";
  }
  return null;
}

/** experience_single_current_idx permits only one current role. */
async function clearOtherCurrent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  exceptId?: string,
) {
  let q = supabase.from("experience").update({ is_current: false }).eq("is_current", true);
  if (exceptId) q = q.neq("id", exceptId);
  await q;
}

/**
 * Handles both create and update so a card can save in place. Returns state
 * rather than redirecting — there is no list page to go back to any more.
 */
export async function saveExperience(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const id = text(form, "id");
  const values = parse(form);

  const problem = validate(values);
  if (problem) return { error: problem };

  const supabase = await createClient();
  if (values.is_current) await clearOtherCurrent(supabase, id || undefined);

  const { error } = id
    ? await supabase.from("experience").update(values).eq("id", id)
    : await supabase.from("experience").insert({ ...values, sort_order: 0 });

  if (error) return { error: error.message };

  revalidateContent("experience");
  return { error: null, ok: true };
}

export async function deleteExperience(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateContent("experience");
  return { error: null, ok: true };
}
