import { createClient } from '@/utils/supabase/server';
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch enquiries safely via SSR
  const { data: enquiries, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching enquiries:", error);
  }

  const validEnquiries = enquiries || [];
  const totalLeads = validEnquiries.length;
  const newLeads = validEnquiries.filter(e => e.status === 'new').length;
  const enrolled = validEnquiries.filter(e => e.status === 'enrolled').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-500 text-lg">Manage your business operations and admission leads.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Leads', value: totalLeads.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { title: 'New Enquiries', value: newLeads.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
          { title: 'Successfully Enrolled', value: enrolled.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Conversion Rate', value: totalLeads > 0 ? `${Math.round((enrolled / totalLeads) * 100)}%` : '0%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Recent Admission Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold">
                <th className="p-4">Date</th>
                <th className="p-4">Student</th>
                <th className="p-4">Standard</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {validEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No enquiries found. Wait for users to submit the form on the homepage!
                  </td>
                </tr>
              ) : (
                validEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-sm text-slate-500 whitespace-nowrap">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{enquiry.student_name}</p>
                      <p className="text-xs text-slate-500">Parent: {enquiry.parent_name}</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                        {enquiry.standard} {enquiry.board && `(${enquiry.board})`}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <p className="text-slate-900 font-medium">{enquiry.phone}</p>
                      <p className="text-xs text-slate-500">{enquiry.email || 'No email'}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        enquiry.status === 'new' ? 'bg-amber-100 text-amber-700' :
                        enquiry.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                        enquiry.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {enquiry.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
