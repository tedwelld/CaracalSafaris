import crypto from "crypto";
import { bokunConfig, isBokunConfigured } from "./config";

function requireKeys() {
  if (!isBokunConfigured()) {
    throw new Error(
      "Bokun API keys are not configured. Set BOKUN_ACCESS_KEY and BOKUN_SECRET_KEY."
    );
  }
}

/** HMAC-SHA1 signature per Bokun REST docs */
export function bokunSignature(date: string, method: string, path: string) {
  requireKeys();
  const stringToSign = `${date}${bokunConfig.accessKey}${method.toUpperCase()}${path}`;
  return crypto
    .createHmac("sha1", bokunConfig.secretKey)
    .update(stringToSign)
    .digest("base64");
}

export function bokunAuthHeaders(method: string, path: string) {
  requireKeys();
  const date = new Date().toISOString().replace("T", " ").substring(0, 19);
  return {
    "Content-Type": "application/json",
    "X-Bokun-Date": date,
    "X-Bokun-AccessKey": bokunConfig.accessKey,
    "X-Bokun-Signature": bokunSignature(date, method, path),
  };
}

async function bokunFetch(method: string, path: string, body?: unknown) {
  requireKeys();
  const url = `${bokunConfig.apiBase}${path}`;
  const res = await fetch(url, {
    method,
    headers: bokunAuthHeaders(method, path),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bokun API ${method} ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

/** Stubbed Bokun client — live calls require API keys */
export const bokunClient = {
  searchActivities: (page = 0, pageSize = 50) =>
    bokunFetch("POST", "/activity.json/search", { page, pageSize }),
  getActivity: (id: string | number, currency = "USD") =>
    bokunFetch("GET", `/activity.json/${id}?currency=${currency}`),
  getAvailabilities: (id: string | number, start: string, end: string) =>
    bokunFetch(
      "GET",
      `/activity.json/${id}/availabilities?start=${start}&end=${end}`
    ),
  submitCheckout: (payload: unknown) =>
    bokunFetch("POST", "/checkout.json/submit", payload),
  confirmReserved: (confirmationCode: string, payload: unknown) =>
    bokunFetch("POST", `/checkout.json/confirm-reserved/${confirmationCode}`, payload),
};
