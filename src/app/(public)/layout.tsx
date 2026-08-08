import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Atmosphere } from "@/components/layout/atmosphere";
import { getSiteSettings } from "@/lib/cms/queries";

/** Public site chrome — momentum scroll, atmosphere, nav, footer credit. */
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <SmoothScroll>
      <div className="flex min-h-svh flex-col">
        <Atmosphere />
        <SiteHeader
          profilePhoto={settings.logo_url || settings.profile_photo}
          brandName={settings.brand_name}
          brandTitle={settings.brand_title}
        />
        <main className="relative z-[2] flex-1">{children}</main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
