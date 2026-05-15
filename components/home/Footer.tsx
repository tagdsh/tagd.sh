import Link from "next/link";
import { Fragment } from "react";
import {
  BETTERDATA_CCO_URL,
  BETTERDATA_OPEN_INFRA_URL,
  BETTERDATA_TRUST_SOLUTION_URL,
  ECOSYSTEM_STRIP,
} from "@/lib/betterdata-ecosystem";
import {
  BETTER_DATA_DOCS_FOOTER_SECONDARY_LINKS,
  BETTER_DATA_ECOSYSTEM,
  BETTER_DATA_LEGAL_FOOTER_LINKS,
  BETTER_DATA_SUPPORT_FOOTER,
} from "@betterdata/site-links";
import { BetterDataFooterSocialIcons } from "@betterdata/site-links/social-icons";

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
          <a href={BETTERDATA_CCO_URL} target="_blank" rel="noopener noreferrer">
            Commerce Chain Optimization (hosted)
          </a>
          <a href={BETTERDATA_OPEN_INFRA_URL} target="_blank" rel="noopener noreferrer">
            Open operational infrastructure hub
          </a>
          <a href={BETTERDATA_TRUST_SOLUTION_URL} target="_blank" rel="noopener noreferrer">
            Trust &amp; traceability solutions
          </a>
          <a href={BETTER_DATA_ECOSYSTEM.trustCenter}>Trust Center</a>
          <a href={BETTER_DATA_ECOSYSTEM.marketingSite}>Created by Better Data</a>
          <a href={BETTER_DATA_ECOSYSTEM.docsBrowse}>Platform docs</a>
          <a href="https://loopengine.io">Loop Engine</a>
          <a href="https://commercegateway.io">Commerce Gateway</a>
          <a href="https://commercechain.io">Commerce Chain</a>
          <a href="mailto:security@betterdata.co">security@betterdata.co</a>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "1.25rem",
          marginTop: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <a href={BETTER_DATA_SUPPORT_FOOTER.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem" }}>
            {BETTER_DATA_SUPPORT_FOOTER.label}
          </a>
          <BetterDataFooterSocialIcons
            navClassName="flex flex-wrap gap-2"
            linkClassName="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.85rem" }}>
          {BETTER_DATA_DOCS_FOOTER_SECONDARY_LINKS.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div
        className="footer-bottom"
        style={{ flexDirection: "column", alignItems: "stretch" }}
      >
        <p style={{ fontSize: "0.8rem", opacity: 0.95, marginBottom: "0.5rem", lineHeight: 1.5 }}>{ECOSYSTEM_STRIP}</p>
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
          {BETTER_DATA_LEGAL_FOOTER_LINKS.map((item, i) => (
            <Fragment key={item.href}>
              {i > 0 ? <span aria-hidden="true"> · </span> : null}
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
