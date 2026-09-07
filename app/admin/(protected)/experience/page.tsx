import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    return <p className="text-sm text-muted-foreground">No roles yet.</p>;
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
              await moveExperience(row.id, direction);
            }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{row.role}</p>
              {row.is_current && <Badge variant="secondary">Current</Badge>}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {row.company} · {row.start_date} – {row.end_date ?? "Present"}
            </p>
          </div>

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
        </li>
      ))}
    </ul>
  );
}

export default function ExperienceAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Experience</h1>
          <p className="text-sm text-muted-foreground">
            Order here is the order on the about page (reversed to most-recent
            first).
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/experience/new">New role</Link>
        </Button>
      </div>

      <Suspense
        fallback={<div className="h-64 bg-muted/40 rounded-md animate-pulse" />}
      >
        <ExperienceList />
      </Suspense>
    </div>
  );
}
