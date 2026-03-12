import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
