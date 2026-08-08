import { getEmailTemplate } from "./email";
import { getWhatsAppTemplate, whatsappFromTemplate } from "./whatsapp";
import type { TemplateId, WhatsAppTemplateId } from "./types";
import { listEmailTemplateIds } from "./email";

export {
  getEmailTemplate,
  getWhatsAppTemplate,
  whatsappFromTemplate,
  listEmailTemplateIds,
};
export type { TemplateId, WhatsAppTemplateId };

/** Full Bokun-aligned registry for inspection / Aphalis merge later */
export function listAllTemplateIds() {
  return {
    email: listEmailTemplateIds(),
    whatsapp: listEmailTemplateIds().map((id) => `${id}.whatsapp` as WhatsAppTemplateId).concat([
      "general.enquiry.whatsapp",
    ]),
  };
}
