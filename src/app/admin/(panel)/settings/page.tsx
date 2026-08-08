import { adminList } from "@/lib/admin/data";
import { requireSection } from "@/lib/admin/guard";
import { settingsSeoOnly } from "@/lib/admin/permissions";
import { AdminHeader } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/settings-form";

type Settings = {
  logo_url?: string | null;
  profile_photo?: string | null;
  brand_name?: string | null;
  brand_title?: string | null;
  favicon_url?: string | null;
  calendar_url?: string | null;
  lead_email?: string | null;
  seo_defaults?: { title?: string; description?: string } | null;
  social?: Record<string, string> | null;
};

export default async function SettingsPage() {
  const { role } = await requireSection("settings");
  const seoOnly = settingsSeoOnly(role!);

  const rows = await adminList<Settings>("site_settings", { order: "id", ascending: true });
  const settings = rows[0] ?? {};

  return (
    <>
      <AdminHeader
        title="Site settings"
        description={
          seoOnly
            ? "Default SEO title & description."
            : "Logo, profile photo, booking link, default SEO, and social links."
        }
      />
      <SettingsForm settings={settings} seoOnly={seoOnly} />
    </>
  );
}
