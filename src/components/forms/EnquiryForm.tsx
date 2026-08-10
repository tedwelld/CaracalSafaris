"use client";

import { useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EnquiryFormData } from "@/types/enquiry";
import FormProgress from "./FormProgress";
import Step1TripType from "./steps/Step1TripType";
import Step2Destinations from "./steps/Step2Destinations";
import Step3Dates from "./steps/Step3Dates";
import Step4Guests from "./steps/Step4Guests";
import Step5Contact from "./steps/Step5Contact";
import { siteConfig } from "@/data/siteConfig";

const initialState: EnquiryFormData = {
  tripType: "",
  destinations: [],
  travelDatesFrom: undefined,
  travelDatesTo: undefined,
  flexible: false,
  duration: "",
  adults: 2,
  children: 0,
  budgetRange: "",
  specialRequests: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  referralSource: "",
  termsAccepted: false,
};

type Action = { type: "UPDATE"; payload: Partial<EnquiryFormData> } | { type: "RESET" };

function reducer(state: EnquiryFormData, action: Action): EnquiryFormData {
  if (action.type === "UPDATE") return { ...state, ...action.payload };
  return initialState;
}

const TOTAL_STEPS = 5;

function canProceed(step: number, data: EnquiryFormData): boolean {
  if (step === 0) return !!data.tripType;
  if (step === 1) return data.destinations.length > 0;
  if (step === 2) return !!data.duration;
  return true;
}

export default function EnquiryForm() {
  const [step, setStep] = useState(0);
  const [data, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const update = (payload: Partial<EnquiryFormData>) =>
    dispatch({ type: "UPDATE", payload });

  const next = () => {
    if (!canProceed(step, data)) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || "Submission failed");
      }
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Something went wrong: ${msg}. Please try again or contact us on WhatsApp.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mx-auto mb-8">
          <i className="pi pi-check-circle" style={{ color: "var(--accent)", fontSize: "32px" }} />
        </div>
        <h2
          className="text-[var(--fg)] text-4xl mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your enquiry is with us.
        </h2>
        <p className="text-[var(--fg-60)] mb-10 max-w-md mx-auto">
          We&apos;ve received your enquiry and will be in touch within 24 hours.
          For immediate assistance, reach us on WhatsApp.
        </p>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello Caracal Africa Safaris, I just submitted a journey enquiry for ${data.destinations.join(", ")}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded font-semibold hover:opacity-90 transition-opacity"
        >
          <i className="pi pi-whatsapp" style={{ fontSize: "20px" }} />
          Continue on WhatsApp
        </a>
      </motion.div>
    );
  }

  const variants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormProgress current={step} />

      <div className="min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 && <Step1TripType data={data} update={update} />}
            {step === 1 && <Step2Destinations data={data} update={update} />}
            {step === 2 && <Step3Dates data={data} update={update} />}
            {step === 3 && <Step4Guests data={data} update={update} />}
            {step === 4 && <Step5Contact data={data} update={update} isSubmitting={isSubmitting} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-[var(--accent)] text-sm mt-4">{error}</p>
      )}

      {/* Navigation (not shown on final step — it has its own submit) */}
      {step < TOTAL_STEPS - 1 && (
        <div className="flex justify-between mt-10 pt-8 border-t border-[var(--fg-10)]">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="text-[var(--fg-50)] text-sm hover:text-[var(--fg)] disabled:opacity-0 transition-colors"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canProceed(step, data)}
            className="bg-[var(--accent)] text-[var(--accent-fg)] px-8 py-3 rounded text-sm font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            Continue →
          </button>
        </div>
      )}
    </form>
  );
}
