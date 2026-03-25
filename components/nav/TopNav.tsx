import Image from "next/image";
import Link from "next/link";

export function TopNav() {
  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link href="/" className="brand">
          <Image src="/logo.svg" alt="tagd.sh" width={140} height={34} priority />
        </Link>
        <nav className="nav-links">
          <Link href="/docs/getting-started/quick-start">DOCS</Link>
          <a href="https://betterdata.co/blog/tags/signal-tags" target="_blank" rel="noreferrer">
            BLOG
          </a>
          <Link href="/partners">PARTNERS</Link>
          <a href="https://github.com/tagdsh/signal-tags-schema" target="_blank" rel="noreferrer">
            GITHUB
          </a>
        </nav>
        <div className="nav-actions">
          <span className="npm-badge">npm i @signal-tags/sdk</span>
          <Link href="/docs/getting-started/quick-start" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
