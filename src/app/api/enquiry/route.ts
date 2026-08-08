import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { transporter, MAIL_FROM, ADMIN_EMAILS, REF_LINK } from "@/lib/mailer";
import { generateAdminPdf, generateClientPdf, makeRef } from "@/lib/pdfGenerator";

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

type EnquiryData = z.infer<typeof EnquirySchema>;

/* ── Shared brand colours & base layout ────────────────────────── */
function emailShell(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
            <p style="margin:0;color:#c4b49a;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">
              Zimbabwe · Zambia · Botswana
            </p>
            <h1 style="margin:8px 0 0;color:#f5f0e8;font-size:26px;font-weight:normal;font-family:Georgia,serif;">
              Caracal Safaris
            </h1>
            <p style="margin:6px 0 0;color:#c4b49a;font-size:12px;font-style:italic;font-family:Georgia,serif;">
              The Smoke That Thunders
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:40px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#f5f0e8;font-size:11px;font-family:Arial,sans-serif;opacity:0.5;">
              Caracal Safaris · Victoria Falls, Zimbabwe
            </p>
            <p style="margin:8px 0 0;font-size:11px;font-family:Arial,sans-serif;">
              <a href="${REF_LINK}" style="color:#c4b49a;text-decoration:none;">caracalsafaris.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ── Shared journey summary block ───────────────────────────────── */
function summaryBlock(data: EnquiryData) {
  const travelDates = data.flexible
    ? "Flexible"
    : `${data.travelDatesFrom || "?"} – ${data.travelDatesTo || "?"}`;

  const guests = `${data.adults} adult${data.adults !== 1 ? "s" : ""}${
    data.children ? `, ${data.children} child${data.children !== 1 ? "ren" : ""}` : ""
  }`;

  const rows: [string, string][] = [
    ["Trip type",         data.tripType],
    ["Destinations",      data.destinations.join(", ")],
    ["Travel dates",      travelDates],
    ["Duration",          data.duration || "Not specified"],
    ["Guests",            guests],
    ["Budget (per person)", data.budgetRange || "Not specified"],
    ["Special requests",  data.specialRequests || "None"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? "#ffffff" : "#f9f6f1"};">
        <td style="padding:10px 16px;color:#6b6b6b;font-size:13px;font-family:Arial,sans-serif;width:40%;vertical-align:top;border-bottom:1px solid #e8e0d4;">${label}</td>
        <td style="padding:10px 16px;color:#1a1a1a;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;border-bottom:1px solid #e8e0d4;">${value}</td>
      </tr>`
    )
    .join("");

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d4;border-radius:4px;overflow:hidden;margin-top:8px;">
      <tr style="background:#1a1a1a;">
        <td colspan="2" style="padding:10px 16px;color:#c4b49a;font-size:11px;font-family:Arial,sans-serif;letter-spacing:0.15em;text-transform:uppercase;font-weight:bold;">Journey Details</td>
      </tr>
      ${rowsHtml}
    </table>`;
}

/* ── Admin notification email ───────────────────────────────────── */
function adminEmailHtml(data: EnquiryData, ref: string) {
  return emailShell(
    `New Enquiry — ${data.fullName}`,
    `
    <h2 style="margin:0 0 4px;font-size:22px;color:#1a1a1a;font-weight:normal;">New Journey Enquiry</h2>
    <p style="margin:0 0 4px;color:#c4b49a;font-size:13px;font-family:Arial,sans-serif;letter-spacing:0.1em;text-transform:uppercase;">
      Submitted via caracalsafaris.com
    </p>
    <p style="margin:0 0 24px;color:#aaaaaa;font-size:12px;font-family:Arial,sans-serif;">Ref: ${ref}</p>

    <!-- Contact info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;border-radius:4px;padding:20px;margin-bottom:24px;">
      <tr>
        <td>
          <p style="margin:0 0 6px;font-size:20px;color:#1a1a1a;">${data.fullName}</p>
          <p style="margin:0 0 4px;font-size:13px;font-family:Arial,sans-serif;color:#6b6b6b;">
            <a href="mailto:${data.email}" style="color:#1a1a1a;text-decoration:none;">${data.email}</a>
          </p>
          ${data.phone   ? `<p style="margin:0 0 4px;font-size:13px;font-family:Arial,sans-serif;color:#6b6b6b;">${data.phone}</p>` : ""}
          ${data.country ? `<p style="margin:0;font-size:13px;font-family:Arial,sans-serif;color:#6b6b6b;">${data.country}</p>` : ""}
          ${data.referralSource ? `<p style="margin:6px 0 0;font-size:12px;font-family:Arial,sans-serif;color:#aaa;">Heard via: ${data.referralSource}</p>` : ""}
        </td>
        <td align="right" style="vertical-align:top;">
          <a href="mailto:${data.email}?subject=Re: Your Caracal Safaris Journey Enquiry (${ref})"
             style="display:inline-block;background:#c4b49a;color:#1a1a1a;padding:10px 20px;border-radius:4px;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;text-decoration:none;">
            Reply to Enquiry
          </a>
        </td>
      </tr>
    </table>

    ${summaryBlock(data)}

    <p style="margin:20px 0 0;font-size:12px;color:#aaaaaa;font-family:Arial,sans-serif;">
      A PDF copy of this enquiry is attached to this email.
    </p>
    `
  );
}

/* ── Traveller confirmation email ───────────────────────────────── */
function clientEmailHtml(data: EnquiryData, ref: string) {
  const firstName = data.fullName.split(" ")[0];
  return emailShell(
    "Your Caracal Safaris Journey Enquiry",
    `
    <h2 style="margin:0 0 16px;font-size:26px;color:#1a1a1a;font-weight:normal;">
      Thank you, ${firstName}.
    </h2>
    <p style="margin:0 0 8px;font-size:16px;color:#3a3a3a;line-height:1.7;font-style:italic;">
      &ldquo;Africa is not a destination. It is a state of wonder.&rdquo;
    </p>
    <p style="margin:0 0 8px;font-size:13px;color:#6b6b6b;font-family:Arial,sans-serif;">
      We&rsquo;ve received your journey enquiry and will be in touch within 24 hours.
      For an immediate response, reach us on
      <a href="https://wa.me/263789276807" style="color:#c4b49a;text-decoration:none;">WhatsApp</a>.
    </p>
    <p style="margin:0 0 28px;font-size:12px;color:#aaaaaa;font-family:Arial,sans-serif;">
      Your reference: <strong style="color:#1a1a1a;">${ref}</strong>
    </p>

    <hr style="border:none;border-top:1px solid #e8e0d4;margin:0 0 28px;" />

    ${summaryBlock(data)}

    <p style="margin:32px 0 0;font-size:14px;color:#3a3a3a;line-height:1.7;">
      Warm regards,<br/>
      <strong>The Caracal Safaris Team</strong>
    </p>

    <p style="margin:16px 0 0;font-size:12px;color:#aaaaaa;font-family:Arial,sans-serif;">
      A PDF summary of your enquiry is attached to this email for your records.
    </p>
    `
  );
}

/* ── Route handler ──────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = EnquirySchema.parse(body);

    // Verify SMTP is reachable before doing any further work
    await transporter.verify();

    const ref = makeRef();
    const destinationList = data.destinations.join(", ");
    const subject = `New Journey Enquiry — ${data.fullName} (${destinationList})`;
    const safeName = data.fullName.replace(/[^a-zA-Z0-9]/g, "-");

    // Try to generate PDFs — if pdfkit fails (e.g. missing font files on some hosts)
    // emails still send without attachments so the enquiry is never lost.
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
      // Admin notification (all admin recipients)
      transporter.sendMail({
        from: MAIL_FROM,
        to: ADMIN_EMAILS.join(", "),
        replyTo: data.email,
        subject,
        html: adminEmailHtml(data, ref),
        attachments: adminPdf
          ? [
              {
                filename: `Caracal-Safaris-Enquiry-${safeName}-${ref}.pdf`,
                content: adminPdf,
                contentType: "application/pdf",
              },
            ]
          : [],
      }),
      // Traveller confirmation
      transporter.sendMail({
        from: MAIL_FROM,
        to: data.email,
        subject: "Your Caracal Safaris Journey Enquiry — We'll Be in Touch",
        html: clientEmailHtml(data, ref),
        attachments: clientPdf
          ? [
              {
                filename: `Caracal-Safaris-Journey-Summary-${ref}.pdf`,
                content: clientPdf,
                contentType: "application/pdf",
              },
            ]
          : [],
      }),
    ]);

    return NextResponse.json({ success: true, ref }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: err.issues }, { status: 400 });
    }
    const detail = err instanceof Error ? err.message : String(err);
    console.error("Enquiry email error:", detail);
    return NextResponse.json({ error: "Failed to send enquiry", detail }, { status: 500 });
  }
}
