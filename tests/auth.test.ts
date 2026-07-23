import assert from "node:assert/strict";
import test from "node:test";
import { SignJWT } from "jose";
import { SiweMessage } from "siwe";
import { privateKeyToAccount } from "viem/accounts";
import {
  AUTH_AUDIENCE,
  AUTH_ISSUER,
  createNonceToken,
  createSessionToken,
  verifyNonceToken,
  verifySessionToken,
  verifySiweMessage,
} from "../app/lib/wallet-auth";

const secret = new TextEncoder().encode(
  "test-only-secret-with-at-least-thirty-two-characters",
);
const account = privateKeyToAccount(
  "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
);

test("verifies a valid SIWE message on an allowed network", async () => {
  const nonce = "1234567890abcdef";
  const message = new SiweMessage({
    domain: "www.xqntcoin.com",
    address: account.address,
    statement:
      "Sign in to the XQNT Coin Portal. This request will not trigger a transaction or cost gas.",
    uri: "https://www.xqntcoin.com",
    version: "1",
    chainId: 8453,
    nonce,
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 300_000).toISOString(),
  }).prepareMessage();
  const signature = await account.signMessage({ message });

  const result = await verifySiweMessage({
    message,
    signature,
    expectedNonce: nonce,
    expectedOrigin: "https://www.xqntcoin.com",
  });

  assert.equal(result.address, account.address);
  assert.equal(result.chainId, 8453);
});

test("rejects SIWE messages for another domain", async () => {
  const nonce = "abcdef1234567890";
  const message = new SiweMessage({
    domain: "evil.example",
    address: account.address,
    uri: "https://evil.example",
    version: "1",
    chainId: 1,
    nonce,
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 300_000).toISOString(),
  }).prepareMessage();
  const signature = await account.signMessage({ message });

  await assert.rejects(
    verifySiweMessage({
      message,
      signature,
      expectedNonce: nonce,
      expectedOrigin: "https://www.xqntcoin.com",
    }),
  );
});

test("rejects a signature from a different wallet", async () => {
  const nonce = "0011223344556677";
  const message = new SiweMessage({
    domain: "www.xqntcoin.com",
    address: account.address,
    uri: "https://www.xqntcoin.com",
    version: "1",
    chainId: 1,
    nonce,
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 300_000).toISOString(),
  }).prepareMessage();
  const otherAccount = privateKeyToAccount(
    "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  );
  const signature = await otherAccount.signMessage({ message });

  await assert.rejects(
    verifySiweMessage({
      message,
      signature,
      expectedNonce: nonce,
      expectedOrigin: "https://www.xqntcoin.com",
    }),
  );
});

test("rejects an unsupported chain", async () => {
  const nonce = "fedcba0987654321";
  const message = new SiweMessage({
    domain: "www.xqntcoin.com",
    address: account.address,
    uri: "https://www.xqntcoin.com",
    version: "1",
    chainId: 137,
    nonce,
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 300_000).toISOString(),
  }).prepareMessage();
  const signature = await account.signMessage({ message });

  await assert.rejects(
    verifySiweMessage({
      message,
      signature,
      expectedNonce: nonce,
      expectedOrigin: "https://www.xqntcoin.com",
    }),
    /UNSUPPORTED_CHAIN/,
  );
});

test("nonce token is bound to the expected nonce", async () => {
  const token = await createNonceToken("nonce-one", secret);
  assert.equal(await verifyNonceToken(token, "nonce-one", secret), true);
  assert.equal(await verifyNonceToken(token, "nonce-two", secret), false);
});

test("expired nonce token is rejected", async () => {
  const nonce = "expired-nonce";
  const token = await new SignJWT({ purpose: "nonce", nonce })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(AUTH_ISSUER)
    .setAudience(AUTH_AUDIENCE)
    .setSubject("wallet-auth-nonce")
    .setIssuedAt(Math.floor(Date.now() / 1000) - 120)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
    .setJti(nonce)
    .sign(secret);

  assert.equal(await verifyNonceToken(token, nonce, secret), false);
});

test("session token preserves address, chain, and expiry", async () => {
  const { token } = await createSessionToken(account.address, 56, secret);
  const session = await verifySessionToken(token, secret);
  assert.equal(session?.address, account.address);
  assert.equal(session?.chainId, 56);
  assert.ok(session && Date.parse(session.expiresAt) > Date.now());
});

test("expired session token is rejected", async () => {
  const token = await new SignJWT({
    purpose: "session",
    address: account.address,
    chainId: 1,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(AUTH_ISSUER)
    .setAudience(AUTH_AUDIENCE)
    .setSubject(account.address)
    .setIssuedAt(Math.floor(Date.now() / 1000) - 120)
    .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
    .sign(secret);

  assert.equal(await verifySessionToken(token, secret), null);
});
