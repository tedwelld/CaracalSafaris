"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Image with a graceful gradient fallback for missing/broken assets.
 */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  onLoad,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  onLoad?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const hasPositionClass = /\b(absolute|fixed|sticky|relative)\b/.test(className ?? "");

  return (
    <div
      className={cn(
        !hasPositionClass && "relative",
        "overflow-hidden bg-gradient-to-br from-[#2c1b12] via-[#3d2b1f] to-[#f06522]",
        className,
      )}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          onLoad={onLoad}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}
      {failed && (
        <span className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs font-medium text-white/85">
          {alt}
        </span>
      )}
    </div>
  );
}
