"use client";

import * as React from "react";

const circle =
  "grid h-10 w-10 place-items-center rounded-full border border-line text-sage transition-colors hover:border-emerald hover:text-emerald";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      {children}
    </svg>
  );
}

/** Social + copy-link share row for a blog post. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = React.useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: (
      <Icon><path d="M18.9 1.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.1 1.5h6.8l4.7 6.2 6.3-6.2Zm-1.2 18.1h1.8L7.1 3.3H5.2l12.5 16.3Z" /></Icon>
    ) },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: (
      <Icon><path d="M14 8.5V6.8c0-.8.2-1.2 1.3-1.2H17V2.7c-.5-.1-1.5-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.4v1.6H7.5v3h2.6V21h3.6v-9.5h2.5l.4-3H14Z" /></Icon>
    ) },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: (
      <Icon><path d="M4.9 3.5A1.9 1.9 0 1 0 5 7.3a1.9 1.9 0 0 0-.1-3.8ZM3.3 8.7h3.2V21H3.3V8.7Zm5.2 0h3.1v1.7h.05c.43-.8 1.5-1.7 3.05-1.7 3.25 0 3.85 2.1 3.85 4.9V21h-3.2v-5.6c0-1.3 0-3-1.85-3-1.85 0-2.1 1.4-2.1 2.9V21H8.5V8.7Z" /></Icon>
    ) },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: (
      <Icon><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.6-.9 2 0 .5.4 1.8 1.7 3.3 1.8 2.2 3.3 2.9 4.1 3.1.6.2 1 .1 1.3.1.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.5-.3Z" /></Icon>
    ) },
    { label: "Share by email", href: `mailto:?subject=${t}&body=${u}`, icon: (
      <Icon><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.1 8-5.1H4l8 5.1ZM4 8.2V17h16V8.2l-7.5 4.8a1 1 0 0 1-1 0L4 8.2Z" /></Icon>
    ) },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="kicker mr-1 text-slate">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={l.label}
          title={l.label}
          className={circle}
        >
          {l.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-sage transition-colors hover:border-emerald hover:text-emerald"
      >
        <Icon>
          <path d="M9.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1.2 1.2 1.4 1.4L14 7a1.54 1.54 0 0 1 2.2 2.2l-3 3a1.54 1.54 0 0 1-2.2 0 1 1 0 0 0-1.5 1.3Zm5-3a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1.2-1.2-1.4-1.4L10 17a1.54 1.54 0 0 1-2.2-2.2l3-3a1.54 1.54 0 0 1 2.2 0 1 1 0 0 0 1.5-1.3Z" />
        </Icon>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
