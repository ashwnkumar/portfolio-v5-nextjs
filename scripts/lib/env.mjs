// Shared setup for the one-off migration scripts.
// Run these with:  node --env-file=.env scripts/<name>.mjs
import { createClient } from "@supabase/supabase-js";

export const BUCKET = "portfolio";

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(
      `\nMissing ${name}.\n` +
        `These scripts read it from .env — run them as:\n` +
        `  node --env-file=.env scripts/<name>.mjs\n`,
    );
    process.exit(1);
  }
  return value;
}

// The secret key bypasses RLS, which is exactly what a seed script needs and
// exactly why it must never be imported by anything under app/.
export function adminClient() {
  return createClient(
    required("NEXT_PUBLIC_SUPABASE_URL"),
    required("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

/** Run `fn` over `items` with at most `limit` in flight. */
export async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const i = cursor++;
        results[i] = await fn(items[i], i);
      }
    }),
  );
  return results;
}

export const bytes = (n) =>
  n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${(n / 1024).toFixed(0)} KB`;

export const hasFlag = (name) => process.argv.includes(`--${name}`);
