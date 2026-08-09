import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pi } from "@/components/Pi";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BookingPanel } from "@/components/bokun/BookingPanel";
import { BookingBadge } from "@/components/bokun/BookingBadge";
import { tours, getTour } from "@/data/tours";
import { siteConfig } from "@/data/siteConfig";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTour(slug);
  if (!t) return {};
  return { title: t.name, description: t.summary };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const tourUrl = `${siteConfig.url}/tours/${tour.slug}`;
  const images = [
    { src: tour.image, alt: tour.name },
    { src: "/images/victoria-falls.jpeg", alt: `${tour.name} - landscape` },
    { src: "/images/elephant-eye.jpeg", alt: `${tour.name} - wildlife` },
  ];

  return (
    <>
      <Section className="!py-0">
        <Container className="!max-w-none !px-0">
          <PhotoGallery images={images} />
        </Container>
      </Section>

      <Section className="!pt-8">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{tour.category}</Badge>
            <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
              <Pi name="pi-clock" className="text-base text-gold-dark" /> {tour.durationDays}{" "}
              {tour.durationDays === 1 ? "day" : "days"}
            </span>
            <BookingBadge productId={tour.bokunProductId} fallbackCount={tour.bookingCount} />
          </div>

          <h1
            className="mt-4 text-4xl sm:text-5xl text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {tour.name}
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-soft leading-relaxed">{tour.summary}</p>
        </Container>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div>
              <span className="gold-rule mb-4 block" />
              <h2 className="text-2xl text-foreground">About this safari</h2>
              <p className="mt-4 text-ink-soft leading-relaxed">{tour.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="text-xl text-foreground">Highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 text-sm text-foreground shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
                      <Pi name="pi-star-fill" className="text-xs text-gold-dark" />
                    </div>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface p-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider">
                  <Pi name="pi-check-circle" className="text-lg text-green-600" /> Included
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  <li>Professional guide</li>
                  <li>All transfers</li>
                  <li>Park entry fees</li>
                  <li>Meals as specified</li>
                  <li>Bottled water</li>
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-surface p-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider">
                  <Pi name="pi-minus-circle" className="text-lg text-ink-soft" /> Excluded
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  <li>International flights</li>
                  <li>Travel insurance</li>
                  <li>Personal expenses</li>
                  <li>Tips &amp; gratuities</li>
                  <li>Visas</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-line pt-8">
              <h3 className="text-xl text-foreground">Prefer a private journey?</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Tell us your dates and we&apos;ll craft a tailor-made itinerary.
              </p>
              <Link
                href="/plan-your-journey"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-dark hover:underline"
              >
                Plan your journey <Pi name="pi-arrow-right" className="text-sm" />
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <BookingPanel
              tourName={tour.name}
              tourUrl={tourUrl}
              priceFrom={tour.priceFrom}
              bokunExperienceId={tour.bokunExperienceId}
              durationDays={tour.durationDays}
              category={tour.category}
            />
          </aside>
        </div>
      </Section>
    </>
  );
}
