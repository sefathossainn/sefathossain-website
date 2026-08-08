import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Admin — Sefat Hossain" },
  robots: { index: false, follow: false },
};

/** Bare admin shell — no public nav/footer. The panel group adds the sidebar. */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-svh bg-obsidian text-mist">{children}</div>;
}
