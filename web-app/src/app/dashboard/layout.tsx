import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { logout } from '@/app/student-login/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/dashboard/DashboardNav';

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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_approved')
    .eq('id', user.id)
    .single();

  const canViewDashboard = profile?.role === 'admin' || profile?.is_approved === true;

  if (!canViewDashboard) {
    redirect('/pending-approval');
  }

  return (
    <div className="flex min-h-screen bg-[var(--logo-obsidian)]">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#07111f] md:flex">
        <div className="border-b border-white/10 p-6">
          <Link href="/dashboard" prefetch className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-[var(--logo-crimson)]">SANSKAR</span>
            <span className="text-xl font-bold tracking-tight text-white">PORTAL</span>
          </Link>
        </div>
        <DashboardNav />

        <div className="border-t border-white/10 p-4">
          <div className="mb-4 px-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Logged in as</p>
            <p className="truncate text-sm font-medium text-white">{user.email}</p>
          </div>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 font-medium text-rose-300 transition-colors hover:bg-rose-500/10 hover:text-rose-100">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b border-white/10 bg-[#07111f] p-4 md:hidden">
          <Link href="/dashboard" prefetch className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-[var(--logo-crimson)]">SANSKAR</span>
          </Link>
          <form action={logout}>
            <button className="p-2 text-slate-400 hover:bg-white/10 hover:text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </header>

        <main className="flex-1 overflow-y-auto bg-[var(--logo-obsidian)] p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
