import { Link } from "react-router-dom";
import { useI18n } from "@/i18n";
import type { Product } from "@/types";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { t, tx, formatPrice } = useI18n();
  const name = tx(product.name);
  const soldOut = product.status !== "available";
  const [main, second] = product.images;

  return (
    <Link to={`/collections/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-blush-100">
        <div className={`h-full w-full transition-transform duration-700 ${second ? "" : "motion-safe:group-hover:scale-105"}`}>
          <ProductImage src={main} alt={name} />
        </div>
        {second && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
            <ProductImage src={second} alt="" />
          </div>
        )}

        <div className="absolute start-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew && !soldOut && <span className="bg-ink px-2.5 py-1 text-[11px] uppercase tracking-widest text-blush-50">{t.product.newBadge}</span>}
          {soldOut && <span className="bg-white/90 px-2.5 py-1 text-[11px] uppercase tracking-widest text-ink">{t.product.soldOut}</span>}
          {product.isSample && <span className="bg-rosegold-dark px-2.5 py-1 text-[11px] uppercase tracking-widest text-white">{t.product.sampleBadge}</span>}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-xl leading-snug group-hover:text-rosegold-dark">{name}</h3>
        <p className="flex items-baseline gap-2 text-sm">
          <span className="font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && <s className="text-stone-warm">{formatPrice(product.originalPrice)}</s>}
        </p>
      </div>
    </Link>
  );
}
