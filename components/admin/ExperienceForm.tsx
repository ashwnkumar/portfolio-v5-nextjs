"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, TextField, CheckField } from "@/components/admin/Field";
import type { ActionState } from "@/lib/admin/forms";

type Row = {
  id: string;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
};

const INITIAL: ActionState = { error: null };

export function ExperienceForm({
  action,
  row,
}: {
  action: (prev: ActionState, form: FormData) => Promise<ActionState>;
  row?: Row;
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {row && <input type="hidden" name="id" value={row.id} />}

      <div className="grid md:grid-cols-2 gap-4">
        <Field name="company" label="Company" required defaultValue={row?.company} />
        <Field name="role" label="Role" required defaultValue={row?.role} />
      </div>

      <Field name="location" label="Location" defaultValue={row?.location} />

      <div className="grid md:grid-cols-2 gap-4">
        <Field
          name="start_date"
          label="Start date"
          hint="Free text, shown as-is — e.g. Nov 2024"
          defaultValue={row?.start_date}
        />
        <Field
          name="end_date"
          label="End date"
          hint="Leave blank if this is the current role"
          defaultValue={row?.end_date}
        />
      </div>

      <CheckField
        name="is_current"
        label="Current role"
        hint="Only one role can be current — setting this clears the previous one."
        defaultChecked={row?.is_current}
      />

      <TextField name="description" label="Description" defaultValue={row?.description} />

      <TextField
        name="achievements"
        label="Achievements"
        hint="One per line"
        rows={6}
        defaultValue={row?.achievements.join("\n")}
      />

      <Field
        name="technologies"
        label="Technologies"
        hint="Comma separated"
        defaultValue={row?.technologies.join(", ")}
      />

      <div className="flex items-center gap-2 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : row ? "Save changes" : "Create"}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href="/admin/experience">Cancel</Link>
        </Button>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
