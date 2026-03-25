import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Industries } from "@/components/home/Industries";
import { VerifyDemo } from "@/components/home/VerifyDemo";

export const metadata: Metadata = {
  title: "Signal Tags OSS",
  description:
    "Physical products. Verifiable everywhere. Open schema and verification protocol for authentication.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Signal Tags",
      url: "https://tagd.sh",
      applicationCategory: "DeveloperApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "WebSite",
      name: "tagd.sh",
      url: "https://tagd.sh",
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <section className="section">
        <div className="content-grid">
          <h2>Counterfeits cost $500B annually. Most tags can&apos;t be verified.</h2>
          <div className="two-col">
            <div>
              <h3>The problem</h3>
              <ul>
                <li>Standard QR codes can point anywhere and are easy to clone.</li>
                <li>Barcodes usually provide lookup only, not tamper evidence.</li>
                <li>Proprietary NFC often creates vendor lock-in.</li>
                <li>Paper certificates are easy to lose or forge.</li>
              </ul>
            </div>
            <div>
              <h3>The Signal Tags model</h3>
              <ul>
                <li>Open schema, deterministic verification behavior.</li>
                <li>Any scanner can resolve and check a verification record.</li>
                <li>Self-hosted or hosted endpoint support with no lock-in.</li>
                <li>Plugs into Loop Engine for governed remediation workflows.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Industries />

      <section className="section">
        <div className="content-grid">
          <h2>The Signal Tag schema</h2>
          <p className="section-subtitle">Open, typed, and versioned.</p>
          <pre className="code-block"><code>{`import { SignalTagSchema } from '@signal-tags/schema'

const tag = SignalTagSchema.parse({
  id: 'st_example_001',
  status: 'manufactured',
  productId: 'prod_amoxicillin_500mg',
  organizationId: 'did:web:pfizer.com',
  createdAt: '2024-11-01T08:00:00Z',
  lotId: 'LOT-2024-A1847',
  batchId: 'BATCH-2024-11',
  metadata: {
    gtin: '00312547691215',
    name: 'Amoxicillin 500mg Capsules',
    ndc: '00093-4175-10',
    verifyUrl: 'https://verify.betterdata.co/st/st_example_001',
  },
})`}</code></pre>
          <Link href="/docs/schema/overview" className="text-link">
            Full schema reference →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="content-grid two-col">
          <div className="panel">
            <h3>Self-hosted</h3>
            <p>Run your own verification endpoint. MIT licensed.</p>
            <ul>
              <li>Full schema OSS</li>
              <li>Self-hostable verify API</li>
              <li>No lock-in</li>
            </ul>
            <Link href="/docs/verify/self-host" className="text-link">
              Read self-host guide →
            </Link>
          </div>
          <div className="panel panel-hosted">
            <h3>Better Data Hosted</h3>
            <p>Managed verification at scale with compliance-focused operations.</p>
            <ul>
              <li>High-availability verify API</li>
              <li>Tag management portal</li>
              <li>DSCSA / EU FMD reporting paths</li>
              <li>Optional blockchain anchoring layer</li>
            </ul>
            <a href="https://betterdata.co" className="text-link">Contact Better Data →</a>
          </div>
        </div>
      </section>

      <VerifyDemo />
    </main>
  );
}
