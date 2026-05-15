/** Better Data ecosystem hostnames for GA4 cross-domain session linking. */
export const GA_LINKER_DOMAINS = [
  "betterdata.co",
  "docs.betterdata.co",
  "loopengine.io",
  "commercegateway.io",
  "commercechain.io",
  "tagd.sh",
] as const;

export function getGaMeasurementId(): string | undefined {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return measurementId || undefined;
}

export function buildGtagInitScript(measurementId: string): string {
  const linkerDomains = GA_LINKER_DOMAINS.map((domain) => `'${domain}'`).join(", ");
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      linker: {
        domains: [${linkerDomains}],
      },
    });
  `.trim();
}
