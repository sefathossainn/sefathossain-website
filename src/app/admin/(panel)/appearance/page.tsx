import { getSiteSettings } from "@/lib/cms/queries";
import { requireSection } from "@/lib/admin/guard";
import { resolveTheme } from "@/lib/theme";
import { AdminHeader } from "@/components/admin/ui";
import { ThemeForm } from "@/components/admin/theme-form";

export const dynamic = "force-dynamic";

export default async function AppearancePage() {
  await requireSection("appearance");
  const settings = await getSiteSettings();
  const initial = resolveTheme(settings.theme);

  return (
    <>
      <AdminHeader
        title="Appearance"
        description="Retune the site's brand colors and text size. Changes apply everywhere and go live within a minute."
      />
      <ThemeForm initial={initial} />
    </>
  );
}
