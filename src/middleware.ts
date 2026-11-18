import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Serve the cinematic static landing at `/` while keeping `/agent` + `/api/*` on Next.js. */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/crestora.html", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
