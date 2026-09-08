import { cacheLife, cacheTag } from "next/cache";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "./supabase/public";
import { imageUrl } from "./images";
import { seededShuffle } from "./random";
import { formatMonthYear } from "./dates";

/**
 * Every getter here is cached and tagged. Content changes only when the admin
 * panel writes, and that calls revalidateTag(), so a long cacheLife is correct
 * -- these are not time-sensitive reads.
 *
 * Nothing in this file may read cookies() or headers(): "use cache" forbids it.
 * The per-session studio shuffle therefore lives in the plain async helpers at
 * the bottom, which consume the cached data but are not themselves cached.
 */

function unwrap<T>(
  { data, error }: PostgrestSingleResponse<T>,
  label: string,
): NonNullable<T> {
  if (error) throw new Error(`[data] ${label}: ${error.message}`);
  if (data === null || data === undefined) {
    throw new Error(`[data] ${label}: no rows returned`);
  }
  return data as NonNullable<T>;
}

// -----------------------------------------------------------------------------
// Site chrome
// -----------------------------------------------------------------------------
export async function getNavigation() {
  "use cache";
  cacheTag("nav_links");
  cacheLife("days");

  const rows = unwrap(
    await supabase.from("nav_links").select("label, href").order("sort_order"),
    "nav_links",
  );
  return rows.map((r) => ({ label: r.label, href: r.href }));
}

export async function getFooter() {
  "use cache";
  cacheTag("footer_links", "site_settings");
  cacheLife("days");

  const settings = unwrap(
    await supabase
      .from("site_settings")
      .select("footer_brand_name, footer_brand_tagline")
      .single(),
    "site_settings",
  );
  const links = unwrap(
    await supabase.from("footer_links").select("label, href").order("sort_order"),
    "footer_links",
  );

  return {
    brand: { name: settings.footer_brand_name, tagline: settings.footer_brand_tagline },
    quickLinks: links.map((l) => ({ name: l.label, href: l.href })),
  };
}

export async function getSocialLinks() {
  "use cache";
  cacheTag("social_links");
  cacheLife("days");

  return unwrap(
    await supabase
      .from("social_links")
      .select("platform, display_name, label, url")
      .order("sort_order"),
    "social_links",
  );
}

// -----------------------------------------------------------------------------
// Profile & page copy
// -----------------------------------------------------------------------------
export async function getBio() {
  "use cache";
  cacheTag("profile");
  cacheLife("days");

  const row = unwrap(
    await supabase
      .from("profile")
      .select("name, tagline, image_home_path, image_about_path, image_alt")
      .single(),
    "profile",
  );

  return {
    name: row.name,
    tagline: row.tagline,
    images: { home: imageUrl(row.image_home_path), about: imageUrl(row.image_about_path) },
    imageAlt: row.image_alt,
  };
}

export async function getHomeContent() {
  "use cache";
  cacheTag("home_content");
  cacheLife("days");

  const r = unwrap(await supabase.from("home_content").select("*").single(), "home_content");

  return {
    hero: {
      greeting: r.hero_greeting,
      tagline: r.hero_tagline,
      cta: {
        primary: { text: r.hero_cta_primary_text, href: r.hero_cta_primary_href },
        secondary: { text: r.hero_cta_secondary_text, href: r.hero_cta_secondary_href },
      },
    },
    philosophy: {
      title: r.philosophy_title,
      quote: r.philosophy_quote,
      author: r.philosophy_author,
      personalNote: r.philosophy_note,
      cta: { text: r.philosophy_cta_text, href: r.philosophy_cta_href },
    },
  };
}

export async function getAboutContent() {
  "use cache";
  cacheTag("about_content");
  cacheLife("days");

  const r = unwrap(await supabase.from("about_content").select("*").single(), "about_content");

  return {
    hero: { title: r.hero_title, intro: r.hero_intro },
    background: { title: r.background_title, content: r.background_content },
    lifeOutsideWork: {
      title: r.life_outside_work_title,
      content: r.life_outside_work_content,
    },
  };
}

// -----------------------------------------------------------------------------
// Skills
// -----------------------------------------------------------------------------
export async function getSkills() {
  "use cache";
  cacheTag("skills", "skill_categories");
  cacheLife("days");

  const rows = unwrap(
    await supabase
      .from("skill_categories")
      .select("name, sort_order, skills(name, icon_id, sort_order)")
      .order("sort_order"),
    "skill_categories",
  );

  return {
    categories: rows.map((c) => ({
      name: c.name,
      skills: [...c.skills]
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => ({ name: s.name, iconId: s.icon_id })),
    })),
  };
}

// -----------------------------------------------------------------------------
// Work history
// -----------------------------------------------------------------------------
export async function getExperience() {
  "use cache";
  cacheTag("experience");
  cacheLife("days");

  // Newest first, derived from the structured dates rather than a hand
  // maintained sort_order. The current role always leads.
  const rows = unwrap(
    await supabase
      .from("experience")
      .select("*")
      .order("is_current", { ascending: false })
      .order("start_year", { ascending: false, nullsFirst: false })
      .order("start_month", { ascending: false, nullsFirst: false }),
    "experience",
  );

  return rows.map((r) => ({
    id: r.id,
    company: r.company,
    role: r.role,
    location: r.location,
    // *_date_text are the pre-migration originals, kept as a fallback.
    startDate: formatMonthYear(r.start_month, r.start_year, r.start_date_text),
    endDate: formatMonthYear(r.end_month, r.end_year, r.end_date_text),
    isCurrent: r.is_current,
    description: r.description,
    achievements: r.achievements,
    technologies: r.technologies,
    startMonth: r.start_month,
    startYear: r.start_year,
    endMonth: r.end_month,
    endYear: r.end_year,
  }));
}

export async function getEducation() {
  "use cache";
  cacheTag("education");
  cacheLife("days");

  // Newest qualification first, derived from `year` — sort_order is not used.
  return unwrap(
    await supabase
      .from("education")
      .select("id, degree, institution, score, year")
      .order("year", { ascending: false, nullsFirst: false }),
    "education",
  );
}

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------
type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string | null;
  tech: string[];
  github_url: string | null;
  live_url: string | null;
  preview_image_path: string | null;
  is_featured: boolean;
  project_images: { image_path: string; sort_order: number }[];
};

function toProject(r: ProjectRow) {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    description: r.description,
    content: r.content ?? undefined,
    tech: r.tech,
    github: r.github_url,
    live: r.live_url,
    preview: imageUrl(r.preview_image_path),
    images: [...r.project_images]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => imageUrl(i.image_path))
      .filter((u): u is string => Boolean(u)),
    featured: r.is_featured,
  };
}

const PROJECT_FIELDS =
  "id, slug, title, category, description, content, tech, github_url, live_url, preview_image_path, is_featured, project_images(image_path, sort_order)";

export async function getAllProjects() {
  "use cache";
  cacheTag("projects", "project_images");
  cacheLife("days");

  const rows = unwrap(
    await supabase.from("projects").select(PROJECT_FIELDS).order("sort_order"),
    "projects",
  );
  return rows.map(toProject);
}

export async function getProjectBySlug(slug: string) {
  "use cache";
  cacheTag("projects", "project_images");
  cacheLife("days");

  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_FIELDS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`[data] project/${slug}: ${error.message}`);
  return data ? toProject(data) : null;
}

export async function getProjectSlugs() {
  "use cache";
  cacheTag("projects");
  cacheLife("days");

  const rows = unwrap(await supabase.from("projects").select("slug").order("sort_order"), "slugs");
  return rows.map((r) => r.slug);
}

// -----------------------------------------------------------------------------
// Studio gallery
// -----------------------------------------------------------------------------
export type StudioCategory = "Photography" | "3D Art";

// DB stores slugs; the components have always spoken in display labels.
const CATEGORY_LABEL: Record<string, StudioCategory> = {
  photography: "Photography",
  "3d-art": "3D Art",
};

/** Cached. All published studio images, in admin-defined order. */
export async function getStudioImages() {
  "use cache";
  cacheTag("studio_images");
  cacheLife("days");

  const rows = unwrap(
    await supabase
      .from("studio_images")
      .select("image_path, category, alt")
      .order("sort_order"),
    "studio_images",
  );

  return rows.map((r) => ({
    src: imageUrl(r.image_path)!,
    category: CATEGORY_LABEL[r.category],
    alt: r.alt ?? "",
  }));
}

// The helpers below are deliberately NOT cached: they take a per-session seed,
// so caching them would create one cache entry per visitor. They shuffle the
// cached array above, which costs microseconds.

export async function getShuffledPhotos(seed: number, count?: number): Promise<string[]> {
  const photos = (await getStudioImages())
    .filter((i) => i.category === "Photography")
    .map((i) => i.src);
  const shuffled = seededShuffle(photos, seed);
  return count ? shuffled.slice(0, count) : shuffled;
}

export async function getShuffledRenders(seed: number, count?: number): Promise<string[]> {
  const renders = (await getStudioImages())
    .filter((i) => i.category === "3D Art")
    .map((i) => i.src);
  const shuffled = seededShuffle(renders, seed);
  return count ? shuffled.slice(0, count) : shuffled;
}

export async function getShuffledStudioMix(seed: number, photoCount?: number) {
  const all = await getStudioImages();
  const photos = seededShuffle(
    all.filter((i) => i.category === "Photography"),
    seed,
  ).slice(0, photoCount ?? undefined);
  const renders = seededShuffle(
    all.filter((i) => i.category === "3D Art"),
    seed,
  );
  return seededShuffle([...photos, ...renders], seed).map(({ src, category }) => ({
    src,
    category,
  }));
}
