import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.has("session-seed")) {
    const seed = Math.floor(Math.random() * 1_000_000).toString();
    response.cookies.set("session-seed", seed, {
      httpOnly: true,
      sameSite: "lax",
      // No maxAge = session cookie — dies when browser closes
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/about", "/studio", "/contact"],
};
