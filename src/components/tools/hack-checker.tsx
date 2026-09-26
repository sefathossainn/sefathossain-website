"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Weight = 3 | 2 | 1;
type Answer = "yes" | "unsure" | "no";

const QUESTIONS: { id: string; text: string; weight: Weight }[] = [
  {
    id: "redirects",
    text: "Are visitors being redirected to unfamiliar sites — especially on mobile or when arriving from Google?",
    weight: 3,
  },
  {
    id: "google-warning",
    text: "Does Google show a “this site may be harmful / hacked” label, or has your traffic suddenly collapsed?",
    weight: 3,
  },
  {
    id: "unknown-admins",
    text: "Are there administrator accounts or users you don’t recognize?",
    weight: 3,
  },
  {
    id: "locked-out",
    text: "Have you been locked out of wp-admin, or did a password change without you doing it?",
    weight: 3,
  },
  {
    id: "spam-pages",
    text: "Are pages you never published showing up in Google — often in another language, or selling products you don’t sell?",
    weight: 3,
  },
  {
    id: "host-warning",
    text: "Has your host warned you about malware or outbound spam, or suspended the account?",
    weight: 3,
  },
  {
    id: "unknown-files",
    text: "Are there files you didn’t create, or core files that changed without an update?",
    weight: 2,
  },
  {
    id: "injected-content",
    text: "Do you see spam text, pop-ups, or ads on the site that you didn’t add?",
    weight: 2,
  },
  {
    id: "slow",
    text: "Has the site suddenly become slow, or is server resource usage spiking for no clear reason?",
    weight: 1,
  },
  {
    id: "nulled",
    text: "Did the problems start after installing a nulled (pirated) theme or plugin?",
    weight: 2,
  },
];

const SCORE: Record<Answer, number> = { yes: 1, unsure: 0.5, no: 0 };
const MAX = QUESTIONS.reduce((s, q) => s + q.weight, 0);

type Level = {
  key: "clear" | "low" | "medium" | "high";
  title: string;
  tone: string;
  body: string;
  steps: string[];
};

function verdict(pct: number, anyStrong: boolean): Level {
  if (pct === 0) {
    return {
      key: "clear",
      title: "No obvious signs of a hack",
      tone: "text-signal border-signal/40",
      body: "None of the common compromise signals are showing. That’s reassuring — but it isn’t a guarantee, since the quietest malware hides on purpose. If anything still feels off, a proper scan is the only way to be sure.",
      steps: [
        "Keep WordPress core, themes, and plugins updated.",
        "Use strong passwords and enable two-factor login.",
        "Make sure you have working, off-site backups.",
      ],
    };
  }
  if (pct >= 45 || anyStrong) {
    return {
      key: "high",
      title: "Your site shows strong signs of a compromise",
      tone: "text-[#e88c7d] border-[#e88c7d]/40",
      body: "Several signals point to a likely hack. Time matters here — the longer it runs, the more damage it does to your visitors, your reputation, and your search rankings. Don’t panic-delete files (that destroys the evidence needed to find the entry point).",
      steps: [
        "Take a full backup of the site as it is now, before changing anything.",
        "Change every password (WordPress, hosting, database, FTP) and rotate security keys.",
        "Avoid deleting files at random — find how it got in first.",
        "Get it cleaned and hardened properly so it doesn’t come back.",
      ],
    };
  }
  if (pct >= 20) {
    return {
      key: "medium",
      title: "Possible compromise — worth investigating",
      tone: "text-mist border-emerald/40",
      body: "Some signals are present. It may be a compromise, or it may be something benign — but it’s worth a proper look rather than waiting to see if it gets worse.",
      steps: [
        "Back up the site before making changes.",
        "Check your users, recent file changes, and Google Search Console → Security Issues.",
        "Run a thorough scan across core, themes, plugins, and the database.",
      ],
    };
  }
  return {
    key: "low",
    title: "Low risk, but keep an eye on it",
    tone: "text-sage border-line",
    body: "Only minor signals are showing. It’s probably fine, but the symptoms you flagged are worth confirming — some compromises start small and quiet.",
    steps: [
      "Update everything and review who has admin access.",
      "Confirm you have recent, working backups.",
      "Re-check if anything changes, and scan if you’re unsure.",
    ],
  };
}

export function HackChecker() {
  const [answers, setAnswers] = React.useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const result = React.useMemo(() => {
    const raw = QUESTIONS.reduce(
      (s, q) => s + (SCORE[answers[q.id]] ?? 0) * q.weight,
      0,
    );
    const pct = (raw / MAX) * 100;
    const anyStrong = QUESTIONS.some(
      (q) => q.weight === 3 && answers[q.id] === "yes",
    );
    return verdict(pct, anyStrong);
  }, [answers]);

  function set(id: string, a: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: a }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div>
      {!submitted && (
        <>
          <ol className="grid gap-5">
            {QUESTIONS.map((q, i) => (
              <li
                key={q.id}
                className="rounded-[var(--radius-xl)] border border-line bg-forest/30 p-5 md:p-6"
              >
                <p className="text-mist">
                  <span className="mr-2 font-mono text-sm text-emerald">
                    {i + 1}.
                  </span>
                  {q.text}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(["yes", "unsure", "no"] as Answer[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => set(q.id, a)}
                      aria-pressed={answers[q.id] === a}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm capitalize transition-colors",
                        answers[q.id] === a
                          ? "border-emerald bg-emerald/15 text-mist"
                          : "border-line text-sage hover:border-evergreen hover:text-mist",
                      )}
                    >
                      {a === "unsure" ? "Not sure" : a}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => {
                setSubmitted(true);
                requestAnimationFrame(() =>
                  resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                );
              }}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-medium transition",
                allAnswered
                  ? "bg-emerald text-obsidian hover:opacity-90"
                  : "cursor-not-allowed border border-line text-slate",
              )}
            >
              See my result
            </button>
            <span className="text-sm text-slate">
              {answeredCount} / {QUESTIONS.length} answered
            </span>
          </div>
        </>
      )}

      {submitted && (
        <div ref={resultRef}>
          <div
            className={cn(
              "rounded-[var(--radius-xl)] border bg-forest/40 p-7 md:p-9",
              result.tone,
            )}
          >
            <p className="kicker text-emerald">Your result</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-mist md:text-3xl">
              {result.title}
            </h2>
            <p className="mt-4 leading-relaxed text-sage">{result.body}</p>

            <h3 className="mt-7 font-display text-lg font-semibold text-mist">
              What to do next
            </h3>
            <ul className="mt-4 grid gap-3">
              {result.steps.map((s) => (
                <li key={s} className="flex gap-3 text-mist/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-emerald" />
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/security-audit"
                className="inline-flex items-center justify-center rounded-full bg-emerald px-6 py-3.5 font-medium text-obsidian transition hover:opacity-90"
              >
                Get a free security assessment
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium text-mist transition hover:border-emerald hover:text-emerald"
              >
                Talk to me about it
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm text-emerald hover:underline"
          >
            ← Start over
          </button>

          <p className="mt-6 text-xs leading-relaxed text-slate">
            This self-check is a guide based on the symptoms you reported, not a
            live scan of your site — it can’t see hidden or cloaked malware. If
            anything is uncertain, a proper security review is the only way to
            know for sure.
          </p>
        </div>
      )}
    </div>
  );
}
