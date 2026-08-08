import { siteConfig } from "@/data/siteConfig";
import type { BookingContext } from "@/types/booking";
import type { EnquiryFormData } from "@/types/enquiry";
import type { WhatsAppTemplate, WhatsAppTemplateId } from "./types";

type Ctx = Record<string, unknown>;

function asEnquiry(ctx: Ctx) {
  return ctx as unknown as EnquiryFormData & { ref?: string };
}

function asBooking(ctx: Ctx) {
  return ctx as unknown as BookingContext;
}

const templates: WhatsAppTemplate[] = [
  {
    id: "general.enquiry.whatsapp",
    renderMessage: () => siteConfig.whatsappMessage,
  },
  {
    id: "enquiry.client.whatsapp",
    renderMessage: (ctx) => {
      const d = asEnquiry(ctx);
      const dest = d.destinations?.join(", ") || "Victoria Falls Triangle";
      return `Hello Caracal Safaris, I submitted an enquiry${d.ref ? ` (${d.ref})` : ""} for ${dest}. Looking forward to hearing from you.`;
    },
  },
  {
    id: "enquiry.admin.whatsapp",
    renderMessage: (ctx) => {
      const d = asEnquiry(ctx);
      return `New enquiry ${d.ref || ""} from ${d.fullName}: ${d.destinations?.join(", ")}`;
    },
  },
  {
    id: "booking.confirmation.whatsapp",
    renderMessage: (ctx) => {
      const b = asBooking(ctx);
      const names = b.lines.map((l) => `${l.name}×${l.quantity}`).join(", ");
      return `Hello Caracal Safaris, I submitted booking ${b.ref} for: ${names}. Total indicative $${b.subtotalUsd} USD. Please confirm availability and payment.`;
    },
  },
  {
    id: "booking.admin.whatsapp",
    renderMessage: (ctx) => {
      const b = asBooking(ctx);
      return `New booking ${b.ref} — ${b.fullName} — $${b.subtotalUsd} USD`;
    },
  },
  {
    id: "booking.cancellation.whatsapp",
    renderMessage: (ctx) =>
      `Regarding cancellation of booking ${asBooking(ctx).ref}.`,
  },
  {
    id: "booking.modification.whatsapp",
    renderMessage: (ctx) =>
      `I'd like to modify booking ${asBooking(ctx).ref}.`,
  },
  {
    id: "booking.ticket.whatsapp",
    renderMessage: (ctx) =>
      `Please resend tickets/voucher for booking ${asBooking(ctx).ref}.`,
  },
  {
    id: "payment.reminder.whatsapp",
    renderMessage: (ctx) => {
      const b = asBooking(ctx);
      return `Payment reminder for ${b.ref}: $${b.subtotalUsd} ${b.currency}. ${b.paymentUrl || ""}`;
    },
  },
  {
    id: "payment.received.whatsapp",
    renderMessage: (ctx) =>
      `Payment confirmation for booking ${asBooking(ctx).ref}.`,
  },
  {
    id: "cart.abandoned.whatsapp",
    renderMessage: (ctx) => {
      const b = asBooking(ctx);
      return `I still have activities in my cart (about $${b.subtotalUsd} USD). Can you help me finish booking?`;
    },
  },
  {
    id: "pretrip.reminder.whatsapp",
    renderMessage: (ctx) => {
      const b = asBooking(ctx);
      return `Pre-trip check-in for ${b.ref}${b.activityDate ? ` on ${b.activityDate}` : ""}.`;
    },
  },
  {
    id: "pickup.reminder.whatsapp",
    renderMessage: (ctx) => {
      const b = asBooking(ctx);
      return `Pickup for ${b.ref}: ${b.pickupTime || "TBC"} at ${b.pickupPoint || "TBC"}.`;
    },
  },
  {
    id: "booking.details_incomplete.whatsapp",
    renderMessage: (ctx) =>
      `Following up on missing details for booking ${asBooking(ctx).ref}.`,
  },
  {
    id: "posttrip.thankyou.whatsapp",
    renderMessage: () =>
      "Thank you Caracal Safaris — we had an incredible journey!",
  },
  {
    id: "posttrip.review.whatsapp",
    renderMessage: () =>
      "I'd like to share feedback about my Caracal Safaris experience.",
  },
];

const byId = Object.fromEntries(templates.map((t) => [t.id, t])) as Partial<
  Record<WhatsAppTemplateId, WhatsAppTemplate>
>;

export function getWhatsAppTemplate(id: WhatsAppTemplateId): WhatsAppTemplate {
  const t = byId[id];
  if (!t) throw new Error(`Unknown WhatsApp template: ${id}`);
  return t;
}

export function renderWhatsAppMessage(
  id: WhatsAppTemplateId,
  ctx: Record<string, unknown> = {}
) {
  return getWhatsAppTemplate(id).renderMessage(ctx);
}

export function waMeUrl(message: string, phone = siteConfig.whatsappNumber) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function whatsappFromTemplate(
  id: WhatsAppTemplateId,
  ctx: Record<string, unknown> = {},
  phone?: string
) {
  return waMeUrl(renderWhatsAppMessage(id, ctx), phone);
}

export { templates as whatsappTemplates };
