"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { revalidateContent } from "@/lib/admin/revalidate";
import { nextSortOrder, swapSortOrder } from "@/lib/admin/crud";
import { text, nullableText, type ActionState } from "@/lib/admin/forms";

const LIST = "/admin/education";

function parse(form: FormData) {
  return {
    degree: text(form, "degree"),
    institution: text(form, "institution"),
    score: nullableText(form, "score"),
    year: nullableText(form, "year"),
  };
}

export async function createEducation(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const values = parse(form);
  if (!values.degree || !values.institution) {
    return { error: "Degree and institution are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("education")
    .insert({ ...values, sort_order: await nextSortOrder(supabase, "education") });

  if (error) return { error: error.message };
  revalidateContent("education");
  redirect(LIST);
}

export async function updateEducation(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const id = text(form, "id");
  const values = parse(form);
  if (!id) return { error: "Missing id." };
  if (!values.degree || !values.institution) {
    return { error: "Degree and institution are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("education").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidateContent("education");
  redirect(LIST);
}

export async function deleteEducation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateContent("education");
  redirect(LIST);
}

export async function moveEducation(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  await swapSortOrder(supabase, "education", id, direction);
  revalidateContent("education");
}
