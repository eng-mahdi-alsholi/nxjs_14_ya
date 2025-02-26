import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authToken = request.headers.get("authtoken") as string;
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  if (!token) {
    return NextResponse.json(
      {
        message: " No Token provided Access denied , message from middleware ",
      },
      { status: 400 }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users/profile/:path*"],
};
