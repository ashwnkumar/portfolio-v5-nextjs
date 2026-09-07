"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { ConfirmDialog } from "./ConfirmDialog";
import {
  saveEducation,
  deleteEducation,
  type EducationDraft,
} from "@/app/admin/(protected)/education/actions";
import type { ActionState } from "@/lib/admin/forms";

const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 60 }, (_, i) => String(THIS_YEAR + 2 - i));
const INITIAL: ActionState = { error: null };

type Draft = EducationDraft & { key: string };

const toDraft = (r: Partial<EducationDraft> = {}): Draft => ({
  key: Math.random().toString(36).slice(2),
  id: r.id ?? null,
  degree: r.degree ?? "",
  institution: r.institution ?? "",
  score: r.score ?? "",
  year: r.year ?? "",
});

export function EducationEditor({ rows }: { rows: EducationDraft[] }) {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>(rows.map((r) => toDraft(r)));
  const [state, formAction, pending] = useActionState(saveEducation, INITIAL);

  // Baseline for dirty tracking — always-on inputs need an explicit signal
  // that something has actually changed.
  const baseline = useMemo(() => JSON.stringify(rows), [rows]);
  const current = JSON.stringify(
    drafts.map(({ key, ...rest }) => rest), // eslint-disable-line @typescript-eslint/no-unused-vars
  );
  const dirty = baseline !== current;

  useEffect(() => {
    if (!state.ok) return;
    toast.success("Education saved");
    router.refresh();
  }, [state, router]);

  const update = (key: string, patch: Partial<Draft>) =>
    setDrafts((prev) =>
      prev.map((d) => (d.key === key ? { ...d, ...patch } : d)),
    );

  // Mirrors the public card numbering, which is derived from position.
  const ordered = [...drafts].sort((a, b) =>
    (b.year || "").localeCompare(a.year || ""),
  );

  return (
    <form action={formAction} className="space-y-4">
      <input
        type="hidden"
        name="payload"
        value={JSON.stringify(ordered.map(({ key, ...rest }) => rest))} // eslint-disable-line @typescript-eslint/no-unused-vars
      />

      <div className="border border-border divide-y divide-border/70">
        {ordered.map((draft, i) => (
          <div key={draft.key} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-pixel-square text-xs text-muted-foreground border border-border px-1.5 py-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>

              {draft.id ? (
                <ConfirmDialog
                  title="Delete this entry?"
                  description={
                    <p>
                      <strong className="text-foreground">
                        {draft.degree || "This entry"}
                      </strong>{" "}
                      will be removed from your about page. This cannot be
                      undone.
                    </p>
                  }
                  onConfirm={async () => {
                    const result = await deleteEducation(draft.id!);
                    if (result.error) toast.error(result.error);
                    else {
                      toast.success("Entry deleted");
                      setDrafts((prev) =>
                        prev.filter((d) => d.key !== draft.key),
                      );
                      router.refresh();
                    }
                  }}
                  trigger={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      aria-label="Delete entry"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                    </Button>
                  }
                />
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  aria-label="Remove unsaved entry"
                  onClick={() =>
                    setDrafts((prev) => prev.filter((d) => d.key !== draft.key))
                  }
                >
                  <XIcon className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-[1fr_auto] gap-3 items-start">
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <Label className="text-xs" htmlFor={`degree-${draft.key}`}>
                    Degree
                  </Label>
                  <Input
                    id={`degree-${draft.key}`}
                    value={draft.degree}
                    onChange={(e) =>
                      update(draft.key, { degree: e.target.value })
                    }
                    placeholder="B.E. Computer Engineering"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs" htmlFor={`inst-${draft.key}`}>
                    Institution
                  </Label>
                  <Input
                    id={`inst-${draft.key}`}
                    value={draft.institution}
                    onChange={(e) =>
                      update(draft.key, { institution: e.target.value })
                    }
                    placeholder="College or school name"
                  />
                </div>
              </div>

              <div className="space-y-2 md:w-44">
                <div className="space-y-1.5">
                  <Label className="text-xs" htmlFor={`score-${draft.key}`}>
                    Score
                  </Label>
                  <Input
                    id={`score-${draft.key}`}
                    value={draft.score}
                    onChange={(e) =>
                      update(draft.key, { score: e.target.value })
                    }
                    placeholder="7.65 CGPA or 85%"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Include the unit — it publishes as a badge.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Year</Label>
                  <Select
                    value={draft.year || undefined}
                    onValueChange={(year) => update(draft.key, { year })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {drafts.length === 0 && (
          <p className="px-4 py-10 text-center font-pixel-square text-sm text-muted-foreground">
            no entries
          </p>
        )}
      </div>

      {state.error && (
        <p className="border border-destructive/50 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="gap-1.5"
          onClick={() => setDrafts((prev) => [...prev, toDraft()])}
        >
          <PlusIcon className="w-3.5 h-3.5" />
          Add entry
        </Button>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="font-mono text-xs text-muted-foreground">
              unsaved changes
            </span>
          )}
          <Button type="submit" disabled={!dirty || pending}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
