import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const titleRef = useScrollAnimation();
  const contactInfoRef = useScrollAnimation();
  const formRef = useScrollAnimation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Contact form submitted! (This is a demo)');
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 bg-muted/30" data-testid="contact-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 animate-on-scroll">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6" data-testid="contact-title">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto" data-testid="contact-description">
            Whether you're interested in collaboration, book discussions, or business inquiries, let's start a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div ref={contactInfoRef} className="animate-on-scroll">
            <h3 className="font-serif text-2xl font-medium mb-6" data-testid="contact-info-title">
              Get in Touch
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center space-x-3" data-testid="contact-email">
                <Mail className="w-5 h-5" />
                <a href="mailto:knoxkiminou1@gmail.com" className="hover:underline transition-all">knoxkiminou1@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3" data-testid="contact-phone">
                <Phone className="w-5 h-5" />
                <a href="tel:+17779311" className="hover:underline transition-all">777-9311</a>
              </div>
              <div className="flex items-center space-x-3" data-testid="contact-location">
                <MapPin className="w-5 h-5" />
                <span>East Palo Alto, California</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-4" data-testid="social-links-title">
                Follow Along
              </h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/kiminouknox" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
                  aria-label="Instagram"
                  data-testid="social-link-instagram-main"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://x.com/KnoxKiminou" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
                  aria-label="Twitter / X"
                  data-testid="social-link-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/theteeshirteenss" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
                  aria-label="The Tee Shirt Teens Instagram"
                  data-testid="social-link-business-instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://thett.shop" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" 
                  aria-label="The Tee Shirt Teens Website"
                  data-testid="social-link-website"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div ref={formRef} className="animate-on-scroll">
            <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  data-testid="contact-subject-select"
                >
                  <option value="">Select a topic</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="books">Book Discussion</option>
                  <option value="business">Business Inquiry</option>
                  <option value="athletics">Athletic Partnership</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="media">Media Inquiry</option>
                  <option value="mentorship">Youth Mentorship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                  data-testid="contact-message-textarea"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="luxury-button w-full px-6 py-3 bg-primary text-primary-foreground font-medium uppercase tracking-[0.1em] hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                data-testid="contact-submit-button"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
