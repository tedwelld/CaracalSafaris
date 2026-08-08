export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[#c4b49a] text-xs tracking-[0.2em] uppercase mb-4 font-medium">
      {children}
    </span>
  );
}
