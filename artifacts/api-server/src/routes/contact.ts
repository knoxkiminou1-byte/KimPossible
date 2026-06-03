import { Router } from "express";
import { z } from "zod";

const router = Router();

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  inquiryType: z.enum(["speaking", "press", "book", "basketball", "other"]),
  organization: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  dateWindow: z.string().optional(),
  talkTheme: z.string().optional(),
});

router.post("/contact", async (req, res) => {
  try {
    const data = contactFormSchema.parse(req.body);

    req.log.info({ inquiryType: data.inquiryType, subject: data.subject }, "Contact form submission received");

    if (process.env.GMAIL_APP_PASSWORD) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "knoxkiminou1@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const inquiryTypeMap: Record<string, string> = {
        speaking: "Speaking / Appearance",
        press: "Press / Media",
        book: "Book / Author",
        basketball: "Basketball / Athlete",
        other: "Other",
      };
      const inquiryTypeDisplay = inquiryTypeMap[data.inquiryType] || data.inquiryType;

      let additionalFields = "";
      if (data.organization) additionalFields += `<p><strong>Organization:</strong> ${data.organization}</p>`;
      if (data.dateWindow) additionalFields += `<p><strong>Date Window:</strong> ${data.dateWindow}</p>`;
      if (data.talkTheme) additionalFields += `<p><strong>Talk Theme:</strong> ${data.talkTheme}</p>`;

      await transporter.sendMail({
        from: process.env.GMAIL_USER || "knoxkiminou1@gmail.com",
        to: "knoxkiminou1@gmail.com",
        subject: `[${inquiryTypeDisplay}] ${data.subject}`,
        replyTo: data.email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Inquiry Type:</strong> ${inquiryTypeDisplay}</p>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          ${additionalFields}
          <hr />
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    req.log.error(error, "Error processing contact form");
    res.status(500).json({ error: "Failed to process message" });
  }
});

router.get("/seo-data", (_req, res) => {
  res.json({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Kiminou Knox?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kiminou Knox is a 6'7 basketball player, entrepreneur, and 7-time published author of African American, Jamaican, and Congolese descent.",
        },
      },
      {
        "@type": "Question",
        name: "What is Kiminou Knox's most famous book?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kiminou Knox is best known for 'The Spirit of Solomon' and developing the 'Black Boy Lie' literary universe.",
        },
      },
      {
        "@type": "Question",
        name: "What sports does Kiminou Knox play?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kiminou Knox is a 6'7 varsity basketball player who plays Forward/Center position.",
        },
      },
      {
        "@type": "Question",
        name: "How many books has Kiminou Knox written?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kiminou Knox has published 7 books including poetry collections and a children's storybook.",
        },
      },
    ],
  });
});

export default router;
