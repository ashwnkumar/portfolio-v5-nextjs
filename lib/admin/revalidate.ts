import { updateTag } from "next/cache";

/**
 * Cache tags map 1:1 to table names (see lib/data.ts), so invalidating a table
 * invalidates every getter that reads it.
 *
 * Every write MUST call this. Public data is cached with cacheLife("days"),
 * so without it a save is invisible on the site for up to a day.
 *
 * updateTag() rather than revalidateTag(): it is Server-Action-only and gives
 * read-your-own-writes, so the admin sees the saved value immediately instead
 * of a stale render. (revalidateTag() also now requires a cacheLife profile
 * argument in Next 16 and is the purge-oriented API.)
 */
export type ContentTable =
  | "site_settings"
  | "social_links"
  | "profile"
  | "home_content"
  | "about_content"
  | "skills"
  | "skill_categories"
  | "experience"
  | "education"
  | "projects"
  | "project_images"
  | "studio_images";

export function revalidateContent(...tables: ContentTable[]) {
  for (const table of tables) updateTag(table);
}
