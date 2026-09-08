import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialsEditor } from "@/components/admin/SocialsEditor";

async function Editor() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("social_links")
    .select("id, platform, display_name, label, url, is_visible")
    .order("sort_order");

  return <SocialsEditor rows={rows ?? []} />;
}

function EditorSkeleton() {
  return (
    <div className="border border-border/70 divide-y divide-border/70">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="p-4 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-3 w-64" />
        </div>
      ))}
    </div>
  );
}

export default function SocialsAdminPage() {
  return (
    <AdminPage
      label="socials"
      title="Social links"
      description="Each link shows where it appears on the site. Locked slugs are referenced by name in the code — hiding or deleting one removes it from every surface listed."
    >
      <Suspense fallback={<EditorSkeleton />}>
        <Editor />
      </Suspense>
    </AdminPage>
  );
}
