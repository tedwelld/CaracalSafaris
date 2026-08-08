export type TemplateId =
  | "enquiry.admin"
  | "enquiry.client"
  | "booking.admin"
  | "booking.confirmation"
  | "booking.cancellation"
  | "booking.modification"
  | "booking.ticket"
  | "payment.reminder"
  | "payment.received"
  | "cart.abandoned"
  | "pretrip.reminder"
  | "pickup.reminder"
  | "booking.details_incomplete"
  | "posttrip.thankyou"
  | "posttrip.review";

export type WhatsAppTemplateId = `${TemplateId}.whatsapp` | "general.enquiry.whatsapp";

export interface TemplateRenderResult {
  subject?: string;
  html?: string;
  text: string;
}

export interface EmailTemplate {
  id: TemplateId;
  subject: (ctx: Record<string, unknown>) => string;
  renderHtml: (ctx: Record<string, unknown>) => string;
  renderText: (ctx: Record<string, unknown>) => string;
}

export interface WhatsAppTemplate {
  id: WhatsAppTemplateId;
  renderMessage: (ctx: Record<string, unknown>) => string;
}
