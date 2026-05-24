"use client";
import { useState } from "react";

type Topper = {
  rank: number;
  name: string;
  score: string;
  subtext: string;
  category: "ssc" | "syjc" | "tybcom";
};

const TOPPERS_DATA: Topper[] = [
  // SSC
  { rank: 1, name: "Pratham Shah", score: "96.40%", subtext: "SSC 2025 - Science Topper", category: "ssc" },
  { rank: 2, name: "Ananya Shetty", score: "95.20%", subtext: "SSC 2025", category: "ssc" },
  { rank: 3, name: "Rohan Mishra", score: "94.80%", subtext: "SSC 2025", category: "ssc" },
  // SYJC
  { rank: 1, name: "Neha Deshmukh", score: "95.00%", subtext: "Commerce Subject Topper - 99/100 BK", category: "syjc" },
  { rank: 2, name: "Aryan Joshi", score: "94.00%", subtext: "SYJC Commerce", category: "syjc" },
  { rank: 3, name: "Siddhi Patel", score: "93.00%", subtext: "SYJC Commerce", category: "syjc" },
  // TYBCOM
  { rank: 1, name: "Mansi Patil", score: "91.50%", subtext: "TYBCOM University Topper", category: "tybcom" },
];

export default function ToppersGallery() {
  const [activeTab, setActiveTab] = useState("ssc" as "ssc" | "syjc" | "tybcom");

  const filtered = TOPPERS_DATA.filter((t) => t.category === activeTab);
  const podium = filtered.filter((t) => t.rank <= 3).sort((a, b) => a.rank - b.rank);

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-white radiant-gold-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#ff3115] tracking-widest uppercase bg-red-50 px-4 py-1.5 rounded-full">
            Celebrating Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-4 mb-6">
            Our Outstanding Academic Toppers
          </h2>
          <p className="text-slate-600 font-medium">
            Consistently delivering exceptional results across boards and streams for over 29 years.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100/80 p-1.5 rounded-full flex gap-2 backdrop-blur-sm">
            {(["ssc", "syjc", "tybcom"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#ff3115] text-white shadow-md shadow-red-500/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === "ssc" ? "SSC Toppers" : tab === "syjc" ? "SYJC Commerce" : "TYBCOM"}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
          {podium.map((topper) => {
            const isFirst = topper.rank === 1;
            return (
              <div key={topper.name} className={`premium-panel p-8 text-center flex flex-col items-center ${isFirst ? "md:scale-105 border-yellow-200 bg-gradient-to-b from-yellow-50/50 to-white md:-translate-y-4" : ""}`}>
                {/* Rank badge */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-lg mb-6 shadow-inner ${
                    topper.rank === 1
                      ? "bg-amber-400 text-slate-900"
                      : topper.rank === 2
                      ? "bg-slate-300 text-slate-800"
                      : "bg-amber-600 text-white"
                  }`}
                >
                  #{topper.rank}
                </div>
                {/* Avatar placeholder */}
                <div className="w-24 h-24 min-w-[96px] min-h-[96px] max-w-[96px] max-h-[96px] rounded-full bg-slate-100 flex items-center justify-center overflow-hidden mx-auto mb-4">
                  <img src="/placeholder.jpg" alt={topper.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{topper.name}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-4">{topper.subtext}</p>
                <div className="text-3xl font-black text-[#ff3115] tracking-tight">{topper.score}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
