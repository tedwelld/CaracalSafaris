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
    "bg-[#c4b49a] text-[#1a1a1a] hover:bg-[#d4c4aa] font-semibold",
  ghost:
    "bg-transparent text-[#f5f0e8] border border-[#f5f0e8]/40 hover:border-[#f5f0e8] hover:bg-[#f5f0e8]/5",
  outline:
    "bg-transparent text-[#c4b49a] border border-[#c4b49a]/60 hover:border-[#c4b49a] hover:bg-[#c4b49a]/10",
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
