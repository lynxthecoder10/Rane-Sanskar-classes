import Image from "next/image";
import { Award, GraduationCap } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

type Topper = {
  id?: string;
  name: string;
  rank_position: number;
  score_percentage: number;
  stream: string;
  avatar_url: string | null;
};

const defaultToppers: Topper[] = [
  { name: "Smith Patel", rank_position: 1, score_percentage: 96.4, stream: "SYJC Commerce", avatar_url: null },
  { name: "Janhavi Naik", rank_position: 2, score_percentage: 95.2, stream: "SYJC Commerce", avatar_url: null },
  { name: "Tejas More", rank_position: 3, score_percentage: 94.8, stream: "SYJC Commerce", avatar_url: null },
];

async function loadToppers() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("toppers")
      .select("id, name, rank_position, score_percentage, stream, avatar_url")
      .order("rank_position", { ascending: true })
      .limit(3);

    if (error || !data?.length) {
      return defaultToppers;
    }

    return data as Topper[];
  } catch {
    return defaultToppers;
  }
}

export default async function ToppersGallery() {
  const toppers = await loadToppers();
  ];

  return (
    <section id="results" className="py-24 bg-gradient-to-b from-[#00b4db] to-[#0083b0] border-b-8 border-[#0b2545]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 bg-[#0b2545] py-4 px-10 rounded-full shadow-lg border-2 border-amber-400 mb-6">
            <GraduationCap className="w-8 h-8 text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase m-0">
              Wall of Fame
            </h2>
          </div>
          <p className="text-white text-lg font-bold uppercase tracking-widest drop-shadow-md">
            Our Outstanding Academic Toppers
          </p>
        </div>

        {/* Heavy Authority Topper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {toppers.map((topper) => (
            <div 
              key={topper.id ?? topper.name} 
              className="bg-white border-4 border-[#0b2545] p-8 text-center relative shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,180,219,0.25)] flex flex-col justify-between overflow-hidden"
            >
              {/* Corner Banner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#c21e17] flex items-start justify-end p-3 rounded-bl-3xl shadow-md border-b-4 border-l-4 border-[#0b2545]">
                <Award className="w-8 h-8 text-amber-400" />
              </div>

              <div>
                {/* Clean Rank Badge */}
                <div className="w-16 h-16 rounded-full bg-[#0b2545] text-amber-400 font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-amber-400 relative z-20 animate-pulse">
                  #{topper.rank_position}
                </div>

                {/* Avatar Frame (Perfectly Round) */}
                <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-[#c21e17] flex items-center justify-center overflow-hidden mx-auto mb-6 shadow-inner relative z-10 -mt-8">
                  <Image
                    src={topper.avatar_url || "/logo.png"}
                    alt={topper.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-black text-[#0b2545] uppercase tracking-tight mb-2">
                  {topper.name}
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest text-[#c21e17] mb-8">
                  {topper.stream}
                </p>
              </div>

              {/* Crimson Score Banner Block */}
              <div className="bg-gradient-to-r from-[#ffca28] to-[#ff9800] rounded-lg p-1 shadow-inner border-2 border-[#0b2545] mt-auto">
                <div className="bg-[#c21e17] rounded py-4 px-2 text-white text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-1 text-amber-200">Final Aggregate Score</span>
                  <div className="text-4xl md:text-5xl font-black tracking-tighter drop-shadow-md">
                    {topper.score_percentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
