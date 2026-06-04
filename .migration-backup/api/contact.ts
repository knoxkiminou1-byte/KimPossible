import nodemailer from "nodemailer";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  inquiryType: z.enum(["speaking", "press", "book", "basketball", "other"]),
  organization: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
  dateWindow: z.string().optional(),
  talkTheme: z.string().optional()
});

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => {
    json: (body: unknown) => void;
    end: () => void;
  };
  setHeader: (name: string, value: string | string[]) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = contactFormSchema.parse(req.body);

    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "knoxkiminou1@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      const inquiryTypeMap: Record<string, string> = {
        speaking: "Speaking / Appearance",
        press: "Press / Media",
        book: "Book / Author",
        basketball: "Basketball / Athlete",
        other: "Other"
      };
      const inquiryTypeDisplay = inquiryTypeMap[data.inquiryType] || data.inquiryType;
      const extra = [
        data.organization && `<p><strong>Organization:</strong> ${data.organization}</p>`,
        data.dateWindow && `<p><strong>Date Window:</strong> ${data.dateWindow}</p>`,
        data.talkTheme && `<p><strong>Talk Theme:</strong> ${data.talkTheme}</p>`
      ]
        .filter(Boolean)
        .join("");

      await transporter.sendMail({
        from: process.env.GMAIL_USER || "knoxkiminou1@gmail.com",
        to: "knoxkiminou1@gmail.com",
        subject: `[${inquiryTypeDisplay}] ${data.subject || data.inquiryType}`,
        replyTo: data.email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Inquiry Type:</strong> ${inquiryTypeDisplay}</p>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject || ""}</p>
          ${extra}
          <hr />
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `
      });
    }

    return res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    console.error("Contact form error", error);
    return res.status(500).json({ error: "Failed to process message" });
  }
}
