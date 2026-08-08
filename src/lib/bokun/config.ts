/**
 * Bokun / Aphalis configuration.
 * API keys are optional until connected — local templates remain the source of truth.
 */
export const bokunConfig = {
  accessKey: process.env.BOKUN_ACCESS_KEY ?? "",
  secretKey: process.env.BOKUN_SECRET_KEY ?? "",
  apiBase: process.env.BOKUN_API_BASE ?? "https://api.bokuntest.com",
};

export const aphalisConfig = {
  apiKey: process.env.APHALIS_API_KEY ?? "",
  apiBase: process.env.APHALIS_API_BASE ?? "",
};

export function isBokunConfigured() {
  return Boolean(bokunConfig.accessKey && bokunConfig.secretKey);
}

export function isAphalisConfigured() {
  return Boolean(aphalisConfig.apiKey && aphalisConfig.apiBase);
}
