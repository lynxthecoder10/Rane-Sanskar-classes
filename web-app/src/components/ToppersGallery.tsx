'use client';

import { useState } from 'react';
import { Award, Trophy, Star } from 'lucide-react';

// Mock data matching the old site's performance
const resultsData = {
  ssc: [
    { name: 'Student 1', marks: '98/100', percentage: '96.40%', image: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Student 2', marks: '98/100', percentage: '95.20%', image: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Student 3', marks: '98/100', percentage: '94.80%', image: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Student 4', marks: '97/100', percentage: '93.00%', image: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Student 5', marks: '96/100', percentage: '92.50%', image: 'https://i.pravatar.cc/150?img=5' },
  ],
  syjc: [
    { name: 'Commerce Topper 1', marks: '99/100', percentage: '95.50%', image: 'https://i.pravatar.cc/150?img=6' },
    { name: 'Commerce Topper 2', marks: '99/100', percentage: '94.00%', image: 'https://i.pravatar.cc/150?img=7' },
    { name: 'Commerce Topper 3', marks: '98/100', percentage: '93.20%', image: 'https://i.pravatar.cc/150?img=8' },
    { name: 'Commerce Topper 4', marks: '97/100', percentage: '92.80%', image: 'https://i.pravatar.cc/150?img=9' },
  ],
  tybcom: [
    { name: 'TYBCOM Topper 1', marks: '-', percentage: '91.50%', image: 'https://i.pravatar.cc/150?img=10' },
    { name: 'TYBCOM Topper 2', marks: '-', percentage: '90.00%', image: 'https://i.pravatar.cc/150?img=11' },
    { name: 'TYBCOM Topper 3', marks: '-', percentage: '88.50%', image: 'https://i.pravatar.cc/150?img=12' },
  ]
};

export default function ToppersGallery() {
  const [activeTab, setActiveTab] = useState<'ssc' | 'syjc' | 'tybcom'>('syjc');

  return (
    <section className="py-20 bg-gradient-to-br from-brand-dark to-gray-900 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 font-bold px-4 py-1.5 rounded-full text-sm mb-4 border border-yellow-500/30">
            <Trophy className="w-4 h-4" />
            Hall of Fame 2025
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Our Outstanding Results
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Consistency meets hard work. Witness the remarkable achievements of our students across all major boards and university exams.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            onClick={() => setActiveTab('ssc')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'ssc' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
          >
            SSC Toppers
          </button>
          <button 
            onClick={() => setActiveTab('syjc')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'syjc' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
          >
            SYJC Commerce Toppers
          </button>
          <button 
            onClick={() => setActiveTab('tybcom')}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === 'tybcom' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
          >
            TYBCOM Toppers
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500" key={activeTab}>
          {resultsData[activeTab].map((student, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:-translate-y-2 transition-all hover:shadow-2xl hover:bg-white/15 group relative overflow-hidden">
              
              {/* Rank Badge */}
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-bl-xl rounded-tr-3xl flex items-center justify-center font-black shadow-md z-20">
                #{index + 1}
              </div>

              {/* Image */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-yellow-400 rounded-full blur group-hover:blur-md transition-all opacity-50"></div>
                <img src={student.image} alt={student.name} className="w-full h-full object-cover rounded-full border-2 border-white relative z-10" />
              </div>
              
              <h3 className="font-bold text-white text-lg truncate mb-1">{student.name}</h3>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-3xl font-black text-yellow-400 drop-shadow-md">
                  {student.percentage}
                </div>
                {student.marks !== '-' && (
                  <div className="text-xs font-semibold text-gray-300 mt-1 uppercase tracking-wider">
                    Highest: {student.marks}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
