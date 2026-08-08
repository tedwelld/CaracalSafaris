import type { CartItem } from "./cart";

export interface BookingGuest {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
}

export interface BookingRequest {
  items: CartItem[];
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  travelDatesFrom?: string;
  travelDatesTo?: string;
  adults: number;
  children: number;
  notes?: string;
  termsAccepted: boolean;
}

export interface BookingLineSummary {
  activityId: string;
  name: string;
  quantity: number;
  unitPriceUsd: number;
  lineTotalUsd: number;
}

export interface BookingContext {
  ref: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  travelDatesFrom?: string;
  travelDatesTo?: string;
  adults: number;
  children: number;
  notes?: string;
  lines: BookingLineSummary[];
  subtotalUsd: number;
  currency: string;
  paymentNote?: string;
  activityDate?: string;
  pickupTime?: string;
  pickupPoint?: string;
  voucherUrl?: string;
  paymentUrl?: string;
  cartUrl?: string;
  reviewUrl?: string;
}
