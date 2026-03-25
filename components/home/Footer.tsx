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
          <p>Created by Better Data</p>
          <a href="https://betterdata.co">Better Data platform</a>
          <a href="https://loopengine.io">Loop Engine</a>
          <a href="mailto:security@betterdata.co">security@betterdata.co</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>MIT Licensed · © Signal Tags Contributors</span>
        <a href="mailto:conduct@tagd.sh">conduct@tagd.sh</a>
      </div>
    </footer>
  );
}
