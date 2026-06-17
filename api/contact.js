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
});

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

  try {
    const data = contactFormSchema.parse(parseBody(request));
    const inquiryTypeDisplay = inquiryTypeMap[data.inquiryType] || data.inquiryType;
    const fromAddress = process.env.GMAIL_USER || "knoxkiminou1@gmail.com";
    const toAddress = process.env.CONTACT_TO_EMAIL || "knoxkiminou1@gmail.com";

    if (data.website) {
      return response.status(200).json({ message: "Message received successfully" });
    }

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
