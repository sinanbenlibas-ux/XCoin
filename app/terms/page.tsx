import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Terms of Use — XQNT Coin",
  description: "Terms governing use of the XQNT Coin pre-launch website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Website terms"
      title="Terms of Use"
      updated="July 23, 2026"
      intro={
        <p>
          These terms govern access to the website operated under the temporary
          project name {siteConfig.operator}. The website is an informational,
          pre-launch community surface.
        </p>
      }
      sections={[
        {
          title: "No token sale or financial service",
          content: (
            <p>
              XQNT is not currently available for sale through this website.
              Nothing here is an offer, solicitation, exchange service,
              investment recommendation, promise of return, or invitation to
              transfer funds.
            </p>
          ),
        },
        {
          title: "Portal access",
          content: (
            <p>
              Wallet sign-in proves control of a public address for a temporary,
              read-only session. It does not create custody, ownership rights,
              token entitlement, an account balance, or a right to participate
              in any future distribution.
            </p>
          ),
        },
        {
          title: "Acceptable use",
          content: (
            <p>
              You must not attempt to disrupt the service, bypass security,
              impersonate the project, distribute malicious links, scrape
              sensitive infrastructure, or use the website in violation of
              applicable law.
            </p>
          ),
        },
        {
          title: "Project changes",
          content: (
            <p>
              Proposed tokenomics, roadmap items, network choices, utility, and
              launch timing may change or be cancelled after technical, legal,
              security, or community review.
            </p>
          ),
        },
        {
          title: "Availability and liability",
          content: (
            <p>
              The pre-launch website is provided on an as-available basis.
              Wallets, networks, hosting providers, and third-party services may
              be interrupted. To the extent permitted by applicable law, the
              project disclaims liability for losses arising from reliance on
              unofficial links or speculative expectations.
            </p>
          ),
        },
      ]}
    />
  );
}
