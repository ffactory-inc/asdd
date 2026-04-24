import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const features = [
  {
    icon: "📋",
    title: "Specification-First",
    description:
      "Every feature starts as a machine-interpretable spec. Agents cannot execute on ambiguity — specs eliminate it before a single line of code is written.",
  },
  {
    icon: "🤖",
    title: "10-Agent Pipeline",
    description:
      "Specialized agents handle discovery, validation, design, implementation, QA, security, and learning — each with confidence scoring and human override authority.",
  },
  {
    icon: "🛡️",
    title: "Human-First Governance",
    description:
      "Every phase gate requires human sign-off. Agents propose; humans decide. The Dissent Protocol lets any team member formally reject an agent artifact.",
  },
  {
    icon: "📊",
    title: "Cumulative Confidence Score",
    description:
      "The CCS is the product of all agent confidence scores in a pipeline. If it drops below 0.65, the pipeline halts automatically for human review.",
  },
  {
    icon: "🔄",
    title: "Production Learning Loop",
    description:
      "The Knowledge Agent monitors telemetry, identifies patterns, and proposes steering rule updates — closing the loop between production and your specifications.",
  },
  {
    icon: "⚡",
    title: "Parallel Wave Execution",
    description:
      "Implementation tasks run in parallel waves with context-fresh sub-agents, dramatically reducing cycle time while maintaining architectural integrity.",
  },
];

const audiences = [
  {
    role: "Executive",
    label: "CTOs & Engineering Managers",
    subtitle: "Business outcomes, team model, adoption roadmap",
    className: "audience-card--exec",
    links: [
      { label: "Executive Overview", href: "/for-leaders" },
      { label: "Team & Squad Model", href: "/for-leaders/team-model" },
      { label: "Maturity Model (L1–L6)", href: "/for-leaders/maturity-model" },
    ],
  },
  {
    role: "Architect",
    label: "Tech Leads & Architects",
    subtitle: "Lifecycle, governance, agent pipeline, security",
    className: "audience-card--tech",
    links: [
      { label: "ASDD Lifecycle", href: "/playbook/lifecycle" },
      { label: "Confidence & Governance", href: "/technical-reference/governance" },
      { label: "System Architecture", href: "/technical-reference/architecture" },
    ],
  },
  {
    role: "Engineer",
    label: "Engineers & Juniors",
    subtitle: "Your role, how to work with agents, spec writing",
    className: "audience-card--junior",
    links: [
      { label: "Getting Started", href: "/playbook" },
      { label: "Discovery Engine", href: "/playbook/discovery-engine" },
      { label: "Agent Catalog", href: "/agents/overview" },
    ],
  },
];

function Hero() {
  return (
    <header className="hero--asdd">
      <div className="container">
        <h1 className="hero__title">Agentic Specification-Driven Development</h1>
        <p className="hero__subtitle">
          A framework for building software with AI agents — governed by humans,
          executed by agents, continuously improved by production learning loops.
        </p>
        <div className="hero__buttons">
          <Link className="button button--primary button--lg" to="/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/manifesto"
            style={{ background: "transparent", borderColor: "#D2006E", color: "#F472B6" }}
          >
            Read the Manifesto
          </Link>
        </div>
        <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ color: "rgba(226, 232, 240, 0.55)", fontSize: "0.85rem" }}>✦ v5.0 · Agentic Era 2026</span>
          <span style={{ color: "rgba(226, 232, 240, 0.55)", fontSize: "0.85rem" }}>✦ 10 Specialized Agents</span>
          <span style={{ color: "rgba(226, 232, 240, 0.55)", fontSize: "0.85rem" }}>✦ 8-Phase Lifecycle</span>
          <span style={{ color: "rgba(226, 232, 240, 0.55)", fontSize: "0.85rem" }}>✦ Human-First Governance</span>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="section-title">
        <h2>Why ASDD?</h2>
        <p>Traditional agile was designed for human-only teams. ASDD is designed for human-AI squads.</p>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <span className="feature-card__icon">{f.icon}</span>
            <div className="feature-card__title">{f.title}</div>
            <div className="feature-card__description">{f.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="audience-section">
      <div className="section-title">
        <h2>Start where you are</h2>
        <p>ASDD documentation is organized by role. Jump to what's relevant to you.</p>
      </div>
      <div className="audience-grid">
        {audiences.map((a, i) => (
          <div key={i} className={`audience-card ${a.className}`}>
            <div className="audience-card__title">{a.label}</div>
            <div className="audience-card__subtitle">{a.subtitle}</div>
            <ul className="audience-card__links">
              {a.links.map((l, j) => (
                <li key={j}>
                  <Link to={l.href} style={{ color: "inherit", textDecoration: "underline" }}>
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ManifestoTeaser() {
  return (
    <section style={{ padding: "4rem 2rem", textAlign: "center", background: "var(--ifm-background-color)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>The Human–Agent Agile Manifesto</h2>
        <p style={{ color: "var(--ifm-color-content-secondary)", fontSize: "1.1rem", marginBottom: "2rem" }}>
          14 principles for the agentic software era. A deliberate evolution of the 2001 Agile Manifesto —
          written around AI agents, keeping humans in authority.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", textAlign: "left", marginBottom: "2rem" }}>
          {[
            ["Validated intent", "over generated code"],
            ["Human authority", "over agent autonomy"],
            ["Continuous trust loops", "over periodic reviews"],
            ["Adaptive execution", "over rigid planning"],
          ].map(([left, right], i) => (
            <div key={i} style={{ padding: "1rem", border: "1px solid var(--ifm-color-emphasis-200)", borderRadius: "8px" }}>
              <strong style={{ display: "block" }}>{left}</strong>
              <span style={{ color: "var(--ifm-color-content-secondary)", fontSize: "0.85rem" }}>over {right}</span>
            </div>
          ))}
        </div>
        <Link className="button button--primary" to="/manifesto">
          Read all 14 principles →
        </Link>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <FeaturesSection />
        <AudienceSection />
        <ManifestoTeaser />
      </main>
    </Layout>
  );
}
