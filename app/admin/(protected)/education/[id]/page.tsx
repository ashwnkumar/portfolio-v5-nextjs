import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { updateEducation } from "../actions";
import { EDUCATION_FIELDS } from "../fields";

async function EditForm({ id }: { id: string }) {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("education")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!row) notFound();

  return (
    <SimpleForm
      action={updateEducation}
      fields={EDUCATION_FIELDS}
      row={row}
      cancelHref="/admin/education"
    />
  );
}

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Edit entry</h1>
      <Suspense fallback={<div className="h-72 bg-muted/40 rounded-md animate-pulse" />}>
        <EditForm id={id} />
      </Suspense>
    </div>
  );
}
