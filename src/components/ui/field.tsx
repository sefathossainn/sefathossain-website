import * as React from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border border-line bg-forest/60 px-4 py-3 text-mist " +
  "placeholder:text-slate transition-colors duration-200 " +
  "focus:border-evergreen focus:outline-none focus:ring-1 focus:ring-evergreen " +
  "disabled:opacity-50";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(controlBase, className)} {...props} />;
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(controlBase, "min-h-32 resize-y", className)}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(controlBase, "appearance-none", className)} {...props}>
      {children}
    </select>
  );
});

/** Label + control + error wrapper. */
export function Field({
  label,
  htmlFor,
  error,
  children,
  optional,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm text-sage">
        {label}
        {optional && <span className="kicker text-slate">optional</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Visually-hidden honeypot input — bots fill it, humans never see it. */
export function Honeypot({
  register,
}: {
  register: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}
