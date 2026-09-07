import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

async function LoginWithParams({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  return (
    <LoginForm
      next={next ?? "/admin"}
      notAuthorised={error === "not-authorised"}
    />
  );
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  // Reading searchParams is dynamic, so it needs a boundary. The fallback is a
  // fully working form with defaults, so the static shell is usable
  // immediately rather than blank.
  return (
    <Suspense fallback={<LoginForm />}>
      <LoginWithParams searchParams={searchParams} />
    </Suspense>
  );
}
