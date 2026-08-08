import { Suspense } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="glow-core pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2"
      />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <Wordmark href="/" />
          <p className="kicker mt-4 justify-center">Content management</p>
        </div>

        <Suspense fallback={<div className="panel h-72 animate-pulse" />}>
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-slate">
          Single admin access. Create the user in Supabase → Authentication.
        </p>
      </div>
    </div>
  );
}
