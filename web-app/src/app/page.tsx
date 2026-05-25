import Hero from '@/components/Hero';
import ToppersGallery from '@/components/ToppersGallery';
import Services from '@/components/Services';
import DirectorMessage from '@/components/DirectorMessage';
import WhyUs from '@/components/WhyUs';
import AdmissionSection from '@/components/AdmissionSection';
import Footer from '@/components/Footer';
import FacultyShowcase from '@/components/FacultyShowcase';
import RankTrackerPreview from '@/components/RankTrackerPreview';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <ToppersGallery />
      <RankTrackerPreview />
      <Services />
      <DirectorMessage />
      <WhyUs />
      <FacultyShowcase />
      <Testimonials />
      <AdmissionSection />
      <Footer />
    </>
  );
}
