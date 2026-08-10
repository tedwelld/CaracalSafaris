"use client";

import type { EnquiryFormData } from "@/types/enquiry";

const referralOptions = [
  "Instagram / Social Media",
  "Google Search",
  "Friend / Family Recommendation",
  "Travel Agent",
  "Previous Caracal Safaris Guest",
  "Other",
];

interface Props {
  data: EnquiryFormData;
  update: (updates: Partial<EnquiryFormData>) => void;
  isSubmitting: boolean;
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[var(--fg-50)] text-xs tracking-widest uppercase mb-2">
        {label} {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[var(--fg-05)] border border-[var(--fg-15)] rounded text-[var(--fg)] placeholder-[var(--fg-25)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors";

export default function Step5Contact({ data, update, isSubmitting }: Props) {
  return (
    <div>
      <h2
        className="text-[var(--fg)] text-3xl md:text-4xl mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Almost done.
      </h2>
      <p className="text-[var(--fg-50)] mb-10">Tell us how to reach you and we&apos;ll be in touch within 24 hours.</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Full Name" required>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
              placeholder="Your full name"
              className={inputCls}
              required
            />
          </Field>
          <Field label="Email Address" required>
            <input
              type="email"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="your@email.com"
              className={inputCls}
              required
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="WhatsApp / Phone">
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="+1 234 567 8900"
              className={inputCls}
            />
          </Field>
          <Field label="Country of Residence">
            <input
              type="text"
              value={data.country}
              onChange={(e) => update({ country: e.target.value })}
              placeholder="United Kingdom"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="How did you hear about us?">
          <select
            value={data.referralSource}
            onChange={(e) => update({ referralSource: e.target.value })}
            className={`${inputCls} cursor-pointer`}
          >
            <option value="" className="bg-[var(--bg)]">Select one</option>
            {referralOptions.map((o) => (
              <option key={o} value={o} className="bg-[var(--bg)]">{o}</option>
            ))}
          </select>
        </Field>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.termsAccepted}
            onChange={(e) => update({ termsAccepted: e.target.checked })}
            className="mt-0.5 accent-[var(--accent)] w-4 h-4 flex-shrink-0"
          />
          <span className="text-[var(--fg-50)] text-sm leading-relaxed">
            I agree to Caracal Safaris contacting me about my journey enquiry. My details will
            not be shared with third parties.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !data.fullName || !data.email || !data.termsAccepted}
          className="w-full bg-[var(--accent)] text-[var(--accent-fg)] py-4 rounded text-sm font-semibold tracking-wide hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isSubmitting ? "Sending your enquiry..." : "Send my enquiry →"}
        </button>
      </div>
    </div>
  );
}
