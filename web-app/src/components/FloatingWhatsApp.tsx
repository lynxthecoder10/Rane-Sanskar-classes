import { useEffect } from 'react';
import { Phone } from 'lucide-react';

export default function FloatingWhatsApp() {
  // Show after a short delay to avoid immediate pop
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <a
      href="https://wa.me/917021272046?text=Hello%20Rane%27s%20Sanskar%20Classes%20-%20I%20would%20like%20more%20information"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 flex items-center bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-xl transition-transform hover:scale-105"
    >
      <Phone className="h-6 w-6 mr-2" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
