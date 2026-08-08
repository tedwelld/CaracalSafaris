import { transporter, MAIL_FROM } from "@/lib/mailer";
import { getEmailTemplate } from "./templates/email";
import type { TemplateId } from "./templates/types";

export interface SendTemplateOptions {
  to: string | string[];
  replyTo?: string;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType?: string;
  }[];
}

export async function sendTemplate(
  id: TemplateId,
  ctx: Record<string, unknown>,
  options: SendTemplateOptions
) {
  const template = getEmailTemplate(id);
  const subject = template.subject(ctx);
  const html = template.renderHtml(ctx);
  const text = template.renderText(ctx);

  return transporter.sendMail({
    from: MAIL_FROM,
    to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
    replyTo: options.replyTo,
    subject,
    html,
    text,
    attachments: options.attachments,
  });
}
