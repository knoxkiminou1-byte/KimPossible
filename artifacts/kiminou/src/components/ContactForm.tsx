import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactForm as ContactFormType } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  defaultInquiryType?: "speaking" | "press" | "book" | "basketball" | "other";
  title?: string;
  description?: string;
  showOrganization?: boolean;
  showSpeakingFields?: boolean;
  successMessage?: string;
  className?: string;
  compact?: boolean;
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

function useTurnstile(onToken: (token: string) => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !containerRef.current) return;

    const render = () => {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: onToken,
      });
    };

    if (window.turnstile) {
      render();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
    const script = existing ?? document.createElement("script");
    if (!existing) {
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.dataset.turnstile = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", render, { once: true });
    return () => script.removeEventListener("load", render);
  }, [onToken]);

  const reset = () => {
    if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
  };

  return { containerRef, reset };
}

export default function ContactForm({
  defaultInquiryType = "other",
  title = "Get in Touch",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
  showOrganization = false,
  showSpeakingFields = false,
  successMessage = "Thank you for your message. We will be in touch soon.",
  className = "",
  compact = false,
}: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: defaultInquiryType,
      organization: "",
      subject: "",
      message: "",
      dateWindow: "",
      talkTheme: "",
      website: "",
      turnstileToken: "",
    },
  });

  const { containerRef: turnstileRef, reset: resetTurnstile } = useTurnstile((token) =>
    form.setValue("turnstileToken", token),
  );

  const inquiryType = form.watch("inquiryType");
  const shouldShowOrganization = showOrganization || inquiryType === "press" || inquiryType === "speaking";
  const shouldShowSpeakingFields = showSpeakingFields || inquiryType === "speaking";

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await response.json().catch(() => null);

      if (response.ok) {
        toast({
          title: "Message sent successfully",
          description: successMessage,
        });
        form.reset({
          name: "",
          email: "",
          inquiryType: data.inquiryType,
          organization: "",
          subject: "",
          message: "",
          dateWindow: "",
          talkTheme: "",
          website: "",
          turnstileToken: "",
        });
        resetTurnstile();
      } else if (body?.fallbackEmail) {
        toast({
          title: "Message delivery is temporarily unavailable",
          description: `Please email us directly at ${body.fallbackEmail}`,
          variant: "destructive",
        });
      } else if (response.status === 429) {
        toast({
          title: "Too many messages",
          description: "Please wait a few minutes before sending another message.",
          variant: "destructive",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly at knoxkiminou1@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="font-serif text-3xl font-bold mb-4" data-testid="contact-form-title">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground" data-testid="contact-form-description">
              {description}
            </p>
          )}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot — hidden from real visitors, only bots that autofill every field trip it */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field blank</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" {...field} />
              </div>
            )}
          />

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} data-testid="input-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Inquiry Type — hidden in compact mode */}
          {!compact && (
            <FormField
              control={form.control}
              name="inquiryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inquiry Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-inquiry-type">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="speaking">Speaking / Appearance</SelectItem>
                      <SelectItem value="press">Press / Media</SelectItem>
                      <SelectItem value="book">Book / Author</SelectItem>
                      <SelectItem value="basketball">Basketball / Athlete</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Organization, Date Window, Talk Theme, Subject — hidden in compact mode */}
          {!compact && shouldShowOrganization && (
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your organization or affiliation" {...field} data-testid="input-organization" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!compact && shouldShowSpeakingFields && (
            <>
              <FormField
                control={form.control}
                name="dateWindow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date Window (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., March 2025" {...field} data-testid="input-date-window" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="talkTheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Talk Theme (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Youth Leadership, Creative Writing" {...field} data-testid="input-talk-theme" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {!compact && (
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief subject line" {...field} data-testid="input-subject" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={compact ? "Tell me about the event: audience, date, and what you want people to walk away with." : "Tell us more about your inquiry..."}
                    className={compact ? "min-h-[110px]" : "min-h-[150px]"}
                    {...field}
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            data-testid="button-submit-contact"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
