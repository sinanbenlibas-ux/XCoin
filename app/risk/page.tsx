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
          price, presale, or investment product exists at this time. Base and
          Uniswap v3 are the planned launch infrastructure, not evidence of a
          completed launch.
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
            <>
              <p>
                The proposed initial pool contains only 1,000 USDC and
                100,000,000 XQNT. This is extremely shallow liquidity. A trade
                of roughly 100 USDC can move the spot price by about 20% before
                fees, slippage settings, arbitrage, and other market activity.
              </p>
              <p>
                The reference opening ratio of 0.00001 USDC per XQNT is not
                guaranteed and is not a valuation or promise. A future token
                may have no lasting market, liquidity, or value and can result
                in complete financial loss.
              </p>
            </>
          ),
        },
        {
          title: "Liquidity control",
          content: (
            <p>
              The proposed Uniswap position NFT will belong to a 2-of-3
              Liquidity Safe. It will not be burned or represented as
              permanently locked. Two Safe signers can reduce or remove the
              liquidity, so participants must treat it as withdrawable.
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
