import Link from "next/link";
import { BETTERDATA_CCO_URL, BETTERDATA_TRUST_SOLUTION_URL, SIGNAL_TAGS_CCO_LINE } from "@/lib/betterdata-ecosystem";

export function Hero() {
  return (
    <section className="hero section">
      <div className="content-grid">
        <h1>Physical products. Verifiable everywhere.</h1>
        <p className="section-subtitle max-580">
          Signal Tags is an open schema and verification protocol for product authentication. Attach a tag. Scan it
          anywhere. Verify instantly against a record with deterministic, tamper-evident semantics.
        </p>
        <p className="section-subtitle max-580" style={{ marginTop: "var(--space-3)", fontSize: "var(--text-sm)" }}>
          {SIGNAL_TAGS_CCO_LINE}
        </p>
        <div className="hero-cta">
          <Link href="/docs/getting-started/quick-start" className="btn btn-primary">
            Read the docs
          </Link>
          <a href="https://github.com/tagdsh/tagd" className="btn btn-outline">
            View on GitHub
          </a>
          <a href={BETTERDATA_CCO_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            See Commerce Chain Optimization
          </a>
          <a href={BETTERDATA_TRUST_SOLUTION_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            Trust &amp; traceability on Better Data
          </a>
          <code className="npm-badge">npm install @signal-tags/sdk</code>
        </div>
        <div className="flow-diagram" aria-label="Tag verification flow">
          <span>[Physical Tag]</span>
          <span aria-hidden="true">→</span>
          <span>[Scan]</span>
          <span aria-hidden="true">→</span>
          <span>[Verify API]</span>
          <span aria-hidden="true">→</span>
          <span className="success">[✓ Authentic]</span>
        </div>
      </div>
    </section>
  );
}
