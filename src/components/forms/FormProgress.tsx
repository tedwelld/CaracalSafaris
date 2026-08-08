const stepLabels = ["Journey Type", "Destinations", "Travel Dates", "Guests & Budget", "Your Details"];

export default function FormProgress({ current }: { current: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-0">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  i < current
                    ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                    : i === current
                    ? "bg-[var(--accent)] text-[var(--accent-fg)] ring-4 ring-[var(--accent)]/20"
                    : "bg-[var(--fg-10)] text-[var(--fg-30)]"
                }`}
              >
                {i < current ? (
                  <i className="pi pi-check" style={{ fontSize: "13px" }} />
                ) : (
                  i + 1
                )}
              </div>
              <p
                className={`text-xs mt-2 text-center hidden md:block transition-colors duration-300 ${
                  i === current ? "text-[var(--accent)]" : i < current ? "text-[var(--fg-60)]" : "text-[var(--fg-20)]"
                }`}
              >
                {label}
              </p>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`h-px flex-1 transition-all duration-500 ${
                  i < current ? "bg-[var(--accent)]" : "bg-[var(--fg-10)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
