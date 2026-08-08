"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditSchema, type AuditInput } from "@/lib/validation";
import { Field, Input, Honeypot } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function AuditForm({ calendarUrl }: { calendarUrl?: string | null }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuditInput>({ resolver: zodResolver(auditSchema) });
  const [done, setDone] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit = async (values: AuditInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setServerError("Network error — please email me directly.");
    }
  };

  if (done) {
    return (
      <div className="panel p-8 text-center md:p-10">
        <p className="kicker kicker-emerald mb-4 justify-center">Request received</p>
        <h3 className="font-display text-2xl font-semibold text-mist">
          Thanks — your audit is on its way.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sage">
          I&rsquo;ll review your site and send a plain-language report on
          what&rsquo;s exposed and what to fix. No obligation, no jargon.
        </p>
        {calendarUrl && (
          <Button href={calendarUrl} variant="secondary" size="lg" className="mt-7">
            Book a call while you wait
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative grid gap-5" noValidate>
      <Honeypot register={register("company")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="a-name" error={errors.name?.message}>
          <Input id="a-name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="a-email" error={errors.email?.message}>
          <Input id="a-email" type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <Field label="Website URL" htmlFor="a-url" error={errors.website_url?.message}>
        <Input
          id="a-url"
          inputMode="url"
          placeholder="yourwebsite.com"
          {...register("website_url")}
        />
      </Field>

      {serverError && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Get my free audit"}
        </Button>
        <p className="text-xs text-slate">
          Your details stay private — used only to run your audit.
        </p>
      </div>
    </form>
  );
}
