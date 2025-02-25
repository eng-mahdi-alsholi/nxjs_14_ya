import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authToken = (await request.headers.get("authtoken")) as string;
  if (!authToken) {
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
