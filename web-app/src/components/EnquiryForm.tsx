'use client';

import { useState } from 'react';

const STANDARDS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th (SSC)', '9th (ICSE)', '10th (SSC)', '10th (ICSE)', '11th Commerce', '11th Science', '12th Commerce', '12th Science'];
const BOARDS = ['SSC', 'ICSE', 'CBSE', 'HSC'];

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
      // POST to our secure server-side API — not directly to Supabase
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
      setErrorMsg('Network error. Please check your connection and try again.');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">Enquiry Submitted!</h3>
        <p className="text-brand-gray mb-6">We will contact you within 24 hours. Thank you for choosing Rane&apos;s Sanskar Classes!</p>
        <button
          onClick={() => setFormState('idle')}
          className="bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary-hover transition-all"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" id="enquiry-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="student_name" className="block text-sm font-semibold text-brand-dark mb-1.5">Student&apos;s Name *</label>
          <input
            id="student_name"
            name="student_name"
            type="text"
            required
            maxLength={100}
            value={form.student_name}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="parent_name" className="block text-sm font-semibold text-brand-dark mb-1.5">Parent&apos;s Name *</label>
          <input
            id="parent_name"
            name="parent_name"
            type="text"
            required
            maxLength={100}
            value={form.parent_name}
            onChange={handleChange}
            placeholder="e.g. Mr. Suresh Sharma"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-dark mb-1.5">WhatsApp Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={15}
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1.5">Email (optional)</label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={200}
            value={form.email}
            onChange={handleChange}
            placeholder="parent@email.com"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="standard" className="block text-sm font-semibold text-brand-dark mb-1.5">Standard / Class *</label>
          <select
            id="standard"
            name="standard"
            required
            value={form.standard}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors bg-white"
          >
            <option value="">Select Standard</option>
            {STANDARDS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="board" className="block text-sm font-semibold text-brand-dark mb-1.5">Board</label>
          <select
            id="board"
            name="board"
            value={form.board}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark focus:outline-none focus:border-brand-primary transition-colors bg-white"
          >
            <option value="">Select Board</option>
            {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-brand-dark mb-1.5">Message / Questions (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          placeholder="Any specific subjects, timing preferences, or questions..."
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary transition-colors resize-none"
        />
      </div>

      {formState === 'error' && (
        <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          ⚠️ {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
      >
        {formState === 'loading' ? 'Submitting...' : 'Submit Enquiry →'}
      </button>
      <p className="text-center text-xs text-brand-gray">We respond within 24 hours. No spam, ever.</p>
    </form>
  );
}
