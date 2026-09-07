import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Skeleton } from "@/components/ui/skeleton";
import { ExperienceBoard } from "@/components/admin/ExperienceBoard";

async function Board() {
  const supabase = await createClient();

  // Newest first, derived from the dates — no sort_order to maintain.
  const { data: rows } = await supabase
    .from("experience")
    .select(
      "id, role, company, location, start_month, start_year, end_month, end_year, is_current, description, achievements, technologies",
    )
    .order("is_current", { ascending: false })
    .order("start_year", { ascending: false, nullsFirst: false })
    .order("start_month", { ascending: false, nullsFirst: false });

  // Autocomplete source, so spellings stay consistent across roles.
  const suggestions = [...new Set((rows ?? []).flatMap((r) => r.technologies))].sort();

  return <ExperienceBoard rows={rows ?? []} suggestions={suggestions} />;
}

function BoardSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="border border-border/70 p-5 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((j) => (
              <Skeleton key={j} className="h-5 w-16" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExperienceAdminPage() {
  return (
    <AdminPage
      label="experience"
      title="Experience"
      description="Each card shows exactly what publishes to your about page. Order follows the dates."
    >
      <Suspense fallback={<BoardSkeleton />}>
        <Board />
      </Suspense>
    </AdminPage>
  );
}
