import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/SignOutButton";
import Link from "next/link";

/**
 * Second gate. proxy.ts already redirects unauthenticated requests, but
 * middleware alone has historically been a weak boundary in Next, so the
 * check is repeated here where the data is actually read. RLS remains the
 * real enforcement -- neither of these can grant access the policies deny.
 *
 * The auth read is uncached, so it lives inside Suspense: under
 * cacheComponents, blocking the whole route on it is a build error.
 */
async function AdminShell({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims) redirect("/admin/login");

  // Authenticated is not the same as authorised: confirm the allowlist.
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=not-authorised");

  const email = claimsData.claims.email as string | undefined;

  return (
    <div className="w-full min-h-screen flex flex-col gap-6">
      <header className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-xl font-medium">
            admin
          </Link>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View site
          </Link>
          <SignOutButton />
        </div>
      </header>
      {children}
    </div>
  );
}

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen animate-pulse space-y-6">
          <div className="h-10 border-b" />
          <div className="h-32 bg-muted/40 rounded-md" />
        </div>
      }
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
