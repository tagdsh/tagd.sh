import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ecosystemPartners,
  featuredPartner,
  standardsPartners,
} from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partners — Signal Tags",
  description:
    "Signal Tags verification partners, the Better Data hosted API, and the Signal Tags partner program.",
  robots: { index: false, follow: false },
};

const ecosystemAccent: Record<string, string> = {
  "loop-engine": "#2563EB",
  "commerce-chain": "#4338CA",
};

export default function PartnersPage() {
  return (
    <main className="section">
      <section className="content-grid">
        <h1>Partners</h1>
        <p className="max-580">
          Verification infrastructure partners, OSS ecosystem integrations, and
          standards compatibility.
        </p>
      </section>

      <section className="section">
        <div className="content-grid">
          <h2>Verification Infrastructure</h2>
          <article
            className="card"
            style={{ borderLeft: "4px solid #D97706", background: "var(--color-surface-alt)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--space-4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                {featuredPartner.logoPath ? (
                  <Image
                    src={featuredPartner.logoPath}
                    alt="Better Data logo"
                    width={40}
                    height={40}
                  />
                ) : null}
                <h3>{featuredPartner.name}</h3>
              </div>
            </div>
            <p style={{ marginTop: "var(--space-3)" }}>
              Better Data hosts the managed Signal Tags verification API. No
              infrastructure required — high-availability, SLA-backed,
              blockchain-anchored on Ethereum/Polygon.
            </p>
            <div
              style={{
                marginTop: "var(--space-3)",
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-4)",
              }}
            >
              <Link href="/docs/verify/better-data-api" className="text-link">
                Verification API docs →
              </Link>
              <a
                href="https://betterdata.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                betterdata.co ↗
              </a>
              <a href="mailto:hello@betterdata.co" className="text-link">
                Get API access →
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="content-grid">
          <h2>OSS Ecosystem</h2>
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {ecosystemPartners.map((partner) => (
              <article
                key={partner.slug}
                className="card"
                style={{
                  borderLeft: `4px solid ${ecosystemAccent[partner.slug] ?? "var(--color-primary)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                  {partner.logoPath ? (
                    <Image src={partner.logoPath} alt={`${partner.name} logo`} width={36} height={36} />
                  ) : null}
                  <h3>{partner.name}</h3>
                </div>
                <p style={{ marginTop: "var(--space-3)" }}>{partner.description}</p>
                <div style={{ marginTop: "var(--space-3)", display: "flex", gap: "var(--space-4)" }}>
                  {partner.docsPath ? (
                    <Link href={partner.docsPath} className="text-link">
                      Integration docs →
                    </Link>
                  ) : null}
                  {partner.externalUrl ? (
                    <a href={partner.externalUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                      {partner.externalUrl.replace("https://", "")} ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="content-grid">
          <h2>Standards Compatibility</h2>
          <p className="section-subtitle">
            Signal Tags is designed for standards compliance — not a proprietary
            format.
          </p>
          <div className="cards-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {standardsPartners.map((partner) => (
              <article key={partner.slug} className="card">
                <h3>{partner.name}</h3>
                <p style={{ marginTop: "var(--space-3)" }}>{partner.description}</p>
                {partner.externalUrl ? (
                  <a
                    href={partner.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                    style={{ marginTop: "var(--space-3)", display: "inline-block" }}
                  >
                    {partner.externalUrl.replace("https://", "")} ↗
                  </a>
                ) : null}
              </article>
            ))}
          </div>
          <p className="max-580">
            Standards compatibility is maintained by the Signal Tags
            contributors. GS1 and EPCIS are not commercial partners.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="content-grid">
          <h2>Industry Integrations</h2>
          <p className="max-580">
            Signal Tags is designed for regulated industries. Certified
            integrations for DSCSA, EU FMD, and FDA UDI compliance are in
            development.
          </p>
          <a href="mailto:oss@betterdata.co" className="text-link">
            Building an integration? Contact us →
          </a>
        </div>
      </section>

      <section className="section" style={{ borderBottom: "none" }}>
        <div className="content-grid">
          <h2>Partner Program</h2>
          <p className="max-580">
            The Signal Tags partner program is for verification infrastructure
            providers, compliance platform vendors, and enterprises deploying
            Signal Tags at scale.
          </p>
          <a href="mailto:partners@betterdata.co" className="text-link">
            Become a partner →
          </a>
        </div>
      </section>
    </main>
  );
}
