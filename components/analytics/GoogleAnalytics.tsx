import Script from "next/script";
import { formatGaLinkerDomainsForScript, getGaMeasurementId } from "@/lib/analytics/gtag";

export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) {
    return null;
  }

  const linkerDomains = formatGaLinkerDomainsForScript();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-tagd" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      linker: {
        domains: [
          ${linkerDomains}
        ]
      }
    });
  `}
      </Script>
    </>
  );
}
