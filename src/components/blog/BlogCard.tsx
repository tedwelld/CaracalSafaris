import Link from "next/link";
import { Pi } from "@/components/Pi";
import { Photo } from "@/components/Photo";
import type { BlogPost } from "@/data/blog";

const scrim =
  "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent";
const pictureTile =
  "relative mx-auto aspect-[16/11] w-full max-w-[22rem] overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className={pictureTile}>
        <Photo
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div className={scrim} />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <time className="text-xs uppercase tracking-wider text-gold-light">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h3 className="mt-1 text-lg text-white">{post.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/85">{post.excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-light">
            Read more{" "}
            <Pi name="pi-arrow-right" className="text-sm transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
