'use client';

import { useState } from 'react';

// =============================================================
// VALIDATION
// =============================================================
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.\-]?)(\d{3}[\s.\-]?\d{4})$/;

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function validate(f: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (f.firstName.trim().length < 1)    errors.firstName = 'Required field.';
  if (f.lastName.trim().length < 1)     errors.lastName  = 'Required field.';
  if (!emailRegex.test(f.email.trim())) errors.email     = 'Enter a valid email (e.g. name@domain.com).';
  if (!phoneRegex.test(f.phone.trim())) errors.phone     = 'Enter a valid US phone number (e.g. (925) 555-0101).';
  if (f.subject.trim().length < 2)      errors.subject   = 'Please add a subject.';
  if (f.message.trim().length < 5)      errors.message   = 'Please include a message.';
  return errors;
}

// =============================================================
// SUB-COMPONENTS
// =============================================================
function InfoRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// =============================================================
// CONTACT PAGE
// =============================================================
export default function ContactPage() {
  const [fields, setFields] = useState<FormFields>({
    firstName: '', lastName: '', email: '', phone: '', subject: '', message: '',
  });
  const [errors, setErrors]       = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    setSubmitted(false);

    const newErrors = validate(updated);
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim().length > 0 ? newErrors[name as keyof FormErrors] : undefined,
    }));
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Strip everything except digits, cap at 10
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);

    // Rebuild the mask as digits arrive
    let masked = '';
    if (digits.length === 0) {
      masked = '';
    } else if (digits.length <= 3) {
      masked = `(${digits}`;
    } else if (digits.length <= 6) {
      masked = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      masked = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    const updated = { ...fields, phone: masked };
    setFields(updated);
    setSubmitted(false);

    const newErrors = validate(updated);
    setErrors((prev) => ({
      ...prev,
      phone: masked.length > 0 ? newErrors.phone : undefined,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 ${
      errors[field]
        ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
    }`;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* ── Header ── */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Reach out and we'll get back to you within one business day.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* ── LEFT SIDEBAR ── */}
        <div className="flex flex-col gap-6">

          {/* Contact details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Contact info
            </p>
            <InfoRow
              label="Phone"
              value="(925) 555-0100"
              sub="Mon–Fri, 9am–5pm"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.04 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
              }
            />
            <InfoRow
              label="Email"
              value="hello@directory.com"
              sub="We reply within 24 hours"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
            />
            <InfoRow
              label="Location"
              value="Walnut Creek, CA 94596"
              sub="Contra Costa County"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              }
            />
          </div>

          {/* Business hours */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4">
              Open now
            </span>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Business hours
            </p>
            <div className="space-y-2">
              {[
                ['Monday – Friday', '9:00am – 5:00pm'],
                ['Saturday',        '10:00am – 2:00pm'],
                ['Sunday',          'Closed'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-500">{day}</span>
                  <span className="font-semibold text-gray-800">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl h-28 flex flex-col items-center justify-center gap-1.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            <span className="text-xs">925 area · East Bay, California</span>
          </div>
        </div>

        {/* ── RIGHT — FORM ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Send us a message</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Fill in the form below and one of our team members will get back to you shortly.
          </p>
          <hr className="border-gray-100 mb-6" />

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" error={errors.firstName}>
                <input
                  name="firstName" type="text" value={fields.firstName}
                  onChange={handleChange} placeholder="Jane"
                  className={inputClass('firstName')}
                />
              </Field>
              <Field label="Last name" error={errors.lastName}>
                <input
                  name="lastName" type="text" value={fields.lastName}
                  onChange={handleChange} placeholder="Smith"
                  className={inputClass('lastName')}
                />
              </Field>
            </div>

            <Field label="Email address" error={errors.email}>
              <input
                name="email" type="email" value={fields.email}
                onChange={handleChange} placeholder="jane@example.com"
                className={inputClass('email')}
              />
            </Field>

            {/* Phone — uses dedicated masked handler */}
            <Field label="Phone number" error={errors.phone}>
              <input
                name="phone" type="tel" value={fields.phone}
                onChange={handlePhoneChange} placeholder="(925) 555-0101"
                className={inputClass('phone')}
                maxLength={14}
              />
            </Field>

            <Field label="Subject" error={errors.subject}>
              <input
                name="subject" type="text" value={fields.subject}
                onChange={handleChange} placeholder="How can we help?"
                className={inputClass('subject')}
              />
            </Field>

            <Field label="Message" error={errors.message}>
              <textarea
                name="message" rows={4} value={fields.message}
                onChange={handleChange} placeholder="Tell us a bit more..."
                className={`${inputClass('message')} resize-none`}
              />
            </Field>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-700 hover:-translate-y-0.5 transition-all duration-200 text-sm tracking-wide uppercase"
            >
              Send Message →
            </button>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3 text-center">
                ✓ Message sent — we'll be in touch within one business day.
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}