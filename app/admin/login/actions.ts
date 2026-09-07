"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error: string | null };

/** Admin identity lives server-side; the browser only ever sends a password. */
function adminEmail() {
  return process.env.ADMIN_EMAIL ?? process.env.CONTACT_EMAIL ?? null;
}

/** Only allow same-site admin paths, so ?next= cannot become an open redirect. */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = adminEmail();
  if (!email) {
    return { error: "Server is missing ADMIN_EMAIL / CONTACT_EMAIL." };
  }

  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter your password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // Deliberately vague: never reveal whether the account exists or which half
  // of the credentials was wrong.
  if (error) return { error: "Incorrect password." };

  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
