// Seeds Supabase from the data/*.json files + project markdown + the image
// manifest produced by migrate-images.mjs.
//
//   node --env-file=.env scripts/seed-content.mjs
//   node --env-file=.env scripts/seed-content.mjs --force   # wipe and reseed
//
// Refuses to run against non-empty content tables without --force, so it can
// never silently clobber edits made in Supabase Studio or the admin panel.
import fs from "node:fs";
import path from "node:path";
import { adminClient, hasFlag } from "./lib/env.mjs";

const ROOT = process.cwd();
const read = (...p) => JSON.parse(fs.readFileSync(path.join(ROOT, "data", ...p), "utf8"));
const supabase = adminClient();
const force = hasFlag("force");

const MANIFEST_PATH = path.join(ROOT, "scripts", ".image-manifest.json");
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error("\nNo scripts/.image-manifest.json — run migrate-images.mjs first.\n");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

function die(label, error) {
  if (!error) return;
  console.error(`\n✗ ${label}: ${error.message}\n`);
  process.exit(1);
}

// -----------------------------------------------------------------------------
// Guard
// -----------------------------------------------------------------------------
const GUARDED = ["projects", "experience", "social_links", "studio_images", "skills"];
if (!force) {
  for (const table of GUARDED) {
    const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
    die(`checking ${table}`, error);
    if (count > 0) {
      console.error(
        `\n${table} already has ${count} row(s). Re-run with --force to wipe ` +
          `and reseed all content tables.\n`,
      );
      process.exit(1);
    }
  }
}

// -----------------------------------------------------------------------------
// Clear (child tables first; FKs cascade but explicit is clearer)
// -----------------------------------------------------------------------------
const LIST_TABLES = [
  "project_images", "projects", "skills", "skill_categories",
  "experience", "education", "studio_images",
  "nav_links", "footer_links", "social_links",
];
for (const table of LIST_TABLES) {
  die(`clearing ${table}`, (await supabase.from(table).delete().not("id", "is", null)).error);
}
for (const table of ["site_settings", "profile", "home_content", "about_content"]) {
  die(`clearing ${table}`, (await supabase.from(table).delete().eq("id", 1)).error);
}

// -----------------------------------------------------------------------------
// Site chrome
// -----------------------------------------------------------------------------
const navigation = read("site", "navigation.json");
const footer = read("site", "footer.json");

die("site_settings", (await supabase.from("site_settings").insert({
  id: 1,
  nav_brand_name: navigation.brand.name,
  nav_brand_href: navigation.brand.href,
  footer_brand_name: footer.brand.name,
  footer_brand_tagline: footer.brand.tagline,
})).error);

die("nav_links", (await supabase.from("nav_links").insert(
  navigation.links.map((l, i) => ({ label: l.label, href: l.href, sort_order: i + 1 })),
)).error);

die("footer_links", (await supabase.from("footer_links").insert(
  footer.quickLinks.map((l, i) => ({ label: l.name, href: l.href, sort_order: i + 1 })),
)).error);

// social.json carries leftover scaffolding ("yourusername",
// "your.email@example.com"); drop those rather than migrate them.
const PLACEHOLDERS = new Set(["yourusername", "your.email@example.com"]);
die("social_links", (await supabase.from("social_links").insert(
  read("site", "social.json").links.map((s, i) => ({
    // app/studio/page.tsx already looks for "instagram-photography";
    // the JSON called it "photography", which is why that link was dead.
    platform: s.platform === "photography" ? "instagram-photography" : s.platform,
    label: s.label,
    url: s.url,
    username: PLACEHOLDERS.has(s.username) ? null : (s.username ?? null),
    sort_order: i + 1,
  })),
)).error);

// -----------------------------------------------------------------------------
// Profile & page copy
// -----------------------------------------------------------------------------
const bio = read("profile", "bio.json");
die("profile", (await supabase.from("profile").insert({
  id: 1,
  name: bio.name,
  tagline: bio.tagline,
  image_home_path: manifest.profile.home ?? null,
  image_about_path: manifest.profile.about ?? null,
  image_alt: bio.imageAlt,
})).error);

const home = read("content", "home.json");
die("home_content", (await supabase.from("home_content").insert({
  id: 1,
  hero_greeting: home.hero.greeting,
  hero_tagline: home.hero.tagline,
  hero_cta_primary_text: home.hero.cta.primary.text,
  hero_cta_primary_href: home.hero.cta.primary.href,
  hero_cta_secondary_text: home.hero.cta.secondary.text,
  hero_cta_secondary_href: home.hero.cta.secondary.href,
  philosophy_title: home.philosophy.title,
  philosophy_quote: home.philosophy.quote,
  philosophy_author: home.philosophy.author,
  philosophy_note: home.philosophy.personalNote,
  philosophy_cta_text: home.philosophy.cta.text,
  philosophy_cta_href: home.philosophy.cta.href,
})).error);

const about = read("content", "about.json");
die("about_content", (await supabase.from("about_content").insert({
  id: 1,
  hero_title: about.hero.title,
  hero_intro: about.hero.intro,
  background_title: about.background.title,
  background_content: about.background.content,
  life_outside_work_title: about.lifeOutsideWork.title,
  life_outside_work_content: about.lifeOutsideWork.content,
})).error);

// -----------------------------------------------------------------------------
// Skills
// -----------------------------------------------------------------------------
for (const [i, category] of read("profile", "skills.json").categories.entries()) {
  const { data, error } = await supabase
    .from("skill_categories")
    .insert({ name: category.name, sort_order: i + 1 })
    .select("id")
    .single();
  die(`skill_categories/${category.name}`, error);

  die(`skills/${category.name}`, (await supabase.from("skills").insert(
    category.skills.map((s, j) => ({
      category_id: data.id,
      name: s.name,
      icon_id: s.iconId ?? null,
      sort_order: j + 1,
    })),
  )).error);
}

// -----------------------------------------------------------------------------
// Work history
// -----------------------------------------------------------------------------
die("experience", (await supabase.from("experience").insert(
  read("work", "experience.json").map((e, i) => ({
    company: e.company,
    role: e.role,
    location: e.location,
    start_date: e.startDate,
    end_date: e.endDate,
    is_current: e.isCurrent,
    description: e.description,
    achievements: e.achievements,
    technologies: e.technologies,
    sort_order: i + 1,
  })),
)).error);

die("education", (await supabase.from("education").insert(
  read("work", "education.json").map((e, i) => ({
    degree: e.degree,
    institution: e.institution,
    score: e.score,
    year: e.year,
    sort_order: i + 1,
  })),
)).error);

// -----------------------------------------------------------------------------
// Projects
// -----------------------------------------------------------------------------
for (const [i, project] of read("projects", "index.json").entries()) {
  const mdPath = path.join(ROOT, "data", "projects", `${project.slug}.md`);
  const images = manifest.projects[project.slug] ?? { preview: null, images: [] };

  const { data, error } = await supabase
    .from("projects")
    .insert({
      slug: project.slug,
      title: project.title,
      category: project.category,
      description: project.description,
      content: fs.existsSync(mdPath) ? fs.readFileSync(mdPath, "utf8") : null,
      tech: project.tech,
      github_url: project.github,
      live_url: project.live,
      preview_image_path: images.preview,
      is_featured: project.featured,
      is_published: true,
      sort_order: i + 1,
    })
    .select("id")
    .single();
  die(`projects/${project.slug}`, error);

  const rows = images.images.filter(Boolean).map((image_path, j) => ({
    project_id: data.id,
    image_path,
    alt: `${project.title} screenshot ${j + 1}`,
    sort_order: j + 1,
  }));
  if (rows.length) die(`project_images/${project.slug}`, (await supabase.from("project_images").insert(rows)).error);
}

// -----------------------------------------------------------------------------
// Studio gallery
// -----------------------------------------------------------------------------
const humanise = (p) =>
  path.basename(p, ".webp").replace(/^(photo|blender)-/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const studioRows = Object.entries(manifest.studio).flatMap(([category, paths]) =>
  paths.map((image_path, i) => ({
    image_path,
    category,
    title: humanise(image_path),
    alt: humanise(image_path),
    sort_order: i + 1,
  })),
);
die("studio_images", (await supabase.from("studio_images").insert(studioRows)).error);

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log("\nSeeded:");
for (const table of [
  "site_settings", "nav_links", "footer_links", "social_links", "profile",
  "home_content", "about_content", "skill_categories", "skills",
  "experience", "education", "projects", "project_images", "studio_images",
]) {
  const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
  console.log(`  ${table.padEnd(18)} ${count}`);
}
console.log("\nDone. Phase 2 (rewiring lib/data.ts) is next.\n");
