import Link from 'next/link';
import { login, signup } from './actions';
import { ShieldCheck } from 'lucide-react';

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
      <div className="flex items-center justify-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-black text-brand-primary tracking-tight">SANSKAR</span>
          <span className="text-3xl font-bold text-brand-dark tracking-tight">PORTAL</span>
        </Link>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-black text-brand-dark">Student Login</h1>
          <p className="text-brand-gray text-sm mt-2">Access your notes, tests, and progress</p>
        </div>

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-brand-dark">
          <label className="text-sm font-bold text-brand-dark" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-xl px-4 py-3 bg-gray-50 border border-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            name="email"
            placeholder="student@example.com"
            required
          />
          <label className="text-sm font-bold text-brand-dark" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-xl px-4 py-3 bg-gray-50 border border-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          
          <button
            formAction={login}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-xl px-4 py-4 mb-2 transition-colors shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">First time?</span>
            </div>
          </div>
          
          <button
            formAction={signup}
            className="bg-white border-2 border-brand-light text-brand-dark font-bold hover:border-brand-primary/30 rounded-xl px-4 py-4 transition-colors text-center w-full"
          >
            Register Student Account
          </button>
          
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-red-50 text-red-600 text-center text-sm rounded-xl font-medium border border-red-100">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
      
      <p className="text-center text-sm text-brand-gray mt-8">
        Protected by enterprise-grade security. <br/>
        <Link href="/" className="font-semibold text-brand-primary hover:underline mt-2 inline-block">← Back to Homepage</Link>
      </p>
    </div>
  );
}
