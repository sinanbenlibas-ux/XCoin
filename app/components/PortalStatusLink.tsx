"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type SessionState =
  | { authenticated: false }
  | {
      authenticated: true;
      address: `0x${string}`;
      expiresAt: string;
    };

export default function PortalStatusLink() {
  const [session, setSession] = useState<SessionState>({
    authenticated: false,
  });

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      });
      const payload = (await response.json()) as SessionState;

      setSession(
        response.ok && payload.authenticated
          ? payload
          : { authenticated: false },
      );
    } catch {
      setSession({ authenticated: false });
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void checkSession();
      }
    };
    const handleFocus = () => void checkSession();
    const initialCheck = window.setTimeout(() => void checkSession(), 0);
    const interval = window.setInterval(() => void checkSession(), 60_000);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearTimeout(initialCheck);
      window.clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkSession]);

  if (session.authenticated) {
    return (
      <Link
        className="portal-link portal-sign-in portal-sign-in-active"
        href="/login"
        aria-label={`Signed in as ${session.address}. Open member portal.`}
        title={session.address}
      >
        <span className="portal-auth-dot" aria-hidden="true" />
        <span>Signed in</span>
        <span className="portal-auth-address" aria-hidden="true">
          {shortAddress(session.address)}
        </span>
      </Link>
    );
  }

  return (
    <Link className="portal-link portal-sign-in" href="/login">
      Sign in
    </Link>
  );
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
