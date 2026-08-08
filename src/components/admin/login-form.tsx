"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const sb = createSupabaseBrowserClient();
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Full navigation so middleware picks up the fresh session cookie.
    window.location.assign(next);
  };

  return (
    <form onSubmit={onSubmit} className="panel grid gap-5 p-8">
      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Field>
      <Field label="Password" htmlFor="password">
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Field>

      {error && (
        <p className="text-sm text-[#e88c7d]" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
