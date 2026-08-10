import HeroSection from "@/components/home/HeroSection";
import BrandIntroSection from "@/components/home/BrandIntroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ThreePillarsSection from "@/components/home/ThreePillarsSection";
import DestinationsPreviewSection from "@/components/home/DestinationsPreviewSection";
import FeaturedToursSection from "@/components/home/FeaturedToursSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustBadgesSection from "@/components/home/TrustBadgesSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import SafariWelcome from "@/components/home/SafariWelcome";

export default function Home() {
  return (
    <>
      <SafariWelcome />
      <HeroSection />
      <BrandIntroSection />
      <HowItWorksSection />
      <ThreePillarsSection />
      <DestinationsPreviewSection />
      <FeaturedToursSection />
      <TestimonialsSection />
      <TrustBadgesSection />
      <FinalCtaSection />
    </>
  );
}
