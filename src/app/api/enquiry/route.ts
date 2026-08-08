import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { transporter, ADMIN_EMAILS } from "@/lib/mailer";
import { generateAdminPdf, generateClientPdf, makeRef } from "@/lib/pdfGenerator";
import { sendTemplate } from "@/lib/bokun/send";
import { whatsappFromTemplate } from "@/lib/bokun/templates/whatsapp";

const EnquirySchema = z.object({
  tripType: z.string().min(1),
  destinations: z.array(z.string()).min(1),
  travelDatesFrom: z.string().optional(),
  travelDatesTo: z.string().optional(),
  flexible: z.boolean(),
  duration: z.string(),
  adults: z.number().min(1),
  children: z.number().min(0),
  budgetRange: z.string().optional(),
  specialRequests: z.string().optional(),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  referralSource: z.string().optional(),
  termsAccepted: z.boolean(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = EnquirySchema.parse(body);

    await transporter.verify();

    const ref = makeRef();
    const safeName = data.fullName.replace(/[^a-zA-Z0-9]/g, "-");
    const ctx = { ...data, ref } as Record<string, unknown>;

    let adminPdf: Buffer | null = null;
    let clientPdf: Buffer | null = null;
    try {
      [adminPdf, clientPdf] = await Promise.all([
        generateAdminPdf(data, ref),
        generateClientPdf(data, ref),
      ]);
    } catch (pdfErr) {
      console.error("PDF generation failed, sending email without attachment:", pdfErr);
    }

    await Promise.all([
      sendTemplate("enquiry.admin", ctx, {
        to: ADMIN_EMAILS,
        replyTo: data.email,
        attachments: adminPdf
          ? [
              {
                filename: `Caracal-Safaris-Enquiry-${safeName}-${ref}.pdf`,
                content: adminPdf,
                contentType: "application/pdf",
              },
            ]
          : undefined,
      }),
      sendTemplate("enquiry.client", ctx, {
        to: data.email,
        attachments: clientPdf
          ? [
              {
                filename: `Caracal-Safaris-Journey-Summary-${ref}.pdf`,
                content: clientPdf,
                contentType: "application/pdf",
              },
            ]
          : undefined,
      }),
    ]);

    const whatsappUrl = whatsappFromTemplate("enquiry.client.whatsapp", ctx);

    return NextResponse.json({ success: true, ref, whatsappUrl }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.issues }, { status: 400 });
    }
    const detail = err instanceof Error ? err.message : String(err);
    console.error("Enquiry email error:", detail);
    return NextResponse.json({ error: "Failed to send enquiry", detail }, { status: 500 });
  }
}
