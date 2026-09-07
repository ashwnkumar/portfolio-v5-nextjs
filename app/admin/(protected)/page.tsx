import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const COLLECTIONS = [
  { table: "projects", label: "Projects", href: "/admin/projects" },
  { table: "studio_images", label: "Studio images", href: "/admin/studio" },
  { table: "experience", label: "Experience", href: "/admin/experience" },
  { table: "education", label: "Education", href: "/admin/education" },
  { table: "skills", label: "Skills", href: "/admin/skills" },
  { table: "social_links", label: "Social links", href: "/admin/socials" },
] as const;

async function CollectionCounts() {
  const supabase = await createClient();

  const counts = await Promise.all(
    COLLECTIONS.map(async (c) => {
      const { count } = await supabase
        .from(c.table)
        .select("*", { count: "exact", head: true });
      return { ...c, count: count ?? 0 };
    }),
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {counts.map((c) => (
        <Link
          key={c.table}
          href={c.href}
          className="border rounded-md p-4 hover:bg-muted/50 transition-colors"
        >
          <p className="text-3xl font-medium">{c.count}</p>
          <p className="text-sm text-muted-foreground">{c.label}</p>
        </Link>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Content</h1>
        <p className="text-sm text-muted-foreground">
          Editing UI lands in the next phase — these counts confirm the
          authenticated session reads through RLS as an admin.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: COLLECTIONS.length }).map((_, i) => (
              <div key={i} className="h-24 bg-muted/40 rounded-md animate-pulse" />
            ))}
          </div>
        }
      >
        <CollectionCounts />
      </Suspense>
    </div>
  );
}
