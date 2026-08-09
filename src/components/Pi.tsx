import { cn } from "@/lib/cn";

/**
 * PrimeIcons wrapper. Size with Tailwind text-* utilities.
 * Browse: https://primeng.org/icons
 */
export function Pi({
  name,
  className,
}: {
  /** PrimeIcons class, e.g. "pi-whatsapp" */
  name: string;
  className?: string;
}) {
  return <i className={cn("pi", name, "leading-none", className)} aria-hidden="true" />;
}
