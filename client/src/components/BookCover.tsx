import { useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type BookCoverProps = {
  src?: string | null;
  title: string;
  subtitle?: string;
  className?: string;
  imgClassName?: string;
};

const genericCoverPaths = new Set(["", "/og-image.png"]);

export default function BookCover({
  src,
  title,
  subtitle,
  className,
  imgClassName,
}: BookCoverProps) {
  const normalizedSrc = src?.trim() || "";
  const [failed, setFailed] = useState(false);
  const shouldUseImage = normalizedSrc && !genericCoverPaths.has(normalizedSrc) && !failed;

  return (
    <div
      className={cn(
        "relative aspect-[3/4] overflow-hidden bg-zinc-950 text-white",
        className
      )}
    >
      {shouldUseImage ? (
        <img
          src={normalizedSrc}
          alt={`${title} cover`}
          className={cn("h-full w-full object-cover", imgClassName)}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col justify-between border border-white/10 bg-[linear-gradient(145deg,#09090b_0%,#18181b_48%,#111827_100%)] p-6">
          <div className="flex items-center justify-between text-amber-100/75">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.18em]">Kiminou Knox</span>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold leading-tight text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-3 text-sm leading-relaxed text-white/65">{subtitle}</p>
            )}
          </div>
          <div className="h-1.5 w-20 rounded-full bg-amber-200" />
        </div>
      )}
    </div>
  );
}
