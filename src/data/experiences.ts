/**
 * Re-export blog-backed experience shapes for home sections that still
 * reference the old experiences data API. Prefer `@/data/blog`.
 */
export {
  experiences,
  getExperienceBySlug,
  blogPosts,
  getPost,
  type BlogPost,
} from "@/data/blog";

import { experiences } from "@/data/blog";

export function getExperiencesByCategory(category: string) {
  return experiences.filter((e) => e.category === category);
}
