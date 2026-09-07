import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Panel, RowList, Row, EmptyState } from "@/components/admin/ui/Panel";
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
    return (
      <Panel label="links">
        <EmptyState>nothing yet</EmptyState>
      </Panel>
    );
  }

  return (
    <Panel label={`links · ${rows.length}`}>
      <RowList>
        {rows.map((row, i) => (
          <Row key={row.id} className={row.is_visible ? "" : "opacity-55"}>
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
                <p className="font-pixel-square text-sm truncate">{row.platform}</p>
                {!row.is_visible && (
                  <span className="font-pixel-square text-[10px] uppercase tracking-wide border border-border/70 px-1.5 py-0.5 text-muted-foreground">
                    hidden
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-muted-foreground truncate mt-0.5">
                {row.url}
              </p>
            </div>
            <div className="flex items-center shrink-0">
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
            </div>
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}

export default function SocialsAdminPage() {
  return (
    <AdminPage
      label="socials"
      title="Social links"
      description="Platform slugs are lookup keys the site filters on — renaming one breaks that link. Uncheck “visible” to hide a link without deleting it."
      action={
        <Button asChild>
          <Link href="/admin/socials/new">+ New link</Link>
        </Button>
      }
    >
      <Suspense fallback={<div className="h-64 border border-border/70 bg-muted/20 animate-pulse" />}>
        <SocialsList />
      </Suspense>
    </AdminPage>
  );
}
