import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillsBoard } from "@/components/admin/SkillsBoard";

async function Board() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skill_categories")
    .select("id, name, sort_order, skills(id, name, icon_id, icon_variant, invert_dark, sort_order)")
    .order("sort_order");

  const categories = (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    skills: [...c.skills].sort((a, b) => a.sort_order - b.sort_order),
  }));

  return <SkillsBoard categories={categories} />;
}

function BoardSkeleton() {
  return (
    <div className="space-y-4">
      {[9, 6, 5].map((n, i) => (
        <div key={i} className="border border-border/70">
          <div className="border-b border-border/70 px-4 py-2.5">
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="p-3 flex flex-wrap gap-1.5">
            {Array.from({ length: n }).map((_, j) => (
              <Skeleton key={j} className="w-20 h-[76px]" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SkillsAdminPage() {
  return (
    <AdminPage
      label="skills"
      title="Skills"
      description="Laid out like the public grid. Click an icon to edit it; search fills the name and icon together."
    >
      <Suspense fallback={<BoardSkeleton />}>
        <Board />
      </Suspense>
    </AdminPage>
  );
}
