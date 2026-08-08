"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { BlockValue, Seo } from "@/lib/cms/types";
import {
  resolveTextStyle,
  cleanTextStyle,
  isHex,
  FONT_WEIGHTS,
  SIZE_MIN,
  SIZE_MAX,
  type TextStyle,
} from "@/lib/cms/text-style";
import { saveContentBlocks } from "@/lib/admin/mutations";
import { Textarea, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { MediaPickerButton } from "@/components/admin/media-picker";
import { SeoEditor } from "@/components/admin/seo-editor";
import { CmsIcon, ICON_KEYS } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Kind = "text" | "items" | "image";

function kindOf(v: BlockValue): Kind {
  if (v.items !== undefined) return "items";
  if (v.url !== undefined) return "image";
  return "text";
}

/** meta.* content blocks ⇄ a single Seo object for the SEO panel. */
function seoFromBlocks(b: Record<string, BlockValue>): Seo {
  return {
    title: b["meta.title"]?.text ?? "",
    description: b["meta.description"]?.text ?? "",
    focus_keyword: b["meta.focus_keyword"]?.text ?? "",
    canonical: b["meta.canonical"]?.text ?? "",
    og_image: b["meta.og_image"]?.url ?? "",
    noindex: b["meta.noindex"]?.text === "true",
  };
}
function seoToEntries(s: Seo): { block_key: string; value: BlockValue }[] {
  return [
    { block_key: "meta.title", value: { text: s.title ?? "" } },
    { block_key: "meta.description", value: { text: s.description ?? "" } },
    { block_key: "meta.focus_keyword", value: { text: s.focus_keyword ?? "" } },
    { block_key: "meta.canonical", value: { text: s.canonical ?? "" } },
    { block_key: "meta.og_image", value: { url: s.og_image ?? "", alt: "" } },
    { block_key: "meta.noindex", value: { text: s.noindex ? "true" : "false" } },
  ];
}

export function PageBlocksEditor({
  slug,
  blocks,
  title,
  content,
  siteUrl,
  path,
}: {
  slug: string;
  blocks: Record<string, BlockValue>;
  title: string;
  content: string;
  siteUrl: string;
  path: string;
}) {
  const router = useRouter();
  const contentKeys = Object.keys(blocks).filter((k) => !k.startsWith("meta."));

  const [state, setState] = React.useState<Record<string, BlockValue>>(blocks);
  const [seo, setSeo] = React.useState<Seo>(() => seoFromBlocks(blocks));
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const update = (key: string, value: BlockValue) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };
  const updateSeo = (next: Seo) => {
    setSeo(next);
    setSaved(false);
  };

  async function onSave() {
    setSaving(true);
    setError(null);
    const entries = [
      ...contentKeys.map((k) => {
        const v = { ...state[k] };
        // tidy the style before persisting (drops empty/invalid values)
        const cleaned = cleanTextStyle(v.style);
        if (cleaned) v.style = cleaned;
        else delete v.style;
        return { block_key: k, value: v };
      }),
      ...seoToEntries(seo),
    ];
    const res = await saveContentBlocks(slug, entries);
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Save failed.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="grid gap-8">
      <SeoEditor
        value={seo}
        onChange={updateSeo}
        context={{ title, slug, content, urlBase: siteUrl, path }}
      />

      {contentKeys.length > 0 && (
        <div className="grid gap-6">
          <p className="kicker text-slate">Page content</p>
          {contentKeys.map((key) => {
            const value = state[key];
            const kind = kindOf(blocks[key]);
            const isIcon = key.endsWith("_icon");
            return (
              <div key={key} className="grid gap-2 rounded-xl border border-line/50 p-4">
                <label className="font-mono text-xs uppercase tracking-wide text-slate">
                  {key}
                </label>

                {isIcon && (
                  <IconGallery
                    value={value.text}
                    onChange={(icon) => update(key, { ...value, text: icon })}
                  />
                )}

                {!isIcon && kind === "text" && (
                  <>
                    <Textarea
                      rows={(value.text ?? "").length > 90 ? 3 : 1}
                      value={value.text ?? ""}
                      onChange={(e) => update(key, { ...value, text: e.target.value })}
                    />
                    <StylePanel
                      style={value.style}
                      sample={value.text ?? ""}
                      onChange={(style) => update(key, { ...value, style })}
                    />
                  </>
                )}

                {kind === "items" && (
                  <>
                    <Textarea
                      rows={Math.max(3, (value.items ?? []).length)}
                      value={(value.items ?? []).join("\n")}
                      onChange={(e) =>
                        update(key, {
                          ...value,
                          items: e.target.value
                            .split("\n")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                    <StylePanel
                      style={value.style}
                      sample={(value.items ?? []).join(", ")}
                      onChange={(style) => update(key, { ...value, style })}
                    />
                  </>
                )}

                {kind === "image" && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://…"
                      value={value.url ?? ""}
                      onChange={(e) => update(key, { ...value, url: e.target.value })}
                    />
                    <MediaPickerButton onPick={(url) => update(key, { ...value, url })} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="sticky bottom-4 flex items-center gap-4 rounded-full border border-line bg-obsidian/90 px-5 py-3 backdrop-blur">
        <Button onClick={onSave} variant="primary" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
        {saved && <span className="text-sm text-signal">Saved ✓</span>}
        {error && (
          <span className="text-sm text-[#e88c7d]" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

/** Click-to-pick icon gallery for `*_icon` blocks (searchable). */
function IconGallery({
  value,
  onChange,
}: {
  value?: string;
  onChange: (icon: string) => void;
}) {
  const current = value || "shield";
  const [q, setQ] = React.useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? ICON_KEYS.filter((k) => k.includes(query))
    : ICON_KEYS;
  const cell =
    "grid h-11 w-11 shrink-0 place-items-center rounded-lg border transition-colors";
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search icons… (shield, lock, star, mail…)"
          className="min-w-0 flex-1 rounded-lg border border-line bg-obsidian px-3 py-1.5 text-sm text-mist outline-none focus:border-evergreen"
        />
        <span className="text-xs text-slate">{filtered.length} icons</span>
      </div>
      <div className="flex max-h-64 flex-wrap gap-2 overflow-y-auto rounded-lg border border-line/60 bg-obsidian/40 p-2">
        <button
          type="button"
          onClick={() => onChange("none")}
          className={cn(
            cell,
            "text-[0.6rem] uppercase tracking-wide",
            current === "none"
              ? "border-emerald bg-pine text-emerald"
              : "border-line text-sage hover:border-evergreen hover:text-mist",
          )}
          title="No icon"
        >
          None
        </button>
        {filtered.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => onChange(k)}
            title={k}
            className={cn(
              cell,
              current === k
                ? "border-emerald bg-pine text-emerald"
                : "border-line text-sage hover:border-evergreen hover:text-mist",
            )}
          >
            <CmsIcon name={k} className="h-5 w-5" />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="p-2 text-xs text-slate">No icons match &ldquo;{q}&rdquo;.</p>
        )}
      </div>
    </div>
  );
}

const WEIGHT_LABELS: Record<number, string> = {
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semibold",
  700: "Bold",
  800: "Extrabold",
};

/** Per-block text styling: size, color, weight, alignment + live preview. */
function StylePanel({
  style,
  sample,
  onChange,
}: {
  style?: TextStyle;
  sample: string;
  onChange: (style: TextStyle | undefined) => void;
}) {
  const s = style ?? {};
  const hasStyle = Boolean(s.size || s.color || s.weight || s.align);
  const [open, setOpen] = React.useState(hasStyle);

  const set = (patch: Partial<TextStyle>) => {
    const next = { ...s, ...patch };
    onChange(next);
  };
  const clearAll = () => onChange(undefined);

  const preview = resolveTextStyle(s);
  const color = isHex(s.color) ? (s.color as string) : "#e9f0eb";

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="justify-self-start text-xs text-emerald hover:underline"
      >
        {hasStyle ? "✎ Edit text style" : "+ Style this text (size, color…)"}
      </button>
    );
  }

  return (
    <div className="mt-1 grid gap-3 rounded-lg border border-line/70 bg-forest/20 p-3">
      <div className="flex flex-wrap items-end gap-4">
        {/* Size */}
        <label className="grid gap-1 text-xs text-slate">
          <span>Size (px)</span>
          <input
            type="number"
            min={SIZE_MIN}
            max={SIZE_MAX}
            placeholder="auto"
            value={s.size ?? ""}
            onChange={(e) =>
              set({ size: e.target.value === "" ? undefined : Number(e.target.value) })
            }
            className="w-20 rounded-lg border border-line bg-obsidian px-2 py-1.5 text-sm text-mist outline-none focus:border-evergreen"
          />
        </label>

        {/* Color */}
        <div className="grid gap-1 text-xs text-slate">
          <span>Color</span>
          <div className="flex items-center gap-1.5">
            <label
              className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-lg border border-line"
              style={{ background: color }}
            >
              <input
                type="color"
                value={color}
                onChange={(e) => set({ color: e.target.value })}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
            <input
              value={s.color ?? ""}
              placeholder="theme"
              spellCheck={false}
              onChange={(e) => set({ color: e.target.value || undefined })}
              className="w-24 rounded-lg border border-line bg-obsidian px-2 py-1.5 font-mono text-xs text-mist outline-none focus:border-evergreen"
            />
            {s.color && (
              <button
                type="button"
                onClick={() => set({ color: undefined })}
                className="text-slate hover:text-[#e88c7d]"
                title="Clear color"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Weight */}
        <label className="grid gap-1 text-xs text-slate">
          <span>Weight</span>
          <select
            value={s.weight ?? ""}
            onChange={(e) =>
              set({ weight: e.target.value === "" ? undefined : Number(e.target.value) })
            }
            className="rounded-lg border border-line bg-obsidian px-2 py-1.5 text-sm text-mist outline-none focus:border-evergreen"
          >
            <option value="">Default</option>
            {FONT_WEIGHTS.map((w) => (
              <option key={w} value={w}>
                {WEIGHT_LABELS[w]}
              </option>
            ))}
          </select>
        </label>

        {/* Align */}
        <div className="grid gap-1 text-xs text-slate">
          <span>Align</span>
          <div className="flex overflow-hidden rounded-lg border border-line">
            {(["left", "center", "right"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => set({ align: s.align === a ? undefined : a })}
                className={cn(
                  "px-2.5 py-1.5 text-sm capitalize transition-colors",
                  s.align === a ? "bg-pine text-mist" : "text-sage hover:text-mist",
                )}
              >
                {a === "left" ? "⇤" : a === "center" ? "≡" : "⇥"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live preview */}
      {sample && (
        <div className="rounded-lg border border-line bg-obsidian px-3 py-2">
          <p className="kicker mb-1 text-slate">Preview</p>
          <span className="text-mist" style={preview}>
            {sample.slice(0, 120)}
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={clearAll}
          className="text-xs text-slate hover:text-[#e88c7d]"
        >
          Reset to default
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-sage hover:text-mist"
        >
          Done
        </button>
      </div>
    </div>
  );
}
