import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Cookies Policy — XQNT Coin",
  description: "How XQNT Coin uses cookies and stores privacy preferences.",
};

export default function CookiesPolicyPage() {
  return (
    <main className="policy-page">
      <header className="portal-header policy-header">
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

      <article className="policy-content">
        <span className="section-kicker">Legal & privacy</span>
        <h1>Cookies Policy</h1>
        <p className="policy-updated">Last updated: July 23, 2026</p>

        <section>
          <h2>How we use cookies</h2>
          <p>
            XQNT Coin currently uses one essential cookie to remember your
            privacy preferences. The website does not currently run analytics,
            advertising, or marketing trackers.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            On your first visit, you may accept all categories, allow essential
            cookies only, or customize your preferences. You can reopen Cookie
            settings at any time from the button displayed on the website.
          </p>
        </section>

        <section>
          <h2>Cookie currently stored</h2>
          <div className="policy-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Type</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>xqnt_cookie_consent</td>
                  <td>Remembers your selected cookie categories.</td>
                  <td>Essential</td>
                  <td>180 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Future services</h2>
          <p>
            If optional analytics or marketing services are introduced, they
            should remain inactive unless the corresponding category has been
            allowed. This policy will be updated to identify each provider and
            cookie before those services are used.
          </p>
        </section>

        <section>
          <h2>Wallet connectivity</h2>
          <p>
            Reown/WalletConnect network requests begin only when you choose to
            connect a wallet in the Portal. This functionality is necessary to
            show wallet choices and establish a requested connection. AppKit
            analytics are disabled.
          </p>
        </section>

        <div className="policy-notice">
          This page describes the site&apos;s current technical behavior and is
          not a substitute for jurisdiction-specific legal advice.
        </div>
      </article>
    </main>
  );
}
