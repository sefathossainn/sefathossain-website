import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/brand/wordmark";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="glow-core pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2"
      />
      <div className="absolute left-0 right-0 top-8 flex justify-center">
        <Wordmark href="/" />
      </div>

      <p className="kicker mb-6 justify-center">Error 404</p>
      <h1 className="text-hero font-display font-semibold [font-size:clamp(2.4rem,1.4rem+4vw,4.5rem)]">
        This page went <span className="text-emerald">quiet.</span>
      </h1>
      <p className="mt-5 max-w-md text-sage">
        The link may be old or the page moved. Everything else is exactly where
        you left it.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary" size="lg">
          Back home
        </Button>
        <Button href="/work" variant="secondary" size="lg">
          View the work
        </Button>
      </div>

      <p className="absolute bottom-8 text-xs text-slate">
        <span className="kicker text-slate">Site by </span>
        <Link
          href="https://mohammademmon.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-sage hover:text-emerald"
        >
          Mohammad Emmon
        </Link>
      </p>
    </div>
  );
}
