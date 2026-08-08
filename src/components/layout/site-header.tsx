"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { primaryNav, primaryCta } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
        scrolled || open
          ? "border-b border-line/80 bg-obsidian/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-brand flex h-18 items-center justify-between md:h-20">
        <BrandLogo photo={profilePhoto} name={brandName} title={brandTitle} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
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
          ))}
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
            className="container-brand border-t border-line/70 pb-8 pt-2 md:hidden"
          >
            <nav className="flex flex-col">
              {primaryNav.map((item) => (
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
              ))}
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
