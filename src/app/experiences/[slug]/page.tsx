import { redirect } from "next/navigation";

/** Legacy /experiences/[slug] → /blog/[slug] */
export default async function ExperienceRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/blog/${slug}`);
}
