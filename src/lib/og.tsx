import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Branded 1200×630 Open Graph card, shared by service, city and blog pages so
 * every share preview shows the page's own title instead of one generic image.
 * Rendered with Satori (flexbox only). Fonts are vendored static .woff files
 * (Satori can't read woff2 / variable fonts) — see src/assets/og-fonts.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

const C = {
  obsidian: "#060c09",
  pine: "#10241a",
  emerald: "#1e7a4e",
  signal: "#27a165",
  mist: "#e9f0eb",
  sage: "#a7b8ad",
  line: "#223a2e",
};

async function fonts() {
  const dir = join(process.cwd(), "src/assets/og-fonts");
  const [display, body] = await Promise.all([
    readFile(join(dir, "space-grotesk-latin-600-normal.woff")),
    readFile(join(dir, "inter-latin-400-normal.woff")),
  ]);
  return [
    { name: "Space Grotesk", data: display, weight: 600 as const, style: "normal" as const },
    { name: "Inter", data: body, weight: 400 as const, style: "normal" as const },
  ];
}

export async function renderOgImage({
  kicker,
  title,
  subtitle,
}: {
  /** Small uppercase label, e.g. "SERVICE" or "ATLANTA, GA". */
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  // Long titles step down so they never overflow three lines.
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `radial-gradient(circle at 85% 15%, ${C.pine} 0%, ${C.obsidian} 60%)`,
          color: C.mist,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              background: C.signal,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              color: C.signal,
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 28, color: C.sage, maxWidth: 980, lineHeight: 1.35 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${C.line}`,
            paddingTop: 28,
          }}
        >
          <div style={{ fontFamily: "Space Grotesk", fontSize: 30 }}>
            Sefat Hossain
          </div>
          <div style={{ fontSize: 24, color: C.sage }}>
            WordPress Security Expert · sefathossain.com
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
