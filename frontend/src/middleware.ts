import { isTokenValid } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

async function getTokenFromCookies(req: NextRequest) {
  return req.cookies.get("token")?.value ?? null;
}

async function isAuthenticated(token: string | null) {
  if (!token) return false;

  try {
    const valid = isTokenValid(token);

    return valid;
  } catch (error) {
    return false;
  }
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)", "/api"],
};

export default async function middleware(req: NextRequest) {
  const token = await getTokenFromCookies(req);

  const auth = await isAuthenticated(token);

  const isPublic =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  if (isPublic) {
    return NextResponse.next();
  }

  if (!auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
