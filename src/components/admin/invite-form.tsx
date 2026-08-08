"use client";

import * as React from "react";
import { createAdmin } from "@/app/admin/(panel)/users/actions";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/admin/permissions";
import { Field, Input, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const ROLE_HELP: Record<Role, string> = {
  super_admin: "Full access, including managing other admins.",
  admin: "All content, leads, and settings. Cannot manage other admins.",
  seo_expert: "Per-page SEO & H1, Blog, and Site Settings → SEO defaults only.",
  editor: "Blog, Case Studies (edit, no delete), and Testimonials.",
};

type Outcome = { kind: "invite"; link: string | null } | { kind: "password" };

export function InviteForm() {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState<Role>("editor");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [outcome, setOutcome] = React.useState<Outcome | null>(null);
  const [copied, setCopied] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await createAdmin({ email, name, role, password: password || undefined });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Could not create the account.");
      return;
    }
    setOutcome(password ? { kind: "password" } : { kind: "invite", link: res.inviteLink ?? null });
  };

  if (outcome) {
    return (
      <div className="panel max-w-2xl p-8">
        <p className="kicker kicker-emerald mb-3">Account created</p>
        {outcome.kind === "password" ? (
          <>
            <h3 className="font-display text-xl font-semibold text-mist">
              {email} can now sign in
            </h3>
            <p className="mt-2 text-sm text-sage">
              Share the password you set with them securely. They can change it
              from their own account.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-display text-xl font-semibold text-mist">
              Send {email} their set-up link
            </h3>
            <p className="mt-2 text-sm text-sage">
              They open this one-time link and choose their own password.
            </p>
            {outcome.link && (
              <div className="mt-5 flex gap-2">
                <Input readOnly value={outcome.link} onFocus={(e) => e.target.select()} />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(outcome.link!);
                      setCopied(true);
                    } catch {
                      /* ignore */
                    }
                  }}
                  className="shrink-0 rounded-xl border border-line px-4 text-sm text-mist hover:border-evergreen"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </>
        )}
        <div className="mt-6">
          <Button href="/admin/users" variant="secondary">
            Back to team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-lg gap-5">
      <Field label="Email" htmlFor="email">
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Name" htmlFor="name">
        <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Role" htmlFor="role">
        <Select id="role" value={role} onChange={(e) => setRole(e.target.value as Role)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </Select>
        <p className="mt-1 text-xs text-slate">{ROLE_HELP[role]}</p>
      </Field>
      <Field label="Password" htmlFor="password" optional>
        <Input
          id="password"
          type="text"
          autoComplete="off"
          placeholder="Set a password, or leave blank to send an invite link"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="mt-1 text-xs text-slate">
          Min 10 characters. Leave blank and they&rsquo;ll set their own via a
          one-time link.
        </p>
      </Field>

      {error && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {error}
        </p>
      )}

      <div>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
