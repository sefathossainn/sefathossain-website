"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Persistent first-party visitor id (localStorage, not a cross-site cookie). */
function getVisitorId(): string {
  try {
    let id = localStorage.getItem("sh_vid");
    if (!id) {
      id =
        globalThis.crypto?.randomUUID?.() ??
        `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      localStorage.setItem("sh_vid", id);
    }
    return id;
  } catch {
    return "";
  }
}

/** True once per browser-tab session (marks the session's entry page). */
function isSessionEntry(): boolean {
  try {
    if (sessionStorage.getItem("sh_sess")) return false;
    sessionStorage.setItem("sh_sess", "1");
    return true;
  } catch {
    return false;
  }
}

function utmParams() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") ?? undefined,
      utm_medium: p.get("utm_medium") ?? undefined,
      utm_campaign: p.get("utm_campaign") ?? undefined,
    };
  } catch {
    return {};
  }
}

/**
 * Sends a cookie-less page-view ping to /api/track on each client navigation.
 * Renders nothing. No IP or personal data leaves the browser — only the path,
 * a first-party visitor id, the session-entry flag, and (on the landing view)
 * the referrer and any UTM campaign parameters.
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
      referrer:
        isFirst && typeof document !== "undefined" ? document.referrer : "",
      visitor_id: getVisitorId(),
      is_entry: isFirst ? isSessionEntry() : false,
      ...(isFirst ? utmParams() : {}),
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
