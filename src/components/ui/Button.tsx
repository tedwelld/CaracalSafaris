import Link from "next/link";

type Variant = "primary" | "ghost" | "outline";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)] font-semibold",
  ghost:
    "bg-transparent text-[var(--fg)] border border-[var(--fg-40)] hover:border-[var(--fg)] hover:bg-[var(--fg-05)]",
  outline:
    "bg-transparent text-[var(--accent)] border border-[var(--accent)]/60 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 rounded text-sm tracking-wide transition-all duration-300 cursor-pointer";
  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
