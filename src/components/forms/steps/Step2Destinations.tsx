"use client";

import Image from "next/image";
import type { EnquiryFormData } from "@/types/enquiry";

const destOptions = [
  { value: "victoria-falls", label: "Victoria Falls", country: "Zimbabwe/Zambia", image: "/images/victoria-falls.jpeg" },
  { value: "livingstone", label: "Livingstone", country: "Zambia", image: "/images/rafting.jpeg" },
  { value: "chobe", label: "Chobe", country: "Botswana", image: "/images/boat-cruise.jpeg" },
  { value: "hwange", label: "Hwange", country: "Zimbabwe", image: "/images/game-drive.jpeg" },
];

interface Props {
  data: EnquiryFormData;
  update: (updates: Partial<EnquiryFormData>) => void;
}

export default function Step2Destinations({ data, update }: Props) {
  const toggle = (slug: string) => {
    const current = data.destinations;
    const updated = current.includes(slug)
      ? current.filter((d) => d !== slug)
      : [...current, slug];
    update({ destinations: updated });
  };

  return (
    <div>
      <h2
        className="text-[var(--fg)] text-3xl md:text-4xl mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Where do you want to go?
      </h2>
      <p className="text-[var(--fg-50)] mb-10">Select one or more destinations. We&apos;ll handle the rest.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {destOptions.map((d) => {
          const selected = data.destinations.includes(d.value);
          return (
            <button
              key={d.value}
              type="button"
              onClick={() => toggle(d.value)}
              className={`relative overflow-hidden rounded-sm h-40 border-2 transition-all duration-300 ${
                selected ? "border-[var(--accent)]" : "border-transparent"
              }`}
            >
              <Image src={d.image} alt={d.label} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              <div className={`absolute inset-0 transition-all duration-300 ${selected ? "bg-[var(--accent)]/30" : "bg-black/50"}`} />

              {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <i className="pi pi-check" style={{ color: "var(--accent-fg)", fontSize: "12px" }} />
                </div>
              )}

              <div className="absolute inset-0 flex flex-col justify-end p-5 text-left">
                <p className="text-[var(--accent)] text-xs tracking-widest uppercase">{d.country}</p>
                <p className="text-white font-medium" style={{ fontFamily: "var(--font-display)" }}>
                  {d.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {data.destinations.length === 0 && (
        <p className="text-[var(--accent)] text-sm mt-4">Please select at least one destination.</p>
      )}
    </div>
  );
}
