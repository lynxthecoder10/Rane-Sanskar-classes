'use client';

import { useActionState } from 'react';
import { AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { authenticate, type AuthFormState } from './actions';

const initialState: AuthFormState = {
  status: 'idle',
  message: '',
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(authenticate, initialState);

  return (
    <form action={formAction} className="animate-in flex w-full flex-1 flex-col justify-center gap-2 text-brand-dark">
      <label className="text-sm font-bold text-brand-dark" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className="mb-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        name="email"
        type="email"
        placeholder="student@example.com"
        autoComplete="username"
        inputMode="email"
        required
      />

      <label className="text-sm font-bold text-brand-dark" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        className="mb-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        minLength={6}
        required
      />

      <button
        type="submit"
        name="intent"
        value="login"
        disabled={isPending}
        className="mb-2 flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-4 font-bold text-white shadow-md transition-colors hover:bg-brand-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        <span>{isPending ? 'Checking Access...' : 'Sign In'}</span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">First time?</span>
        </div>
      </div>

      <button
        type="submit"
        name="intent"
        value="signup"
        disabled={isPending}
        className="w-full rounded-xl border-2 border-brand-light bg-white px-4 py-4 text-center font-bold text-brand-dark transition-colors hover:border-brand-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Register Student Account
      </button>

      {state.message && (
        <div
          className={[
            'mt-4 flex items-start gap-2.5 rounded-2xl border p-4 text-sm font-bold',
            state.status === 'error'
              ? 'animate-shake border-rose-100 bg-rose-50 text-rose-700'
              : 'border-emerald-100 bg-emerald-50 text-emerald-700',
          ].join(' ')}
          role={state.status === 'error' ? 'alert' : 'status'}
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}
    </form>
  );
}
