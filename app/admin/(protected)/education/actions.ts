"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import type { ActionState } from "@/lib/admin/forms";

export type EducationDraft = {
  id: string | null;
  degree: string;
  institution: string;
  score: string;
  year: string;
};

/**
 * Saves the whole section in one go: the page is a single form over ~12 short
 * strings, so there is no per-row save. Existing rows update, new rows insert.
 *
 * sort_order is written as a mirror of the year so the column stays coherent
 * for anything reading it directly, but nothing depends on it — ordering is
 * derived from `year` on both the public site and here.
 */
export async function saveEducation(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  let rows: EducationDraft[];
  try {
    rows = JSON.parse(String(form.get("payload") ?? "[]"));
  } catch {
    return { error: "Could not read the form data." };
  }

  for (const [i, row] of rows.entries()) {
    if (!row.degree.trim() || !row.institution.trim()) {
      return { error: `Entry ${i + 1} needs both a degree and an institution.` };
    }
  }

  const supabase = await createClient();

  for (const row of rows) {
    const values = {
      degree: row.degree.trim(),
      institution: row.institution.trim(),
      score: row.score.trim() || null,
      year: row.year.trim() || null,
      sort_order: Number(row.year) || 0,
    };

    const { error } = row.id
      ? await supabase.from("education").update(values).eq("id", row.id)
      : await supabase.from("education").insert(values);

    if (error) return { error: error.message };
  }

  revalidateContent("education");
  return { error: null, ok: true };
}

export async function deleteEducation(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateContent("education");
  return { error: null, ok: true };
}
