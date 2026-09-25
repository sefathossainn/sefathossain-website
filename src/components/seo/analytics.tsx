import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/env";

/**
 * Google Analytics 4 (gtag.js). Renders nothing until NEXT_PUBLIC_GA_ID is set,
 * so dev and un-configured deploys stay clean. Loaded `afterInteractive` so it
 * never blocks first paint or Core Web Vitals.
 */
export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
