import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
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
      panelLabel="link"
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
    <AdminPage label="socials / edit" title="Edit link">
      <Suspense fallback={<div className="h-96 border border-border/70 bg-muted/20 animate-pulse" />}>
        <EditForm id={id} />
      </Suspense>
    </AdminPage>
  );
}
