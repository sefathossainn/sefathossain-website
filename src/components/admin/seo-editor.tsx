"use client";

import * as React from "react";
import type { Seo } from "@/lib/cms/types";
import {
  analyzeSeo,
  TITLE_MAX,
  TITLE_MIN,
  DESC_MAX,
  DESC_MIN,
  type CheckStatus,
} from "@/lib/seo-analyze";
import { Field, Input, Textarea } from "@/components/ui/field";
import { MediaPickerButton } from "@/components/admin/media-picker";
import { cn } from "@/lib/utils";

export type SeoContext = {
  /** The record/page title, used as the SEO-title fallback + analysis input. */
  title: string;
  slug: string;
  /** Plain text or HTML of the body — drives keyword/length checks. */
  content?: string;
  /** e.g. "https://sefathossain.com" */
  urlBase: string;
  /** Path shown in the SERP preview, e.g. "/blog/my-post". */
  path: string;
};

const DOT: Record<CheckStatus, string> = {
  good: "bg-signal",
  ok: "bg-[#e0b341]",
  bad: "bg-[#e88c7d]",
};
const RING: Record<CheckStatus, string> = {
  good: "text-signal",
  ok: "text-[#e0b341]",
  bad: "text-[#e88c7d]",
};
const RATING_LABEL: Record<CheckStatus, string> = {
  good: "Good",
  ok: "Needs work",
  bad: "Poor",
};

function LengthMeter({ value, min, max }: { value: number; min: number; max: number }) {
  const status: CheckStatus = value === 0 ? "bad" : value < min || value > max ? "ok" : "good";
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/60">
        <div className={cn("h-full rounded-full transition-all", DOT[status])} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right font-mono text-[0.7rem] text-slate">{value}</span>
    </div>
  );
}

function ScoreRing({ score, rating }: { score: number; rating: CheckStatus }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 52 52" className="h-14 w-14 -rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-line/60" />
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          className={cn("transition-all", RING[rating])}
        />
      </svg>
      <span className={cn("absolute inset-0 grid place-items-center font-mono text-sm font-semibold", RING[rating])}>
        {score}
      </span>
    </div>
  );
}

export function SeoEditor({
  value,
  onChange,
  context,
}: {
  value: Seo;
  onChange: (next: Seo) => void;
  context: SeoContext;
}) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const set = (patch: Partial<Seo>) => onChange({ ...value, ...patch });

  const effTitle = value.title || context.title;
  const effDesc = value.description ?? "";

  const report = React.useMemo(
    () =>
      analyzeSeo({
        focusKeyword: value.focus_keyword,
        title: effTitle,
        description: effDesc,
        slug: context.slug,
        content: context.content,
      }),
    [value.focus_keyword, effTitle, effDesc, context.slug, context.content],
  );

  const displayUrl =
    `${context.urlBase}${context.path}`.replace(/^https?:\/\//, "").replace(/\/$/, "") || "example.com";

  return (
    <section className="grid gap-6 rounded-2xl border border-line bg-forest/30 p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <ScoreRing score={report.score} rating={report.rating} />
        <div>
          <h3 className="font-display text-lg font-semibold text-mist">Search appearance</h3>
          <p className="text-sm text-sage">
            SEO score:{" "}
            <span className={RING[report.rating]}>{RATING_LABEL[report.rating]}</span> — how this
            page looks and reads to Google.
          </p>
        </div>
      </div>

      {/* Google snippet preview */}
      <div>
        <p className="kicker mb-2 text-slate">Google preview</p>
        <div className="rounded-xl border border-line bg-obsidian/60 p-4">
          <div className="flex items-center gap-2 text-xs text-sage">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-evergreen/40 text-[0.6rem]">S</span>
            <span className="truncate">{displayUrl}</span>
          </div>
          <div className="mt-1.5 truncate text-lg leading-snug text-[#8ab4f8]">
            {(effTitle || "Your SEO title").slice(0, 65)}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-sage/90">
            {effDesc ? effDesc.slice(0, 165) : "Your meta description will show here — write a compelling summary with your focus keyword."}
          </p>
        </div>
      </div>

      <Field label="Focus keyword" htmlFor="seo-kw" optional>
        <Input
          id="seo-kw"
          placeholder="e.g. WordPress security"
          value={value.focus_keyword ?? ""}
          onChange={(e) => set({ focus_keyword: e.target.value })}
        />
        <p className="mt-1 text-xs text-slate">
          The main phrase you want this page to rank for. Checks below score against it.
        </p>
      </Field>

      <Field label="SEO title" htmlFor="seo-title" optional>
        <Input
          id="seo-title"
          placeholder={context.title || "Custom title for search results"}
          value={value.title ?? ""}
          onChange={(e) => set({ title: e.target.value })}
        />
        <LengthMeter value={effTitle.length} min={TITLE_MIN} max={TITLE_MAX} />
        <p className="mt-1 text-xs text-slate">
          Leave blank to use the {context.title ? "page title" : "default"}. Ideal {TITLE_MIN}–{TITLE_MAX} characters.
        </p>
      </Field>

      <Field label="Meta description" htmlFor="seo-desc" optional>
        <Textarea
          id="seo-desc"
          rows={3}
          placeholder="A 1–2 sentence summary that makes people click."
          value={value.description ?? ""}
          onChange={(e) => set({ description: e.target.value })}
        />
        <LengthMeter value={effDesc.length} min={DESC_MIN} max={DESC_MAX} />
        <p className="mt-1 text-xs text-slate">Ideal {DESC_MIN}–{DESC_MAX} characters.</p>
      </Field>

      {/* Analysis checklist */}
      <div>
        <p className="kicker mb-2 text-slate">Analysis</p>
        <ul className="grid gap-2">
          {report.checks.map((c) => (
            <li key={c.id} className="flex items-start gap-2.5 text-sm text-sage">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", DOT[c.status])} />
              <span>{c.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setShowAdvanced((s) => !s)}
        className="justify-self-start text-sm text-emerald hover:underline"
      >
        {showAdvanced ? "− Hide" : "+ Social & advanced"}
      </button>

      {showAdvanced && (
        <div className="grid gap-5 border-t border-line/60 pt-5">
          <Field label="Social share image (Open Graph)" htmlFor="seo-og" optional>
            <div className="flex gap-2">
              <Input
                id="seo-og"
                placeholder="https://… (1200×630 recommended)"
                value={value.og_image ?? ""}
                onChange={(e) => set({ og_image: e.target.value })}
              />
              <MediaPickerButton onPick={(url) => set({ og_image: url })} />
            </div>
            {value.og_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value.og_image}
                alt=""
                className="mt-2 h-32 w-full rounded-lg border border-line object-cover"
              />
            ) : (
              <p className="mt-1 text-xs text-slate">
                Falls back to the featured/hero image, then the site default.
              </p>
            )}
          </Field>

          <Field label="Canonical URL" htmlFor="seo-canonical" optional>
            <Input
              id="seo-canonical"
              placeholder={`${context.urlBase}${context.path}`}
              value={value.canonical ?? ""}
              onChange={(e) => set({ canonical: e.target.value })}
            />
            <p className="mt-1 text-xs text-slate">
              Only set this to point duplicate content at the original URL.
            </p>
          </Field>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-sage">
            <input
              type="checkbox"
              checked={Boolean(value.noindex)}
              onChange={(e) => set({ noindex: e.target.checked })}
              className="mt-0.5 h-4 w-4 accent-[#e88c7d]"
            />
            <span>
              <span className="text-mist">Hide from search engines (noindex)</span>
              <br />
              <span className="text-xs text-slate">
                Search engines won&rsquo;t list this page. Leave off for normal pages.
              </span>
            </span>
          </label>
        </div>
      )}
    </section>
  );
}
