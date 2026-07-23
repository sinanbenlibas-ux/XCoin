import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  createNonceToken,
  getAuthSecret,
  getCookieNames,
  NONCE_TTL_SECONDS,
} from "../../../lib/wallet-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const secret = getAuthSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "AUTH_NOT_CONFIGURED" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const nonce = randomBytes(16).toString("hex");
  const nonceToken = await createNonceToken(nonce, secret);
  const cookieNames = getCookieNames();
  const response = NextResponse.json(
    { nonce },
    { headers: { "Cache-Control": "no-store" } },
  );

  response.cookies.set(cookieNames.nonce, nonceToken, {
    httpOnly: true,
    secure: cookieNames.secure,
    sameSite: "lax",
    path: "/",
    maxAge: NONCE_TTL_SECONDS,
  });

  return response;
}
