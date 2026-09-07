// Converts public/images/** to WebP and uploads to the `portfolio` bucket,
// writing scripts/.image-manifest.json for the seed script to consume.
//
//   node --env-file=.env scripts/migrate-images.mjs --dry-run
//   node --env-file=.env scripts/migrate-images.mjs
//
// Safe to re-run: uploads use upsert, so a partial run just resumes.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { adminClient, BUCKET, mapLimit, bytes, hasFlag } from "./lib/env.mjs";

const ROOT = process.cwd();
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "scripts", ".image-manifest.json");

const QUALITY = 80;
const MAX_EDGE = 2400;
const CONCURRENCY = 4;

const dryRun = hasFlag("dry-run");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

// -----------------------------------------------------------------------------
// Build the task list
// -----------------------------------------------------------------------------
const tasks = [];
const manifest = { profile: {}, projects: {}, studio: { photography: [], "3d-art": [] } };
const missing = [];

function add(sourceRel, dest, record) {
  const source = path.join(ROOT, "public", sourceRel.replace(/^\//, ""));
  if (!fs.existsSync(source)) {
    missing.push(sourceRel);
    return;
  }
  tasks.push({ source, dest, record });
}

// Profile — bio.images.home points at a file that does not exist; add() skips it.
{
  const bio = JSON.parse(fs.readFileSync(path.join(ROOT, "data/profile/bio.json"), "utf8"));
  for (const [key, publicPath] of Object.entries(bio.images ?? {})) {
    const dest = `profile/${path.basename(publicPath, path.extname(publicPath))}.webp`;
    add(publicPath, dest, () => { manifest.profile[key] = dest; });
  }
}

// Projects — driven by index.json so ordering matches the gallery exactly.
{
  const projects = JSON.parse(fs.readFileSync(path.join(ROOT, "data/projects/index.json"), "utf8"));
  for (const project of projects) {
    const entry = { preview: null, images: [] };
    manifest.projects[project.slug] = entry;

    if (project.preview) {
      const dest = `projects/${project.slug}/preview.webp`;
      add(project.preview, dest, () => { entry.preview = dest; });
    }
    (project.images ?? []).forEach((img, i) => {
      const dest = `projects/${project.slug}/${i + 1}.webp`;
      add(img, dest, () => { entry.images[i] = dest; });
    });
  }
}

// Studio — the filesystem is the source of truth today, so read the dirs.
for (const [subdir, category] of [["photos", "photography"], ["renders", "3d-art"]]) {
  const dir = path.join(PUBLIC_IMAGES, "studio", subdir);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).sort()) {
    if (!IMAGE_EXT.has(path.extname(file).toLowerCase())) continue;
    const dest = `studio/${category}/${path.basename(file, path.extname(file)).toLowerCase()}.webp`;
    add(`/images/studio/${subdir}/${file}`, dest, () => {
      manifest.studio[category].push(dest);
    });
  }
}

// -----------------------------------------------------------------------------
// Convert + upload
// -----------------------------------------------------------------------------
console.log(
  `\n${tasks.length} images → WebP (quality ${QUALITY}, max ${MAX_EDGE}px)` +
    `${dryRun ? "  [DRY RUN — nothing will be uploaded]" : ""}\n`,
);
if (missing.length) {
  console.log(`Skipping ${missing.length} referenced file(s) not on disk:`);
  missing.forEach((m) => console.log(`  – ${m}`));
  console.log();
}

const supabase = dryRun ? null : adminClient();
let originalTotal = 0;
let webpTotal = 0;
let done = 0;
const failures = [];

await mapLimit(tasks, CONCURRENCY, async (task) => {
  try {
    const originalSize = fs.statSync(task.source).size;
    const buffer = await sharp(task.source)
      .rotate() // honour EXIF orientation before stripping metadata
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();

    if (!dryRun) {
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(task.dest, buffer, { contentType: "image/webp", upsert: true });
      if (error) throw new Error(error.message);
    }

    task.record();
    originalTotal += originalSize;
    webpTotal += buffer.length;
    done++;
    const pct = (100 - (buffer.length / originalSize) * 100).toFixed(0);
    console.log(
      `  ${String(done).padStart(3)}/${tasks.length}  ${task.dest.padEnd(42)} ` +
        `${bytes(originalSize).padStart(8)} → ${bytes(buffer.length).padStart(8)}  (−${pct}%)`,
    );
  } catch (err) {
    failures.push({ dest: task.dest, message: err.message });
    console.log(`  ✗  ${task.dest} — ${err.message}`);
  }
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log(
  `\n${done}/${tasks.length} converted — ` +
    `${bytes(originalTotal)} → ${bytes(webpTotal)} ` +
    `(−${(100 - (webpTotal / originalTotal) * 100).toFixed(0)}%)`,
);

if (failures.length) {
  console.log(`\n${failures.length} failed:`);
  failures.forEach((f) => console.log(`  ✗ ${f.dest} — ${f.message}`));
}

if (dryRun) {
  console.log("\nDry run — no uploads, no manifest written.\n");
} else if (failures.length) {
  console.log("\nManifest NOT written because some uploads failed. Re-run to resume.\n");
  process.exit(1);
} else {
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest → scripts/.image-manifest.json`);
  console.log("Next: node --env-file=.env scripts/seed-content.mjs\n");
}
