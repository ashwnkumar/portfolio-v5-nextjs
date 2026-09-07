import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";

const COLLECTIONS = [
  {
    table: "projects",
    label: "projects",
    href: "/admin/projects",
    ready: false,
  },
  {
    table: "studio_images",
    label: "studio images",
    href: "/admin/studio",
    ready: false,
  },
  {
    table: "experience",
    label: "experience",
    href: "/admin/experience",
    ready: true,
  },
  {
    table: "education",
    label: "education",
    href: "/admin/education",
    ready: true,
  },
  { table: "skills", label: "skills", href: "/admin/skills", ready: true },
  {
    table: "social_links",
    label: "social links",
    href: "/admin/socials",
    ready: true,
  },
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
    <div className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-border">
      {counts.map((c) => {
        const inner = (
          <>
            <p className="text-3xl font-medium font-pixel-grid tabular-nums">
              {c.count}
            </p>
            <p className="font-pixel-square text-xs text-muted-foreground mt-1">
              {c.label}
            </p>
            {!c.ready && (
              <p className="font-pixel-square text-[10px] text-muted-foreground/60 mt-2">
                not built yet
              </p>
            )}
          </>
        );

        return c.ready ? (
          <Link
            key={c.table}
            href={c.href}
            className="border-r border-b border-border p-4 hover:bg-muted/40 transition-colors"
          >
            {inner}
          </Link>
        ) : (
          <div
            key={c.table}
            className="border-r border-b border-border p-4 opacity-50 cursor-not-allowed"
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminPage
      label="overview"
      title="Content"
      description="Row counts read through RLS as an admin — drafts included."
    >
      <Suspense
        fallback={
          <div className="h-48 border border-border bg-muted/20 animate-pulse" />
        }
      >
        <CollectionCounts />
      </Suspense>
    </AdminPage>
  );
}
