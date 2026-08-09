import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getAvailabilities, searchProducts } from "@/lib/bokun";
import { siteConfig } from "@/data/siteConfig";
import { ProductContent } from "@/components/bokun/ProductContent";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProduct(Number(id));
    return { title: product.title, description: product.excerpt ?? product.summary };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  let product: Awaited<ReturnType<typeof getProduct>>;
  let availabilities: Awaited<ReturnType<typeof getAvailabilities>>;
  let searchResult: Awaited<ReturnType<typeof searchProducts>> | null = null;

  try {
    [product, availabilities, searchResult] = await Promise.all([
      getProduct(productId),
      getAvailabilities(
        productId,
        new Date().toISOString().slice(0, 10),
        new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10),
        siteConfig.bokunDefaultCurrency,
      ),
      searchProducts({ pageSize: 50 }).catch(() => null),
    ]);
  } catch {
    notFound();
  }

  const priceRange = availabilities
    .flatMap((a) => a.pricesByRate ?? [])
    .flatMap((r) => r.pricePerCategoryUnit ?? [])
    .map((p) => p.amount?.amount)
    .filter((n): n is number => typeof n === "number");
  const minPrice = priceRange.length ? Math.min(...priceRange) : null;
  const currency =
    availabilities[0]?.pricesByRate?.[0]?.pricePerCategoryUnit?.[0]?.amount?.currency ?? "USD";

  const photos = product.photos?.length
    ? product.photos.map((p) => ({ src: p.originalUrl, alt: product.title }))
    : product.keyPhoto
      ? [{ src: product.keyPhoto.originalUrl, alt: product.title }]
      : [];

  const pricingCategories =
    product.pricingCategories?.map((pc) => {
      const priceInfo = availabilities
        .flatMap((a) => a.pricesByRate ?? [])
        .flatMap((r) => r.pricePerCategoryUnit ?? [])
        .find((p) => p.id === pc.id);
      return {
        id: pc.id,
        title: pc.title,
        price: priceInfo?.amount?.amount ?? 0,
        ticketCategory: pc.ticketCategory,
        defaultCategory: pc.defaultCategory,
      };
    }) ?? [];

  const durationText = product.durationText;
  const meetingType =
    product.meetingType === "MEET_ON_LOCATION"
      ? "Meet on location"
      : product.meetingType ?? "N/A";

  const difficultyLabels: Record<string, string> = {
    EASY: "Easy",
    MODERATE: "Moderate",
    HARD: "Hard",
    CHALLENGING: "Challenging",
  };
  const difficulty =
    difficultyLabels[product.difficultyLevel ?? ""] ?? product.difficultyLevel;

  const toStringList = (v: unknown): string[] => {
    if (!Array.isArray(v)) return [];
    return v.map((item) => (typeof item === "string" ? item : String(item)));
  };

  const inclusions = toStringList(product.included ?? product.inclusions);
  const exclusions = toStringList(product.excluded ?? product.exclusions);

  const startTimes = [
    ...new Set(availabilities.map((a) => a.startTime).filter((t): t is string => !!t)),
  ].sort();

  const highlights: string[] = [];
  const knowBeforeYouGo = product.knowBeforeYouGoItems ?? [];
  const location = product.location;
  const vendor = product.vendor;
  const cancellationPolicy = product.cancellationPolicy;
  const requirements = product.requirements ?? [];
  const activityType = product.activityType;
  const bookingType = product.bookingType;
  const capacityType = product.capacityType;
  const minParticipants = product.minParticipants;
  const maxParticipants = product.maxParticipants;

  const relatedProducts = (searchResult?.items ?? [])
    .filter((p) => p.id !== productId)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt ?? p.summary,
      photoUrl: p.keyPhoto?.originalUrl ?? p.photos?.[0]?.originalUrl,
    }));

  return (
    <ProductContent
      productId={productId}
      title={product.title}
      excerpt={product.excerpt}
      description={product.description}
      photos={photos.length ? photos : [{ src: "/images/victoria-falls.jpeg", alt: product.title }]}
      difficulty={difficulty}
      durationText={durationText}
      meetingType={meetingType}
      reviewRating={product.reviewRating}
      reviewCount={product.reviewCount}
      currency={currency}
      minPrice={minPrice}
      pricingCategories={pricingCategories}
      startTimes={startTimes}
      availabilities={availabilities}
      inclusions={inclusions}
      exclusions={exclusions}
      knowBeforeYouGo={knowBeforeYouGo}
      highlights={highlights}
      location={location}
      vendor={vendor}
      cancellationPolicy={cancellationPolicy}
      requirements={requirements}
      activityType={activityType}
      bookingType={bookingType}
      capacityType={capacityType}
      minParticipants={minParticipants}
      maxParticipants={maxParticipants}
      relatedProducts={relatedProducts}
    />
  );
}
