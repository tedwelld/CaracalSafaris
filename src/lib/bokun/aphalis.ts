import { aphalisConfig, isAphalisConfigured } from "./config";
import type { TemplateId } from "./templates/types";

export interface ImportedTemplate {
  id: TemplateId | string;
  subject?: string;
  html?: string;
  text?: string;
  whatsapp?: string;
  source: "aphalis";
}

function requireAphalis() {
  if (!isAphalisConfigured()) {
    throw new Error(
      "Aphalis API is not configured. Set APHALIS_API_KEY and APHALIS_API_BASE to import Bokun templates."
    );
  }
}

/**
 * Import branded Bokun templates from Aphalis.
 * No-op / throws until keys are provided — local registry remains source of truth.
 */
export async function importTemplates(): Promise<ImportedTemplate[]> {
  requireAphalis();
  const res = await fetch(`${aphalisConfig.apiBase}/templates`, {
    headers: {
      Authorization: `Bearer ${aphalisConfig.apiKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Aphalis importTemplates failed: ${res.status}`);
  }
  return (await res.json()) as ImportedTemplate[];
}

/**
 * Sync bookable products from Aphalis (Bokun-backed).
 */
export async function syncProducts(): Promise<unknown[]> {
  requireAphalis();
  const res = await fetch(`${aphalisConfig.apiBase}/products`, {
    headers: {
      Authorization: `Bearer ${aphalisConfig.apiKey}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Aphalis syncProducts failed: ${res.status}`);
  }
  return (await res.json()) as unknown[];
}

/** Safe probe used by admin/debug routes — does not throw when unconfigured */
export function aphalisStatus() {
  return {
    configured: isAphalisConfigured(),
    message: isAphalisConfigured()
      ? "Aphalis keys present — importTemplates/syncProducts available"
      : "Aphalis keys not set — using local Caracal Bokun templates",
  };
}
