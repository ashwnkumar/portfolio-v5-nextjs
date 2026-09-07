"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, type LoginState } from "./actions";

const INITIAL: LoginState = { error: null };

export function LoginForm({
  next = "/admin",
  notAuthorised = false,
}: {
  next?: string;
  notAuthorised?: boolean;
}) {
  const [state, formAction, pending] = useActionState(signIn, INITIAL);

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 py-24">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Enter your password to continue.
        </p>
      </div>

      {notAuthorised && (
        <p className="text-sm border border-destructive/40 rounded-md p-3">
          That account is signed in but is not on the admin allowlist.
        </p>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {/* Hidden username field: the email is server-side only, but password
            managers need something to associate the credential with. */}
        <input
          type="text"
          name="username"
          autoComplete="username"
          value="admin"
          readOnly
          hidden
        />

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
    </div>
  );
}
