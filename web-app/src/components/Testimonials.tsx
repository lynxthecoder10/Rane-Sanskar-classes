import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

// Sample data structure – will be replaced by Supabase fetch later
const sampleTestimonials = [
  {
    id: 1,
    name: 'Mrs. Sharma',
    child: '12th Science',
    rating: 5,
    quote: 'Rane’s Sanskar gave my son the confidence to crack the state board with 96% marks! The teachers truly care.'
  },
  {
    id: 2,
    name: 'Mr. Patel',
    child: '10th SSC',
    rating: 5,
    quote: 'The daily test series prepared my daughter perfectly for the SSC exams. Highly recommended.'
  },
  {
    id: 3,
    name: 'Ms. Rao',
    child: 'FYJC Commerce',
    rating: 4,
    quote: 'A wonderful blend of conceptual teaching and exam strategies.'
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Simple auto‑rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % sampleTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { name, child, rating, quote } = sampleTestimonials[current];

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-black text-brand-dark mb-6">What Parents Say</h2>
        <div className="flex items-center justify-center mb-4">
          <Quote className="w-8 h-8 text-brand-primary mr-2" />
          <p className="text-xl italic text-brand-gray max-w-2xl">{quote}</p>
        </div>
        <p className="mt-4 font-medium text-brand-dark">
          – {name}, parent of {child}
        </p>
        <div className="flex justify-center mt-2 space-x-1">
          {[...Array(rating)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.452a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.37-2.452a1 1 0 00-1.175 0l-3.37 2.452c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.43 9.393c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}
