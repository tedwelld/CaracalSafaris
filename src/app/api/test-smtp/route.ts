import { NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";

export async function GET() {
  try {
    await transporter.verify();
    return NextResponse.json({ ok: true, message: "SMTP connection successful" });
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
