import { renderOgImage, OG_SIZE } from "@/lib/og";
import { getServiceArea } from "@/lib/service-areas";

export const alt = "WordPress malware removal — Sefat Hossain";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = getServiceArea(city);
  return renderOgImage({
    kicker: area ? `${area.city}, ${area.stateAbbr}` : "Service area",
    title: area
      ? `WordPress Malware Removal in ${area.city}`
      : "WordPress Malware Removal",
    subtitle: area?.blurb,
  });
}
