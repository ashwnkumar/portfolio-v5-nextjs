import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { deleteSocial, moveSocial } from "./actions";

async function SocialsList() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("social_links")
    .select("id, platform, label, url, is_visible")
    .order("sort_order");

  if (!rows?.length) {
    return <p className="text-sm text-muted-foreground">Nothing yet.</p>;
  }

  return (
    <ul className="divide-y border rounded-md">
      {rows.map((row, i) => (
        <li key={row.id} className="flex items-center gap-3 p-3">
          <MoveButtons
            isFirst={i === 0}
            isLast={i === rows.length - 1}
            onMove={async (direction) => {
              "use server";
              await moveSocial(row.id, direction);
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{row.platform}</p>
              {!row.is_visible && <Badge variant="outline">Hidden</Badge>}
            </div>
            <p className="text-xs text-muted-foreground truncate">{row.url}</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/socials/${row.id}`}>Edit</Link>
          </Button>
          <DeleteButton
            confirmText={`Delete the "${row.platform}" link?`}
            action={async () => {
              "use server";
              await deleteSocial(row.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function SocialsAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Social links</h1>
          <p className="text-sm text-muted-foreground">
            Uncheck &ldquo;visible&rdquo; to hide one without deleting it.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/socials/new">New link</Link>
        </Button>
      </div>
      <Suspense fallback={<div className="h-64 bg-muted/40 rounded-md animate-pulse" />}>
        <SocialsList />
      </Suspense>
    </div>
  );
}
