"use client"

import { useEffect } from "react"
import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView } from "@/lib/gtm"

export default function GTMContainer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (pathname) {
      trackPageView(`${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`, document.title)
    }
  }, [pathname, searchParams])

  return (
    <>
      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
        `}
      </Script>

      {/* CallRail Tracking Code */}
      <Script id="callrail-tracking" strategy="afterInteractive">
        {`
          window.CallTrackingConfig = {
            account: "YOUR_CALLRAIL_ACCOUNT",
            enabled: true,
            days: 90,
            formCapture: true,
            sessionCapture: true
          };
          (function(){var w=window,d=document,s=d.createElement("script");
          s.async=1;s.src="https://cdn.callrail.com/companies/YOUR_CALLRAIL_ACCOUNT/YOUR_CALLRAIL_ID/12/swap.js";
          d.getElementsByTagName("head")[0].appendChild(s);})();
        `}
      </Script>

      {/* ClickCease */}
      <Script id="clickcease" strategy="afterInteractive">
        {`
          (function(){ var s = document.createElement('script');
          s.src = '//cdn.clickcease.com/monitor/YOUR_CLICKCEASE_ID.js';
          s.async = true; document.head.appendChild(s);})();
        `}
      </Script>
    </>
  )
}
