import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

const LOGIN_PATH = "/admin/login";

export async function proxy(request: NextRequest) {
  // Must come first, and its response must be the one we return -- it carries
  // any refreshed auth cookies.
  const { response, claims } = await updateSession(request);

  // Per-session seed for the studio shuffle. Set on the same response so it
  // survives alongside the auth cookies.
  if (!request.cookies.has("session-seed")) {
    const seed = Math.floor(Math.random() * 1_000_000).toString();
    response.cookies.set("session-seed", seed, {
      httpOnly: true,
      sameSite: "lax",
      // No maxAge = session cookie — dies when browser closes
    });
  }

  // Gate /admin. This is a convenience redirect, not the security boundary:
  // the admin layout re-checks, and RLS is what actually protects the data.
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== LOGIN_PATH && !claims) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in and hitting the login page — send them through.
  if (pathname === LOGIN_PATH && claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/", "/about", "/studio", "/contact", "/admin/:path*"],
};
