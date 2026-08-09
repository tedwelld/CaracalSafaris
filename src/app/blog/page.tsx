import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Stories, guides and tips from the Caracal Safaris team across Zimbabwe, Zambia and Botswana.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blogs"
        subtitle="Stories, tips and inspiration from the field."
        image="/images/rainforest2.jpeg"
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
