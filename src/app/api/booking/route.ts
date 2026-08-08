import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { transporter, ADMIN_EMAILS } from "@/lib/mailer";
import { makeRef } from "@/lib/pdfGenerator";
import { getActivityById } from "@/data/activities";
import { sendTemplate } from "@/lib/bokun/send";
import { whatsappFromTemplate } from "@/lib/bokun/templates/whatsapp";
import type { BookingContext, BookingLineSummary } from "@/types/booking";

const BookingSchema = z.object({
  items: z
    .array(
      z.object({
        activityId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  travelDatesFrom: z.string().optional(),
  travelDatesTo: z.string().optional(),
  adults: z.number().int().min(1),
  children: z.number().int().min(0),
  notes: z.string().optional(),
  termsAccepted: z.literal(true),
});

function buildContext(
  data: z.infer<typeof BookingSchema>,
  ref: string
): BookingContext {
  const lines: BookingLineSummary[] = data.items.map((item) => {
    const activity = getActivityById(item.activityId);
    if (!activity) {
      throw new Error(`Unknown activity: ${item.activityId}`);
    }
    return {
      activityId: activity.id,
      name: activity.name,
      quantity: item.quantity,
      unitPriceUsd: activity.priceUsd,
      lineTotalUsd: activity.priceUsd * item.quantity,
    };
  });

  const subtotalUsd = lines.reduce((s, l) => s + l.lineTotalUsd, 0);

  return {
    ref,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    country: data.country,
    travelDatesFrom: data.travelDatesFrom,
    travelDatesTo: data.travelDatesTo,
    adults: data.adults,
    children: data.children,
    notes: data.notes,
    lines,
    subtotalUsd,
    currency: "USD",
    paymentNote:
      "No payment has been taken yet. We will contact you with payment arrangements.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = BookingSchema.parse(body);

    await transporter.verify();

    const ref = makeRef();
    const ctx = buildContext(data, ref);
    const templateCtx = ctx as unknown as Record<string, unknown>;

    await Promise.all([
      sendTemplate("booking.admin", templateCtx, {
        to: ADMIN_EMAILS,
        replyTo: data.email,
      }),
      sendTemplate("booking.confirmation", templateCtx, {
        to: data.email,
      }),
    ]);

    const whatsappUrl = whatsappFromTemplate(
      "booking.confirmation.whatsapp",
      templateCtx
    );

    return NextResponse.json(
      { success: true, ref, whatsappUrl, subtotalUsd: ctx.subtotalUsd },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: err.issues },
        { status: 400 }
      );
    }
    const detail = err instanceof Error ? err.message : String(err);
    console.error("Booking email error:", detail);
    return NextResponse.json(
      { error: "Failed to send booking", detail },
      { status: 500 }
    );
  }
}
