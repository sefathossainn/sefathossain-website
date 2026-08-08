import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 font-medium " +
  "rounded-full whitespace-nowrap transition-[background,border,color,transform,box-shadow] " +
  "duration-300 ease-[var(--ease-out-soft)] select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<Variant, string> = {
  // Signal green is reserved for CTAs only (Brand Guide §03).
  primary:
    "bg-signal text-obsidian font-semibold shadow-[0_0_0_1px_rgba(39,161,101,0.35),0_10px_40px_-12px_rgba(39,161,101,0.55)] " +
    "hover:bg-[#2fb673] hover:shadow-[0_0_0_1px_rgba(39,161,101,0.5),0_14px_50px_-10px_rgba(39,161,101,0.7)]",
  secondary:
    "border border-line bg-transparent text-mist hover:border-evergreen hover:bg-pine/60",
  ghost: "bg-transparent text-sage hover:text-mist",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, keyof CommonProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const external = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
