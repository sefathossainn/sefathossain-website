import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

/**
 * Allow search crawlers AND the major AI answer-engine crawlers (GEO/AIO), so
 * the site can appear in Google/Bing and be cited by ChatGPT, Perplexity,
 * Gemini, and Claude. Only the private admin + API areas are disallowed.
 */
const AI_AGENTS = [
  "GPTBot", // OpenAI (ChatGPT) training/index
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // ChatGPT browsing
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Applebot-Extended",
  "CCBot", // Common Crawl (feeds many models)
  "cohere-ai",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(""),
  };
}
