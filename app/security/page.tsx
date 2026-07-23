import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../components/LegalPage";
import { siteConfig } from "../site-config";

export const metadata: Metadata = {
  title: "Security & Transparency — XQNT Coin",
  description:
    "Verified XQNT Coin status, wallet safety guidance, and security commitments.",
};

export default function SecurityPage() {
  return (
    <LegalPage
      kicker="Verify before you trust"
      title="Security & Transparency"
      updated="July 23, 2026"
      intro={
        <p>
          This page is the current source of truth for the XQNT Coin website and
          pre-launch status. Verify the domain before relying on any claim.
        </p>
      }
      sections={[
        {
          title: "Current verified status",
          content: (
            <ul className="policy-status-list">
              <li>
                <span>Official website</span>
                <strong>{siteConfig.siteUrl}</strong>
              </li>
              <li>
                <span>Website status</span>
                <strong className="policy-positive">Live</strong>
              </li>
              <li>
                <span>Token status</span>
                <strong>Pre-launch</strong>
              </li>
              <li>
                <span>Official contract</span>
                <strong>Not deployed</strong>
              </li>
              <li>
                <span>Token sale</span>
                <strong>None</strong>
              </li>
            </ul>
          ),
        },
        {
          title: "Wallet authentication",
          content: (
            <p>
              Portal access uses an EIP-4361 message bound to the official
              domain, a five-minute nonce, the selected network, and an expiry
              time. The verified session lasts 24 hours. Signing in never
              requires gas or a blockchain transaction.
            </p>
          ),
        },
        {
          title: "Supported networks",
          content: (
            <p>
              Wallet authentication accepts Ethereum, Base, and BNB Smart
              Chain. Network support for signing in does not indicate where a
              future token will be deployed.
            </p>
          ),
        },
        {
          title: "Public source",
          content: (
            <p>
              Website source and changes are visible in the{" "}
              <a
                href={siteConfig.repository}
                target="_blank"
                rel="noreferrer"
              >
                official GitHub repository
              </a>
              . A public repository is not a substitute for an independent
              smart-contract audit.
            </p>
          ),
        },
        {
          title: "Planned launch controls",
          content: (
            <p>
              Independent contract review, published allocation addresses,
              multisig treasury control, vesting details, and verified explorer
              links remain launch requirements. They will not be marked
              complete before evidence is public.
            </p>
          ),
        },
        {
          title: "Protect yourself",
          content: (
            <p>
              Never share a seed phrase or private key. Never approve a transfer
              to sign in. Review the <Link href="/risk">Risk Disclosure</Link>{" "}
              and reject any unofficial presale or contract address.
            </p>
          ),
        },
      ]}
    />
  );
}
