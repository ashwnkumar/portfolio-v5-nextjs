import type { Database } from "./database.types";

type Tables = Database["public"]["Tables"];

export type NavItem = {
  label: string;
  href: string;
};

/** Exactly what getSocialLinks() returns, kept in sync with the schema. */
export type SocialLink = Pick<
  Tables["social_links"]["Row"],
  "platform" | "display_name" | "label" | "url"
>;

// ExperienceType / ProjectType / StudioItem lived here for the JSON era and
// were never referenced. Row types now come from database.types.ts.
