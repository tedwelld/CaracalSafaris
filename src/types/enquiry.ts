export interface EnquiryFormData {
  tripType: string;
  destinations: string[];
  travelDatesFrom?: string;
  travelDatesTo?: string;
  flexible: boolean;
  duration: string;
  adults: number;
  children: number;
  budgetRange: string;
  specialRequests: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  referralSource: string;
  termsAccepted: boolean;
}
