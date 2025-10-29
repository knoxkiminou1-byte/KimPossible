import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function PressKit() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });

  const bio = "I am a writer and athlete from the Oakland East Bay. I tell stories that carry faith grit and love. I build books poems and youth projects that help people feel and act with purpose.";

  const books = [
    { title: "Black Boy Poems", pitch: "Poetry that speaks in a clear Oakland voice" },
    { title: "Boys Raised in Silence", pitch: "Poems for what we were never allowed to feel" },
    { title: "The Spirit of Solomon", pitch: "A modern Solomon story in verse" },
    { title: "Hopeless Romantic", pitch: "Love as faith as fight" },
    { title: "The Adventures of Kiminou the Great and Chua the Wise", pitch: "A children story of courage and care" }
  ];

  const brandColors = [
    { name: "Primary", value: "hsl(0, 0%, 4%)", hex: "#0A0A0A" },
    { name: "Secondary", value: "hsl(0, 0%, 96%)", hex: "#F5F5F5" },
    { name: "Accent", value: "hsl(0, 0%, 4%)", hex: "#0A0A0A" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: "Press Kit Request"
        })
      });

      if (response.ok) {
        toast({
          title: "Request submitted",
          description: "Thank you for your interest. We will be in touch soon."
        });
        setFormData({ name: "", email: "", organization: "", message: "" });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Press Kit - Kiminou Knox</title>
        <meta name="description" content="Official press kit for Kiminou Knox including bio headshot book list brand assets and media resources." />
        <link rel="canonical" href="https://kiminouknox.com/press-kit" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Press Kit - Kiminou Knox" />
        <meta property="og:description" content="Official press kit and media resources" />
        <meta property="og:url" content="https://kiminouknox.com/press-kit" />
        <meta property="og:image" content="https://kiminouknox.com/og/press-kit.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press Kit - Kiminou Knox" />
        <meta name="twitter:description" content="Official press kit and media resources" />
        <meta name="twitter:image" content="https://kiminouknox.com/og/press-kit.jpg" />
      </Helmet>

      <Header theme="maison" onThemeChange={() => {}} />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="press-kit-heading">
              Press Kit
            </h1>
            <p className="text-lg text-muted-foreground">
              Official media resources for journalists editors and event organizers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-lg aspect-square overflow-hidden mb-4">
                <img 
                  src="/media/headshot.jpg"
                  alt="Kiminou Knox headshot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop';
                  }}
                  data-testid="headshot-image"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Official headshot 2000 x 2000
              </p>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Bio</h2>
                <p className="text-muted-foreground leading-relaxed" data-testid="bio-text">
                  {bio}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">Books</h2>
                <ul className="space-y-3">
                  {books.map((book, index) => (
                    <li key={index} className="border-l-2 border-accent pl-4" data-testid={`book-item-${index}`}>
                      <p className="font-medium text-foreground">{book.title}</p>
                      <p className="text-sm text-muted-foreground italic">{book.pitch}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Brand colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandColors.map((color, index) => (
                <div key={index} className="border border-border rounded-lg p-6" data-testid={`color-${index}`}>
                  <div 
                    className="w-full h-24 rounded-md mb-4" 
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="font-medium text-foreground mb-1">{color.name}</p>
                  <p className="text-sm text-muted-foreground font-mono">{color.hex}</p>
                  <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Fonts</h2>
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-6">
                <p className="text-4xl font-serif mb-2">Cormorant Garamond</p>
                <p className="text-sm text-muted-foreground">Headings and display text</p>
              </div>
              <div className="border border-border rounded-lg p-6">
                <p className="text-2xl font-sans mb-2">Inter</p>
                <p className="text-sm text-muted-foreground">Body text and UI elements</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Request press kit</h2>
            <p className="text-muted-foreground mb-6">
              For full press kit materials including high resolution headshot and bio please submit your request below
            </p>
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

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your media outlet and how you plan to use these materials"
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto"
                data-testid="button-submit"
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
