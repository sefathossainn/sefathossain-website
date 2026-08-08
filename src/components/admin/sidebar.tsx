"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/(panel)/actions";
import {
  canAccessSection,
  ROLE_LABELS,
  type Role,
  type Section,
} from "@/lib/admin/permissions";

type Item = { label: string; href: string; section: Section };

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/admin", section: "dashboard" }],
  },
  {
    title: "Content",
    items: [
      { label: "Pages", href: "/admin/pages", section: "pages" },
      { label: "Case Studies", href: "/admin/c/case-studies", section: "case-studies" },
      { label: "Projects", href: "/admin/c/projects", section: "projects" },
      { label: "Blog", href: "/admin/c/blog", section: "blog" },
      { label: "Testimonials", href: "/admin/c/testimonials", section: "testimonials" },
      { label: "Services", href: "/admin/c/services", section: "services" },
      { label: "FAQs", href: "/admin/c/faqs", section: "faqs" },
      { label: "Media", href: "/admin/media", section: "media" },
    ],
  },
  {
    title: "Inbox",
    items: [
      { label: "Leads", href: "/admin/leads", section: "leads" },
      { label: "Audit Requests", href: "/admin/audit", section: "audit" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Appearance", href: "/admin/appearance", section: "appearance" },
      { label: "Site Settings", href: "/admin/settings", section: "settings" },
      { label: "Team", href: "/admin/users", section: "users" },
    ],
  },
];

export function AdminSidebar({
  identity,
}: {
  identity: {
    email?: string | null;
    username?: string | null;
    role: Role;
  };
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const groups = GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) => canAccessSection(identity.role, i.section)),
  })).filter((g) => g.items.length > 0);

  return (
    <aside className="flex h-full flex-col gap-6 overflow-y-auto border-r border-line/70 bg-forest/30 p-5">
      <Link href="/admin" className="font-display text-lg font-semibold">
        Sefat Hossain<span className="text-emerald">.</span>
        <span className="kicker ml-2 text-slate">CMS</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-6">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="kicker mb-2 text-slate">{g.title}</p>
            <ul className="grid gap-0.5">
              {g.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive(item.href)
                        ? "bg-pine text-mist"
                        : "text-sage hover:bg-pine/50 hover:text-mist",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="grid gap-2 border-t border-line/70 pt-4">
        <div className="px-3 pb-1">
          <p className="truncate text-sm text-mist">
            {identity.username ?? identity.email ?? "Admin"}
          </p>
          <p className="kicker text-slate">{ROLE_LABELS[identity.role]}</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="rounded-lg px-3 py-2 text-sm text-sage transition-colors hover:text-mist"
        >
          View site ↗
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-sage transition-colors hover:text-[#e88c7d]"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
