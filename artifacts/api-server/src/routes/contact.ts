import { Router } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

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
});

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
  try {
    const data = contactFormSchema.parse(req.body);
    const inquiryTypeDisplay = inquiryTypeMap[data.inquiryType] || data.inquiryType;
    const fromAddress = process.env.GMAIL_USER || "knoxkiminou1@gmail.com";
    const toAddress = process.env.CONTACT_TO_EMAIL || "knoxkiminou1@gmail.com";

    if (data.website) {
      return res.status(200).json({ message: "Message received successfully" });
    }

    if (process.env.GMAIL_APP_PASSWORD) {
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
    } else {
      req.log.info({ name: data.name, email: data.email, inquiryType: data.inquiryType }, "Contact form submission (no email configured)");
    }

    res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    logger.error({ err: error }, "Contact form error");
    res.status(500).json({ error: "Failed to process message" });
  }
});

export default router;
