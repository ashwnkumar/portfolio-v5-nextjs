"use client";

import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Inline "add a skill" row at the foot of each category panel. */
export function AddSkillForm({ action }: { action: (form: FormData) => Promise<void> }) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await action(formData);
        ref.current?.reset();
      }}
      className="flex items-center gap-2 border-t border-border/70 bg-muted/20 px-3 py-2"
    >
      <Input name="name" placeholder="Skill name" required className="h-8 flex-1" />
      <Input
        name="icon_id"
        placeholder="icon id (optional)"
        className="h-8 w-40 font-mono"
      />
      <Button type="submit" size="sm" variant="secondary">
        Add
      </Button>
    </form>
  );
}
