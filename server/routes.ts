import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBlogCategorySchema, 
  insertBlogPostSchema,
  contactFormSchema,
  type BlogPost,
  type BlogCategory 
} from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog Categories API
  app.get("/api/blog/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/blog/categories", async (req, res) => {
    try {
      const validatedData = insertBlogCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid category data", details: error.errors });
      }
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  app.put("/api/blog/categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(id, validatedData);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid category data", details: error.errors });
      }
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Failed to update category" });
    }
  });

  app.delete("/api/blog/categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteCategory(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // Blog Posts API
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { published, category, tag } = req.query;
      
      let posts: BlogPost[];
      
      if (published === "true") {
        posts = await storage.getPublishedPosts();
      } else if (category) {
        posts = await storage.getPostsByCategory(category as string);
      } else if (tag) {
        posts = await storage.getPostsByTag(tag as string);
      } else {
        posts = await storage.getPosts();
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/blog/posts/:identifier", async (req, res) => {
    try {
      const { identifier } = req.params;
      
      // Try to get by ID first, then by slug
      let post = await storage.getPost(identifier);
      if (!post) {
        post = await storage.getPostBySlug(identifier);
      }
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.post("/api/blog/posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid post data", details: error.errors });
      }
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.put("/api/blog/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updatePost(id, validatedData);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid post data", details: error.errors });
      }
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  app.delete("/api/blog/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deletePost(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Post publishing/unpublishing
  app.patch("/api/blog/posts/:id/publish", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.publishPost(id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error publishing post:", error);
      res.status(500).json({ error: "Failed to publish post" });
    }
  });

  app.patch("/api/blog/posts/:id/unpublish", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.unpublishPost(id);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error unpublishing post:", error);
      res.status(500).json({ error: "Failed to unpublish post" });
    }
  });

  // Contact form API
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Create transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER || 'knoxkiminou1@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });

      // Format inquiry type for display
      const inquiryTypeMap: Record<string, string> = {
        speaking: "Speaking / Appearance",
        press: "Press / Media",
        book: "Book / Author",
        basketball: "Basketball / Athlete",
        other: "Other"
      };
      const inquiryTypeDisplay = inquiryTypeMap[validatedData.inquiryType] || validatedData.inquiryType;

      // Build additional fields section if present
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

      // Email content
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

      // Send email
      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // FAQ Schema route for "People Also Ask" SEO
  app.get('/api/seo-data', (req, res) => {
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Kiminou Knox?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kiminou Knox is a Bay Area raised, New Orleans based author and poet. He is the author of ten books and host of KimYaps."
          }
        },
        {
          "@type": "Question",
          "name": "What is Kiminou Knox's most famous book?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kiminou Knox is best known for 'The Spirit of Solomon' and developing the 'Black Boy Lie' literary universe."
          }
        },
        {
          "@type": "Question",
          "name": "What sports does Kiminou Knox play?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kiminou Knox is currently pursuing athletics. Historical sports profiles document earlier high school basketball and football activity."
          }
        },
        {
          "@type": "Question",
          "name": "How many books has Kiminou Knox written?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kiminou Knox has published exactly ten distinct original books. Revised, remastered, and alternate editions are not counted as new original books."
          }
        }
      ]
    };
    res.json(faqData);
  });

  // Sitemap route for SEO
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://kiminouknox.com/</loc><priority>1.0</priority></url>
        <url><loc>https://kiminouknox.com/books</loc><priority>0.9</priority></url>
        <url><loc>https://kiminouknox.com/sports</loc><priority>0.9</priority></url>
        <url><loc>https://kiminouknox.com/speaking</loc><priority>0.8</priority></url>
        <url><loc>https://kiminouknox.com/author</loc><priority>0.9</priority></url>
        <url><loc>https://kiminouknox.com/contact</loc><priority>0.7</priority></url>
      </urlset>`);
  });

  const httpServer = createServer(app);

  return httpServer;
}
