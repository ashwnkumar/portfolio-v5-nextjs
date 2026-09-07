import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Panel, RowList, Row, EmptyState } from "@/components/admin/ui/Panel";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { deleteExperience, moveExperience } from "./actions";

async function ExperienceList() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("experience")
    .select("id, company, role, start_date, end_date, is_current")
    .order("sort_order");

  if (!rows?.length) {
    return (
      <Panel label="roles">
        <EmptyState>no roles yet</EmptyState>
      </Panel>
    );
  }

  return (
    <Panel label={`roles · ${rows.length}`}>
      <RowList>
        {rows.map((row, i) => (
          <Row key={row.id}>
            <MoveButtons
              isFirst={i === 0}
              isLast={i === rows.length - 1}
              onMove={async (direction) => {
                "use server";
                await moveExperience(row.id, direction);
              }}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{row.role}</p>
                {row.is_current && (
                  <span className="font-pixel-square text-[10px] uppercase tracking-wide border border-border/70 px-1.5 py-0.5 text-muted-foreground">
                    current
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-muted-foreground truncate mt-0.5">
                {row.company} · {row.start_date} – {row.end_date ?? "present"}
              </p>
            </div>

            <div className="flex items-center shrink-0">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/experience/${row.id}`}>Edit</Link>
              </Button>
              <DeleteButton
                confirmText={`Delete "${row.role} at ${row.company}"?`}
                action={async () => {
                  "use server";
                  await deleteExperience(row.id);
                }}
              />
            </div>
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}

export default function ExperienceAdminPage() {
  return (
    <AdminPage
      label="experience"
      title="Experience"
      description="Ordered oldest first here; the about page reverses it to show the most recent role at the top."
      action={
        <Button asChild>
          <Link href="/admin/experience/new">+ New role</Link>
        </Button>
      }
    >
      <Suspense
        fallback={
          <div className="h-56 border border-border/70 bg-muted/20 animate-pulse" />
        }
      >
        <ExperienceList />
      </Suspense>
    </AdminPage>
  );
}
