import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/data/siteConfig";

interface AppSettings {
  emailSettings?: {
    RefLink?: string;
    EmailHost?: string;
    EmailPort?: number;
    EmailUsername?: string;
    EmailPassword?: string;
  };
  adminEmails?: string[];
}

function loadAppSettings(): AppSettings | null {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "appsettings.json"), "utf-8");
    return JSON.parse(raw) as AppSettings;
  } catch {
    return null;
  }
}

const settings = loadAppSettings();
const cfg = settings?.emailSettings;

export const transporter = nodemailer.createTransport({
  host:   cfg?.EmailHost  ?? process.env.EMAIL_HOST  ?? "",
  port:   cfg?.EmailPort  ?? Number(process.env.EMAIL_PORT ?? 587),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: cfg?.EmailUsername ?? process.env.EMAIL_USERNAME ?? "",
    pass: cfg?.EmailPassword ?? process.env.EMAIL_PASSWORD ?? "",
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 25_000,
  greetingTimeout:   25_000,
  socketTimeout:     25_000,
});

export const MAIL_FROM = `Caracal Africa Safaris <${cfg?.EmailUsername ?? process.env.EMAIL_USERNAME ?? siteConfig.emails.info}>`;

/** Ops / system alerts */
export const ADMIN_EMAILS: string[] =
  settings?.adminEmails ??
  (process.env.ADMIN_EMAIL ?? siteConfig.emails.admin)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

/** Bookings, journey enquiries, reservation requests */
export const RESERVATIONS_EMAILS: string[] =
  (process.env.RESERVATIONS_EMAIL ?? siteConfig.emails.reservations)
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

export const REF_LINK =
  cfg?.RefLink ?? process.env.EMAIL_REF_LINK ?? siteConfig.url;
