import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Portal — XQNT Coin",
  description:
    "A secure portal preview for the future XQNT Coin community experience.",
};

export default function LoginPage() {
  return (
    <main className="portal-page">
      <div className="portal-grid" aria-hidden="true" />
      <header className="portal-header">
        <Link className="brand" href="/" aria-label="Return to XQNT Coin home">
          <Image
            className="brand-mark"
            src={siteConfig.brand.logo}
            width={44}
            height={44}
            alt=""
            priority
          />
          <span>{siteConfig.brand.shortName}</span>
        </Link>
        <Link className="portal-back" href="/">
          Back to website
        </Link>
      </header>

      <section className="portal-shell" aria-labelledby="portal-title">
        <div className="portal-intro">
          <span className="section-kicker">Secure member access</span>
          <h1 id="portal-title">The XQNT Portal is being prepared.</h1>
          <p>
            Future account access will use modern authentication without asking
            for seed phrases, private keys, or payments.
          </p>
        </div>

        <div className="portal-card">
          <div className="portal-card-heading">
            <span className="portal-status">
              <span className="status-dot" />
              Preview mode
            </span>
            <h2>Sign in to your account</h2>
            <p>No accounts or credentials are being collected yet.</p>
          </div>

          <div className="portal-options">
            <button type="button" disabled>
              <span className="portal-option-icon" aria-hidden="true">
                P
              </span>
              <span>
                Continue with passkey
                <small>Planned secure access</small>
              </span>
            </button>
            <button type="button" disabled>
              <span className="portal-option-icon" aria-hidden="true">
                W
              </span>
              <span>
                Connect a wallet
                <small>Signature only — planned</small>
              </span>
            </button>
          </div>

          <div className="portal-security-note">
            <span aria-hidden="true">✓</span>
            <p>
              XQNT Coin will never request your recovery phrase or private key.
              Official access will only be announced on{" "}
              <strong>{siteConfig.brand.domain}</strong>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
