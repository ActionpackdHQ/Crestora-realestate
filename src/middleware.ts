import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Serve the same static pages as the Vercel site. `/api/*` stays on Next.js. */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.rewrite(new URL("/crestora.html", request.url));
  }
  if (path === "/agent") {
    return NextResponse.rewrite(new URL("/agent.html", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/agent"],
};
