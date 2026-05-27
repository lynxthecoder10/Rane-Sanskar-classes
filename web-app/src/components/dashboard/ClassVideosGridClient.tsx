'use client';

import { useMemo, useState } from 'react';
import { Clock, PlayCircle, Search, Star, Video } from 'lucide-react';
import { formatPortalDate, type ClassVideo } from '@/lib/portal-content';

type ClassVideosGridClientProps = {
  videos: ClassVideo[];
  batchName: string;
};

export default function ClassVideosGridClient({ videos, batchName }: ClassVideosGridClientProps) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('All');

  const tabs = useMemo(() => {
    const lectureTypes = Array.from(new Set(videos.map((item) => item.lecture_type).filter(Boolean)));
    return ['All', 'Featured', ...lectureTypes];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return videos.filter((item) => {
      const matchesType =
        activeType === 'All' ||
        (activeType === 'Featured' ? item.is_featured : item.lecture_type === activeType);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [item.title, item.subject, item.description ?? '', item.batch_category, item.lecture_type]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [activeType, query, videos]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)]">{batchName}</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Class Videos
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-300">
            Filterable lecture replay grid synced to each student&apos;s active batch.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search videos"
            autoComplete="off"
            className="w-full border border-white/10 bg-white/[0.06] py-3 pl-10 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--logo-gold)] focus:ring-4 focus:ring-[var(--logo-gold)]/10"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveType(tab)}
            className={[
              'shrink-0 border px-4 py-2 text-xs font-black uppercase tracking-widest transition',
              activeType === tab
                ? 'border-[var(--logo-gold)] bg-[var(--logo-gold)] text-[var(--logo-navy)]'
                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-[var(--logo-crimson)] hover:text-white',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredVideos.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="group overflow-hidden border border-white/10 bg-white/[0.05] shadow-xl transition hover:-translate-y-1 hover:border-[var(--logo-gold)]/70 hover:bg-white/[0.08]"
            >
              <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="block">
                <div
                  className="relative aspect-video bg-[var(--logo-navy)]"
                  style={video.thumbnail_url ? { backgroundImage: `url(${video.thumbnail_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--logo-obsidian)] via-[var(--logo-obsidian)]/35 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--logo-gold)]/50 bg-[var(--logo-gold)] text-[var(--logo-navy)] shadow-2xl shadow-[var(--logo-gold)]/20 transition group-hover:scale-105">
                      <PlayCircle className="h-8 w-8 fill-current" />
                    </div>
                  </div>
                  {video.is_featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-[var(--logo-gold)] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--logo-navy)]">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>
              </a>

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)]">
                    {video.subject}
                  </p>
                  <span className="bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {video.lecture_type}
                  </span>
                </div>
                <h2 className="mt-3 line-clamp-2 text-lg font-black uppercase leading-snug text-white transition group-hover:text-[var(--logo-gold)]">
                  {video.title}
                </h2>
                {video.description && (
                  <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-300">
                    {video.description}
                  </p>
                )}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-slate-400">
                  <span>{formatPortalDate(video.published_at)}</span>
                  {typeof video.duration_minutes === 'number' && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {video.duration_minutes} min
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-white/15 bg-white/[0.04] px-6 py-14 text-center">
          <Video className="mx-auto h-10 w-10 text-[var(--logo-gold)]" />
          <h2 className="mt-4 text-xl font-black uppercase tracking-tight text-white">No videos found</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-400">
            Published video lectures for this batch will appear here automatically after admin upload and approval.
          </p>
        </div>
      )}
    </div>
  );
}
