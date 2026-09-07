import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session and returns the response carrying any
 * rotated auth cookies, plus the verified JWT claims (null when signed out).
 *
 * The caller must return *this* response object -- creating a fresh one would
 * drop the refreshed cookies and silently sign the user out.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Nothing may run between createServerClient and this call: it is what
  // triggers the token refresh, and interleaving code can desync the cookies.
  //
  // getClaims(), not getSession(): it verifies the JWT signature against the
  // project's published keys. getSession() reads unverified cookie state and
  // must not be trusted for authorization.
  const { data } = await supabase.auth.getClaims();

  return { response, claims: data?.claims ?? null };
}
