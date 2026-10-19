import { renderOgImage, OG_SIZE } from "@/lib/og";
import { DEV_SERVICES, getDevService } from "@/lib/dev-services";

export const alt = "Sefat Hossain — web development service";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return DEV_SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getDevService(slug);
  return renderOgImage({
    kicker: "Web development service",
    title: s?.name ?? "Web Development Services",
    subtitle: s?.desc,
  });
}
