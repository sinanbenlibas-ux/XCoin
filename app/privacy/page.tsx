import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../components/LegalPage";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Privacy Policy — XQNT Coin",
  description:
    "How the XQNT Coin Project handles wallet sessions and website privacy.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal & privacy"
      title="Privacy Policy"
      updated="July 23, 2026"
      intro={
        <p>
          This policy explains how {siteConfig.operator} handles information
          when you visit the website or voluntarily sign in to the member
          portal with a wallet.
        </p>
      }
      sections={[
        {
          title: "Information processed",
          content: (
            <p>
              The public website does not request your name, email, seed phrase,
              private key, KYC documents, or payment information. If you use
              wallet sign-in, the service processes your public wallet address,
              selected chain ID, signed authentication message, session timing,
              and ordinary technical request logs.
            </p>
          ),
        },
        {
          title: "Why wallet information is used",
          content: (
            <p>
              Wallet information is used only to verify that you control the
              address and to create a 24-hour, read-only portal session. It is
              not used to initiate transfers, approvals, trades, or other
              on-chain transactions.
            </p>
          ),
        },
        {
          title: "Service providers",
          content: (
            <p>
              Hosting and security infrastructure may process technical request
              information. Reown/WalletConnect connectivity is initiated only
              after you choose to connect a wallet. Review your wallet
              provider&apos;s own privacy terms before connecting.
            </p>
          ),
        },
        {
          title: "Cookies and local storage",
          content: (
            <p>
              The site stores your privacy preference and may store essential
              wallet connection state. Analytics and marketing trackers are not
              currently active. See the <Link href="/cookies">Cookies Policy</Link>.
            </p>
          ),
        },
        {
          title: "Retention and control",
          content: (
            <p>
              Portal sessions expire after 24 hours and can be ended earlier by
              signing out. The first release has no member database or
              allowlist, so wallet addresses are not stored as user profiles.
            </p>
          ),
        },
        {
          title: "Contact status",
          content: (
            <p>
              An official privacy mailbox is being provisioned. Until it is
              verified on this domain, do not send personal information to
              addresses claiming to represent XQNT Coin.
            </p>
          ),
        },
      ]}
    />
  );
}
