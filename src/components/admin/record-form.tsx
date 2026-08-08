"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { FieldSpec, SeoContextSpec } from "@/lib/admin/collections";
import type { Seo } from "@/lib/cms/types";
import { saveRecord, deleteRecord } from "@/lib/admin/mutations";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { MediaPickerButton } from "@/components/admin/media-picker";
import { SeoEditor } from "@/components/admin/seo-editor";

type Metric = { label: string; value: string };
type FieldValue = string | boolean | Metric[] | Seo;
type Values = Record<string, FieldValue>;

function initialValue(field: FieldSpec, record: Record<string, unknown>): FieldValue {
  const r = record;
  switch (field.type) {
    case "seo":
      return (r.seo as Seo) ?? {};
    case "checkbox":
      return Boolean(r[field.name]);
    case "tags":
      return Array.isArray(r[field.name])
        ? (r[field.name] as string[]).join(", ")
        : "";
    case "lines":
      return Array.isArray(r[field.name])
        ? (r[field.name] as string[]).join("\n")
        : "";
    case "metrics":
      return (Array.isArray(r[field.name]) ? r[field.name] : []) as Metric[];
    default:
      return r[field.name] == null ? "" : String(r[field.name]);
  }
}

export function RecordForm({
  table,
  listHref,
  fields,
  record,
  categoryOptions,
  canDelete = true,
  seoContext,
  siteUrl = "",
}: {
  table: string;
  listHref: string;
  fields: FieldSpec[];
  record: Record<string, unknown>;
  categoryOptions?: { value: string; label: string }[];
  canDelete?: boolean;
  seoContext?: SeoContextSpec;
  siteUrl?: string;
}) {
  const router = useRouter();
  const isEditing = Boolean(record.id);

  const [values, setValues] = React.useState<Values>(() => {
    const v: Values = {};
    for (const f of fields) v[f.name] = initialValue(f, record);
    return v;
  });
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const set = (name: string, value: FieldValue) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  function buildPayload(): Record<string, unknown> {
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const raw = values[f.name];
      switch (f.type) {
        case "seo": {
          // Drop empty strings/false so the stored jsonb stays tidy.
          const s = raw as Seo;
          const cleaned: Seo = {};
          if (s.title) cleaned.title = s.title;
          if (s.description) cleaned.description = s.description;
          if (s.og_image) cleaned.og_image = s.og_image;
          if (s.focus_keyword) cleaned.focus_keyword = s.focus_keyword;
          if (s.canonical) cleaned.canonical = s.canonical;
          if (s.noindex) cleaned.noindex = true;
          payload.seo = cleaned;
          break;
        }
        case "checkbox":
          payload[f.name] = Boolean(raw);
          break;
        case "number":
          payload[f.name] = raw === "" ? null : Number(raw);
          break;
        case "tags":
          payload[f.name] = String(raw)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          break;
        case "lines":
          payload[f.name] = String(raw)
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
          break;
        case "metrics":
          payload[f.name] = (raw as Metric[]).filter(
            (m) => m.label || m.value,
          );
          break;
        default:
          payload[f.name] = raw === "" ? null : raw;
      }
    }
    if (isEditing) payload.id = record.id;
    return payload;
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const res = await saveRecord(table, buildPayload());
    setSaving(false);
    if (!res.ok) {
      setError(res.error ?? "Save failed.");
      return;
    }
    router.push(listHref);
    router.refresh();
  }

  async function onDelete() {
    if (!record.id) return;
    if (!confirm("Delete this record permanently?")) return;
    const res = await deleteRecord(table, record.id as string);
    if (!res.ok) {
      setError(res.error ?? "Delete failed.");
      return;
    }
    router.push(listHref);
    router.refresh();
  }

  const seoCtx = seoContext
    ? {
        title: String(values[seoContext.titleField] ?? ""),
        slug: String(values[seoContext.slugField] ?? ""),
        content: seoContext.bodyFields.map((b) => String(values[b] ?? "")).join(" "),
        urlBase: siteUrl,
        path: `${seoContext.urlPrefix}${String(values[seoContext.slugField] ?? "")}`,
      }
    : null;

  return (
    <form onSubmit={onSave} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.full ? "sm:col-span-2" : undefined}>
            {f.type === "seo" && seoCtx ? (
              <SeoEditor
                value={values[f.name] as Seo}
                onChange={(v) => set(f.name, v)}
                context={seoCtx}
              />
            ) : (
              renderField(f, values[f.name], set, categoryOptions)
            )}
            {f.help && <p className="mt-1 text-xs text-slate">{f.help}</p>}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-line/70 pt-6">
        <div className="flex gap-3">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button href={listHref} variant="secondary">
            Cancel
          </Button>
        </div>
        {isEditing && canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-slate transition-colors hover:text-[#e88c7d]"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

function renderField(
  f: FieldSpec,
  value: FieldValue,
  set: (name: string, v: FieldValue) => void,
  categoryOptions?: { value: string; label: string }[],
) {
  if (f.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-center gap-3 pt-6 text-sm text-sage">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => set(f.name, e.target.checked)}
          className="h-4 w-4 accent-[#27a165]"
        />
        {f.label}
      </label>
    );
  }

  if (f.type === "select") {
    const opts =
      f.name === "category_id" && categoryOptions
        ? categoryOptions
        : (f.options ?? []).map((o) => ({ value: o, label: o }));
    return (
      <Field label={f.label} htmlFor={f.name}>
        <Select
          id={f.name}
          value={String(value)}
          onChange={(e) => set(f.name, e.target.value)}
        >
          <option value="">—</option>
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>
    );
  }

  if (f.type === "metrics") {
    const metrics = (value as Metric[]) ?? [];
    return (
      <Field label={f.label} htmlFor={f.name}>
        <div className="grid gap-2">
          {metrics.map((m, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Value (e.g. 34 → 92)"
                value={m.value}
                onChange={(e) => {
                  const next = [...metrics];
                  next[i] = { ...next[i], value: e.target.value };
                  set(f.name, next);
                }}
              />
              <Input
                placeholder="Label"
                value={m.label}
                onChange={(e) => {
                  const next = [...metrics];
                  next[i] = { ...next[i], label: e.target.value };
                  set(f.name, next);
                }}
              />
              <button
                type="button"
                onClick={() => set(f.name, metrics.filter((_, j) => j !== i))}
                className="shrink-0 px-2 text-slate hover:text-[#e88c7d]"
                aria-label="Remove metric"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set(f.name, [...metrics, { label: "", value: "" }])}
            className="justify-self-start text-sm text-emerald"
          >
            + Add metric
          </button>
        </div>
      </Field>
    );
  }

  if (f.type === "image") {
    return (
      <Field label={f.label} htmlFor={f.name}>
        <div className="flex gap-2">
          <Input
            id={f.name}
            placeholder="https://…"
            value={String(value)}
            onChange={(e) => set(f.name, e.target.value)}
          />
          <MediaPickerButton onPick={(url) => set(f.name, url)} />
        </div>
        {String(value) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={String(value)}
            alt=""
            className="mt-2 h-24 w-full rounded-lg border border-line object-cover"
          />
        )}
      </Field>
    );
  }

  const isMultiline =
    f.type === "textarea" || f.type === "html" || f.type === "lines";

  return (
    <Field label={f.label} htmlFor={f.name}>
      {isMultiline ? (
        <Textarea
          id={f.name}
          rows={f.type === "html" ? 8 : 3}
          placeholder={f.placeholder}
          value={String(value)}
          onChange={(e) => set(f.name, e.target.value)}
        />
      ) : (
        <Input
          id={f.name}
          placeholder={f.placeholder}
          value={String(value)}
          onChange={(e) => set(f.name, e.target.value)}
        />
      )}
    </Field>
  );
}
