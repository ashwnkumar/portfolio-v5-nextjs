import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { seededShuffle } from "./random";

const dataDirectory = path.join(process.cwd(), "data");

function readJSON(...segments: string[]) {
  const filePath = path.join(dataDirectory, ...segments);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

function readMarkdown(...segments: string[]) {
  const filePath = path.join(dataDirectory, ...segments);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}

export const getNavigation = () => readJSON("site", "navigation.json").links;
export const getFooter = () => readJSON("site", "footer.json");
export const getSocialLinks = () => readJSON("site", "social.json").links;

export const getBio = () => readJSON("profile", "bio.json");
export const getContact = () => readJSON("profile", "contact.json");
export const getSkills = () => readJSON("profile", "skills.json");
export const getPlaylist = () => readJSON("profile", "playlist.json");

export const getHomeContent = () => readJSON("content", "home.json");
export const getAboutContent = () => readJSON("content", "about.json");

export function getAllProjects() {
  return readJSON("projects", "index.json");
}

export function getFeaturedProjects() {
  return getAllProjects().filter((project: any) => project.featured);
}

export function getProjectBySlug(slug: string) {
  const projects = getAllProjects();
  const projectMeta = projects.find((p: any) => p.slug === slug);

  if (!projectMeta) return null;

  const markdown = readMarkdown("projects", `${slug}.md`);

  return {
    ...projectMeta,
    ...(markdown ?? {}),
  };
}

export function getProjectSlugs() {
  return getAllProjects().map((project: any) => project.slug);
}

export const getAllStudioItems = () => readJSON("studio", "index.json");

export function getStudioItemsByCategory(category: string) {
  return getAllStudioItems().filter((item: any) => item.category === category);
}

export const getExperience = () => readJSON("work", "experience.json");

export function getCurrentRole() {
  return getExperience().find((role: any) => role.isCurrent);
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const studioDir = path.join(process.cwd(), "public", "images", "studio");

function readImageDir(subdir: string): string[] {
  const dir = path.join(studioDir, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .map((f) => `/images/studio/${subdir}/${f}`);
}

/** Get shuffled photography images for a session */
export function getShuffledPhotos(seed: number, count?: number): string[] {
  const photos = readImageDir("photos");
  const shuffled = seededShuffle(photos, seed);
  return count ? shuffled.slice(0, count) : shuffled;
}

/** Get shuffled render images for a session */
export function getShuffledRenders(seed: number, count?: number): string[] {
  const renders = readImageDir("renders");
  const shuffled = seededShuffle(renders, seed);
  return count ? shuffled.slice(0, count) : shuffled;
}

/** Get a mixed, shuffled array of photos and renders for the studio gallery */
export function getShuffledStudioMix(
  seed: number,
  photoCount?: number,
): { src: string; category: "Photography" | "3D Art" }[] {
  const photos = getShuffledPhotos(seed, photoCount);
  const renders = getShuffledRenders(seed);
  const combined = [
    ...photos.map((src) => ({ src, category: "Photography" as const })),
    ...renders.map((src) => ({ src, category: "3D Art" as const })),
  ];
  return seededShuffle(combined, seed);
}
