import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { updateCategory } from "../actions";
import { CATEGORY_FIELDS } from "../fields";

async function EditForm({ id }: { id: string }) {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("skill_categories")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (!row) notFound();

  return (
    <SimpleForm
      action={updateCategory}
      fields={CATEGORY_FIELDS}
      row={row}
      panelLabel="category"
      cancelHref="/admin/skills"
    />
  );
}

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminPage label="skills / rename" title="Rename category">
      <Suspense
        fallback={
          <div className="h-48 border border-border bg-muted/20 animate-pulse" />
        }
      >
        <EditForm id={id} />
      </Suspense>
    </AdminPage>
  );
}
