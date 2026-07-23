import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Risk Disclosure — XQNT Coin",
  description:
    "Important pre-launch technology, wallet, market, and regulatory risks.",
};

export default function RiskPage() {
  return (
    <LegalPage
      kicker="Read before participating"
      title="Risk Disclosure"
      updated="July 23, 2026"
      intro={
        <p>
          XQNT is an early-stage concept. No official token contract, market,
          price, presale, or investment product exists at this time.
        </p>
      }
      sections={[
        {
          title: "Pre-launch uncertainty",
          content: (
            <p>
              The project may change substantially, encounter delays, fail
              security or legal review, or never issue a token. Proposed supply
              and allocations are not final commitments.
            </p>
          ),
        },
        {
          title: "Smart contract and network risk",
          content: (
            <p>
              Future blockchain software may contain vulnerabilities or behave
              unexpectedly. Networks can experience congestion, forks,
              downtime, fee volatility, or changes outside the project&apos;s
              control.
            </p>
          ),
        },
        {
          title: "Market and liquidity risk",
          content: (
            <p>
              If a token is launched later, it may have no market, liquidity, or
              value. Digital assets can be volatile and may result in complete
              financial loss.
            </p>
          ),
        },
        {
          title: "Regulatory and tax risk",
          content: (
            <p>
              Laws and regulatory treatment vary by jurisdiction and can
              change. Users are responsible for determining whether future
              participation is lawful and for obtaining independent legal and
              tax advice.
            </p>
          ),
        },
        {
          title: "Wallet and phishing risk",
          content: (
            <p>
              A wallet signature can be dangerous if the message or domain is
              malicious. Confirm that the domain is www.xqntcoin.com, read every
              message, and reject requests involving transfers, approvals,
              recovery phrases, or private keys.
            </p>
          ),
        },
      ]}
    />
  );
}
