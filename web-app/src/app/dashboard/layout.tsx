import Link from 'next/link';
import { BookOpen, LogOut, LayoutDashboard, Settings, User } from 'lucide-react';
import { logout } from '@/app/student-login/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/student-login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-black text-brand-primary tracking-tight">SANSKAR</span>
            <span className="text-xl font-bold text-brand-dark tracking-tight">PORTAL</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-brand-primary/10 text-brand-primary rounded-xl font-semibold">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/dashboard/resources" className="flex items-center gap-3 px-4 py-3 text-brand-dark hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <BookOpen className="w-5 h-5 text-brand-gray" />
            Study Materials
          </Link>
          <Link href="/dashboard/mock-tests" className="flex items-center gap-3 px-4 py-3 text-brand-dark hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 text-brand-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            Mock Tests
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-brand-dark hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <User className="w-5 h-5 text-brand-gray" />
            Profile
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-brand-dark hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5 text-brand-gray" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="mb-4 px-4">
            <p className="text-xs font-semibold text-brand-gray uppercase tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-medium text-brand-dark truncate">{user.email}</p>
          </div>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-lg font-black text-brand-primary tracking-tight">SANSKAR</span>
          </Link>
          <form action={logout}>
            <button className="text-brand-gray p-2 hover:bg-gray-100 rounded-lg">
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
