import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { updateExperience } from "../actions";

async function EditForm({ id }: { id: string }) {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!row) notFound();

  return <ExperienceForm action={updateExperience} row={row} />;
}

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminPage label="experience / edit" title="Edit role">
      <Suspense
        fallback={<div className="h-96 border border-border/70 bg-muted/20 animate-pulse" />}
      >
        <EditForm id={id} />
      </Suspense>
    </AdminPage>
  );
}
