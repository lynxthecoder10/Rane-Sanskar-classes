import Image from 'next/image';

const facultyMembers = [
  {
    id: 1,
    name: 'Prof. Ramesh Rane',
    title: 'Founder & Headmaster',
    qualification: 'M.Sc. Mathematics, Ph.D. Education',
    img: '/faculty/ramesh.jpg',
  },
  {
    id: 2,
    name: 'Ms. Anita Sharma',
    title: 'Senior Science Teacher',
    qualification: 'M.Sc. Physics, B.Ed.',
    img: '/faculty/anita.jpg',
  },
  {
    id: 3,
    name: 'Mr. Rohit Patel',
    title: 'Commerce Expert',
    qualification: 'M.Com., CA',
    img: '/faculty/rohit.jpg',
  },
  {
    id: 4,
    name: 'Ms. Neha Gupta',
    title: 'ICSE Specialist',
    qualification: 'M.Sc. Chemistry, B.Ed.',
    img: '/faculty/neha.jpg',
  },
];

export default function FacultyShowcase() {
  return (
    <section className="py-20 bg-white" id="faculty">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl font-black text-brand-dark mb-8">Meet Our Expert Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facultyMembers.map(member => (
            <div key={member.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
              <Image
                src={member.img}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-brand-primary">{member.name}</h3>
                <p className="text-sm text-brand-gray">{member.title}</p>
                <p className="text-xs text-brand-gray mt-1">{member.qualification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
