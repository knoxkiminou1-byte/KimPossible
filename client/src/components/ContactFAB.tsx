import { MessageCircle } from "lucide-react";

export default function ContactFAB() {
	  const scrollToContact = () => {
	    const element = document.querySelector('#contact');
	    if (element) {
	      element.scrollIntoView({ behavior: 'smooth' });
	      return;
	    }

	    window.location.href = "/contact";
	  };

  return (
    <button 
      onClick={scrollToContact}
      className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-shadow hover:shadow-xl"
      aria-label="Contact"
      data-testid="contact-fab"
    >
      <MessageCircle className="w-6 h-6 mx-auto" />
    </button>
  );
}
