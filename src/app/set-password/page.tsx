"use client";

import * as React from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/brand/wordmark";

export default function SetPasswordPage() {
  const [ready, setReady] = React.useState(false);
  const [hasSession, setHasSession] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const sb = createSupabaseBrowserClient();
    (async () => {
      // PKCE links arrive with ?code=…; implicit links arrive with a #hash the
      // browser client parses automatically. Handle both, then read the session.
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) await sb.auth.exchangeCodeForSession(code);
      } catch {
        /* fall through to getSession */
      }
      const {
        data: { session },
      } = await sb.auth.getSession();
      setHasSession(Boolean(session));
      setReady(true);
    })();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 10) {
      setError("Use at least 10 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }
    setLoading(true);
    setError(null);
    const sb = createSupabaseBrowserClient();
    const { error } = await sb.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setTimeout(() => window.location.assign("/admin"), 900);
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="glow-core pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2"
      />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <Wordmark href="/" />
          <p className="kicker mt-4 justify-center">Set your password</p>
        </div>

        {!ready ? (
          <div className="panel h-64 animate-pulse" />
        ) : done ? (
          <div className="panel p-8 text-center">
            <p className="kicker kicker-emerald mb-3 justify-center">All set</p>
            <p className="text-sage">Signing you in…</p>
          </div>
        ) : hasSession ? (
          <form onSubmit={onSubmit} className="panel grid gap-5 p-8">
            <p className="text-sm text-sage">
              Choose a password for your admin account.
            </p>
            <Field label="New password" htmlFor="pw">
              <Input
                id="pw"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            <Field label="Confirm password" htmlFor="pw2">
              <Input
                id="pw2"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </Field>
            {error && (
              <p className="text-sm text-[#e88c7d]" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? "Saving…" : "Set password & sign in"}
            </Button>
          </form>
        ) : (
          <div className="panel p-8 text-center">
            <p className="text-sage">
              This invite link is invalid or has expired. Ask the site owner to
              send a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
