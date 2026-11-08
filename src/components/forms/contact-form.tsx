"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, NEEDS, HACKED_NEED, type LeadInput } from "@/lib/validation";
import { leadAssurance } from "@/lib/site-config";
import { Field, Input, Textarea, Select, Honeypot } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { source_page: "contact" },
  });
  const [done, setDone] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // `/contact?type=hacked` (the emergency CTA) preselects the hacked option.
  // Read from window.location rather than useSearchParams so the page stays
  // prerendered with the form in the initial HTML (no Suspense bailout).
  React.useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (type === "hacked") {
      setValue("need", HACKED_NEED);
      setValue("source_page", "contact?type=hacked");
    }
  }, [setValue]);

  const isHacked = useWatch({ control, name: "need" }) === HACKED_NEED;

  const onSubmit = async (values: LeadInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
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
        <p className="kicker kicker-emerald mb-4 justify-center">Message sent</p>
        <h3 className="font-display text-2xl font-semibold text-mist">
          Thanks — I&rsquo;ll reply personally.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sage">
          I read every message myself. You&rsquo;ll hear back from me directly,
          usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative grid gap-5" noValidate>
      <Honeypot register={register("company")} />
      <input type="hidden" {...register("source_page")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <Field label="What do you need?" htmlFor="need" error={errors.need?.message} optional>
        <Select id="need" defaultValue="" {...register("need")}>
          <option value="" disabled>
            Choose one…
          </option>
          {NEEDS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
      </Field>

      {isHacked && (
        <div className="rounded-xl border border-[#e88c7d]/40 bg-[#e88c7d]/10 p-4 text-sm text-mist">
          <p className="font-medium">Hacked site — I&rsquo;ll prioritise this.</p>
          <p className="mt-1 text-sage">
            Include your site URL, what you&rsquo;re seeing (redirects, Google
            warning, host suspension) and who hosts it. Don&rsquo;t delete files
            yet; they help find how the attacker got in.
          </p>
        </div>
      )}

      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={5}
          placeholder={
            isHacked
              ? "Site URL, what you see, when it started, and your host."
              : "Tell me what's going on — a new build, a hacked site, or ongoing care."
          }
          {...register("message")}
        />
      </Field>

      {serverError && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-slate">
          I reply personally — no bots. {leadAssurance.responseTime}.
        </p>
      </div>
    </form>
  );
}
