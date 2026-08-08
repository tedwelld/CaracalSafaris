interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "charcoal" | "ivory" | "dark" | "transparent";
  noPadding?: boolean;
}

const bgMap = {
  charcoal: "bg-[var(--bg)]",
  ivory: "bg-[var(--bg-surface)]",
  dark: "bg-[var(--bg-alt)]",
  transparent: "",
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  background = "charcoal",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`${bgMap[background]} ${noPadding ? "" : "section-padding"} ${className}`}>
      <div className="container-luxury">{children}</div>
    </section>
  );
}
