import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>Project</h4>
          <a href="https://github.com/tagdsh/tagd">GitHub</a>
          <a href="https://www.npmjs.com/org/signal-tags">npm (@signal-tags/*)</a>
          <Link href="/docs/schema/overview">Schema spec</Link>
          <a href="https://github.com/tagdsh/tagd/releases">Changelog</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="https://github.com/tagdsh/tagd/blob/main/CONTRIBUTING.md">Contributing</a>
          <a href="https://github.com/tagdsh/tagd/issues">Issues</a>
          <a href="mailto:oss@betterdata.co">oss@betterdata.co</a>
        </div>
        <div>
          <h4>Better Data</h4>
          <a href="https://www.betterdata.co/trust">Trust Center</a>
          <a href="https://betterdata.co">Created by Better Data</a>
          <a href="https://betterdata.co/docs">Platform docs</a>
          <a href="https://loopengine.io">Loop Engine</a>
          <a href="https://commercegateway.io">Commerce Gateway</a>
          <a href="https://commercechain.io">Commerce Chain</a>
          <a href="mailto:security@betterdata.co">security@betterdata.co</a>
        </div>
      </div>
      <div
        className="footer-bottom"
        style={{ flexDirection: "column", alignItems: "stretch" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <span>MIT Licensed · © Signal Tags Contributors</span>
          <a href="mailto:conduct@tagd.sh">conduct@tagd.sh</a>
        </div>
        <div
          style={{
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            opacity: 0.9,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.15rem",
          }}
        >
          <a href="https://www.betterdata.co/trust/security" target="_blank" rel="noopener noreferrer">
            Security
          </a>
          <span aria-hidden="true"> · </span>
          <a href="https://www.betterdata.co/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <span aria-hidden="true"> · </span>
          <a href="https://www.betterdata.co/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
          <span aria-hidden="true"> · </span>
          <a href="https://www.betterdata.co/cookies" target="_blank" rel="noopener noreferrer">
            Cookie Notice
          </a>
          <span aria-hidden="true"> · </span>
          <a href="https://www.betterdata.co/trust/open-source" target="_blank" rel="noopener noreferrer">
            Open Source disclosures
          </a>
        </div>
      </div>
    </footer>
  );
}
