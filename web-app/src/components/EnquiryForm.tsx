'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, User, Phone, Mail, Landmark, BookOpen, Send } from 'lucide-react';

const STANDARDS = [
  'Class VIII (SSC)', 'Class VIII (ICSE)', 
  'Class IX (SSC)', 'Class IX (ICSE)', 
  'Class X (SSC)', 'Class X (ICSE)', 
  'Class XI Commerce', 'Class XI Science', 
  'Class XII Commerce', 'Class XII Science',
  'CA Foundation Prep', 'CMA Foundation Prep',
  'Vocational Computer Courses'
];

const BOARDS = ['Maharashtra SSC / HSC', 'ICSE / ISC Board', 'CBSE Board', 'University of Mumbai'];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function EnquiryForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    standard: '',
    board: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setFormState('error');
        return;
      }

      setFormState('success');
      setForm({ student_name: '', parent_name: '', phone: '', email: '', standard: '', board: '', message: '' });
    } catch {
      setErrorMsg('Network connection error. Please try again.');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div className="text-center py-12 px-6 space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100/50">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-2xl text-brand-secondary">
            Enquiry Registered Successfully!
          </h3>
          <p className="text-brand-gray font-sans text-sm max-w-md mx-auto leading-relaxed">
            Thank you for connecting with Rane&apos;s Sanskar Classes. An academic counsellor will call you shortly to schedule your child's free trial demo batch.
          </p>
        </div>
        <button
          onClick={() => setFormState('idle')}
          className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-full font-sans font-bold transition-all duration-300 shadow-md hover:shadow-lg text-xs tracking-wider uppercase"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="enquiry-form">
      {/* Student & Parent Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="student_name" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
            Student&apos;s Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="student_name"
              name="student_name"
              type="text"
              required
              maxLength={100}
              value={form.student_name}
              onChange={handleChange}
              placeholder="e.g. Rahul Rane"
              className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-10 pr-4 py-3.5 text-brand-secondary font-sans placeholder:text-slate-400 focus:outline-none transition-all text-sm bg-slate-50/30"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="parent_name" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
            Parent&apos;s Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="parent_name"
              name="parent_name"
              type="text"
              required
              maxLength={100}
              value={form.parent_name}
              onChange={handleChange}
              placeholder="e.g. Suresh Rane"
              className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-10 pr-4 py-3.5 text-brand-secondary font-sans placeholder:text-slate-400 focus:outline-none transition-all text-sm bg-slate-50/30"
            />
          </div>
        </div>
      </div>

      {/* Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
            WhatsApp Number *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              maxLength={15}
              value={form.phone}
              onChange={handleChange}
              placeholder="98765 43210"
              className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-10 pr-4 py-3.5 text-brand-secondary font-sans placeholder:text-slate-400 focus:outline-none transition-all text-sm bg-slate-50/30"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
            Email Address (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={200}
              value={form.email}
              onChange={handleChange}
              placeholder="parent@email.com"
              className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-10 pr-4 py-3.5 text-brand-secondary font-sans placeholder:text-slate-400 focus:outline-none transition-all text-sm bg-slate-50/30"
            />
          </div>
        </div>
      </div>

      {/* Standard & Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="standard" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
            Target Standard / Class *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <select
              id="standard"
              name="standard"
              required
              value={form.standard}
              onChange={handleChange}
              className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-10 pr-8 py-3.5 text-brand-secondary font-sans focus:outline-none transition-all text-sm bg-white cursor-pointer appearance-none"
            >
              <option value="">Select Target Class</option>
              {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="board" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
            Education Board *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Landmark className="w-4 h-4" />
            </div>
            <select
              id="board"
              name="board"
              required
              value={form.board}
              onChange={handleChange}
              className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl pl-10 pr-8 py-3.5 text-brand-secondary font-sans focus:outline-none transition-all text-sm bg-white cursor-pointer appearance-none"
            >
              <option value="">Select Board</option>
              {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-bold font-sans text-brand-secondary/80 uppercase tracking-wider">
          Message / Specific Questions (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          placeholder="Let us know if you have timing preferences, specific subject targets, or general doubt enquiries..."
          className="w-full border border-slate-200 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 rounded-2xl px-4 py-3.5 text-brand-secondary font-sans placeholder:text-slate-400 focus:outline-none transition-all text-sm bg-slate-50/30 resize-none"
        />
      </div>

      {/* Error Alert */}
      {formState === 'error' && (
        <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-100 rounded-2xl p-4 text-rose-600 animate-fade-in text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-sans font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-75 disabled:cursor-not-allowed text-white font-sans font-bold py-4 rounded-2xl transition-all duration-300 shadow-md shadow-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/20 flex items-center justify-center gap-2 group cursor-pointer text-sm tracking-wider uppercase"
      >
        <span>{formState === 'loading' ? 'Registering...' : 'Register for Trial Class'}</span>
        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
      <p className="text-center text-[10px] sm:text-xs font-sans text-brand-gray">
        🔒 Your personal data is fully protected. We strictly respect privacy, no spam.
      </p>
    </form>
  );
}
