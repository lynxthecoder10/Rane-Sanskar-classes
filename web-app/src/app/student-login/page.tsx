import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="mb-8 flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-black tracking-tight text-brand-primary">SANSKAR</span>
          <span className="text-3xl font-bold tracking-tight text-brand-dark">PORTAL</span>
        </Link>
      </div>

      <div className="rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
            <ShieldCheck className="h-6 w-6 text-brand-primary" />
          </div>
          <h1 className="text-2xl font-black text-brand-dark">Student Login</h1>
          <p className="mt-2 text-sm text-brand-gray">Access your notes, tests, and progress</p>
        </div>

        <LoginForm />
      </div>

      <p className="mt-8 text-center text-sm text-brand-gray">
        Protected by enterprise-grade security. <br />
        <Link href="/" className="mt-2 inline-block font-semibold text-brand-primary hover:underline">
          &lt;- Back to Homepage
        </Link>
      </p>
    </div>
  );
}
