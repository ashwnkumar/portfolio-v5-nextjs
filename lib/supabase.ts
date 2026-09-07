import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

/**
 * Read-only client for the public site.
 *
 * Uses the publishable key, so every query is subject to RLS: unpublished
 * projects, hidden socials and their images are invisible here. Never import
 * the secret key into anything under app/ — the seed scripts own that.
 *
 * Types come from lib/database.types.ts, regenerated with:
 *   supabase gen types typescript --linked > lib/database.types.ts
 */
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
