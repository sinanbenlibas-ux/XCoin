"use client";

import { useAppKit } from "@reown/appkit/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiweMessage } from "siwe";
import {
  useAccount,
  useChainId,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from "wagmi";

type Session =
  | { authenticated: false; error?: string }
  | {
      authenticated: true;
      address: `0x${string}`;
      chainId: number;
      expiresAt: string;
    };

const NETWORKS = {
  1: "Ethereum",
  8453: "Base",
  56: "BNB Smart Chain",
} as const;

const ALLOWED_CHAIN_IDS = Object.keys(NETWORKS).map(Number);

export default function WalletPortal() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { switchChainAsync } = useSwitchChain();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<"signing" | "switching" | "logout" | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const wasConnected = useRef(false);

  const clearSession = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      setSession({ authenticated: false });
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/session", {
      credentials: "include",
      cache: "no-store",
    })
      .then((response) => response.json() as Promise<Session>)
      .then((payload) => {
        if (active) setSession(payload);
      })
      .catch(() => {
        if (active) {
          setSession({ authenticated: false, error: "SESSION_UNAVAILABLE" });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (
      session?.authenticated &&
      isConnected &&
      address &&
      (address.toLowerCase() !== session.address.toLowerCase() ||
        chainId !== session.chainId)
    ) {
      void clearSession();
    }
  }, [address, chainId, clearSession, isConnected, session]);

  useEffect(() => {
    if (wasConnected.current && !isConnected && session?.authenticated) {
      void clearSession();
    }
    wasConnected.current = isConnected;
  }, [clearSession, isConnected, session]);

  const signIn = async () => {
    if (!address || !isConnected) {
      await open({ view: "Connect" });
      return;
    }

    if (!ALLOWED_CHAIN_IDS.includes(chainId)) {
      setError("Switch to Ethereum, Base, or BNB Smart Chain to sign in.");
      return;
    }

    setAction("signing");
    setError(null);

    try {
      const nonceResponse = await fetch("/api/auth/nonce", {
        credentials: "include",
        cache: "no-store",
      });
      const noncePayload = (await nonceResponse.json()) as {
        nonce?: string;
        error?: string;
      };

      if (!nonceResponse.ok || !noncePayload.nonce) {
        throw new Error(noncePayload.error ?? "NONCE_FAILED");
      }

      const expirationTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement:
          "Sign in to the XQNT Coin Portal. This request will not trigger a transaction or cost gas.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: noncePayload.nonce,
        issuedAt: new Date().toISOString(),
        expirationTime,
      }).prepareMessage();

      const signature = await signMessageAsync({ message });
      const verifyResponse = await fetch("/api/auth/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, signature }),
      });
      const verified = (await verifyResponse.json()) as Session & {
        error?: string;
      };

      if (!verifyResponse.ok || !verified.authenticated) {
        throw new Error(verified.error ?? "AUTHENTICATION_FAILED");
      }

      setSession(verified);
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : "";
      setError(readableError(code));
      setSession({ authenticated: false });
    } finally {
      setAction(null);
    }
  };

  const switchToNetwork = async (nextChainId: 1 | 8453 | 56) => {
    setAction("switching");
    setError(null);
    try {
      await switchChainAsync({ chainId: nextChainId });
    } catch {
      setError("The network switch was cancelled or is not supported.");
    } finally {
      setAction(null);
    }
  };

  const logout = async () => {
    setAction("logout");
    setError(null);
    try {
      await clearSession();
      if (isConnected) {
        await disconnectAsync();
      }
    } catch {
      setError("The wallet disconnected, but the interface may need a refresh.");
    } finally {
      setAction(null);
    }
  };

  const sessionMismatch =
    session?.authenticated &&
    isConnected &&
    address &&
    (address.toLowerCase() !== session.address.toLowerCase() ||
      chainId !== session.chainId);

  if (loading) {
    return (
      <div className="portal-card portal-card-loading" aria-live="polite">
        <span className="portal-loading-dot" />
        Checking secure session…
      </div>
    );
  }

  if (session?.authenticated && !sessionMismatch) {
    return (
      <div className="portal-card portal-dashboard">
        <div className="portal-card-heading">
          <span className="portal-status">
            <span className="status-dot" />
            Authenticated
          </span>
          <h2>Member dashboard</h2>
          <p>Your wallet signature has been verified. No funds were moved.</p>
        </div>

        <dl className="portal-session-grid">
          <div>
            <dt>Wallet</dt>
            <dd title={session.address}>{shortAddress(session.address)}</dd>
          </div>
          <div>
            <dt>Network</dt>
            <dd>{networkName(session.chainId)}</dd>
          </div>
          <div>
            <dt>Website</dt>
            <dd className="portal-positive">Live</dd>
          </div>
          <div>
            <dt>Token</dt>
            <dd>Pre-launch</dd>
          </div>
        </dl>

        <div className="portal-project-status">
          <div>
            <span>Official contract</span>
            <strong>Not deployed</strong>
          </div>
          <p>
            Ignore any contract, sale, or market claiming to represent XQNT
            until a verified address appears on this domain.
          </p>
        </div>

        <nav className="portal-resource-links" aria-label="Portal resources">
          <Link href="/security">Security & transparency</Link>
          <Link href="/risk">Risk disclosure</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>

        <button
          className="portal-logout"
          type="button"
          onClick={logout}
          disabled={action === "logout"}
        >
          {action === "logout" ? "Signing out…" : "Sign out & disconnect"}
        </button>
      </div>
    );
  }

  return (
    <div className="portal-card">
      <div className="portal-card-heading">
        <span className="portal-status">
          <span className="status-dot" />
          Secure access
        </span>
        <h2>{isConnected ? "Verify wallet ownership" : "Connect your wallet"}</h2>
        <p>
          {isConnected
            ? "Sign a human-readable message to create a 24-hour portal session."
            : "Choose Trust Wallet, MetaMask, or another WalletConnect-compatible wallet."}
        </p>
      </div>

      {isConnected && address ? (
        <>
          <div className="portal-connected-wallet">
            <div>
              <span>Connected wallet</span>
              <strong title={address}>{shortAddress(address)}</strong>
            </div>
            <button type="button" onClick={() => open({ view: "Account" })}>
              Manage
            </button>
          </div>

          {!ALLOWED_CHAIN_IDS.includes(chainId) && (
            <div className="portal-network-options">
              <p>Select a supported network:</p>
              <div>
                <button
                  type="button"
                  onClick={() => switchToNetwork(1)}
                  disabled={action === "switching"}
                >
                  Ethereum
                </button>
                <button
                  type="button"
                  onClick={() => switchToNetwork(8453)}
                  disabled={action === "switching"}
                >
                  Base
                </button>
                <button
                  type="button"
                  onClick={() => switchToNetwork(56)}
                  disabled={action === "switching"}
                >
                  BNB Chain
                </button>
              </div>
            </div>
          )}

          <button
            className="portal-primary-action"
            type="button"
            onClick={signIn}
            disabled={
              action === "signing" || !ALLOWED_CHAIN_IDS.includes(chainId)
            }
          >
            {action === "signing" ? "Waiting for signature…" : "Sign in securely"}
          </button>
        </>
      ) : (
        <button
          className="portal-primary-action"
          type="button"
          onClick={() => open({ view: "Connect" })}
        >
          Connect wallet
        </button>
      )}

      {error && (
        <p className="portal-error" role="alert">
          {error}
        </p>
      )}

      {sessionMismatch && (
        <p className="portal-error" role="alert">
          Your account or network changed. Sign the new session message to
          continue.
        </p>
      )}

      <div className="portal-security-note">
        <span aria-hidden="true">✓</span>
        <p>
          Signing in is free and does not approve a token transfer. XQNT Coin
          will never request your recovery phrase or private key.
        </p>
      </div>
    </div>
  );
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function networkName(chainId: number) {
  return NETWORKS[chainId as keyof typeof NETWORKS] ?? `Chain ${chainId}`;
}

function readableError(code: string) {
  const errors: Record<string, string> = {
    AUTH_NOT_CONFIGURED:
      "Secure wallet access is temporarily unavailable. Please try again later.",
    INVALID_ORIGIN: "This sign-in request did not originate from the official domain.",
    NONCE_INVALID_OR_EXPIRED:
      "The sign-in request expired. Please sign a new message.",
    NONCE_MISSING: "Start a new sign-in request and try again.",
    UNSUPPORTED_CHAIN: "Use Ethereum, Base, or BNB Smart Chain.",
    INVALID_SIGNATURE:
      "The wallet signature could not be verified. Please try again.",
    UserRejectedRequestError: "The signature request was cancelled.",
  };

  return (
    errors[code] ??
    (code.toLowerCase().includes("reject")
      ? "The signature request was cancelled."
      : "Wallet sign-in could not be completed. Please try again.")
  );
}
