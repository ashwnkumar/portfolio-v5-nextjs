import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { AdminPage } from "@/components/admin/ui/AdminPage";
import { Panel, RowList, Row, EmptyState } from "@/components/admin/ui/Panel";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { MoveButtons } from "@/components/admin/MoveButtons";
import { deleteEducation, moveEducation } from "./actions";

async function EducationList() {
  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("education")
    .select("id, degree, institution, score, year")
    .order("sort_order");

  if (!rows?.length) {
    return (
      <Panel label="entries">
        <EmptyState>nothing yet</EmptyState>
      </Panel>
    );
  }

  return (
    <Panel label={`entries · ${rows.length}`}>
      <RowList>
        {rows.map((row, i) => (
          <Row key={row.id}>
            <MoveButtons
              isFirst={i === 0}
              isLast={i === rows.length - 1}
              onMove={async (direction) => {
                "use server";
                await moveEducation(row.id, direction);
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{row.degree}</p>
              <p className="font-mono text-xs text-muted-foreground truncate mt-0.5">
                {row.institution}
                {row.score ? ` · ${row.score}` : ""}
                {row.year ? ` · ${row.year}` : ""}
              </p>
            </div>
            <div className="flex items-center shrink-0">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/education/${row.id}`}>Edit</Link>
              </Button>
              <DeleteButton
                confirmText={`Delete "${row.degree}"?`}
                action={async () => {
                  "use server";
                  await deleteEducation(row.id);
                }}
              />
            </div>
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}

export default function EducationAdminPage() {
  return (
    <AdminPage
      label="education"
      title="Education"
      description="Shown on the about page in this order."
      action={
        <Button asChild>
          <Link href="/admin/education/new">+ New entry</Link>
        </Button>
      }
    >
      <Suspense fallback={<div className="h-48 border border-border/70 bg-muted/20 animate-pulse" />}>
        <EducationList />
      </Suspense>
    </AdminPage>
  );
}
