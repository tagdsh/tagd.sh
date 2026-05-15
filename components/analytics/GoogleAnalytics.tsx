import Script from "next/script";
import { buildGtagInitScript, getGaMeasurementId } from "@/lib/analytics/gtag";

export function GoogleAnalytics() {
  const measurementId = getGaMeasurementId();
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {buildGtagInitScript(measurementId)}
      </Script>
    </>
  );
}
