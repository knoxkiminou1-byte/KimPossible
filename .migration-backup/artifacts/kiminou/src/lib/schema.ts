import { z } from "zod";

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  categoryId: string | null;
  isPublished: boolean | null;
  publishedAt: Date | null;
  featuredImage: string | null;
  readTime: number | null;
  tags: string[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type InsertBlogCategory = Omit<BlogCategory, "id" | "createdAt" | "updatedAt">;
export type InsertBlogPost = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

export const contactFormSchema = z.object({
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

export type ContactForm = z.infer<typeof contactFormSchema>;
