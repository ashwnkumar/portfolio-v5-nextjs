import fs from "fs";
import path from "path";

function getPublicFiles(subDir: string) {
  const dir = path.join(process.cwd(), "public", subDir);
  const files = fs.readdirSync(dir);

  return files.map((file) => `/${subDir}/${file}`);
}

export function getPhotos() {
  const arr = getPublicFiles("images/studio/photos");
  return arr.map((src) => ({ src, category: "Photography" as const }));
}

export function getRenders() {
  const arr = getPublicFiles("images/studio/renders");
  return arr.map((src) => ({ src, category: "3D Art" as const }));
}
