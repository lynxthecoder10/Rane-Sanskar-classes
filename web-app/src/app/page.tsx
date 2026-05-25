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
import { normalizeStreamParam, VALID_STANDARDS, type StandardOption } from '@/lib/course-options';

type HomeProps = {
  searchParams: Promise<{
    standard?: string;
    stream?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const initialStandard =
    params.standard && VALID_STANDARDS.includes(params.standard as StandardOption)
      ? (params.standard as StandardOption)
      : normalizeStreamParam(params.stream ?? null) ?? '';

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
      <AdmissionSection initialStandard={initialStandard} />
      <Footer />
    </>
  );
}
