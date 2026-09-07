"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

/**
 * Hard delete behind a confirm. There is no soft-delete column: is_published /
 * is_visible already cover "hide it without losing it", so a deletion here is
 * meant to be a deletion.
 */
export function DeleteButton({
  action,
  label = "Delete",
  confirmText = "Delete this permanently?",
}: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      className="text-destructive hover:text-destructive"
      onClick={() => {
        if (!confirm(confirmText)) return;
        startTransition(() => void action());
      }}
    >
      {pending ? "Deleting…" : label}
    </Button>
  );
}
