/** Better Data ecosystem hostnames for GA4 cross-domain session linking. */
export const GA_LINKER_DOMAINS = [
  "betterdata.co",
  "www.betterdata.co",
  "docs.betterdata.co",
  "app.betterdata.co",
  "loopengine.io",
  "www.loopengine.io",
  "commercegateway.io",
  "www.commercegateway.io",
  "commercechain.io",
  "www.commercechain.io",
  "tagd.sh",
  "www.tagd.sh",
] as const;

export function getGaMeasurementId(): string | undefined {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return measurementId || undefined;
}

export function formatGaLinkerDomainsForScript(): string {
  return GA_LINKER_DOMAINS.map((domain) => `'${domain}'`).join(",\n          ");
}

/** @deprecated Use inline template in `GoogleAnalytics` — multiline strings break as Script children. */
export function buildGtagInitScript(measurementId: string): string {
  const linkerDomains = GA_LINKER_DOMAINS.map((domain) => `'${domain}'`).join(", ");
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{linker:{domains:[${linkerDomains}]}});`;
}
