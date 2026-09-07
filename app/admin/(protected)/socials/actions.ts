"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import { nextSortOrder, swapSortOrder } from "@/lib/admin/crud";
import { text, nullableText, bool, type ActionState } from "@/lib/admin/forms";

const LIST = "/admin/socials";

// Platform slugs are the lookup keys the site filters on (github, linkedin,
// email, instagram, instagram-photography, artstation, twitter). Renaming one
// silently breaks that link -- the form hint says so, and collisions surface
// as a readable error below.

function parse(form: FormData) {
  return {
    platform: text(form, "platform").toLowerCase(),
    label: text(form, "label"),
    url: text(form, "url"),
    username: nullableText(form, "username"),
    is_visible: bool(form, "is_visible"),
  };
}

function friendly(message: string) {
  return message.includes("duplicate key")
    ? "That platform slug is already in use."
    : message;
}

export async function createSocial(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const values = parse(form);
  if (!values.platform || !values.url) {
    return { error: "Platform and URL are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("social_links")
    .insert({ ...values, sort_order: await nextSortOrder(supabase, "social_links") });

  if (error) return { error: friendly(error.message) };
  revalidateContent("social_links");
  redirect(LIST);
}

export async function updateSocial(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const id = text(form, "id");
  const values = parse(form);
  if (!id) return { error: "Missing id." };
  if (!values.platform || !values.url) {
    return { error: "Platform and URL are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("social_links").update(values).eq("id", id);
  if (error) return { error: friendly(error.message) };

  revalidateContent("social_links");
  redirect(LIST);
}

export async function deleteSocial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateContent("social_links");
  redirect(LIST);
}

export async function moveSocial(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  await swapSortOrder(supabase, "social_links", id, direction);
  revalidateContent("social_links");
}
