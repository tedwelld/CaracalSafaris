import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  children,
  className,
  muted = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", muted && "bg-muted", className)}>
      <Container>{children}</Container>
    </section>
  );
}
