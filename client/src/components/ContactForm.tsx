import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactForm as ContactFormType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  defaultInquiryType?: "speaking" | "press" | "book" | "basketball" | "other";
  title?: string;
  description?: string;
  showOrganization?: boolean;
  showSpeakingFields?: boolean;
  successMessage?: string;
  className?: string;
}

export default function ContactForm({
  defaultInquiryType = "other",
  title = "Get in Touch",
  description = "Fill out the form below and we will get back to you as soon as possible.",
  showOrganization = false,
  showSpeakingFields = false,
  successMessage = "Thank you for your message. We will be in touch soon.",
  className = "",
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
    },
  });

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

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Message sent",
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
      });
    } catch {
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
        <div className="mb-8 max-w-2xl">
          {title && (
            <h2 className="mb-3 font-serif text-3xl font-light text-amber-50" data-testid="contact-form-title">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-amber-50/72" data-testid="contact-form-description">
              {description}
            </p>
          )}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} data-testid="input-name" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inquiryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Inquiry Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-inquiry-type" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50">
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

          {shouldShowOrganization && (
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Organization (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization or affiliation" {...field} data-testid="input-organization" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {shouldShowSpeakingFields && (
            <>
              <FormField
                control={form.control}
                name="dateWindow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Preferred Date Window (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., September 2026" {...field} data-testid="input-date-window" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38" />
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
                    <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Talk Theme (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Theme focus" {...field} data-testid="input-talk-theme" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Brief subject line" {...field} data-testid="input-subject" className="h-12 rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.2em] text-amber-100/70">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[170px] rounded-xl border-amber-100/14 bg-black/35 text-amber-50 placeholder:text-amber-100/38"
                    {...field}
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-amber-100 text-black hover:bg-amber-50"
            data-testid="button-submit-contact"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
