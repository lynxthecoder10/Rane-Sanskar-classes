import { createClient } from '@/utils/supabase/server';
import { FileText, Download, Filter, Search } from 'lucide-react';
import Link from 'next/link';

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // In a real app, you would fetch these from a 'resources' table
  // and join with storage URLs. For now, displaying static mock data.
  const resources = [
    { id: 1, title: 'Chemistry Ch-4: Carbon Compounds Notes', subject: 'Chemistry', standard: '10th SSC', type: 'PDF', size: '2.4 MB', date: 'Oct 15, 2026' },
    { id: 2, title: 'Maths Algebra Practice Set 3', subject: 'Maths', standard: '10th SSC', type: 'PDF', size: '1.1 MB', date: 'Oct 14, 2026' },
    { id: 3, title: 'English Grammar Tenses Rules & Examples', subject: 'English', standard: 'All', type: 'DOCX', size: '0.8 MB', date: 'Oct 12, 2026' },
    { id: 4, title: 'Physics Formula Sheet (Mid-terms)', subject: 'Physics', standard: '10th ICSE', type: 'PDF', size: '3.5 MB', date: 'Oct 10, 2026' },
    { id: 5, title: 'History Important Dates & Events', subject: 'History', standard: '10th SSC', type: 'PDF', size: '1.5 MB', date: 'Oct 08, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark mb-2">Study Materials</h1>
          <p className="text-brand-gray">Download notes, assignments, and test papers.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-xl text-brand-dark hover:bg-gray-50 hover:border-gray-300 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-brand-gray text-sm font-semibold">
                <th className="p-4 rounded-tl-2xl">Title</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Standard</th>
                <th className="p-4 hidden sm:table-cell">Date Added</th>
                <th className="p-4 text-right rounded-tr-2xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {resources.map((resource) => (
                <tr key={resource.id} className="hover:bg-brand-primary/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 text-red-600 p-2 rounded-lg flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">{resource.title}</p>
                        <p className="text-xs text-brand-gray font-medium">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-brand-dark font-medium">{resource.subject}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-brand-dark text-xs font-semibold px-2.5 py-1 rounded-full">
                      {resource.standard}
                    </span>
                  </td>
                  <td className="p-4 text-brand-gray text-sm hidden sm:table-cell">{resource.date}</td>
                  <td className="p-4 text-right">
                    <button className="inline-flex items-center gap-1.5 bg-brand-light text-brand-dark hover:bg-brand-primary hover:text-white px-3 py-2 rounded-lg font-semibold text-sm transition-all">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
