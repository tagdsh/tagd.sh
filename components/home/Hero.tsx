import Link from "next/link";

export function Hero() {
  return (
    <section className="hero section">
      <div className="content-grid">
        <h1>Physical products. Verifiable everywhere.</h1>
        <p className="section-subtitle max-580">
          Signal Tags is an open schema and verification protocol for product authentication. Attach a tag. Scan it
          anywhere. Verify instantly against a record with deterministic, tamper-evident semantics.
        </p>
        <div className="hero-cta">
          <Link href="/docs/getting-started/quick-start" className="btn btn-primary">
            Read the docs
          </Link>
          <a href="https://github.com/tagdsh/tagd" className="btn btn-outline">
            View on GitHub
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
