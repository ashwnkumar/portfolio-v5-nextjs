"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { ExperienceCard, type ExperienceRow } from "./ExperienceCard";

export function ExperienceBoard({
  rows,
  suggestions,
}: {
  rows: ExperienceRow[];
  suggestions: string[];
}) {
  const [addingNew, setAddingNew] = useState(false);
  const currentRoleName = rows.find((r) => r.is_current)?.role ?? null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-pixel-square text-xs text-muted-foreground">
          // {rows.length} role{rows.length === 1 ? "" : "s"} · newest first
        </p>
        {!addingNew && (
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => setAddingNew(true)}
          >
            <PlusIcon className="w-3.5 h-3.5" />
            Add role
          </Button>
        )}
      </div>

      {addingNew && (
        <ExperienceCard
          startEditing
          suggestions={suggestions}
          currentRoleName={currentRoleName}
          onCancelNew={() => setAddingNew(false)}
        />
      )}

      {rows.length === 0 && !addingNew ? (
        <div className="border border-border px-4 py-12 text-center">
          <p className="font-pixel-square text-sm text-muted-foreground">
            no roles yet
          </p>
        </div>
      ) : (
        rows.map((row) => (
          <ExperienceCard
            key={row.id}
            row={row}
            suggestions={suggestions}
            currentRoleName={currentRoleName}
          />
        ))
      )}
    </div>
  );
}
