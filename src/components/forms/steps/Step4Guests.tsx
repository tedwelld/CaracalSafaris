"use client";

import type { EnquiryFormData } from "@/types/enquiry";

const budgets = [
  { value: "$3,000–$6,000", label: "$3K–$6K" },
  { value: "$6,000–$10,000", label: "$6K–$10K" },
  { value: "$10,000–$15,000", label: "$10K–$15K" },
  { value: "$15,000+", label: "$15K+" },
];

interface Props {
  data: EnquiryFormData;
  update: (updates: Partial<EnquiryFormData>) => void;
}

function Counter({ label, value, min = 0, max = 20, onChange }: {
  label: string; value: number; min?: number; max?: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-5 border border-[var(--fg-10)] rounded-sm">
      <span className="text-[var(--fg)]">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full border border-[var(--fg-20)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center text-lg leading-none"
        >
          −
        </button>
        <span className="text-[var(--fg)] w-6 text-center font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full border border-[var(--fg-20)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center text-lg leading-none"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function Step4Guests({ data, update }: Props) {
  return (
    <div>
      <h2
        className="text-[var(--fg)] text-3xl md:text-4xl mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Your group &amp; budget
      </h2>
      <p className="text-[var(--fg-50)] mb-10">This helps us tailor the right experience and properties.</p>

      <div className="space-y-3 mb-10">
        <Counter label="Adults" value={data.adults} min={1} onChange={(v) => update({ adults: v })} />
        <Counter label="Children (under 12)" value={data.children} min={0} onChange={(v) => update({ children: v })} />
      </div>

      <div className="mb-10">
        <label className="block text-[var(--fg-50)] text-xs tracking-widest uppercase mb-4">
          Approximate Budget (per person USD)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {budgets.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => update({ budgetRange: b.value })}
              className={`p-4 rounded-sm border text-center transition-all duration-300 ${
                data.budgetRange === b.value
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "border-[var(--fg-10)] text-[var(--fg-70)] hover:border-[var(--fg-25)]"
              }`}
            >
              <span className="text-sm font-medium">{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[var(--fg-50)] text-xs tracking-widest uppercase mb-3">
          Special Requests or Notes
        </label>
        <textarea
          value={data.specialRequests}
          onChange={(e) => update({ specialRequests: e.target.value })}
          rows={4}
          placeholder="Dietary requirements, celebrations, accessibility needs, bucket-list activities..."
          className="w-full bg-[var(--fg-05)] border border-[var(--fg-15)] rounded text-[var(--fg)] placeholder-[var(--fg-25)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>
    </div>
  );
}
