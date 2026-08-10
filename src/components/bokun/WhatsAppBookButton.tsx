import { Pi } from "@/components/Pi";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export function WhatsAppBookButton({
  tourName,
  label = "Book on WhatsApp",
  className,
}: {
  tourName?: string;
  label?: string;
  className?: string;
}) {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  const text = tourName
    ? `Hello Caracal Africa Safaris, I'd like to book: ${tourName}`
    : siteConfig.whatsappMessage;
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;

  return (
    <ButtonLink href={href} external variant="whatsapp" className={className}>
      <Pi name="pi-whatsapp" className="text-base" />
      {label}
    </ButtonLink>
  );
}
