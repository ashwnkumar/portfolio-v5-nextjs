"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { MonthYearField } from "./MonthYearField";
import { AchievementsEditor } from "./AchievementsEditor";
import { TechChips } from "./TechChips";
import { ConfirmDialog } from "./ConfirmDialog";
import { saveExperience, deleteExperience } from "@/app/admin/(protected)/experience/actions";
import { formatMonthYear } from "@/lib/dates";
import type { ActionState } from "@/lib/admin/forms";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export type ExperienceRow = {
  id: string;
  role: string;
  company: string;
  location: string;
  start_month: number | null;
  start_year: number | null;
  end_month: number | null;
  end_year: number | null;
  is_current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
};

const INITIAL: ActionState = { error: null };

export function ExperienceCard({
  row,
  suggestions,
  startEditing = false,
  onCancelNew,
  currentRoleName,
}: {
  row?: ExperienceRow;
  suggestions: string[];
  startEditing?: boolean;
  onCancelNew?: () => void;
  currentRoleName?: string | null;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(startEditing);
  const [isCurrent, setIsCurrent] = useState(row?.is_current ?? false);
  const [state, formAction, pending] = useActionState(saveExperience, INITIAL);

  useEffect(() => {
    if (!state.ok) return;
    toast.success(row ? "Role updated" : "Role added");
    setEditing(false);
    onCancelNew?.();
    router.refresh();
  }, [state, router, row, onCancelNew]);

  // ---------------------------------------------------------------- display
  if (!editing && row) {
    const start = formatMonthYear(row.start_month, row.start_year);
    const end = row.is_current ? "Present" : formatMonthYear(row.end_month, row.end_year);

    return (
      <article className={cn("border border-border/70 p-4 md:p-5 space-y-3 group", isCurrent && "border-primary/30")}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                aria-hidden
                className={row.is_current ? "text-foreground" : "text-muted-foreground/40"}
              >
                ●
              </span>
              <h2 className="font-medium truncate">{row.role}</h2>
              {row.is_current && (
                <Badge className="font-mono">
                  current
                </Badge>
              )}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {row.company}
              {row.location ? ` · ${row.location}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <p className="font-mono text-xs text-muted-foreground whitespace-nowrap">
              {start} — {end}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditing(true)}
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            >
              Edit
            </Button>
          </div>
        </div>

        {row.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{row.description}</p>
        )}

        {row.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {row.technologies.map((t) => (
              <span key={t} className="border border-border/70 px-2 py-0.5 text-xs">
                {t}
              </span>
            ))}
          </div>
        )}

        {row.achievements.length > 0 && (
          <ul className="space-y-1 pt-1">
            {row.achievements.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-foreground/40">•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    );
  }

  // ------------------------------------------------------------------- edit
  const willUnset =
    isCurrent && currentRoleName && currentRoleName !== row?.role ? currentRoleName : null;

  return (
    <form action={formAction} className="border border-foreground/30 p-4 md:p-5 space-y-4">
      {row && <input type="hidden" name="id" value={row.id} />}

      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`role-${row?.id ?? "new"}`} className="text-xs">Role *</Label>
          <Input id={`role-${row?.id ?? "new"}`} name="role" defaultValue={row?.role} required autoFocus />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`company-${row?.id ?? "new"}`} className="text-xs">Company *</Label>
          <Input id={`company-${row?.id ?? "new"}`} name="company" defaultValue={row?.company} required />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`location-${row?.id ?? "new"}`} className="text-xs">Location</Label>
        <Input id={`location-${row?.id ?? "new"}`} name="location" defaultValue={row?.location} />
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-3">
        <MonthYearField
          label="Start *"
          monthName="start_month"
          yearName="start_year"
          month={row?.start_month}
          year={row?.start_year}
        />
        <MonthYearField
          label={isCurrent ? "End (current role)" : "End *"}
          monthName="end_month"
          yearName="end_year"
          month={row?.end_month}
          year={row?.end_year}
          disabled={isCurrent}
        />
      </div>

      <div className="flex items-start gap-3 border border-border/70 p-3">
        <Switch
          id={`current-${row?.id ?? "new"}`}
          name="is_current"
          checked={isCurrent}
          onCheckedChange={setIsCurrent}
        />
        <div className="space-y-0.5">
          <Label htmlFor={`current-${row?.id ?? "new"}`} className="text-xs">
            This is my current role
          </Label>
          <p className="text-xs text-muted-foreground">
            {willUnset
              ? `Saving will remove “current” from ${willUnset}.`
              : "Only one role can be current."}
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-1.5">
        <Label htmlFor={`desc-${row?.id ?? "new"}`} className="text-xs">Description</Label>
        <Textarea
          id={`desc-${row?.id ?? "new"}`}
          name="description"
          rows={3}
          defaultValue={row?.description}
          className="leading-relaxed"
        />
      </div>

      <AchievementsEditor name="achievements" defaultValue={row?.achievements} />
      <TechChips name="technologies" defaultValue={row?.technologies} suggestions={suggestions} />

      {state.error && (
        <p className="border border-destructive/50 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : row ? "Save" : "Add role"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => {
              setEditing(false);
              onCancelNew?.();
            }}
          >
            Cancel
          </Button>
        </div>

        {row && (
          <ConfirmDialog
            title="Delete this role?"
            description={
              <>
                <p>
                  <strong className="text-foreground">
                    {row.role} at {row.company}
                  </strong>{" "}
                  will be permanently removed from your about page.
                </p>
                <p>This cannot be undone.</p>
              </>
            }
            onConfirm={async () => {
              const result = await deleteExperience(row.id);
              if (result.error) toast.error(result.error);
              else {
                toast.success("Role deleted");
                router.refresh();
              }
            }}
            trigger={
              <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                Delete role
              </Button>
            }
          />
        )}
      </div>
    </form>
  );
}
