import Link from 'next/link';
import { Users, LayoutDashboard, Settings, LogOut, MessageSquare } from 'lucide-react';
import { logout } from '@/app/login/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black text-white tracking-tight">ADMIN</span>
            <span className="text-xl font-bold text-brand-primary tracking-tight">PANEL</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-brand-primary/20 text-white rounded-xl font-semibold">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/enquiries" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
            <MessageSquare className="w-5 h-5" />
            Enquiries
          </Link>
          <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5" />
            Students
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-4 text-sm">
            <p className="text-slate-500 mb-1">Logged in as Admin</p>
            <p className="font-medium text-white truncate">{user.email}</p>
          </div>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center text-white">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight">ADMIN PANEL</span>
          </Link>
          <form action={logout}>
            <button className="p-2 hover:bg-slate-800 rounded-lg">
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
