'use client';

import { useEffect, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Landmark,
  Mail,
  Phone,
  Send,
  User,
} from 'lucide-react';
import {
  normalizeStreamParam,
  VALID_BOARDS,
  VALID_STANDARDS,
  type BoardOption,
  type StandardOption,
} from '@/lib/course-options';

type FormState = 'idle' | 'loading' | 'success' | 'error';

type FormValues = {
  student_name: string;
  parent_name: string;
  phone: string;
  email: string;
  standard: StandardOption | '';
  board: BoardOption | '';
  message: string;
};

type FieldName = keyof FormValues;
type FieldErrors = Partial<Record<FieldName, string>>;

type EnquiryFormProps = {
  initialStandard?: StandardOption | '';
};

const initialForm = (initialStandard: StandardOption | ''): FormValues => ({
  student_name: '',
  parent_name: '',
  phone: '',
  email: '',
  standard: initialStandard,
  board: '',
  message: '',
});

const inputClassName =
  'peer w-full bg-transparent pb-2.5 pl-11 pr-10 pt-6 text-sm font-bold text-[#0a192f] outline-none placeholder:text-transparent';

const labelClassName =
  'pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-[#c52622] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-500';

function normalizePhone(value: string) {
  const stripped = value.replace(/[\s-]/g, '').trim();
  return stripped.startsWith('+91') ? stripped.slice(3) : stripped;
}

function shellClassName(hasError: boolean, isValid: boolean) {
  return [
    'relative rounded-2xl border bg-white shadow-sm transition-all duration-200',
    'focus-within:-translate-y-0.5 focus-within:shadow-[0_14px_28px_rgba(10,25,47,0.08)]',
    !hasError
      ? 'has-[input:valid:not(:placeholder-shown)]:border-emerald-300 has-[input:valid:not(:placeholder-shown)]:ring-4 has-[input:valid:not(:placeholder-shown)]:ring-emerald-50 has-[textarea:valid:not(:placeholder-shown)]:border-emerald-300 has-[textarea:valid:not(:placeholder-shown)]:ring-4 has-[textarea:valid:not(:placeholder-shown)]:ring-emerald-50 has-[select:valid]:border-emerald-300 has-[select:valid]:ring-4 has-[select:valid]:ring-emerald-50'
      : '',
    hasError
      ? 'animate-shake border-rose-300 ring-4 ring-rose-100'
      : isValid
        ? 'border-emerald-300 ring-4 ring-emerald-50'
        : 'border-slate-200 focus-within:border-[#c52622] focus-within:ring-4 focus-within:ring-[#c52622]/10',
  ].join(' ');
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-rose-600">
      <AlertCircle className="h-3.5 w-3.5" />
      <span>{message}</span>
    </p>
  );
}

function ValidCheck({ show }: { show: boolean }) {
  return (
    <CheckCircle className={`css-valid-check absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500 ${show ? 'opacity-100' : ''}`} />
  );
}

export default function EnquiryForm({ initialStandard = '' }: EnquiryFormProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [form, setForm] = useState<FormValues>(() => initialForm(initialStandard));

  const validPhone = /^[6-9]\d{9}$/.test(normalizePhone(form.phone));
  const validEmail = form.email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const isValid = (field: FieldName) => {
    switch (field) {
      case 'student_name':
      case 'parent_name':
        return form[field].trim().length >= 2;
      case 'phone':
        return validPhone;
      case 'email':
        return validEmail;
      case 'standard':
      case 'board':
        return Boolean(form[field]);
      case 'message':
        return form.message.trim().length > 0 && form.message.length <= 1000;
      default:
        return false;
    }
  };

  useEffect(() => {
    const handleUrlParamSync = () => {
      const params = new URLSearchParams(window.location.search);
      const standardParam = params.get('standard');
      const mappedStandard = normalizeStreamParam(params.get('stream'));
      const nextStandard: StandardOption | undefined = standardParam && VALID_STANDARDS.includes(standardParam as StandardOption)
        ? (standardParam as StandardOption)
        : mappedStandard;

      if (nextStandard) {
        setForm(prev => ({ ...prev, standard: nextStandard }));
      }
    };

    const handleHighlight = () => {
      setIsHighlighted(true);
      window.setTimeout(() => setIsHighlighted(false), 1650);
    };

    handleUrlParamSync();
    window.addEventListener('popstate', handleUrlParamSync);
    window.addEventListener('enquiry-form-highlight', handleHighlight);

    return () => {
      window.removeEventListener('popstate', handleUrlParamSync);
      window.removeEventListener('enquiry-form-highlight', handleHighlight);
    };
  }, []);

  const updateField = (target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
    const fieldName = target.name as FieldName;
    const fieldValue = target.value;

    setForm(prev => ({ ...prev, [fieldName]: fieldValue } as FormValues));
    setFieldErrors(prev => {
      if (!prev[fieldName]) {
        return prev;
      }

      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateField(e.currentTarget);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateField(e.currentTarget);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        const nextErrors: FieldErrors = {};

        if (data.errors && typeof data.errors === 'object') {
          Object.entries(data.errors as Record<string, unknown>).forEach(([key, value]) => {
            const target = key === 'stream_selected' ? 'standard' : key;

            if (target in form) {
              const message = Array.isArray(value)
                ? value.filter(Boolean).join(' ')
                : String(value ?? '');

              if (message) {
                nextErrors[target as FieldName] = message;
              }
            }
          });
        }

        setFieldErrors(nextErrors);
        setErrorMsg(Object.keys(nextErrors).length > 0 ? 'Please review the highlighted fields.' : data.error || 'Something went wrong. Please try again.');
        setFormState('error');
        return;
      }

      setFormState('success');
      setForm(initialForm(''));
    } catch {
      setErrorMsg('Network connection error. Please try again.');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div className="animate-fade-in space-y-6 rounded-[28px] border border-emerald-200 bg-emerald-50/70 px-6 py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100/50 bg-white text-emerald-600 shadow-sm">
          <CheckCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-extrabold text-brand-secondary">
            Enquiry Registered Successfully!
          </h3>
          <p className="mx-auto max-w-md font-sans text-sm leading-relaxed text-brand-gray">
            Thank you for connecting with Rane&apos;s Sanskar Classes. An academic counsellor will call you shortly to schedule your child&apos;s free trial demo batch.
          </p>
        </div>
        <button
          onClick={() => {
            setFormState('idle');
            setErrorMsg('');
            setFieldErrors({});
          }}
          className="rounded-full bg-brand-primary px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-brand-primary-hover hover:shadow-lg active:scale-95"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`scroll-mt-32 space-y-5 rounded-[28px] transition-shadow duration-500 ${isHighlighted ? 'form-focus-pulse' : ''}`}
      id="enquiry-form"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div className={shellClassName(Boolean(fieldErrors.student_name), isValid('student_name'))}>
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="student_name"
              name="student_name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={form.student_name}
              onChange={handleChange}
              onInput={handleInput}
              placeholder="Student name"
              aria-invalid={Boolean(fieldErrors.student_name)}
              className={inputClassName}
            />
            <label htmlFor="student_name" className={labelClassName}>
              Student&apos;s Name *
            </label>
            <ValidCheck show={isValid('student_name')} />
          </div>
          <FieldError message={fieldErrors.student_name} />
        </div>

        <div>
          <div className={shellClassName(Boolean(fieldErrors.parent_name), isValid('parent_name'))}>
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="parent_name"
              name="parent_name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={form.parent_name}
              onChange={handleChange}
              onInput={handleInput}
              placeholder="Parent name"
              aria-invalid={Boolean(fieldErrors.parent_name)}
              className={inputClassName}
            />
            <label htmlFor="parent_name" className={labelClassName}>
              Parent&apos;s Name *
            </label>
            <ValidCheck show={isValid('parent_name')} />
          </div>
          <FieldError message={fieldErrors.parent_name} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div className={shellClassName(Boolean(fieldErrors.phone), validPhone)}>
            <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              pattern="[6-9][0-9]{9}"
              maxLength={15}
              value={form.phone}
              onChange={handleChange}
              onInput={handleInput}
              placeholder="WhatsApp number"
              aria-invalid={Boolean(fieldErrors.phone)}
              className={inputClassName}
            />
            <label htmlFor="phone" className={labelClassName}>
              WhatsApp Number *
            </label>
            <ValidCheck show={validPhone} />
          </div>
          <FieldError message={fieldErrors.phone} />
        </div>

        <div>
          <div className={shellClassName(Boolean(fieldErrors.email), validEmail)}>
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              maxLength={200}
              value={form.email}
              onChange={handleChange}
              onInput={handleInput}
              placeholder="Email address"
              aria-invalid={Boolean(fieldErrors.email)}
              className={inputClassName}
            />
            <label htmlFor="email" className={labelClassName}>
              Email Address
            </label>
            <ValidCheck show={validEmail} />
          </div>
          <FieldError message={fieldErrors.email} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div className={shellClassName(Boolean(fieldErrors.standard), isValid('standard'))}>
            <BookOpen className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              id="standard"
              name="standard"
              required
              value={form.standard}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.standard)}
              className="w-full cursor-pointer appearance-none bg-transparent pb-2.5 pl-11 pr-10 pt-6 text-sm font-bold text-[#0a192f] outline-none"
            >
              <option value="">Select Target Class</option>
              {VALID_STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <label htmlFor="standard" className="pointer-events-none absolute left-11 top-2.5 text-[10px] font-bold text-slate-500 transition-colors peer-focus:text-[#c52622]">
              Target Standard / Class *
            </label>
            <ChevronDown className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <FieldError message={fieldErrors.standard} />
        </div>

        <div>
          <div className={shellClassName(Boolean(fieldErrors.board), isValid('board'))}>
            <Landmark className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              id="board"
              name="board"
              required
              value={form.board}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.board)}
              className="w-full cursor-pointer appearance-none bg-transparent pb-2.5 pl-11 pr-10 pt-6 text-sm font-bold text-[#0a192f] outline-none"
            >
              <option value="">Select Board</option>
              {VALID_BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <label htmlFor="board" className="pointer-events-none absolute left-11 top-2.5 text-[10px] font-bold text-slate-500 transition-colors peer-focus:text-[#c52622]">
              Education Board *
            </label>
            <ChevronDown className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <FieldError message={fieldErrors.board} />
        </div>
      </div>

      <div>
        <div className={shellClassName(Boolean(fieldErrors.message), isValid('message'))}>
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={1000}
            value={form.message}
            onChange={handleChange}
            onInput={handleInput}
            placeholder="Message"
            aria-invalid={Boolean(fieldErrors.message)}
            className="peer min-h-28 w-full resize-none bg-transparent px-4 pb-3 pt-7 text-sm font-semibold text-[#0a192f] outline-none placeholder:text-transparent"
          />
          <label
            htmlFor="message"
            className="pointer-events-none absolute left-4 top-5 text-sm font-bold text-slate-400 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-[#c52622] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-500"
          >
            Message / Specific Questions
          </label>
        </div>
        <FieldError message={fieldErrors.message} />
      </div>

      {formState === 'error' && errorMsg && (
        <div className="animate-fade-in flex items-start gap-2.5 rounded-2xl border border-rose-100 bg-rose-50 p-3.5 text-xs text-rose-600 sm:text-sm">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span className="font-sans font-semibold">{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="group flex w-full cursor-pointer select-none items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c52622] to-[#9f1711] py-4 font-sans text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-[#c52622]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#c52622]/25 active:scale-95 active:bg-opacity-80 disabled:cursor-not-allowed disabled:opacity-75"
      >
        <span>{formState === 'loading' ? 'Registering...' : 'Register for Trial Class'}</span>
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      <p className="text-center font-sans text-[10px] font-semibold text-brand-gray sm:text-xs">
        Private and secure. We strictly respect family data and never send spam.
      </p>
    </form>
  );
}
