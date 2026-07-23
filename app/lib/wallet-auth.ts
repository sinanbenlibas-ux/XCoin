import { SignJWT, jwtVerify } from "jose";
import { SiweMessage } from "siwe";
import { getAddress } from "viem";

export const AUTH_ISSUER = "xqnt-coin-portal";
export const AUTH_AUDIENCE = "www.xqntcoin.com";
export const NONCE_TTL_SECONDS = 5 * 60;
export const SESSION_TTL_SECONDS = 24 * 60 * 60;
export const ALLOWED_CHAIN_IDS = [1, 8453, 56] as const;

export type WalletSession = {
  address: `0x${string}`;
  chainId: (typeof ALLOWED_CHAIN_IDS)[number];
  expiresAt: string;
};

export function getAuthSecret(): Uint8Array | null {
  const secret = process.env.XQNT_AUTH_SECRET;
  if (!secret || secret.length < 32) {
    return null;
  }

  return new TextEncoder().encode(secret);
}

export function getExpectedOrigin(requestUrl: URL): string {
  if (
    requestUrl.hostname === "localhost" ||
    requestUrl.hostname === "127.0.0.1"
  ) {
    return requestUrl.origin;
  }

  const configuredOrigin =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.xqntcoin.com";
  return new URL(configuredOrigin).origin;
}

export function isAllowedRequestOrigin(
  request: Request,
  expectedOrigin: string,
): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    return false;
  }

  try {
    return new URL(origin).origin === expectedOrigin;
  } catch {
    return false;
  }
}

export async function createNonceToken(
  nonce: string,
  secret: Uint8Array,
): Promise<string> {
  return new SignJWT({ purpose: "nonce", nonce })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(AUTH_ISSUER)
    .setAudience(AUTH_AUDIENCE)
    .setSubject("wallet-auth-nonce")
    .setIssuedAt()
    .setExpirationTime(`${NONCE_TTL_SECONDS}s`)
    .setJti(nonce)
    .sign(secret);
}

export async function verifyNonceToken(
  token: string,
  expectedNonce: string,
  secret: Uint8Array,
): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: AUTH_ISSUER,
      audience: AUTH_AUDIENCE,
      subject: "wallet-auth-nonce",
    });

    return (
      payload.purpose === "nonce" &&
      payload.nonce === expectedNonce &&
      payload.jti === expectedNonce
    );
  } catch {
    return false;
  }
}

export async function createSessionToken(
  address: `0x${string}`,
  chainId: WalletSession["chainId"],
  secret: Uint8Array,
): Promise<{ token: string; expiresAt: string }> {
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);
  const token = await new SignJWT({
    purpose: "session",
    address,
    chainId,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(AUTH_ISSUER)
    .setAudience(AUTH_AUDIENCE)
    .setSubject(address)
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secret);

  return { token, expiresAt: expiresAt.toISOString() };
}

export async function verifySessionToken(
  token: string,
  secret: Uint8Array,
): Promise<WalletSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: AUTH_ISSUER,
      audience: AUTH_AUDIENCE,
    });

    if (
      payload.purpose !== "session" ||
      typeof payload.address !== "string" ||
      typeof payload.chainId !== "number" ||
      typeof payload.exp !== "number" ||
      !isAllowedChainId(payload.chainId)
    ) {
      return null;
    }

    return {
      address: getAddress(payload.address),
      chainId: payload.chainId,
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function verifySiweMessage({
  message,
  signature,
  expectedNonce,
  expectedOrigin,
}: {
  message: string;
  signature: `0x${string}`;
  expectedNonce: string;
  expectedOrigin: string;
}): Promise<Pick<WalletSession, "address" | "chainId">> {
  if (message.length > 4096 || signature.length > 1024) {
    throw new Error("INVALID_PAYLOAD");
  }

  const expectedDomain = new URL(expectedOrigin).host;
  const siwe = new SiweMessage(message);
  const verification = await siwe.verify({
    signature,
    domain: expectedDomain,
    nonce: expectedNonce,
    time: new Date().toISOString(),
  });

  if (!verification.success) {
    throw new Error("INVALID_SIGNATURE");
  }

  if (
    siwe.domain !== expectedDomain ||
    new URL(siwe.uri).origin !== expectedOrigin ||
    siwe.version !== "1"
  ) {
    throw new Error("INVALID_ORIGIN");
  }

  if (!isAllowedChainId(siwe.chainId)) {
    throw new Error("UNSUPPORTED_CHAIN");
  }

  return {
    address: getAddress(siwe.address),
    chainId: siwe.chainId,
  };
}

export function isAllowedChainId(
  chainId: number,
): chainId is WalletSession["chainId"] {
  return ALLOWED_CHAIN_IDS.some((allowed) => allowed === chainId);
}

export function getCookieNames() {
  const secure = process.env.NODE_ENV === "production";
  return {
    secure,
    nonce: secure ? "__Host-xqnt_nonce" : "xqnt_nonce",
    session: secure ? "__Host-xqnt_session" : "xqnt_session",
  };
}
