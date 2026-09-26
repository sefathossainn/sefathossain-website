"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { primaryNav, primaryCta } from "@/lib/site-config";
import { serviceAreas } from "@/lib/service-areas";
import { cn } from "@/lib/utils";

/** Top services surfaced in the Service Areas mega-menu (left column). */
const areaServices = [
  {
    name: "WordPress Malware Removal",
    href: "/services/wordpress-malware-removal",
    desc: "Remove malware, backdoors & redirects, then harden.",
  },
  {
    name: "Hacked Site Recovery",
    href: "/services/hacked-wordpress-recovery",
    desc: "Full investigation, cleanup & verification.",
  },
  {
    name: "Security Hardening",
    href: "/services/wordpress-security-hardening",
    desc: "Close the doors before anyone finds them.",
  },
];

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none">
      <path
        d="M12 3 5 6v5.5c0 4 2.9 7.4 7 8.5 4.1-1.1 7-4.5 7-8.5V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-3.5 w-3.5", className)}
      aria-hidden
      fill="none"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader({
  profilePhoto,
  brandName,
  brandTitle,
}: {
  profilePhoto?: string | null;
  brandName?: string | null;
  brandTitle?: string | null;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [areasOpen, setAreasOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  React.useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-soft)]",
        scrolled || open || areasOpen
          ? "border-b border-line/80 bg-obsidian/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-brand flex h-18 items-center justify-between md:h-20">
        <BrandLogo photo={profilePhoto} name={brandName} title={brandTitle} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) =>
            item.href === "/service-areas" ? (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setAreasOpen(true)}
                onMouseLeave={() => setAreasOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                    isActive(item.href)
                      ? "text-mist"
                      : "text-sage hover:text-mist",
                  )}
                >
                  {item.label}
                  <Chevron className="transition-transform duration-300 group-hover:rotate-180" />
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3.5 -bottom-px h-px bg-emerald"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </Link>

                {/* Mega-menu */}
                <div className="invisible absolute left-1/2 top-full z-50 w-[min(92vw,44rem)] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="grid gap-6 rounded-[var(--radius-xl)] border border-line/80 bg-obsidian/95 p-6 shadow-2xl backdrop-blur-xl md:grid-cols-[1fr_1.2fr]">
                    {/* By service */}
                    <div>
                      <p className="kicker text-slate">By service</p>
                      <ul className="mt-4 grid gap-1">
                        {areaServices.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-forest/40"
                            >
                              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-emerald/30 bg-emerald/10 text-emerald">
                                <ShieldIcon />
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-mist">
                                  {s.name}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-slate">
                                  {s.desc}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* By area */}
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="kicker text-slate">By area — United States</p>
                        <Link
                          href="/service-areas"
                          className="text-xs font-medium text-emerald hover:underline"
                        >
                          View all →
                        </Link>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                        {serviceAreas.map((a) => (
                          <Link
                            key={a.slug}
                            href={`/service-areas/${a.slug}`}
                            className="rounded-md px-2 py-1.5 text-sm text-sage transition-colors hover:bg-forest/40 hover:text-emerald"
                          >
                            {a.city}, {a.stateAbbr}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                  isActive(item.href)
                    ? "text-mist"
                    : "text-sage hover:text-mist",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-px h-px bg-emerald"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={primaryCta.href}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Free audit
          </Button>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-line text-mist md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <span
                className={cn(
                  "h-px w-5 bg-current transition-transform duration-300",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-current transition-transform duration-300",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="container-brand max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line/70 pb-8 pt-2 md:hidden"
          >
            <nav className="flex flex-col">
              {primaryNav.map((item) =>
                item.href === "/service-areas" ? (
                  <div
                    key={item.href}
                    className="border-b border-line/50 py-4"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "font-display text-2xl tracking-tight",
                        isActive(item.href) ? "text-mist" : "text-sage",
                      )}
                    >
                      {item.label}
                    </Link>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {serviceAreas.map((a) => (
                        <Link
                          key={a.slug}
                          href={`/service-areas/${a.slug}`}
                          className="rounded-full border border-line px-3 py-1.5 text-sm text-sage transition-colors hover:border-emerald hover:text-emerald"
                        >
                          {a.city}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border-b border-line/50 py-4 font-display text-2xl tracking-tight",
                      isActive(item.href) ? "text-mist" : "text-sage",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <Button
              href={primaryCta.href}
              variant="primary"
              size="lg"
              className="mt-6 w-full"
            >
              {primaryCta.label}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
