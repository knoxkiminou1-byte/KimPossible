import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";

export default function Speaking() {
  const { toast } = useToast();
  const { theme, changeTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    dateWindow: "",
    talkTheme: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: `Speaking Request: ${formData.talkTheme}`
        })
      });

      if (response.ok) {
        toast({
          title: "Request submitted",
          description: "Thank you for your interest. We will be in touch soon."
        });
        setFormData({ name: "", email: "", organization: "", dateWindow: "", talkTheme: "", message: "" });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Speaking - Kiminou Knox</title>
        <meta name="description" content="Book Kiminou Knox for speaking engagements on craft discipline voice and the cost of silence. Available for teams schools and community groups." />
        <link rel="canonical" href="https://kiminouknox.com/speaking" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Speaking - Kiminou Knox" />
        <meta property="og:description" content="Speaking engagements on craft discipline and creative work" />
        <meta property="og:url" content="https://kiminouknox.com/speaking" />
        <meta property="og:image" content="https://kiminouknox.com/og/speaking.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Speaking - Kiminou Knox" />
        <meta name="twitter:description" content="Book speaking engagements" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/speaking.jpg" />
      </Helmet>

      <Header theme={theme} onThemeChange={changeTheme} />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="speaking-heading">
              Speaking
            </h1>
            <p className="text-lg text-muted-foreground">
              I speak on craft discipline voice and the cost of silence. I work with teams schools and community groups to turn ideas into action.
            </p>
          </div>

          <div className="space-y-12 mb-16">
            <div className="border-l-4 border-accent pl-6">
              <h2 className="text-2xl font-serif font-bold mb-3 text-foreground">
                Discipline and faith in daily practice
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                How to build sustainable creative habits that honor both your craft and your wellbeing. Drawing from athletics and writing this talk explores the intersection of discipline structure and spiritual grounding to create work that lasts.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h2 className="text-2xl font-serif font-bold mb-3 text-foreground">
                Black boy voice and the cost of silence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A conversation about finding your authentic voice when the world expects you to stay quiet. This talk addresses identity authenticity and the courage required to tell your truth especially when that truth challenges dominant narratives.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6">
              <h2 className="text-2xl font-serif font-bold mb-3 text-foreground">
                Building creative work that lasts
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Practical strategies for young creators to develop their craft build an audience and create meaningful work that stands the test of time. This talk covers everything from creative process to publishing to maintaining integrity in a fast paced digital world.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">
              Request a speaking engagement
            </h2>
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
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  data-testid="input-organization"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dateWindow">Date window</Label>
                  <Input
                    id="dateWindow"
                    name="dateWindow"
                    type="text"
                    placeholder="e.g., March 2025 or Spring 2025"
                    required
                    value={formData.dateWindow}
                    onChange={handleChange}
                    data-testid="input-date-window"
                  />
                </div>
                <div>
                  <Label htmlFor="talkTheme">Talk theme</Label>
                  <select
                    id="talkTheme"
                    name="talkTheme"
                    required
                    value={formData.talkTheme}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    data-testid="select-talk-theme"
                  >
                    <option value="">Select a theme</option>
                    <option value="Discipline and faith">Discipline and faith in daily practice</option>
                    <option value="Black boy voice">Black boy voice and the cost of silence</option>
                    <option value="Creative work">Building creative work that lasts</option>
                    <option value="Custom">Custom topic</option>
                  </select>
                </div>
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
                  placeholder="Tell us about your event audience and what you hope to achieve"
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto"
                data-testid="button-submit-speaking"
              >
                {isSubmitting ? "Submitting..." : "Submit request"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
