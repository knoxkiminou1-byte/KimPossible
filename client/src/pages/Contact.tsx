import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Thank you for reaching out. I will get back to you soon."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or email directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Contact - Kiminou Knox</title>
        <meta name="description" content="Get in touch with Kiminou Knox for speaking engagements media inquiries or collaboration opportunities." />
        <link rel="canonical" href="https://kiminouknox.com/contact" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact - Kiminou Knox" />
        <meta property="og:description" content="Get in touch for speaking engagements and collaborations" />
        <meta property="og:url" content="https://kiminouknox.com/contact" />
        <meta property="og:image" content="https://kiminouknox.com/og/contact.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Kiminou Knox" />
        <meta name="twitter:description" content="Get in touch" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/contact.jpg" />
      </Helmet>

      <Header theme="maison" onThemeChange={() => {}} />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="contact-heading">
              Contact
            </h1>
            <p className="text-lg text-muted-foreground">
              Reach out for speaking engagements media inquiries or collaboration opportunities. For press materials visit the <Link href="/press-kit" className="underline hover:text-foreground transition-colors">press kit</Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Connect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Instagram</p>
                  <a href="https://instagram.com/hofkiminou" target="_blank" rel="noopener noreferrer external" className="hover:text-foreground transition-colors">
                    @hofkiminou
                  </a>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">X / Twitter</p>
                  <a href="https://x.com/KnoxKiminou" target="_blank" rel="noopener noreferrer external" className="hover:text-foreground transition-colors">
                    @KnoxKiminou
                  </a>
                  <br />
                  <a href="https://x.com/KiminouKnox" target="_blank" rel="noopener noreferrer external" className="hover:text-foreground transition-colors">
                    @KiminouKnox
                  </a>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">YouTube</p>
                  <a href="https://www.youtube.com/@KiminouKnoxVevo" target="_blank" rel="noopener noreferrer external" className="hover:text-foreground transition-colors">
                    @KiminouKnoxVevo
                  </a>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Amazon</p>
                  <a href="https://www.amazon.com/stores/author/B0DGM5Z5Q8" target="_blank" rel="noopener noreferrer external" className="hover:text-foreground transition-colors">
                    Author Page
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    data-testid="input-subject"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    data-testid="textarea-message"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                  data-testid="button-submit"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
