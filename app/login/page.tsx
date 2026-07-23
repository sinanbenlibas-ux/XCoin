import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WalletPortal from "../components/WalletPortal";
import WalletProviders from "../components/WalletProviders";
import WalletUnavailable from "../components/WalletUnavailable";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Portal — XQNT Coin",
  description:
    "Secure wallet access and verified project information for the XQNT Coin community.",
};

export default function LoginPage() {
  const walletConfigured = Boolean(
    process.env.NEXT_PUBLIC_REOWN_PROJECT_ID?.trim(),
  );

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
          <h1 id="portal-title">One signature. Zero transactions.</h1>
          <p>
            Connect a supported wallet and sign a human-readable message to
            access verified XQNT project information. No gas, payment, or token
            approval is required.
          </p>
        </div>

        {walletConfigured ? (
          <WalletProviders>
            <WalletPortal />
          </WalletProviders>
        ) : (
          <WalletUnavailable />
        )}
      </section>
    </main>
  );
}
