"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, TextField, CheckField } from "@/components/admin/Field";
import type { ActionState } from "@/lib/admin/forms";

export type FieldDef =
  | { kind: "text"; name: string; label: string; hint?: string; required?: boolean }
  | { kind: "textarea"; name: string; label: string; hint?: string; rows?: number }
  | { kind: "check"; name: string; label: string; hint?: string };

const INITIAL: ActionState = { error: null };

/**
 * Schema-driven form for flat collections. Values come from `row` keyed by
 * field name; arrays are pre-joined by the caller.
 */
export function SimpleForm({
  action,
  fields,
  row,
  cancelHref,
  submitLabel,
}: {
  action: (prev: ActionState, form: FormData) => Promise<ActionState>;
  fields: FieldDef[];
  row?: Record<string, unknown>;
  cancelHref: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL);
  const value = (name: string) => {
    const v = row?.[name];
    return v == null ? "" : String(v);
  };

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {row?.id != null && <input type="hidden" name="id" value={String(row.id)} />}

      {fields.map((field) => {
        if (field.kind === "check") {
          return (
            <CheckField
              key={field.name}
              name={field.name}
              label={field.label}
              hint={field.hint}
              defaultChecked={Boolean(row?.[field.name])}
            />
          );
        }
        if (field.kind === "textarea") {
          return (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              hint={field.hint}
              rows={field.rows}
              defaultValue={value(field.name)}
            />
          );
        }
        return (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            hint={field.hint}
            required={field.required}
            defaultValue={value(field.name)}
          />
        );
      })}

      <div className="flex items-center gap-2 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : (submitLabel ?? (row ? "Save changes" : "Create"))}
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link href={cancelHref}>Cancel</Link>
        </Button>
      </div>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
    </form>
  );
}
