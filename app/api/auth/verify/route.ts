import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getAuthSecret,
  getCookieNames,
  getExpectedOrigin,
  isAllowedRequestOrigin,
  SESSION_TTL_SECONDS,
  verifyNonceToken,
  verifySiweMessage,
} from "../../../lib/wallet-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = getAuthSecret();
  if (!secret) {
    return jsonError("AUTH_NOT_CONFIGURED", 503);
  }

  const expectedOrigin = getExpectedOrigin(request.nextUrl);
  if (!isAllowedRequestOrigin(request, expectedOrigin)) {
    return jsonError("INVALID_ORIGIN", 403);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonError("INVALID_PAYLOAD", 400);
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("message" in payload) ||
    !("signature" in payload) ||
    typeof payload.message !== "string" ||
    typeof payload.signature !== "string" ||
    !payload.signature.startsWith("0x")
  ) {
    return jsonError("INVALID_PAYLOAD", 400);
  }

  const cookieNames = getCookieNames();
  const nonceCookie = request.cookies.get(cookieNames.nonce)?.value;
  if (!nonceCookie) {
    return jsonError("NONCE_MISSING", 400);
  }

  let parsedNonce: string;
  try {
    parsedNonce = payload.message.match(/\nNonce: ([A-Za-z0-9]+)\n/)?.[1] ?? "";
  } catch {
    return jsonError("INVALID_PAYLOAD", 400);
  }

  if (
    !parsedNonce ||
    !(await verifyNonceToken(nonceCookie, parsedNonce, secret))
  ) {
    return jsonError("NONCE_INVALID_OR_EXPIRED", 401);
  }

  try {
    const wallet = await verifySiweMessage({
      message: payload.message,
      signature: payload.signature as `0x${string}`,
      expectedNonce: parsedNonce,
      expectedOrigin,
    });
    const session = await createSessionToken(
      wallet.address,
      wallet.chainId,
      secret,
    );
    const response = NextResponse.json(
      {
        authenticated: true,
        address: wallet.address,
        chainId: wallet.chainId,
        expiresAt: session.expiresAt,
      },
      { headers: { "Cache-Control": "no-store" } },
    );

    response.cookies.set(cookieNames.session, session.token, {
      httpOnly: true,
      secure: cookieNames.secure,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
    response.cookies.set(cookieNames.nonce, "", {
      httpOnly: true,
      secure: cookieNames.secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    const code =
      error instanceof Error ? error.message : "AUTHENTICATION_FAILED";
    const status = code === "UNSUPPORTED_CHAIN" ? 400 : 401;
    return jsonError(code, status);
  }
}

function jsonError(error: string, status: number) {
  return NextResponse.json(
    { authenticated: false, error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
