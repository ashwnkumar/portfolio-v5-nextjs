import { createClient } from "@/lib/supabase/server";

type Client = Awaited<ReturnType<typeof createClient>>;

/** Next sort_order for an append-to-end insert. */
export async function nextSortOrder(
  supabase: Client,
  table: "education" | "social_links" | "skill_categories" | "studio_images" | "projects",
) {
  const { data } = await supabase
    .from(table)
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data?.sort_order ?? 0) + 1;
}

/**
 * Swaps sort_order with the adjacent row. Two updates regardless of list
 * length, rather than renumbering everything.
 */
export async function swapSortOrder(
  supabase: Client,
  table: "education" | "social_links" | "skill_categories" | "studio_images" | "projects" | "experience",
  id: string,
  direction: "up" | "down",
) {
  const { data: rows } = await supabase.from(table).select("id, sort_order").order("sort_order");
  if (!rows) return;

  const index = rows.findIndex((r) => r.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= rows.length) return;

  const a = rows[index];
  const b = rows[target];
  await supabase.from(table).update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from(table).update({ sort_order: a.sort_order }).eq("id", b.id);
}
