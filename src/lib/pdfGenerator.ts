import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export interface EnquiryData {
  tripType: string;
  destinations: string[];
  travelDatesFrom?: string;
  travelDatesTo?: string;
  flexible: boolean;
  duration: string;
  adults: number;
  children: number;
  budgetRange?: string;
  specialRequests?: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  referralSource?: string;
  termsAccepted: boolean;
}

/* ── Brand colours ─────────────────────────────────────────────── */
const DARK    = "#1a1a1a";
const IVORY   = "#f5f0e8";
const GOLD    = "#c4b49a";
const WHITE   = "#ffffff";
const GREY    = "#6b6b6b";
const STRIPE  = "#f9f6f1";
const BORDER  = "#e8e0d4";

/* ── Layout constants ───────────────────────────────────────────── */
const PAGE_W  = 595.28;   // A4 width in points
const MARGIN  = 50;
const COL1_W  = 170;
const TABLE_W = PAGE_W - MARGIN * 2;
const ROW_H   = 26;
const HEADER_H = 34;

/* ── Reference number ───────────────────────────────────────────── */
export function makeRef(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `CARACAL-${date}-${rand}`;
}

/* ── Helpers ────────────────────────────────────────────────────── */
function drawTableHeader(doc: InstanceType<typeof PDFDocument>, y: number, label: string) {
  doc.fillColor(DARK).rect(MARGIN, y, TABLE_W, HEADER_H).fill();
  doc
    .fillColor(GOLD)
    .fontSize(8)
    .font("Helvetica-Bold")
    .text(label.toUpperCase(), MARGIN + 12, y + (HEADER_H - 8) / 2, {
      width: TABLE_W - 24,
      lineBreak: false,
    });
  return y + HEADER_H;
}

function drawTableRow(
  doc: InstanceType<typeof PDFDocument>,
  y: number,
  label: string,
  value: string,
  stripe: boolean
) {
  const bg = stripe ? STRIPE : WHITE;
  doc.fillColor(bg).rect(MARGIN, y, TABLE_W, ROW_H).fill();

  // subtle bottom border
  doc.strokeColor(BORDER).lineWidth(0.5).moveTo(MARGIN, y + ROW_H).lineTo(MARGIN + TABLE_W, y + ROW_H).stroke();

  // label col
  doc
    .fillColor(GREY)
    .fontSize(9)
    .font("Helvetica")
    .text(label, MARGIN + 12, y + (ROW_H - 9) / 2, {
      width: COL1_W - 12,
      lineBreak: false,
      ellipsis: true,
    });

  // value col
  doc
    .fillColor(DARK)
    .fontSize(9)
    .font("Helvetica-Bold")
    .text(value || "—", MARGIN + COL1_W, y + (ROW_H - 9) / 2, {
      width: TABLE_W - COL1_W - 12,
      lineBreak: false,
      ellipsis: true,
    });

  return y + ROW_H;
}

function drawPageHeader(doc: InstanceType<typeof PDFDocument>, ref: string) {
  /* Dark header band */
  doc.fillColor(DARK).rect(0, 0, PAGE_W, 110).fill();

  const logoPath = path.join(process.cwd(), "public", "images", "caracalsafaris.jpeg");
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, MARGIN, 18, { height: 62, fit: [90, 62] });
  }

  /* Brand text — right side */
  doc
    .fillColor(IVORY)
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Caracal Safaris", PAGE_W / 2, 22, {
      align: "right",
      width: PAGE_W / 2 - MARGIN,
    });
  doc
    .fillColor(GOLD)
    .fontSize(8)
    .font("Helvetica")
    .text("Zimbabwe  ·  Zambia  ·  Botswana", PAGE_W / 2, 40, {
      align: "right",
      width: PAGE_W / 2 - MARGIN,
    });
  doc
    .fillColor(IVORY)
    .fontSize(7.5)
    .font("Helvetica-Oblique")
    .text("The Smoke That Thunders", PAGE_W / 2, 54, {
      align: "right",
      width: PAGE_W / 2 - MARGIN,
    });

  /* Ref tag bottom-right of header */
  doc
    .fillColor(GOLD)
    .fontSize(7.5)
    .font("Helvetica")
    .text(`Ref: ${ref}`, PAGE_W / 2, 90, {
      align: "right",
      width: PAGE_W / 2 - MARGIN,
    });
}

function drawPageFooter(doc: InstanceType<typeof PDFDocument>) {
  const pageH = doc.page.height;
  doc.fillColor(DARK).rect(0, pageH - 36, PAGE_W, 36).fill();
  doc
    .fillColor(IVORY)
    .fontSize(7.5)
    .font("Helvetica")
    .opacity(0.5)
    .text(
      "Caracal Safaris  ·  Victoria Falls, Zimbabwe  ·  caracalsafaris.com",
      MARGIN,
      pageH - 22,
      { align: "center", width: PAGE_W - MARGIN * 2 }
    )
    .opacity(1);
}

function formatDates(data: EnquiryData): string {
  if (data.flexible) return "Flexible";
  const from = data.travelDatesFrom || "?";
  const to   = data.travelDatesTo   || "?";
  return `${from}  –  ${to}`;
}

function formatGuests(data: EnquiryData): string {
  const adults = `${data.adults} adult${data.adults !== 1 ? "s" : ""}`;
  const kids   = data.children ? `, ${data.children} child${data.children !== 1 ? "ren" : ""}` : "";
  return adults + kids;
}

/* ── Admin PDF ──────────────────────────────────────────────────── */
export function generateAdminPdf(data: EnquiryData, ref: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: MARGIN, autoFirstPage: true });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end",  ()         => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    drawPageHeader(doc, ref);

    let y = 128;

    /* Section title */
    doc
      .fillColor(DARK)
      .fontSize(18)
      .font("Helvetica-Bold")
      .text("New Journey Enquiry", MARGIN, y);
    y += 26;
    doc
      .fillColor(GOLD)
      .fontSize(9)
      .font("Helvetica")
      .text("Submitted via caracalsafaris.com", MARGIN, y);
    y += 30;

    /* ── Contact Details table ── */
    y = drawTableHeader(doc, y, "Contact Details");

    const contactRows: [string, string][] = [
      ["Full Name",    data.fullName],
      ["Email",        data.email],
      ["Phone",        data.phone        || "—"],
      ["Country",      data.country      || "—"],
      ["Heard via",    data.referralSource || "—"],
    ];
    contactRows.forEach(([label, value], i) => {
      y = drawTableRow(doc, y, label, value, i % 2 === 1);
    });

    y += 20;

    /* ── Journey Details table ── */
    y = drawTableHeader(doc, y, "Journey Details");

    const journeyRows: [string, string][] = [
      ["Trip Type",    data.tripType],
      ["Destinations", data.destinations.join(", ")],
      ["Travel Dates", formatDates(data)],
      ["Duration",     data.duration || "—"],
      ["Guests",       formatGuests(data)],
      ["Budget (pp)",  data.budgetRange    || "—"],
      ["Special Requests", data.specialRequests || "None"],
    ];
    journeyRows.forEach(([label, value], i) => {
      y = drawTableRow(doc, y, label, value, i % 2 === 1);
    });

    y += 28;

    /* Reply note */
    doc
      .fillColor(GREY)
      .fontSize(9)
      .font("Helvetica-Oblique")
      .text(`Reply directly to: ${data.email}`, MARGIN, y);

    drawPageFooter(doc);
    doc.end();
  });
}

/* ── Client PDF ─────────────────────────────────────────────────── */
export function generateClientPdf(data: EnquiryData, ref: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: MARGIN, autoFirstPage: true });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end",  ()         => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    drawPageHeader(doc, ref);

    let y = 128;

    /* Greeting */
    const firstName = data.fullName.split(" ")[0];
    doc
      .fillColor(DARK)
      .fontSize(18)
      .font("Helvetica-Bold")
      .text(`Thank you, ${firstName}.`, MARGIN, y);
    y += 26;

    doc
      .fillColor(GREY)
      .fontSize(9.5)
      .font("Helvetica-Oblique")
      .text(
        "“Africa is not a destination. It is a state of wonder.”",
        MARGIN, y,
        { width: TABLE_W }
      );
    y += 20;

    doc
      .fillColor(GREY)
      .fontSize(9)
      .font("Helvetica")
      .text(
        "We’ve received your journey enquiry and will be in touch within 24 hours. For immediate assistance, please reach us on WhatsApp at +263 78 927 6807.",
        MARGIN, y,
        { width: TABLE_W }
      );
    y += 36;

    /* Divider */
    doc.strokeColor(BORDER).lineWidth(0.75).moveTo(MARGIN, y).lineTo(MARGIN + TABLE_W, y).stroke();
    y += 20;

    /* ── Journey Summary table ── */
    y = drawTableHeader(doc, y, "Your Journey Summary");

    const journeyRows: [string, string][] = [
      ["Trip Type",    data.tripType],
      ["Destinations", data.destinations.join(", ")],
      ["Travel Dates", formatDates(data)],
      ["Duration",     data.duration || "—"],
      ["Guests",       formatGuests(data)],
      ["Budget (pp)",  data.budgetRange    || "Not specified"],
      ["Special Requests", data.specialRequests || "None"],
    ];
    journeyRows.forEach(([label, value], i) => {
      y = drawTableRow(doc, y, label, value, i % 2 === 1);
    });

    y += 28;

    /* Warm close */
    doc
      .fillColor(DARK)
      .fontSize(9.5)
      .font("Helvetica")
      .text("Warm regards,", MARGIN, y);
    y += 16;
    doc
      .fillColor(GOLD)
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("The Caracal Safaris Team", MARGIN, y);

    drawPageFooter(doc);
    doc.end();
  });
}
