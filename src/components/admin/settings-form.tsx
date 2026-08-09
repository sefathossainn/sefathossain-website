"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/lib/admin/mutations";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { MediaPickerButton } from "@/components/admin/media-picker";

type Settings = {
  logo_url?: string | null;
  profile_photo?: string | null;
  brand_name?: string | null;
  brand_title?: string | null;
  favicon_url?: string | null;
  calendar_url?: string | null;
  lead_email?: string | null;
  whatsapp_number?: string | null;
  seo_defaults?: { title?: string; description?: string } | null;
  social?: Record<string, string> | null;
};

const SOCIALS = ["LinkedIn", "GitHub", "Upwork"];

export function SettingsForm({
  settings,
  seoOnly = false,
}: {
  settings: Settings;
  seoOnly?: boolean;
}) {
  const router = useRouter();
  const [logo, setLogo] = React.useState(settings.logo_url ?? "");
  const [photo, setPhoto] = React.useState(settings.profile_photo ?? "");
  const [brandName, setBrandName] = React.useState(settings.brand_name ?? "");
  const [brandTitle, setBrandTitle] = React.useState(settings.brand_title ?? "");
  const [favicon, setFavicon] = React.useState(settings.favicon_url ?? "");
  const [calendar, setCalendar] = React.useState(settings.calendar_url ?? "");
  const [leadEmail, setLeadEmail] = React.useState(settings.lead_email ?? "");
  const [whatsappNumber, setWhatsappNumber] = React.useState(settings.whatsapp_number ?? "");
  const [seoTitle, setSeoTitle] = React.useState(
    settings.seo_defaults?.title ?? "",
  );
  const [seoDesc, setSeoDesc] = React.useState(
    settings.seo_defaults?.description ?? "",
  );
  const [social, setSocial] = React.useState<Record<string, string>>(() => {
    const base: Record<string, string> = {};
    for (const s of SOCIALS) base[s] = settings.social?.[s] ?? "";
    return base;
  });
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const res = await saveSettings({
      logo_url: logo || null,
      profile_photo: photo || null,
      brand_name: brandName || null,
      brand_title: brandTitle,
      favicon_url: favicon || null,
      calendar_url: calendar || null,
      lead_email: leadEmail || null,
    whatsapp_number: whatsappNumber || null,
      seo_defaults: { title: seoTitle, description: seoDesc },
      social: Object.fromEntries(
        Object.entries(social).filter(([, v]) => v),
      ),
    });
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Save failed.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSave} className="grid max-w-2xl gap-6">
      {!seoOnly && (
        <>
          <Field label="Profile photo" htmlFor="photo">
            <div className="flex gap-2">
              <Input
                id="photo"
                placeholder="/images/sefat-photo.png or https://…"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              <MediaPickerButton onPick={setPhoto} />
            </div>
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Profile preview"
                className="mt-2 h-20 w-20 rounded-full border border-line object-cover"
                style={{ objectPosition: "50% 22%" }}
              />
            )}
          </Field>

          <div className="grid gap-6 rounded-2xl border border-line/70 bg-forest/20 p-5">
            <p className="kicker text-slate">Navbar logo &amp; favicon</p>

            <Field label="Logo image" htmlFor="logo">
              <div className="flex gap-2">
                <Input
                  id="logo"
                  placeholder="Leave blank to use your profile photo"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                />
                <MediaPickerButton onPick={setLogo} />
              </div>
              <div className="mt-2 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo || photo || "/favicon.ico"}
                  alt="Logo preview"
                  className="h-11 w-11 rounded-full border border-line object-cover"
                  style={{ objectPosition: "50% 20%" }}
                />
                <p className="text-xs text-slate">
                  The circular image beside your name in the navbar. Defaults to
                  your profile photo if left blank.
                </p>
              </div>
            </Field>

            <Field label="Logo name" htmlFor="brandName">
              <Input
                id="brandName"
                placeholder="Sefat Hossain"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              <p className="mt-1 text-xs text-slate">
                The name shown beside your photo in the navbar.
              </p>
            </Field>

            <Field label="Logo title" htmlFor="brandTitle">
              <Input
                id="brandTitle"
                placeholder="WordPress Security & Web Development"
                value={brandTitle}
                onChange={(e) => setBrandTitle(e.target.value)}
              />
              <p className="mt-1 text-xs text-slate">
                Small line under the name. Leave blank to hide it.
              </p>
            </Field>

            <Field label="Favicon" htmlFor="favicon">
              <div className="flex gap-2">
                <Input
                  id="favicon"
                  placeholder="Leave blank to use your profile photo"
                  value={favicon}
                  onChange={(e) => setFavicon(e.target.value)}
                />
                <MediaPickerButton onPick={setFavicon} />
              </div>
              <div className="mt-2 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={favicon || photo || "/favicon.ico"}
                  alt="Favicon preview"
                  className="h-8 w-8 rounded border border-line object-cover"
                />
                <p className="text-xs text-slate">
                  The browser-tab icon. Defaults to your profile photo — for a
                  crisp result upload a square image (512×512).
                </p>
              </div>
            </Field>
          </div>

          <Field label="Booking calendar URL" htmlFor="cal">
            <Input
              id="cal"
              placeholder="https://calendly.com/…"
              value={calendar}
              onChange={(e) => setCalendar(e.target.value)}
            />
          </Field>

          <Field label="WhatsApp Number" htmlFor="whatsappNumber">
  <Input
    id="whatsappNumber"
    type="text"
    placeholder="+8801XXXXXXXXX"
    value={whatsappNumber}
    onChange={(e) => setWhatsappNumber(e.target.value)}
  />
  <p className="mt-1 text-xs text-slate">
    WhatsApp number shown on the contact page and used for direct WhatsApp contact.
  </p>
</Field>

<Field label="Form submissions email" htmlFor="leadEmail">
            <Input
              id="leadEmail"
              type="email"
              placeholder="you@yourdomain.com"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
            />
            <p className="mt-1 text-xs text-slate">
              Where contact &amp; audit form submissions are emailed. Every
              submission is always saved under Leads / Audit Requests regardless.
            </p>
          </Field>
        </>
      )}

      <Field label="Default SEO title" htmlFor="seotitle">
        <Input
          id="seotitle"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
        />
      </Field>

      <Field label="Default SEO description" htmlFor="seodesc">
        <Textarea
          id="seodesc"
          rows={3}
          value={seoDesc}
          onChange={(e) => setSeoDesc(e.target.value)}
        />
      </Field>

      {!seoOnly && (
        <div className="grid gap-4">
          <p className="kicker text-slate">Social links</p>
          {SOCIALS.map((s) => (
            <Field key={s} label={s} htmlFor={`social-${s}`}>
              <Input
                id={`social-${s}`}
                placeholder="https://…"
                value={social[s]}
                onChange={(e) =>
                  setSocial((prev) => ({ ...prev, [s]: e.target.value }))
                }
              />
            </Field>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 border-t border-line/70 pt-6">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </Button>
        {saved && <span className="text-sm text-signal">Saved ✓</span>}
        {error && (
          <span className="text-sm text-[#e88c7d]" role="alert">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
