import { MessageCircle } from "lucide-react";

export default function ContactFAB() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={scrollToContact}
      className="fixed bottom-8 right-8 w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 animate-float"
      aria-label="Contact"
      data-testid="contact-fab"
    >
      <MessageCircle className="w-6 h-6 mx-auto" />
    </button>
  );
}
