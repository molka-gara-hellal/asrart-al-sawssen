import { useState } from "react";
import { useI18n } from "@/i18n";

interface Props {
  src?: string;
  alt: string;
  className?: string;
  /** Eager-load above-the-fold images */
  priority?: boolean;
}

/** Image with a branded fallback: never shows a broken-image icon or an empty card. */
export function ProductImage({ src, alt, className = "", priority = false }: Props) {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — ${t.common.photoSoon}`}
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-blush-100 ${className}`}
      >
        <img
          src="/assets/brand/logo-mark.png"
          alt=""
          aria-hidden="true"
          className="w-1/2 max-w-[180px] opacity-70 mix-blend-multiply"
        />
        <span className="text-xs uppercase tracking-[0.2em] text-stone-warm">{t.common.photoSoon}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
