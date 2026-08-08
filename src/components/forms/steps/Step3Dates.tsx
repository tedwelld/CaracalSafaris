"use client";

import type { EnquiryFormData } from "@/types/enquiry";

const durations = [
  { value: "2-4 days", label: "2–4 Days", desc: "Quick escape" },
  { value: "5-7 days", label: "5–7 Days", desc: "Signature journey" },
  { value: "8-10 days", label: "8–10 Days", desc: "Deep immersion" },
  { value: "10+ days", label: "10+ Days", desc: "Total Africa" },
];

const inputCls =
  "w-full bg-[var(--fg-05)] border border-[var(--fg-15)] rounded text-[var(--fg)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)] transition-colors";

interface Props {
  data: EnquiryFormData;
  update: (updates: Partial<EnquiryFormData>) => void;
}

export default function Step3Dates({ data, update }: Props) {
  return (
    <div>
      <h2
        className="text-[var(--fg)] text-3xl md:text-4xl mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        When are you travelling?
      </h2>
      <p className="text-[var(--fg-50)] mb-10">Approximate dates are fine — we&apos;ll refine as we plan.</p>

      {/* Flexible toggle */}
      <label className="flex items-center gap-3 mb-8 cursor-pointer">
        <div
          onClick={() => update({ flexible: !data.flexible })}
          className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 cursor-pointer ${
            data.flexible ? "bg-[var(--accent)]" : "bg-[var(--fg-20)]"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
              data.flexible ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-[var(--fg-70)] text-sm">My dates are flexible</span>
      </label>

      {/* Date inputs */}
      {!data.flexible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-[var(--fg-50)] text-xs tracking-widest uppercase mb-2">
              From
            </label>
            <input
              type="date"
              value={data.travelDatesFrom || ""}
              onChange={(e) => update({ travelDatesFrom: e.target.value })}
              className={inputCls}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="block text-[var(--fg-50)] text-xs tracking-widest uppercase mb-2">
              To
            </label>
            <input
              type="date"
              value={data.travelDatesTo || ""}
              onChange={(e) => update({ travelDatesTo: e.target.value })}
              className={inputCls}
              min={data.travelDatesFrom || new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      )}

      {/* Duration */}
      <div>
        <label className="block text-[var(--fg-50)] text-xs tracking-widest uppercase mb-4">
          Journey Length
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {durations.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => update({ duration: d.value })}
              className={`p-4 rounded-sm border text-center transition-all duration-300 ${
                data.duration === d.value
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-[var(--fg-10)] hover:border-[var(--fg-25)]"
              }`}
            >
              <p className="text-[var(--fg)] font-medium text-sm">{d.label}</p>
              <p className="text-[var(--fg-40)] text-xs mt-1">{d.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
