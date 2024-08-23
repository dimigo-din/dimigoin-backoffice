import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
function shouldExclude(request: NextRequest) {
  const path = request.nextUrl.pathname;

  return (
    path.startsWith("/api") ||
    path.startsWith("/static") || // exclude static files
    path.includes(".") // exclude all files in the public folder
  );
}
export function middleware(request: NextRequest) {
  if (shouldExclude(request)) return;

  const accessToken = request.cookies.get("jwt");
  if (!accessToken && request.nextUrl.pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
