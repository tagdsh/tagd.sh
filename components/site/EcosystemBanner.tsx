import Link from "next/link";
import { BETTERDATA_CCO_URL, ECOSYSTEM_STRIP } from "@/lib/betterdata-ecosystem";

export function EcosystemBanner() {
  return (
    <div className="ecosystem-banner">
      <div className="ecosystem-banner-inner">
        <p className="ecosystem-banner-text">{ECOSYSTEM_STRIP}</p>
        <Link href={BETTERDATA_CCO_URL} target="_blank" rel="noopener noreferrer" className="ecosystem-banner-cta">
          See Commerce Chain Optimization →
        </Link>
      </div>
    </div>
  );
}
