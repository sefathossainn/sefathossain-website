import "server-only";

/**
 * Optional owner notification via Resend. No-ops unless RESEND_API_KEY is set
 * and a recipient exists (CMS `lead_email`, else `LEAD_NOTIFY_EMAIL`). The lead
 * is always saved regardless — a mail failure never fails the submission.
 */
export async function notifyOwner(
  subject: string,
  text: string,
  recipient?: string | null,
  replyTo?: string | null,
): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = (recipient || process.env.LEAD_NOTIFY_EMAIL || "").trim();
  if (!key || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Verified sending domain in Resend.
        from: "Sefat Hossain <notifications@sefathossain.com>",
        to,
        subject,
        text,
        // Reply goes straight to the person who submitted the form.
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
  } catch {
    // swallow — notifications are best-effort
  }
}
