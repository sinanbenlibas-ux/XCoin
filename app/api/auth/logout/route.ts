import { NextRequest, NextResponse } from "next/server";
import {
  getCookieNames,
  getExpectedOrigin,
  isAllowedRequestOrigin,
} from "../../../lib/wallet-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const expectedOrigin = getExpectedOrigin(request.nextUrl);
  if (!isAllowedRequestOrigin(request, expectedOrigin)) {
    return NextResponse.json(
      { error: "INVALID_ORIGIN" },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const cookieNames = getCookieNames();
  const response = new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });

  for (const name of [cookieNames.session, cookieNames.nonce]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: cookieNames.secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}
