import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../database.types";

/** Auth-aware client for Client Components (login form, sign-out). */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
