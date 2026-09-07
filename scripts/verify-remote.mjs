// Read-only preflight: confirms the migrations landed before we seed anything.
//   node --env-file=.env scripts/verify-remote.mjs
import { adminClient, BUCKET } from "./lib/env.mjs";

const TABLES = [
  "site_settings", "nav_links", "footer_links", "social_links",
  "profile", "home_content", "about_content",
  "skill_categories", "skills", "experience", "education",
  "projects", "project_images", "studio_images",
];

const supabase = adminClient();
let failed = false;

console.log("\nTables");
for (const table of TABLES) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) {
    failed = true;
    console.log(`  ✗ ${table.padEnd(18)} ${error.message}`);
  } else {
    console.log(`  ✓ ${table.padEnd(18)} ${count} row${count === 1 ? "" : "s"}`);
  }
}

console.log("\nStorage");
{
  const { data, error } = await supabase.storage.getBucket(BUCKET);
  if (error) {
    failed = true;
    console.log(`  ✗ bucket "${BUCKET}" — ${error.message}`);
  } else {
    console.log(
      `  ✓ bucket "${BUCKET}" — public: ${data.public}, ` +
        `limit: ${data.file_size_limit ?? "none"}`,
    );
  }
}

console.log("\nPolicy helper");
{
  // Called with the secret key there is no JWT, so `false` is the correct
  // answer here. We are only proving the function exists and is callable.
  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    failed = true;
    console.log(`  ✗ is_admin() — ${error.message}`);
  } else {
    console.log(`  ✓ is_admin() exists (returned ${data} for a keyless call)`);
  }
}

console.log(
  failed
    ? "\nSomething is missing — re-check `supabase db push` output.\n"
    : "\nSchema looks good. Safe to run migrate-images.mjs.\n",
);
process.exit(failed ? 1 : 0);
