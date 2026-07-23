import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "../site-config";

export type LegalSection = {
  title: string;
  content: ReactNode;
};

export default function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
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
        <span className="section-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p className="policy-updated">Last updated: {updated}</p>
        <div className="policy-intro">{intro}</div>

        {sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.content}
          </section>
        ))}

        <div className="policy-notice">
          These materials describe the current pre-launch project and website.
          They are not legal, tax, or financial advice.
        </div>
      </article>
    </main>
  );
}
