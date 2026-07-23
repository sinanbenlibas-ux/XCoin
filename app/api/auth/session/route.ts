import { NextRequest, NextResponse } from "next/server";
import {
  getAuthSecret,
  getCookieNames,
  verifySessionToken,
} from "../../../lib/wallet-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const secret = getAuthSecret();
  if (!secret) {
    return NextResponse.json(
      { authenticated: false, error: "AUTH_NOT_CONFIGURED" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const cookieNames = getCookieNames();
  const token = request.cookies.get(cookieNames.session)?.value;
  if (!token) {
    return NextResponse.json(
      { authenticated: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const session = await verifySessionToken(token, secret);
  if (!session) {
    const response = NextResponse.json(
      { authenticated: false },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(cookieNames.session, "", {
      httpOnly: true,
      secure: cookieNames.secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.json(
    { authenticated: true, ...session },
    { headers: { "Cache-Control": "no-store" } },
  );
}
