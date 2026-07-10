import { Router } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";

const router = Router();

const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  inquiryType: z.enum(["speaking", "press", "book", "basketball", "other"]),
  organization: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
  dateWindow: z.string().optional(),
  talkTheme: z.string().optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: { headers: Record<string, unknown>; ip?: string }): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.ip || "unknown";
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  if (!process.env["TURNSTILE_SECRET_KEY"]) return true;
  if (!token) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env["TURNSTILE_SECRET_KEY"],
      response: token,
      remoteip: ip,
    }),
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

const inquiryTypeMap: Record<string, string> = {
  speaking: "Speaking / Appearance",
  press: "Press / Media",
  book: "Book / Author",
  basketball: "Basketball / Athlete",
  other: "Other",
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

router.post("/contact", async (req, res) => {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  try {
    const data = contactFormSchema.parse(req.body);

    if (data.website) {
      // Honeypot tripped — pretend success so the bot doesn't adapt.
      return res.status(200).json({ message: "Message received successfully" });
    }

    if (!(await verifyTurnstile(data.turnstileToken, ip))) {
      return res.status(403).json({ error: "Verification failed. Please try again." });
    }

    const inquiryTypeDisplay = inquiryTypeMap[data.inquiryType] || data.inquiryType;
    const fromAddress = process.env["GMAIL_USER"] || "knoxkiminou1@gmail.com";
    const toAddress = process.env["CONTACT_TO_EMAIL"] || "knoxkiminou1@gmail.com";

    if (!process.env["GMAIL_APP_PASSWORD"]) {
      return res.status(503).json({
        error: "Email delivery is not configured",
        fallbackEmail: toAddress,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromAddress,
        pass: process.env["GMAIL_APP_PASSWORD"],
      },
    });

    const extra = [
      data.organization && `<p><strong>Organization:</strong> ${escapeHtml(data.organization)}</p>`,
      data.dateWindow && `<p><strong>Date Window:</strong> ${escapeHtml(data.dateWindow)}</p>`,
      data.talkTheme && `<p><strong>Talk Theme:</strong> ${escapeHtml(data.talkTheme)}</p>`,
    ]
      .filter(Boolean)
      .join("");

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: `[${inquiryTypeDisplay}] ${data.subject || data.inquiryType}`,
      replyTo: data.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryTypeDisplay)}</p>
        <p><strong>From:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject || "")}</p>
        ${extra}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }

    const err = error as NodeJS.ErrnoException & { responseCode?: number };
    if (err?.code === "EAUTH" || err?.responseCode === 535) {
      req.log.warn("Contact form email delivery failed due to SMTP authentication.");
      return res.status(503).json({
        error: "Email delivery is unavailable",
        fallbackEmail: process.env["CONTACT_TO_EMAIL"] || process.env["GMAIL_USER"] || "knoxkiminou1@gmail.com",
      });
    }

    req.log.error({ err: error }, "Contact form error");
    return res.status(500).json({ error: "Failed to process message" });
  }
});

export default router;
