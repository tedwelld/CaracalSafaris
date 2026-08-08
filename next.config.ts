import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdfkit"],
  // Tell Vercel's file tracer to bundle pdfkit's AFM font data files
  outputFileTracingIncludes: {
    "/api/enquiry": [
      "./node_modules/pdfkit/js/data/**/*",
      "./node_modules/pdfkit/js/fonts/**/*",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
