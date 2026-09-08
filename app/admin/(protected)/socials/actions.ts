"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import type { ActionState } from "@/lib/admin/forms";

export type SocialDraft = {
  id: string | null;
  platform: string;
  display_name: string;
  label: string;
  url: string;
  is_visible: boolean;
};

function friendly(message: string) {
  return message.includes("duplicate key")
    ? "That platform slug is already in use."
    : message;
}

/** Saves the whole section; the page is one form over seven short rows. */
export async function saveSocials(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  let rows: SocialDraft[];
  try {
    rows = JSON.parse(String(form.get("payload") ?? "[]"));
  } catch {
    return { error: "Could not read the form data." };
  }

  for (const row of rows) {
    if (!row.platform.trim()) return { error: "Every link needs a platform slug." };
    if (!row.display_name.trim()) {
      return { error: `“${row.platform}” needs a display name.` };
    }
    if (!row.url.trim()) return { error: `“${row.platform}” needs a URL.` };
    if (!/^(https?:\/\/|mailto:)/.test(row.url.trim())) {
      return { error: `“${row.platform}” URL must start with https:// or mailto:` };
    }
  }

  const supabase = await createClient();

  // sort_order is not editable: footer order is arbitrary and stable, so
  // existing rows keep whatever they have and new links simply append.
  let nextOrder: number | null = null;

  for (const row of rows) {
    const values = {
      platform: row.platform.trim().toLowerCase(),
      display_name: row.display_name.trim(),
      label: row.label.trim(),
      url: row.url.trim(),
      is_visible: row.is_visible,
    };

    if (row.id) {
      const { error } = await supabase.from("social_links").update(values).eq("id", row.id);
      if (error) return { error: friendly(error.message) };
      continue;
    }

    if (nextOrder === null) {
      const { data } = await supabase
        .from("social_links")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      nextOrder = (data?.sort_order ?? 0) + 1;
    }

    const { error } = await supabase
      .from("social_links")
      .insert({ ...values, sort_order: nextOrder++ });
    if (error) return { error: friendly(error.message) };
  }

  revalidateContent("social_links");
  return { error: null, ok: true };
}

export async function deleteSocial(id: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateContent("social_links");
  return { error: null, ok: true };
}
