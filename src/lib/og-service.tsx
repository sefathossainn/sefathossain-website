import { renderOgImage, OG_SIZE } from "@/lib/og";
import { SERVICE_PAGES } from "@/lib/services-nav";

export { OG_SIZE };

/** OG card for a /services/* page, titled from the canonical service list. */
export function serviceOgImage(path: string) {
  const s = SERVICE_PAGES.find((p) => p.path === path);
  return renderOgImage({
    kicker: "WordPress security service",
    title: s?.name ?? "WordPress Security Services",
    subtitle: s?.desc,
  });
}
