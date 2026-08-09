import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/Photo";

/** Compact hero banner for inner pages (blog, etc.). */
export function PageHeader({
  title,
  subtitle,
  image = "/images/victoria-falls.jpeg",
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[calc(70svh-5rem)] flex-col justify-end overflow-hidden">
      <Photo src={image} alt="" className="absolute inset-0 h-full w-full" imgClassName="animate-kenburns" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
      <Container className="relative z-10 pb-10 pt-28 text-white sm:pb-14">
        <span className="gold-rule mb-4 block" />
        <h1
          className="text-4xl sm:text-5xl text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </Container>
    </section>
  );
}
