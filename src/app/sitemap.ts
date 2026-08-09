import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { blogPosts } from "@/data/blog";
import { tours } from "@/data/tours";
import { siteConfig } from "@/data/siteConfig";

const baseUrl = siteConfig.url;
const lastModified = new Date();
const logoUrl = `${baseUrl}${siteConfig.logo}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
      images: [logoUrl],
    },
    { url: `${baseUrl}/journey`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/destinations`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/experiences`, lastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/plan-your-journey`, lastModified, changeFrequency: "weekly" as const, priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const destPages = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const tourPages = tours.map((t) => ({
    url: `${baseUrl}/tours/${t.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...destPages, ...blogPages, ...tourPages];
}
