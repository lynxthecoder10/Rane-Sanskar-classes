import Link from 'next/link';
import { Clock, GraduationCap, LogOut, ShieldCheck } from 'lucide-react';
import { logout } from '@/app/student-login/actions';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PendingApprovalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_approved')
      .eq('id', user.id)
      .single();

    if (profile?.role === 'admin') {
      redirect('/admin');
    }

    if (profile?.is_approved === true) {
      redirect('/dashboard');
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 text-brand-dark sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <section className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-primary">Pending Approval</p>
              <h1 className="text-2xl font-black tracking-tight text-brand-dark sm:text-3xl">
                Your student portal access is under review
              </h1>
            </div>
          </div>

          <div className="space-y-5 text-brand-gray">
            <p className="text-base leading-7">
              Your account is active, but study materials and dashboard metrics unlock only after the institute approves your student profile.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <GraduationCap className="mb-3 h-5 w-5 text-brand-primary" />
                <p className="font-semibold text-brand-dark">Batch assignment required</p>
                <p className="mt-1 text-sm leading-6">The office will connect your login to the correct class batch.</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-brand-primary" />
                <p className="font-semibold text-brand-dark">Materials stay private</p>
                <p className="mt-1 text-sm leading-6">Premium notes remain restricted to approved student accounts.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {user ? (
              <form action={logout}>
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-black sm:w-auto">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            ) : (
              <Link
                href="/student-login"
                className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
              >
                Student Login
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
