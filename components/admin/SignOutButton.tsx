"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/admin/login/actions";

export function SignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      className="bg-background! hover:bg-destructive/10!"
      disabled={pending}
      onClick={() => startTransition(() => void signOut())}
    >
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
