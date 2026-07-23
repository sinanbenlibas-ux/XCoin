"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Preferences = {
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "xqnt-cookie-consent";
const COOKIE_NAME = "xqnt_cookie_consent";
const DEFAULT_PREFERENCES: Preferences = {
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Preferences;
          setPreferences({
            analytics: Boolean(parsed.analytics),
            marketing: Boolean(parsed.marketing),
          });
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
          setBannerOpen(true);
        }
      } else {
        setBannerOpen(true);
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!preferencesOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreferencesOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [preferencesOpen]);

  const savePreferences = (nextPreferences: Preferences) => {
    const serialized = JSON.stringify(nextPreferences);
    window.localStorage.setItem(STORAGE_KEY, serialized);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(serialized)}; Max-Age=15552000; Path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    setPreferences(nextPreferences);
    setBannerOpen(false);
    setPreferencesOpen(false);
  };

  if (!ready) {
    return null;
  }

  return (
    <>
      {bannerOpen && (
        <section
          className="cookie-banner"
          aria-labelledby="cookie-banner-title"
        >
          <div className="cookie-banner-copy">
            <span className="cookie-label">Your privacy</span>
            <h2 id="cookie-banner-title">Choose your cookie preferences.</h2>
            <p>
              XQNT Coin currently uses only an essential preference cookie. You
              can also allow optional analytics and marketing categories for
              future features.{" "}
              <Link href="/cookies">Read the Cookies Policy</Link>.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button
              className="cookie-button cookie-button-primary"
              type="button"
              onClick={() =>
                savePreferences({ analytics: true, marketing: true })
              }
            >
              Accept all
            </button>
            <button
              className="cookie-button"
              type="button"
              onClick={() => savePreferences(DEFAULT_PREFERENCES)}
            >
              Essential only
            </button>
            <button
              className="cookie-button cookie-button-text"
              type="button"
              onClick={() => setPreferencesOpen(true)}
            >
              Customize
            </button>
          </div>
        </section>
      )}

      {!bannerOpen && (
        <button
          className="cookie-manage"
          type="button"
          onClick={() => setPreferencesOpen(true)}
        >
          Cookie settings
        </button>
      )}

      {preferencesOpen && (
        <div
          className="cookie-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreferencesOpen(false);
            }
          }}
        >
          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
          >
            <div className="cookie-modal-heading">
              <div>
                <span className="cookie-label">Privacy controls</span>
                <h2 id="cookie-preferences-title">Cookie preferences</h2>
              </div>
              <button
                className="cookie-close"
                type="button"
                aria-label="Close cookie preferences"
                onClick={() => setPreferencesOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="cookie-category">
              <div>
                <strong>Essential</strong>
                <p>
                  Stores your consent choice and supports core site security.
                </p>
              </div>
              <span className="cookie-required">Always active</span>
            </div>

            <label className="cookie-category" htmlFor="analytics-cookies">
              <div>
                <strong>Analytics</strong>
                <p>
                  May help us understand site performance. No analytics service
                  is currently active.
                </p>
              </div>
              <input
                id="analytics-cookies"
                type="checkbox"
                checked={preferences.analytics}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
              />
            </label>

            <label className="cookie-category" htmlFor="marketing-cookies">
              <div>
                <strong>Marketing</strong>
                <p>
                  May support campaign measurement. No marketing service is
                  currently active.
                </p>
              </div>
              <input
                id="marketing-cookies"
                type="checkbox"
                checked={preferences.marketing}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    marketing: event.target.checked,
                  }))
                }
              />
            </label>

            <div className="cookie-modal-actions">
              <Link href="/cookies">View full policy</Link>
              <button
                className="cookie-button cookie-button-primary"
                type="button"
                onClick={() => savePreferences(preferences)}
              >
                Save preferences
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
