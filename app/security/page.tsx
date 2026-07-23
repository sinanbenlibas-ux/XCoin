import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../components/LegalPage";
import { siteConfig } from "../site-config";
import { launchConfig, tokenIsLive } from "../launch-config";

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
                <strong>{tokenIsLive ? "Live on Base" : "Pre-launch"}</strong>
              </li>
              <li>
                <span>Official contract</span>
                <strong>
                  {tokenIsLive && launchConfig.contract.address
                    ? launchConfig.contract.address
                    : "Not deployed"}
                </strong>
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
          title: "Authentication and launch networks",
          content: (
            <p>
              Wallet authentication accepts Ethereum, Base, and BNB Smart
              Chain. XQNT itself is planned only for Base mainnet (chain ID
              8453); sign-in network support is not a token deployment claim.
            </p>
          ),
        },
        {
          title: "Planned immutable token",
          content: (
            <p>
              The published source fixes supply at 1,000,000,000 XQNT and has
              no external mint, owner, pause, blacklist, transfer tax, permit,
              proxy, or upgrade function. This description remains
              &ldquo;planned&rdquo; until deployed bytecode and constructor
              arguments are independently matched to the reviewed source.
            </p>
          ),
        },
        {
          title: "Treasury, vesting, and liquidity",
          content: (
            <p>
              Five project accounts are planned as 2-of-3 Safes. The team
              allocation is planned to remain locked for 365 days and then vest
              linearly for 1,095 days. The Uniswap v3 LP NFT will be held by the
              Liquidity Safe and will remain withdrawable; it is not burned or
              permanently locked.
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
              links remain launch requirements. Mainnet is also blocked until
              the Indonesian legal entity and written legal opinion are
              recorded. Nothing is marked complete before evidence is public.
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
