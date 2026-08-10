"use client";

import Image from "next/image";
import type { EnquiryFormData } from "@/types/enquiry";

const tripTypes = [
  { value: "honeymoon", label: "Honeymoon", desc: "Romance & exclusivity",      image: "/images/sunset-cruise.jpeg" },
  { value: "family",    label: "Family",    desc: "Memorable family adventure",  image: "/images/elephant.jpeg" },
  { value: "solo",      label: "Solo",      desc: "My own pace, my own story",   image: "/images/victoria-falls.jpeg" },
  { value: "group",     label: "Group",     desc: "Friends or special occasion", image: "/images/bungee.jpeg" },
  { value: "corporate", label: "Corporate", desc: "Incentive or team retreat",   image: "/images/helicopter-ride.jpeg" },
];

interface Props {
  data: EnquiryFormData;
  update: (updates: Partial<EnquiryFormData>) => void;
}

export default function Step1TripType({ data, update }: Props) {
  return (
    <div>
      <h2
        className="text-[var(--fg)] text-3xl md:text-4xl mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        What kind of safari?
      </h2>
      <p className="text-[var(--fg-50)] mb-10">Tell us who you&apos;re travelling with.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tripTypes.map((t) => {
          const selected = data.tripType === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => update({ tripType: t.value })}
              className={`relative overflow-hidden rounded-sm h-44 border-2 transition-all duration-300 text-left ${
                selected ? "border-[var(--accent)]" : "border-transparent"
              }`}
            >
              <Image
                src={t.image}
                alt={t.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  selected ? "bg-[var(--accent)]/30" : "bg-black/50"
                }`}
              />

              {selected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <i className="pi pi-check" style={{ color: "var(--accent-fg)", fontSize: "12px" }} />
                </div>
              )}

              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="text-[var(--accent)] text-xs tracking-widest uppercase mb-0.5">{t.desc}</p>
                <p className="text-white font-medium" style={{ fontFamily: "var(--font-display)" }}>
                  {t.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
