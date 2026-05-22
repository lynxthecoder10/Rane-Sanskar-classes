import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToppersGallery from '@/components/ToppersGallery';
import Services from '@/components/Services';
import DirectorMessage from '@/components/DirectorMessage';
import WhyUs from '@/components/WhyUs';
import AdmissionSection from '@/components/AdmissionSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex-grow flex flex-col">
      <Navbar />
      <Hero />
      <ToppersGallery />
      <Services />
      <DirectorMessage />
      <WhyUs />
      <AdmissionSection />
      <Footer />
    </main>
  );
}
