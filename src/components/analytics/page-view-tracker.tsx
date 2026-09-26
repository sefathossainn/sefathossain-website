"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fires a lightweight, cookie-less page-view ping to /api/track on each client
 * navigation. Renders nothing. The server route stores no IP and no personal
 * data; this only sends the current path and (on first load) the external
 * referrer. Best-effort — failures are ignored so the page is never affected.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || last.current === pathname) return;
    const isFirst = last.current === null;
    last.current = pathname;

    const body = JSON.stringify({
      path: pathname,
      referrer: isFirst && typeof document !== "undefined" ? document.referrer : "",
    });

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore — analytics must never break navigation
    }
  }, [pathname]);

  return null;
}
