import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Contact() {

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

      <Header />

      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-foreground" data-testid="contact-heading">
              Contact
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Reach out for speaking engagements, media inquiries, or collaboration opportunities. Select your inquiry type below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Connect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Email</p>
                  <a href="mailto:knoxkiminou1@gmail.com" className="hover:text-foreground transition-colors">
                    knoxkiminou1@gmail.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Phone</p>
                  <a href="tel:777-9311" className="hover:text-foreground transition-colors">
                    777-9311
                  </a>
                </div>
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
              <ContactForm
                title="Send a Message"
                description=""
                defaultInquiryType="other"
                successMessage="Thank you for reaching out. I will get back to you soon."
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
