const nodemailer = require("nodemailer");
const { z } = require("zod");

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
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request) {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) return forwarded.split(",")[0].trim();
  return request.socket?.remoteAddress || "unknown";
}

async function verifyTurnstile(token, ip) {
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  const result = await response.json();
  return result.success === true;
}

const inquiryTypeMap = {
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

function parseBody(request) {
  if (!request.body) {
    return {};
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body);
  }

  return request.body;
}

function isInvalidJsonError(error) {
  return error instanceof SyntaxError || (error?.statusCode === 400 && error?.message === "Invalid JSON");
}

function isSmtpAuthError(error) {
  return error?.code === "EAUTH" || error?.responseCode === 535;
}

async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return response.status(429).json({ error: "Too many requests. Please try again later." });
  }

  try {
    const data = contactFormSchema.parse(parseBody(request));

    if (data.website) {
      // Honeypot tripped — pretend success so the bot doesn't adapt.
      return response.status(200).json({ message: "Message received successfully" });
    }

    if (!(await verifyTurnstile(data.turnstileToken, ip))) {
      return response.status(403).json({ error: "Verification failed. Please try again." });
    }

    const inquiryTypeDisplay = inquiryTypeMap[data.inquiryType] || data.inquiryType;
    const fromAddress = process.env.GMAIL_USER || "knoxkiminou1@gmail.com";
    const toAddress = process.env.CONTACT_TO_EMAIL || "knoxkiminou1@gmail.com";

    if (!process.env.GMAIL_APP_PASSWORD) {
      return response.status(503).json({
        error: "Email delivery is not configured",
        fallbackEmail: toAddress,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromAddress,
        pass: process.env.GMAIL_APP_PASSWORD,
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

    return response.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    if (isInvalidJsonError(error)) {
      return response.status(400).json({ error: "Invalid JSON body" });
    }

    if (error instanceof z.ZodError) {
      return response.status(400).json({ error: "Invalid form data", details: error.errors });
    }

    if (isSmtpAuthError(error)) {
      console.warn("Contact form email delivery failed due to SMTP authentication.");
      return response.status(503).json({
        error: "Email delivery is unavailable",
        fallbackEmail: process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER || "knoxkiminou1@gmail.com",
      });
    }

    console.error("Contact form error", error);
    return response.status(500).json({ error: "Failed to process message" });
  }
}

module.exports = handler;
