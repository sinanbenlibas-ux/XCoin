import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "./site-config";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
] as const;

const pillars = [
  {
    number: "01",
    title: "Community first",
    description:
      "XQNT Coin starts with participation. The community shapes the culture, conversation, and direction from day one.",
  },
  {
    number: "02",
    title: "Clear by design",
    description:
      "Proposed allocations, milestones, and launch decisions will be communicated before the token goes live.",
  },
  {
    number: "03",
    title: "Built to evolve",
    description:
      "A focused foundation today, with room for useful community-led experiences as the ecosystem grows.",
  },
] as const;

const tokenomics = [
  {
    label: "Community rewards",
    value: 40,
    color: "#21d4fd",
    description: "Participation, campaigns, and ecosystem incentives.",
  },
  {
    label: "Liquidity & ecosystem",
    value: 20,
    color: "#58a6ff",
    description: "Healthy market access and ecosystem growth.",
  },
  {
    label: "Development & treasury",
    value: 20,
    color: "#7c5cff",
    description: "Product development and long-term operations.",
  },
  {
    label: "Team",
    value: 15,
    color: "#a369ff",
    description: "Planned long-term allocation with vesting.",
  },
  {
    label: "Reserve",
    value: 5,
    color: "#d7b8ff",
    description: "A limited reserve for future needs.",
  },
] as const;

const roadmap = [
  {
    phase: "Phase 01",
    title: "Foundation",
    status: "Now",
    items: ["Brand and community launch", "Token model proposal", "Public project principles"],
  },
  {
    phase: "Phase 02",
    title: "Proof",
    status: "Next",
    items: ["Testnet token prototype", "Security review", "Community feedback cycle"],
  },
  {
    phase: "Phase 03",
    title: "Launch",
    status: "Planned",
    items: ["Verified mainnet deployment", "Transparent allocations", "Initial DEX liquidity"],
  },
  {
    phase: "Phase 04",
    title: "Utility",
    status: "Future",
    items: ["Community-led activations", "Partner experiments", "Ecosystem expansion"],
  },
] as const;

const safeguards = [
  "Independent contract review before mainnet",
  "Multisig control for critical project assets",
  "Publicly verifiable token allocation",
  "No hidden minting or launch-day surprises",
] as const;

const faqs = [
  {
    question: "Is the XQNT token live?",
    answer:
      "No. The official website is live, but the token remains in its planning phase. There is no official contract address or live market.",
  },
  {
    question: "Can I buy XQNT Coin now?",
    answer:
      "No. XQNT Coin is not available for sale. Ignore any token, presale, or contract claiming to be official until it is announced on this website.",
  },
  {
    question: "What will XQNT Coin be used for?",
    answer:
      "The initial focus is community participation. Specific utility will be tested and published before launch instead of being promised prematurely.",
  },
  {
    question: "Are the tokenomics final?",
    answer:
      "No. The displayed allocation is a transparent starting proposal and may change after technical, legal, and community review.",
  },
] as const;

function ArrowUpRight() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${siteConfig.brand.name} home`}>
          <Image
            className="brand-mark"
            src={siteConfig.brand.logo}
            width={44}
            height={44}
            alt=""
            priority
          />
          <span>{siteConfig.brand.shortName}</span>
        </a>

        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="portal-link portal-sign-in" href="/login">
            Sign in
          </Link>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

        <div className="hero-copy">
          <div className="eyebrow">
            <span>{siteConfig.brand.expansion}</span>
            <span className="eyebrow-line" />
            <span>Built in the open</span>
          </div>
          <h1>
            The next chapter
            <br />
            starts with <span>you.</span>
          </h1>
          <p className="hero-description">
            XQNT Coin is a community-first digital token experiment inspired by
            open networks, participation, and utility that earns its place.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#about">
              Explore XQNT <ArrowUpRight />
            </a>
            <a className="button button-ghost" href="#roadmap">
              View roadmap
            </a>
          </div>
          <p className="hero-note">
            Website live. Token pre-launch. No presale or contract address.
          </p>
        </div>

        <div className="hero-visual" aria-label={`${siteConfig.brand.name} brand symbol`}>
          <div className="visual-halo" aria-hidden="true" />
          <div className="visual-ring visual-ring-one" aria-hidden="true" />
          <div className="visual-ring visual-ring-two" aria-hidden="true" />
          <Image
            className="hero-logo"
            src={siteConfig.brand.logo}
            width={620}
            height={620}
            alt="XQNT X monogram inside a circular Q mark"
            priority
          />
          <div className="orbit-label orbit-label-top">
            <span>Network</span>
            <strong>Community</strong>
          </div>
          <div className="orbit-label orbit-label-bottom">
            <span>Status</span>
            <strong>{siteConfig.tokenStatus}</strong>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading split-heading">
          <div>
            <span className="section-kicker">Why XQNT</span>
            <h2>
              A better way to begin
              <br />a digital community.
            </h2>
          </div>
          <p>
            Great projects do not start with hype. They start with clear
            principles, honest expectations, and people who want to build
            something meaningful together.
          </p>
        </div>

        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.number}>
              <div className="pillar-top">
                <span className="pillar-number">{pillar.number}</span>
                <span className="pillar-icon" aria-hidden="true">
                  <span />
                </span>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section tokenomics-section" id="tokenomics">
        <div className="section-heading centered-heading">
          <span className="section-kicker">Proposed tokenomics</span>
          <h2>One billion XQNT. Every token accounted for.</h2>
          <p>
            A transparent starting proposal designed for community participation
            and long-term development—not a final allocation.
          </p>
        </div>

        <div className="tokenomics-layout">
          <div className="allocation-visual">
            <div className="token-orbit" aria-hidden="true">
              <div className="token-core">
                <Image
                  src={siteConfig.brand.logo}
                  width={132}
                  height={132}
                  alt=""
                />
              </div>
            </div>
            <div className="supply-stat">
              <span>Proposed total supply</span>
              <strong>{siteConfig.supply.display}</strong>
              <em>{siteConfig.brand.shortName}</em>
            </div>
          </div>

          <div className="allocation-list">
            {tokenomics.map((item) => (
              <article className="allocation-item" key={item.label}>
                <div className="allocation-copy">
                  <span
                    className="allocation-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
                <strong>{item.value}%</strong>
              </article>
            ))}
            <p className="proposal-note">
              This model is proposed and subject to technical, legal, and
              community review before launch.
            </p>
          </div>
        </div>
      </section>

      <section className="section roadmap-section" id="roadmap">
        <div className="section-heading split-heading">
          <div>
            <span className="section-kicker">The roadmap</span>
            <h2>Measured steps. Public progress.</h2>
          </div>
          <p>
            We will move deliberately, share what we learn, and only advance
            when the foundation for the next phase is ready.
          </p>
        </div>

        <div className="roadmap-grid">
          {roadmap.map((step, index) => (
            <article
              className={`roadmap-card ${index === 0 ? "roadmap-card-active" : ""}`}
              key={step.phase}
            >
              <div className="roadmap-meta">
                <span>{step.phase}</span>
                <em>{step.status}</em>
              </div>
              <h3>{step.title}</h3>
              <ul>
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section security-section" id="security">
        <div className="security-panel">
          <div className="security-copy">
            <span className="section-kicker">Security by intention</span>
            <h2>Trust should be verifiable.</h2>
            <p>
              Security is a launch requirement, not a feature added later. These
              safeguards are planned milestones and will be verified before any
              official token launch.
            </p>
          </div>
          <ul className="security-list">
            {safeguards.map((item) => (
              <li key={item}>
                <span className="check-mark" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading faq-heading">
          <span className="section-kicker">Questions, answered</span>
          <h2>Know before we launch.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="community-section" id="community">
        <div className="community-grid" aria-hidden="true" />
        <div className="community-glow" aria-hidden="true" />
        <Image
          className="community-logo"
          src={siteConfig.brand.logo}
          width={180}
          height={180}
          alt=""
        />
        <span className="section-kicker">The community is opening soon</span>
        <h2>Be early to what comes next.</h2>
        <p>
          Official launch announcements and verified project links will appear
          on {siteConfig.brand.domain} first.
        </p>
      </section>

      <footer>
        <a className="brand" href="#top" aria-label="Back to the top">
          <Image
            className="brand-mark"
            src={siteConfig.brand.logo}
            width={44}
            height={44}
            alt=""
          />
          <span>{siteConfig.brand.shortName}</span>
        </a>
        <p>
          XQNT Coin is an early-stage community project. Nothing on this website is
          financial advice or an offer to buy or sell any asset.
        </p>
        <div className="footer-meta">
          <span>© 2026 {siteConfig.brand.name}</span>
          <Link href="/cookies">Cookies</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/risk">Risk</Link>
          <Link href="/security">Security</Link>
          <Link href="/login">Sign in</Link>
        </div>
      </footer>
    </main>
  );
}
