import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { updateSocial } from "../actions";
import { SOCIAL_FIELDS } from "../fields";

async function EditForm({ id }: { id: string }) {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("social_links")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!row) notFound();

  return (
    <SimpleForm
      action={updateSocial}
      fields={SOCIAL_FIELDS}
      row={row}
      cancelHref="/admin/socials"
    />
  );
}

export default async function EditSocialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Edit link</h1>
      <Suspense fallback={<div className="h-96 bg-muted/40 rounded-md animate-pulse" />}>
        <EditForm id={id} />
      </Suspense>
    </div>
  );
}
