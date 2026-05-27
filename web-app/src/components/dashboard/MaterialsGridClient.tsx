'use client';

import { useMemo, useState } from 'react';
import { Download, FileText, Search, Star } from 'lucide-react';
import { formatPortalDate, type StudyMaterial } from '@/lib/portal-content';

type MaterialsGridClientProps = {
  materials: StudyMaterial[];
  batchName: string;
};

export default function MaterialsGridClient({ materials, batchName }: MaterialsGridClientProps) {
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('All');

  const tabs = useMemo(() => {
    const materialTypes = Array.from(new Set(materials.map((item) => item.material_type).filter(Boolean)));
    return ['All', 'Featured', ...materialTypes];
  }, [materials]);

  const filteredMaterials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return materials.filter((item) => {
      const matchesType =
        activeType === 'All' ||
        (activeType === 'Featured' ? item.is_featured : item.material_type === activeType);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [item.title, item.subject, item.description ?? '', item.batch_category]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [activeType, materials, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)]">{batchName}</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Study Materials
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-300">
            Batch-filtered notes, assignments, formula sheets, and test papers from Sanskar DB.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search materials"
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

      {filteredMaterials.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMaterials.map((material) => (
            <article
              key={material.id}
              className="group border border-white/10 bg-white/[0.05] p-5 shadow-xl transition hover:-translate-y-1 hover:border-[var(--logo-gold)]/70 hover:bg-white/[0.08]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--logo-crimson)] text-white shadow-lg shadow-[var(--logo-crimson)]/20">
                  <FileText className="h-6 w-6" />
                </div>
                {material.is_featured && (
                  <span className="inline-flex items-center gap-1 bg-[var(--logo-gold)] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--logo-navy)]">
                    <Star className="h-3 w-3 fill-current" />
                    Priority
                  </span>
                )}
              </div>

              <div className="mt-5">
                <p className="text-xs font-black uppercase tracking-widest text-[var(--logo-gold)]">
                  {material.subject}
                </p>
                <h2 className="mt-2 line-clamp-2 text-lg font-black uppercase leading-snug text-white transition group-hover:text-[var(--logo-gold)]">
                  {material.title}
                </h2>
                {material.description && (
                  <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-300">
                    {material.description}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div className="text-xs font-bold text-slate-400">
                  <span className="uppercase">{material.material_type}</span>
                  {material.file_size ? <span> / {material.file_size}</span> : null}
                  <span className="block pt-1">{formatPortalDate(material.published_at)}</span>
                </div>
                <a
                  href={material.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-3 py-2 text-xs font-black uppercase tracking-wider text-[var(--logo-navy)] transition hover:bg-[var(--logo-gold)]"
                >
                  <Download className="h-4 w-4" />
                  Open
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-white/15 bg-white/[0.04] px-6 py-14 text-center">
          <FileText className="mx-auto h-10 w-10 text-[var(--logo-gold)]" />
          <h2 className="mt-4 text-xl font-black uppercase tracking-tight text-white">No materials found</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-6 text-slate-400">
            Published resources for this batch will appear here automatically after admin upload and approval.
          </p>
        </div>
      )}
    </div>
  );
}
