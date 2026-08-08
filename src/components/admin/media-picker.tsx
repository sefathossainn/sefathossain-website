"use client";

import * as React from "react";

type MediaItem = { id: string; url: string; alt?: string };

export function MediaPickerButton({
  onPick,
}: {
  onPick: (url: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch("/admin/media/list")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-xl border border-line px-4 text-sm text-mist transition-colors hover:border-evergreen"
      >
        Library
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/80 p-6 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <div
            className="panel max-h-[80vh] w-full max-w-3xl overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-mist">
                Media library
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate hover:text-mist"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-slate">Loading…</p>
            ) : items.length ? (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {items.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onPick(m.url);
                      setOpen(false);
                    }}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-line hover:border-emerald"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.url}
                      alt={m.alt ?? ""}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate">
                No media yet — upload images from the Media page.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
