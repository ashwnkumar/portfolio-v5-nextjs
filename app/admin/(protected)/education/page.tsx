import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Skeleton } from "@/components/ui/skeleton";
import { EducationEditor } from "@/components/admin/EducationEditor";

async function Editor() {
  const supabase = await createClient();

  // Ordered by year, same as the public about page. 4-digit years sort
  // correctly as text, so no schema change was needed for this.
  const { data: rows } = await supabase
    .from("education")
    .select("id, degree, institution, score, year")
    .order("year", { ascending: false, nullsFirst: false });

  return (
    <EducationEditor
      rows={(rows ?? []).map((r) => ({
        id: r.id,
        degree: r.degree,
        institution: r.institution,
        score: r.score ?? "",
        year: r.year ?? "",
      }))}
    />
  );
}

function EditorSkeleton() {
  return (
    <div className="border border-border divide-y divide-border/70">
      {[0, 1, 2].map((i) => (
        <div key={i} className="p-4 space-y-3">
          <Skeleton className="h-5 w-8" />
          <div className="grid md:grid-cols-[1fr_auto] gap-3">
            <div className="space-y-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2 md:w-44">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EducationAdminPage() {
  return (
    <AdminPage
      label="education"
      title="Education"
      description="Edit any field directly, then save. Entries are numbered and ordered by year, matching the about page."
    >
      <Suspense fallback={<EditorSkeleton />}>
        <Editor />
      </Suspense>
    </AdminPage>
  );
}
