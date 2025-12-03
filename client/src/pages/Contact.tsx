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

      <main 
        className="min-h-screen bg-black pt-40 pb-20 relative"
        style={{
          backgroundImage: 'url(/aafc-logo.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-6 text-white" data-testid="contact-heading">
              Contact
            </h1>
            <p className="text-lg text-gray-300">
              Reach out for speaking engagements, media inquiries, or collaboration opportunities. Select your inquiry type below and we'll get back to you as soon as possible.
            </p>
          </div>

          <ContactForm
            title="Send a Message"
            description=""
            defaultInquiryType="other"
            successMessage="Thank you for reaching out. I will get back to you soon."
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
