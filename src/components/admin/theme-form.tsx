"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { saveTheme } from "@/lib/admin/mutations";
import {
  THEME_COLOR_TOKENS,
  DEFAULT_BASE_FONT_PCT,
  DEFAULT_HEADING_SCALE_PCT,
  BASE_FONT_MIN,
  BASE_FONT_MAX,
  HEADING_SCALE_MIN,
  HEADING_SCALE_MAX,
  isHexColor,
  type ThemeSettings,
} from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Resolved = Required<ThemeSettings>;

const GROUPS = ["Core", "Surfaces & lines"] as const;

export function ThemeForm({ initial }: { initial: Resolved }) {
  const router = useRouter();
  const [colors, setColors] = React.useState<Record<string, string>>(initial.colors);
  const [baseFont, setBaseFont] = React.useState(initial.base_font_pct);
  const [headingScale, setHeadingScale] = React.useState(initial.heading_scale_pct);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const dirty = () => setSaved(false);
  const setColor = (key: string, v: string) => {
    setColors((prev) => ({ ...prev, [key]: v }));
    dirty();
  };

  function resetDefaults() {
    const d: Record<string, string> = {};
    for (const t of THEME_COLOR_TOKENS) d[t.key] = t.default;
    setColors(d);
    setBaseFont(DEFAULT_BASE_FONT_PCT);
    setHeadingScale(DEFAULT_HEADING_SCALE_PCT);
    dirty();
  }

  async function onSave() {
    setSaving(true);
    setError(null);
    const res = await saveTheme({
      colors,
      base_font_pct: baseFont,
      heading_scale_pct: headingScale,
    });
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Save failed.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  // Live preview: scope every token onto a wrapper so the sample re-skins
  // instantly without touching the rest of the admin UI.
  const previewVars: React.CSSProperties = {
    ...Object.fromEntries(
      THEME_COLOR_TOKENS.map((t) => [t.cssVar, colors[t.key]]),
    ),
    ["--heading-scale" as string]: (headingScale / 100).toString(),
    fontSize: `${baseFont}%`,
    backgroundColor: colors.obsidian,
  } as React.CSSProperties;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Controls */}
      <div className="grid gap-8">
        {GROUPS.map((group) => (
          <section key={group} className="grid gap-3">
            <p className="kicker text-slate">{group === "Core" ? "Colors" : group}</p>
            <div className="grid gap-2.5">
              {THEME_COLOR_TOKENS.filter((t) => t.group === group).map((t) => {
                const val = colors[t.key] ?? t.default;
                const ok = isHexColor(val);
                return (
                  <div key={t.key} className="flex items-center gap-3">
                    <label
                      className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-line"
                      style={{ background: ok ? val : "#000" }}
                      title={`Pick ${t.label}`}
                    >
                      <input
                        type="color"
                        value={ok ? val : "#000000"}
                        onChange={(e) => setColor(t.key, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </label>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-mist">{t.label}</p>
                    </div>
                    <input
                      value={val}
                      onChange={(e) => setColor(t.key, e.target.value)}
                      spellCheck={false}
                      className={cn(
                        "w-28 rounded-lg border bg-obsidian px-2.5 py-1.5 font-mono text-xs text-mist outline-none",
                        ok ? "border-line focus:border-evergreen" : "border-[#e88c7d]",
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <section className="grid gap-4">
          <p className="kicker text-slate">Text size</p>
          <Slider
            label="Base text size"
            hint="Scales body text across the whole site."
            value={baseFont}
            min={BASE_FONT_MIN}
            max={BASE_FONT_MAX}
            onChange={(v) => {
              setBaseFont(v);
              dirty();
            }}
          />
          <Slider
            label="Heading size"
            hint="Scales all headings up or down."
            value={headingScale}
            min={HEADING_SCALE_MIN}
            max={HEADING_SCALE_MAX}
            onChange={(v) => {
              setHeadingScale(v);
              dirty();
            }}
          />
        </section>
      </div>

      {/* Live preview */}
      <div className="lg:sticky lg:top-6 lg:h-fit">
        <p className="kicker mb-3 text-slate">Live preview</p>
        <div
          className="overflow-hidden rounded-2xl border p-6"
          style={{ ...previewVars, borderColor: colors.line }}
        >
          <p className="kicker mb-3" style={{ color: colors.emerald }}>
            WordPress security • Elementor
          </p>
          <h3 className="font-display font-semibold leading-tight text-mist" style={{ fontSize: "var(--text-title)" }}>
            Websites, built to be trusted.
          </h3>
          <p className="mt-3 text-sage" style={{ fontSize: "1em", lineHeight: 1.6 }}>
            I build and protect high-performance sites — secure from day one and
            looked after long after launch. This is a{" "}
            <a href="#" onClick={(e) => e.preventDefault()} style={{ color: colors.emerald }}>
              sample link
            </a>{" "}
            and some <span style={{ color: colors.slate }}>muted text</span>.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{ background: colors.signal, color: colors.obsidian }}
            >
              Get a free audit
            </span>
            <span
              className="rounded-full border px-4 py-2 text-sm"
              style={{ borderColor: colors.line, color: colors.mist }}
            >
              View work
            </span>
          </div>
          <div
            className="mt-5 rounded-xl border p-4"
            style={{ background: colors.pine, borderColor: colors.line }}
          >
            <p className="text-sm" style={{ color: colors.mist }}>Card / panel surface</p>
            <p className="mt-1 text-xs" style={{ color: colors.sage }}>
              Sits on the section surface, above the page background.
            </p>
          </div>
        </div>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-4 flex items-center gap-4 rounded-full border border-line bg-obsidian/90 px-5 py-3 backdrop-blur lg:col-span-2">
        <Button onClick={onSave} variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save appearance"}
        </Button>
        <button
          type="button"
          onClick={resetDefaults}
          className="text-sm text-sage transition-colors hover:text-mist"
        >
          Reset to defaults
        </button>
        {saved && <span className="text-sm text-signal">Saved ✓ — live within a minute</span>}
        {error && (
          <span className="text-sm text-[#e88c7d]" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

function Slider({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-mist">{label}</span>
        <span className="font-mono text-xs text-sage">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#27a165]"
      />
      <p className="mt-1 text-xs text-slate">{hint}</p>
    </div>
  );
}
