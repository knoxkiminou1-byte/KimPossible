import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  inquiryType: z.enum(["speaking", "press", "book", "basketball", "other"], {
    required_error: "Please select an inquiry type",
  }),
  organization: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  dateWindow: z.string().optional(),
  talkTheme: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const validatedData = contactFormSchema.parse(req.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'knoxkiminou1@gmail.com',
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
    const inquiryTypeDisplay = inquiryTypeMap[validatedData.inquiryType] || validatedData.inquiryType;

    let additionalFields = '';
    if (validatedData.organization) {
      additionalFields += `<p><strong>Organization:</strong> ${validatedData.organization}</p>`;
    }
    if (validatedData.dateWindow) {
      additionalFields += `<p><strong>Date Window:</strong> ${validatedData.dateWindow}</p>`;
    }
    if (validatedData.talkTheme) {
      additionalFields += `<p><strong>Talk Theme:</strong> ${validatedData.talkTheme}</p>`;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || 'knoxkiminou1@gmail.com',
      to: 'knoxkiminou1@gmail.com',
      subject: `[${inquiryTypeDisplay}] ${validatedData.subject}`,
      replyTo: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Inquiry Type:</strong> ${inquiryTypeDisplay}</p>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        ${additionalFields}
        <hr />
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid form data", details: error.errors });
    }
    console.error("Error sending contact email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
