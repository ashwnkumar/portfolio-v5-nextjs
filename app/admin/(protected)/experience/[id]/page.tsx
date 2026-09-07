import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">Edit role</h1>
      <Suspense
        fallback={<div className="h-96 bg-muted/40 rounded-md animate-pulse" />}
      >
        <EditForm id={id} />
      </Suspense>
    </div>
  );
}
