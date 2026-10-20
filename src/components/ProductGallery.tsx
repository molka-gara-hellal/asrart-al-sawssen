import { useState } from "react";
import { useI18n } from "@/i18n";
import { ProductImage } from "./ProductImage";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const { t, fmt } = useI18n();
  const [index, setIndex] = useState(0);
  const current = images[index];

  return (
    <div className="space-y-3" aria-label={t.product.gallery}>
      <div className="aspect-[3/4] overflow-hidden bg-blush-100">
        <ProductImage key={current ?? "placeholder"} src={current} alt={name} priority />
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={fmt(t.product.viewImage, { n: i + 1 })}
                aria-current={i === index}
                className={`block aspect-[3/4] w-full overflow-hidden border-2 transition-colors ${i === index ? "border-ink" : "border-transparent hover:border-blush-300"}`}
              >
                <ProductImage src={src} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
