import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
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
              await moveEducation(row.id, direction);
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{row.degree}</p>
            <p className="text-xs text-muted-foreground truncate">
              {row.institution}
              {row.score ? ` · ${row.score}` : ""}
              {row.year ? ` · ${row.year}` : ""}
            </p>
          </div>
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
        </li>
      ))}
    </ul>
  );
}

export default function EducationAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Education</h1>
        <Button asChild>
          <Link href="/admin/education/new">New entry</Link>
        </Button>
      </div>
      <Suspense fallback={<div className="h-48 bg-muted/40 rounded-md animate-pulse" />}>
        <EducationList />
      </Suspense>
    </div>
  );
}
