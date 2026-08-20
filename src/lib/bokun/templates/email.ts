import type { BookingContext } from "@/types/booking";
import type { EnquiryFormData } from "@/types/enquiry";
import { emailShell, detailTable, firstName, escapeHtml } from "@/lib/email/shell";
import type { EmailTemplate, TemplateId } from "./types";

type Ctx = Record<string, unknown>;

function asEnquiry(ctx: Ctx) {
  return ctx as unknown as EnquiryFormData & { ref: string };
}

function asBooking(ctx: Ctx) {
  return ctx as unknown as BookingContext;
}

function enquirySummaryRows(data: EnquiryFormData): [string, string][] {
  const travelDates = data.flexible
    ? "Flexible"
    : `${data.travelDatesFrom || "?"} – ${data.travelDatesTo || "?"}`;
  const guests = `${data.adults} adult${data.adults !== 1 ? "s" : ""}${
    data.children ? `, ${data.children} child${data.children !== 1 ? "ren" : ""}` : ""
  }`;
  return [
    ["Trip type", data.tripType],
    ["Destinations", data.destinations.join(", ")],
    ["Travel dates", travelDates],
    ["Duration", data.duration || "Not specified"],
    ["Guests", guests],
    ["Budget (per person)", data.budgetRange || "Not specified"],
    ["Special requests", data.specialRequests || "None"],
  ];
}

function bookingLinesHtml(b: BookingContext) {
  const rows = b.lines.map(
    (l, i) => `
    <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f9f6f1"};">
      <td style="padding:10px 16px;font-size:13px;font-family:Arial,sans-serif;border-bottom:1px solid #e8e0d4;">${escapeHtml(l.name)} × ${l.quantity}</td>
      <td style="padding:10px 16px;font-size:13px;font-family:Arial,sans-serif;text-align:right;border-bottom:1px solid #e8e0d4;">$${l.lineTotalUsd}</td>
    </tr>`
  );
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d4;border-radius:4px;overflow:hidden;margin:16px 0;">
      <tr style="background:#1f140e;">
        <td style="padding:10px 16px;color:#f06522;font-size:11px;font-family:Arial,sans-serif;letter-spacing:0.15em;text-transform:uppercase;font-weight:bold;">Activities</td>
        <td style="padding:10px 16px;color:#f06522;font-size:11px;font-family:Arial,sans-serif;text-align:right;letter-spacing:0.15em;text-transform:uppercase;font-weight:bold;">Amount</td>
      </tr>
      ${rows.join("")}
      <tr>
        <td style="padding:12px 16px;font-family:Arial,sans-serif;font-weight:bold;">Subtotal (${b.currency})</td>
        <td style="padding:12px 16px;font-family:Arial,sans-serif;font-weight:bold;text-align:right;color:#f06522;">$${b.subtotalUsd}</td>
      </tr>
    </table>`;
}

function bookingDetailRows(b: BookingContext): [string, string][] {
  const guests = `${b.adults} adult${b.adults !== 1 ? "s" : ""}${
    b.children ? `, ${b.children} child${b.children !== 1 ? "ren" : ""}` : ""
  }`;
  const dates =
    b.travelDatesFrom || b.travelDatesTo
      ? `${b.travelDatesFrom || "?"} – ${b.travelDatesTo || "?"}`
      : "To be confirmed";
  return [
    ["Reference", b.ref],
    ["Guest", b.fullName],
    ["Email", b.email],
    ["Phone", b.phone || "—"],
    ["Guests", guests],
    ["Travel dates", dates],
    ["Notes", b.notes || "None"],
  ];
}

const templates: EmailTemplate[] = [
  {
    id: "enquiry.admin",
    subject: (ctx) => {
      const d = asEnquiry(ctx);
      return `New Journey Enquiry — ${d.fullName} (${d.destinations.join(", ")})`;
    },
    renderHtml: (ctx) => {
      const d = asEnquiry(ctx);
      return emailShell(
        `New Enquiry — ${d.fullName}`,
        `
        <h2 style="margin:0 0 4px;font-size:22px;color:#1f140e;font-weight:normal;">New Journey Enquiry</h2>
        <p style="margin:0 0 4px;color:#f06522;font-size:13px;font-family:Arial,sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Submitted via caracalafricasafaris.com</p>
        <p style="margin:0 0 24px;color:#aaaaaa;font-size:12px;font-family:Arial,sans-serif;">Ref: ${d.ref}</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf4e8;border-radius:4px;margin-bottom:24px;">
          <tr><td style="padding:20px;">
            <p style="margin:0 0 6px;font-size:20px;color:#1f140e;">${escapeHtml(d.fullName)}</p>
            <p style="margin:0;font-size:13px;font-family:Arial,sans-serif;"><a href="mailto:${d.email}" style="color:#1f140e;text-decoration:none;">${d.email}</a></p>
            ${d.phone ? `<p style="margin:4px 0 0;font-size:13px;font-family:Arial,sans-serif;color:#6b6b6b;">${escapeHtml(d.phone)}</p>` : ""}
          </td></tr>
        </table>
        ${detailTable("Journey Details", enquirySummaryRows(d))}
        `
      );
    },
    renderText: (ctx) => {
      const d = asEnquiry(ctx);
      return `New Journey Enquiry ${d.ref}\n${d.fullName} <${d.email}>\n${d.destinations.join(", ")}`;
    },
  },
  {
    id: "enquiry.client",
    subject: () => "Your Caracal Safaris Journey Enquiry — We'll Be in Touch",
    renderHtml: (ctx) => {
      const d = asEnquiry(ctx);
      return emailShell(
        "Your Caracal Safaris Journey Enquiry",
        `
        <h2 style="margin:0 0 16px;font-size:26px;color:#1f140e;font-weight:normal;">Thank you, ${escapeHtml(firstName(d.fullName))}.</h2>
        <p style="margin:0 0 8px;font-size:16px;color:#3a3a3a;line-height:1.7;font-style:italic;">&ldquo;A safari shaped around how you travel — not a fixed circuit.&rdquo;</p>
        <p style="margin:0 0 28px;font-size:13px;color:#6b6b6b;font-family:Arial,sans-serif;">
          We&rsquo;ve received your journey enquiry and will be in touch within 24 hours. Reference: <strong style="color:#1f140e;">${d.ref}</strong>
        </p>
        ${detailTable("Journey Details", enquirySummaryRows(d))}
        <p style="margin:32px 0 0;font-size:14px;color:#3a3a3a;">Warm regards,<br/><strong>The Caracal Africa Safaris Team</strong></p>
        `
      );
    },
    renderText: (ctx) => {
      const d = asEnquiry(ctx);
      return `Thank you ${firstName(d.fullName)}. We received your enquiry ${d.ref}. We'll be in touch within 24 hours.`;
    },
  },
  {
    id: "booking.admin",
    subject: (ctx) => {
      const b = asBooking(ctx);
      return `New Booking Request — ${b.fullName} (${b.ref})`;
    },
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        `Booking ${b.ref}`,
        `
        <h2 style="margin:0 0 8px;font-size:22px;color:#1f140e;font-weight:normal;">New Booking Request</h2>
        <p style="margin:0 0 20px;color:#aaaaaa;font-size:12px;font-family:Arial,sans-serif;">Ref: ${b.ref}</p>
        ${bookingLinesHtml(b)}
        ${detailTable("Guest & Travel", bookingDetailRows(b))}
        <p style="margin:20px 0 0;font-size:12px;color:#aaaaaa;font-family:Arial,sans-serif;">Payment to be arranged offline / via follow-up.</p>
        `
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      const lines = b.lines.map((l) => `- ${l.name} x${l.quantity}: $${l.lineTotalUsd}`).join("\n");
      return `New booking ${b.ref}\n${b.fullName}\n${lines}\nTotal: $${b.subtotalUsd} ${b.currency}`;
    },
  },
  {
    id: "booking.confirmation",
    subject: (ctx) => `Booking request received — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Booking confirmation",
        `
        <h2 style="margin:0 0 16px;font-size:26px;color:#1f140e;font-weight:normal;">Thank you, ${escapeHtml(firstName(b.fullName))}.</h2>
        <p style="margin:0 0 16px;font-size:14px;color:#3a3a3a;line-height:1.7;font-family:Arial,sans-serif;">
          We&rsquo;ve received your activity booking request. Our team will confirm availability and send payment arrangements shortly.
        </p>
        <p style="margin:0 0 20px;font-size:12px;color:#aaaaaa;font-family:Arial,sans-serif;">Reference: <strong style="color:#1f140e;">${b.ref}</strong></p>
        ${bookingLinesHtml(b)}
        ${detailTable("Your details", bookingDetailRows(b))}
        <p style="margin:24px 0 0;font-size:13px;color:#6b6b6b;font-family:Arial,sans-serif;">
          ${b.paymentNote || "No payment has been taken yet. We will contact you with next steps."}
        </p>
        <p style="margin:28px 0 0;font-size:14px;color:#3a3a3a;">Warm regards,<br/><strong>The Caracal Africa Safaris Team</strong></p>
        `
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `Booking request ${b.ref} received. Total $${b.subtotalUsd} ${b.currency}. We'll confirm payment arrangements soon.`;
    },
  },
  {
    id: "booking.cancellation",
    subject: (ctx) => `Booking cancelled — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Cancellation",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Booking cancelled</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;line-height:1.6;">Your booking <strong>${b.ref}</strong> has been cancelled. If this was unexpected, reply to this email.</p>
         ${bookingLinesHtml(b)}`
      );
    },
    renderText: (ctx) => `Booking ${asBooking(ctx).ref} has been cancelled.`,
  },
  {
    id: "booking.modification",
    subject: (ctx) => `Booking updated — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Booking updated",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Your booking was updated</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">Reference <strong>${b.ref}</strong>. Please review the revised details below.</p>
         ${bookingLinesHtml(b)}
         ${detailTable("Updated details", bookingDetailRows(b))}`
      );
    },
    renderText: (ctx) => `Booking ${asBooking(ctx).ref} was updated.`,
  },
  {
    id: "booking.ticket",
    subject: (ctx) => `Your tickets — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      const link = b.voucherUrl
        ? `<p style="margin:20px 0;"><a href="${b.voucherUrl}" style="background:#f06522;color:#1f140e;padding:12px 22px;border-radius:4px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;">View voucher</a></p>`
        : "";
      return emailShell(
        "Tickets",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Your mobile tickets</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">Booking <strong>${b.ref}</strong>. Present this email or voucher at check-in.</p>
         ${link}${bookingLinesHtml(b)}`
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `Tickets for ${b.ref}. ${b.voucherUrl || "Voucher attached / to follow."}`;
    },
  },
  {
    id: "payment.reminder",
    subject: (ctx) => `Payment reminder — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      const pay = b.paymentUrl
        ? `<p style="margin:20px 0;"><a href="${b.paymentUrl}" style="background:#f06522;color:#1f140e;padding:12px 22px;border-radius:4px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;">Pay now</a></p>`
        : "";
      return emailShell(
        "Payment reminder",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Friendly payment reminder</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">Outstanding balance for <strong>${b.ref}</strong>: <strong style="color:#f06522;">$${b.subtotalUsd} ${b.currency}</strong>.</p>
         ${pay}${bookingLinesHtml(b)}`
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `Payment reminder for ${b.ref}: $${b.subtotalUsd} ${b.currency}. ${b.paymentUrl || ""}`;
    },
  },
  {
    id: "payment.received",
    subject: (ctx) => `Payment received — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Payment received",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Payment received — thank you</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">We received payment for booking <strong>${b.ref}</strong> ($${b.subtotalUsd} ${b.currency}).</p>
         ${bookingLinesHtml(b)}`
      );
    },
    renderText: (ctx) => `Payment received for ${asBooking(ctx).ref}.`,
  },
  {
    id: "cart.abandoned",
    subject: () => "Still thinking about your safari?",
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      const cart = b.cartUrl
        ? `<p style="margin:20px 0;"><a href="${b.cartUrl}" style="background:#f06522;color:#1f140e;padding:12px 22px;border-radius:4px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;">Return to cart</a></p>`
        : "";
      return emailShell(
        "Abandoned cart",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Your activities are waiting</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">You left items in your cart. Complete checkout when you're ready.</p>
         ${cart}${bookingLinesHtml(b)}`
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `You left activities in your cart ($${b.subtotalUsd}). ${b.cartUrl || ""}`;
    },
  },
  {
    id: "pretrip.reminder",
    subject: (ctx) => `Getting ready — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Pre-trip reminder",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Your adventure is nearly here</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">Activity date: <strong>${b.activityDate || "See itinerary"}</strong>. Booking ${b.ref}.</p>
         ${bookingLinesHtml(b)}`
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `Pre-trip reminder for ${b.ref}. Date: ${b.activityDate || "TBC"}.`;
    },
  },
  {
    id: "pickup.reminder",
    subject: (ctx) => `Pickup details — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Pickup reminder",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Pickup information</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;line-height:1.7;">
           Time: <strong>${b.pickupTime || "TBC"}</strong><br/>
           Meeting point: <strong>${b.pickupPoint || "TBC"}</strong><br/>
           Booking: ${b.ref}
         </p>`
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `Pickup for ${b.ref}: ${b.pickupTime || "TBC"} at ${b.pickupPoint || "TBC"}.`;
    },
  },
  {
    id: "booking.details_incomplete",
    subject: (ctx) => `Complete your booking details — ${asBooking(ctx).ref}`,
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Details needed",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">We need a few more details</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">Please reply with any missing guest or pickup information for booking <strong>${b.ref}</strong>.</p>`
      );
    },
    renderText: (ctx) => `Please complete details for booking ${asBooking(ctx).ref}.`,
  },
  {
    id: "posttrip.thankyou",
    subject: () => "Thank you for travelling with Caracal Safaris",
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      return emailShell(
        "Thank you",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Thank you, ${escapeHtml(firstName(b.fullName))}</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;line-height:1.7;">It was a privilege to guide you. We hope to welcome you back to the Zambezi.</p>`
      );
    },
    renderText: (ctx) => `Thank you for travelling with Caracal Safaris (${asBooking(ctx).ref}).`,
  },
  {
    id: "posttrip.review",
    subject: () => "How was your safari?",
    renderHtml: (ctx) => {
      const b = asBooking(ctx);
      const review = b.reviewUrl
        ? `<p style="margin:20px 0;"><a href="${b.reviewUrl}" style="background:#f06522;color:#1f140e;padding:12px 22px;border-radius:4px;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;">Leave a review</a></p>`
        : "";
      return emailShell(
        "Review request",
        `<h2 style="margin:0 0 12px;font-size:22px;color:#1f140e;">Share your experience</h2>
         <p style="font-family:Arial,sans-serif;color:#3a3a3a;">Your feedback helps fellow travellers discover Victoria Falls.</p>${review}`
      );
    },
    renderText: (ctx) => {
      const b = asBooking(ctx);
      return `How was your safari? ${b.reviewUrl || "Reply to this email with feedback."}`;
    },
  },
];

const byId = Object.fromEntries(templates.map((t) => [t.id, t])) as Record<
  TemplateId,
  EmailTemplate
>;

export function getEmailTemplate(id: TemplateId): EmailTemplate {
  const t = byId[id];
  if (!t) throw new Error(`Unknown email template: ${id}`);
  return t;
}

export function listEmailTemplateIds(): TemplateId[] {
  return templates.map((t) => t.id);
}

export { templates as emailTemplates };
