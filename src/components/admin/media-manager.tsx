"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { deleteRecord } from "@/lib/admin/mutations";

type MediaItem = { id: string; url: string; alt?: string };

export function MediaManager({ initial }: { initial: MediaItem[] }) {
  const router = useRouter();
  const [items, setItems] = React.useState(initial);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/admin/media/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setItems((prev) => [json.item, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Remove this image from the library?")) return;
    const res = await deleteRecord("media", id);
    if (res.ok) {
      setItems((prev) => prev.filter((m) => m.id !== id));
      router.refresh();
    } else {
      setError(res.error ?? "Delete failed");
    }
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <label className="inline-flex h-10 cursor-pointer items-center rounded-full bg-signal px-4 text-sm font-semibold text-obsidian transition-colors hover:bg-[#2fb673]">
          {uploading ? "Uploading…" : "Upload image"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {error && (
          <span className="text-sm text-[#e88c7d]" role="alert">
            {error}
          </span>
        )}
      </div>

      {items.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-lg border border-line">
              <div className="relative aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-2 p-2">
                <button
                  type="button"
                  onClick={() => copy(m.url)}
                  className="text-xs text-sage hover:text-mist"
                >
                  Copy URL
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(m.id)}
                  className="text-xs text-slate hover:text-[#e88c7d]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate">
          No media yet — upload your first image.
        </p>
      )}
    </div>
  );
}
