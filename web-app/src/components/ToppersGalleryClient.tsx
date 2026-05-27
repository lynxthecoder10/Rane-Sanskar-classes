'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

export type Topper = {
  id?: string;
  name: string;
  rank_position: number;
  score_percentage: number;
  stream: string;
  avatar_url: string | null;
};

type ToppersGalleryClientProps = {
  toppers: Topper[];
};

export default function ToppersGalleryClient({ toppers }: ToppersGalleryClientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="results" className="relative overflow-hidden border-b-8 border-[var(--logo-crimson)] bg-[radial-gradient(circle_at_top,#142744_0%,var(--logo-navy)_45%,var(--logo-obsidian)_100%)] py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-3 rounded-full border-2 border-amber-400 bg-white/10 px-8 py-4 shadow-lg backdrop-blur md:px-10">
            <GraduationCap className="h-8 w-8 text-amber-300" />
            <h2 className="m-0 text-2xl font-black uppercase tracking-widest text-white md:text-3xl">
              Wall of Fame
            </h2>
          </div>
          <p className="text-base font-bold uppercase tracking-widest text-amber-100 drop-shadow-md sm:text-lg">
            Our Outstanding Academic Toppers
          </p>
        </div>

        {toppers.length > 0 ? (
          <motion.div
            className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3"
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {toppers.map((topper) => (
              <motion.article
                key={topper.id ?? topper.name}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-amber-300/40 bg-white p-7 text-center shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(245,158,11,0.15)] sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--logo-gold)] via-yellow-500 to-[var(--logo-gold-deep)]" />
                <div className="absolute right-0 top-0 flex h-20 w-20 items-start justify-end rounded-bl-3xl border-b-4 border-l-4 border-[var(--logo-navy)] bg-[var(--logo-crimson)] p-3 shadow-md">
                  <Award className="h-8 w-8 text-amber-300" />
                </div>

                <div>
                  <div className="relative z-20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-400 bg-[var(--logo-navy)] text-2xl font-black text-amber-300 shadow-[0_10px_25px_rgba(245,158,11,0.18)]">
                    #{topper.rank_position}
                  </div>

                  <div className="-mt-8 mb-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[var(--logo-crimson)] bg-[#fff7df] shadow-inner mx-auto relative z-10">
                    <Image
                      src={topper.avatar_url || "/logo1.png"}
                      alt={topper.name}
                      width={128}
                      height={128}
                      className={topper.avatar_url ? "h-full w-full object-cover" : "h-full w-full object-contain p-4"}
                    />
                  </div>

                  <h3 className="mb-2 text-2xl font-black uppercase tracking-tight text-[var(--logo-navy)] transition-colors group-hover:text-[var(--logo-crimson)]">
                    {topper.name}
                  </h3>
                  <p className="mb-8 text-sm font-bold uppercase tracking-widest text-[var(--logo-crimson)]">
                    {topper.stream}
                  </p>
                </div>

                <div className="mt-auto rounded-2xl border-2 border-[var(--logo-navy)] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-inner">
                  <div className="rounded-xl bg-[var(--logo-navy)] px-2 py-4 text-center text-white">
                    <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-amber-200">Final Aggregate Score</span>
                    <div className="text-4xl font-black tracking-tighter text-amber-300 drop-shadow-md md:text-5xl">
                      {topper.score_percentage.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="mx-auto max-w-2xl border border-white/15 bg-white/[0.05] p-8 text-center">
            <Award className="mx-auto h-10 w-10 text-[var(--logo-gold)]" />
            <h3 className="mt-4 text-xl font-black uppercase tracking-tight text-white">Topper records syncing</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-amber-100/80">
              Verified result records from Supabase will appear here as soon as the admin team publishes them.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
