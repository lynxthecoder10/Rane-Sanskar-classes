import Link from 'next/link';
import { School, GraduationCap, Calculator, TrendingUp, Laptop } from 'lucide-react';

export default function Services() {
  const services = [
    { title: "School Section", desc: "VIII, IX, X (SSC & ICSE)", icon: School, color: "text-blue-600", bg: "bg-blue-100", link: "/courses" },
    { title: "Science & Commerce", desc: "XI, XII (State Board)", icon: GraduationCap, color: "text-red-600", bg: "bg-red-100", link: "/courses" },
    { title: "CA Foundation", desc: "ICAI preparation", icon: Calculator, color: "text-orange-600", bg: "bg-orange-100", link: "/courses" },
    { title: "CMA Foundation", desc: "Professional coaching", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100", link: "/courses" },
    { title: "Computer Courses", desc: "MS Office, Tally & more", icon: Laptop, color: "text-cyan-600", bg: "bg-cyan-100", link: "/courses" },
  ];

  return (
    <section className="py-16 bg-brand-light/50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <Link key={index} href={service.link} className="group block">
              <div className="bg-white border-2 border-transparent hover:border-brand-primary/30 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col items-center justify-center">
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <h3 className="font-bold text-brand-dark mb-1 leading-tight group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-brand-gray font-medium">
                  {service.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
