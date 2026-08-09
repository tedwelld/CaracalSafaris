import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline" | "secondary" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)] font-semibold shadow-sm",
  secondary:
    "border border-[var(--accent)] text-[var(--accent)] bg-surface hover:bg-muted",
  ghost:
    "bg-transparent text-[var(--fg)] border border-[var(--fg-40)] hover:border-[var(--fg)] hover:bg-[var(--fg-05)]",
  outline:
    "bg-transparent text-[var(--accent)] border border-[var(--accent)]/60 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1da851] font-semibold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded text-sm tracking-wide transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  disabled,
  external,
  ...rest
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  children,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button href={href} variant={variant} size={size} className={className} external={external}>
      {children}
    </Button>
  );
}

export default Button;
