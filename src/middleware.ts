import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.headers.get("authtoken") as string;
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  console.log(request.nextUrl.pathname);
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/api/users/profile/")) {
      return NextResponse.json(
        {
          message:
            " No Token provided Access denied , message from middleware ",
        },
        { status: 400 }
      );
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"],
};
