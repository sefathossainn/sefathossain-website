import { z } from "zod";

/**
 * Shared zod schemas for the lead + audit forms. Used on both the client
 * (react-hook-form resolver) and the server route (authoritative check).
 * `company` is a honeypot — real users never see it; bots fill it.
 */

export const NEEDS = ["Build", "Secure", "Grow", "Not sure"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Your name helps me reply.").max(120),
  email: z.email("Enter a valid email so I can reply."),
  need: z.enum(NEEDS).optional(),
  message: z
    .string()
    .trim()
    .min(1, "Tell me a little about what's going on.")
    .max(4000),
  source_page: z.string().max(120).optional(),
  company: z.string().max(0).optional(), // honeypot
});

export const auditSchema = z.object({
  name: z.string().trim().min(1, "Your name helps me reply.").max(120),
  email: z.email("Enter a valid email so I can send your report."),
  website_url: z
    .string()
    .trim()
    .min(3, "Which site should I check?")
    .max(300),
  company: z.string().max(0).optional(), // honeypot
});

export type LeadInput = z.infer<typeof leadSchema>;
export type AuditInput = z.infer<typeof auditSchema>;

/** Normalise a user-typed URL to include a protocol. */
export function normalizeUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return v;
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}
