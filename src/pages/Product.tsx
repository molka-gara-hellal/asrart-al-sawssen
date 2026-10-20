import { ArrowLeft, Check, PackageX, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { QuantitySelector } from "@/components/QuantitySelector";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProduct, isSizeAvailable, products } from "@/data/products";
import { useCart, type CartLine } from "@/hooks/useCart";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";
import type { Product } from "@/types";
import { makeKey, validateSelection, type SelectionError } from "@/utils/cart";
import { buildOrderMessage, buildWhatsAppUrl, openWhatsApp } from "@/utils/whatsapp";

export default function ProductPage() {
  const { id = "" } = useParams();
  const { t } = useI18n();
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="container-x">
        <EmptyState
          icon={PackageX}
          title={t.common.notFound}
          body={t.common.notFoundBody}
          action={<Link to="/collections" className="btn-primary">{t.product.back}</Link>}
        />
      </div>
    );
  }
  // key={id} resets the selection state when navigating between products
  return <ProductDetail key={product.id} product={product} />;
}

function ProductDetail({ product }: { product: Product }) {
  const i18n = useI18n();
  const { t, tx, formatPrice } = i18n;
  const { addItem } = useCart();
  const name = tx(product.name);
  usePageMeta(name, tx(product.description));

  const [size, setSize] = useState<string | undefined>();
  const [colorId, setColorId] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<SelectionError>(null);
  const [added, setAdded] = useState(false);

  const soldOut = product.status !== "available";
  const errorText: Record<Exclude<SelectionError, null>, string> = {
    size: t.product.chooseSize,
    color: t.product.chooseColor,
    sizeUnavailable: t.product.sizeUnavailable,
    unavailable: t.product.outOfStock,
  };

  const validate = (): boolean => {
    const result = validateSelection(product, size, colorId);
    setError(result);
    return result === null;
  };

  const handleAdd = () => {
    if (!validate()) return;
    if (addItem(product.id, quantity, size, colorId)) {
      setAdded(true);
      window.setTimeout(() => setAdded(false), 3500);
    }
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const line: CartLine = {
      item: { key: makeKey(product.id, size, colorId), productId: product.id, size, colorId, quantity },
      product,
      lineTotal: product.price * quantity,
    };
    openWhatsApp(buildWhatsAppUrl(buildOrderMessage([line], line.lineTotal, "", i18n)));
  };

  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  return (
    <div className="container-x py-8 sm:py-14">
      <Link to="/collections" className="mb-8 inline-flex min-h-[44px] items-center gap-2 text-sm hover:underline">
        <ArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
        {t.product.back}
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={name} />

        <div className="lg:py-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {product.isNew && !soldOut && <span className="bg-ink px-2.5 py-1 text-[11px] uppercase tracking-widest text-blush-50">{t.product.newBadge}</span>}
            {product.isSample && <span className="bg-rosegold-dark px-2.5 py-1 text-[11px] uppercase tracking-widest text-white">{t.product.sampleBadge}</span>}
          </div>

          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">{name}</h1>
          <p className="mt-4 flex items-baseline gap-3 text-xl">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.originalPrice && <s className="text-base text-stone-warm">{formatPrice(product.originalPrice)}</s>}
          </p>
          <p className={`mt-3 text-sm ${soldOut ? "text-terracotta" : "text-stone-warm"}`}>
            {soldOut ? t.product.unavailable : t.product.available}
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-stone-warm">{tx(product.description)}</p>

          {product.sizes.length > 0 && (
            <fieldset className="mt-8" disabled={soldOut}>
              <legend className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-warm">{t.product.size}</legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const ok = isSizeAvailable(product, s);
                  const selected = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={!ok}
                      aria-pressed={selected}
                      title={ok ? undefined : t.product.sizeUnavailable}
                      onClick={() => {
                        setSize(s);
                        setError(null);
                      }}
                      className={`chip min-w-[52px] ${selected ? "border-ink bg-ink text-blush-50" : "border-stone-warm/40 bg-white/60 hover:border-ink"} ${ok ? "" : "cursor-not-allowed text-stone-warm/50 line-through opacity-60"}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {product.colors.length > 0 && (
            <fieldset className="mt-6" disabled={soldOut}>
              <legend className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-warm">
                {t.product.color}
                {colorId && <span className="ms-2 normal-case tracking-normal text-ink">{tx(product.colors.find((c) => c.id === colorId)!.name)}</span>}
              </legend>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={tx(c.name)}
                    aria-pressed={colorId === c.id}
                    onClick={() => {
                      setColorId(c.id);
                      setError(null);
                    }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 p-1 transition-colors ${colorId === c.id ? "border-ink" : "border-transparent hover:border-stone-warm/50"}`}
                  >
                    <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {!soldOut && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-warm">{t.product.quantity}</p>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
          )}

          {error && (
            <p role="alert" className="mt-5 border-s-2 border-terracotta bg-blush-100 px-4 py-3 text-sm">
              {errorText[error]}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleAdd} disabled={soldOut} className="btn-primary sm:flex-1">
              {added ? <Check size={18} aria-hidden="true" /> : <ShoppingBag size={18} aria-hidden="true" />}
              {added ? t.product.added : t.product.addToBag}
            </button>
            <WhatsAppButton label={t.product.orderWhatsApp} onClick={handleWhatsApp} disabled={soldOut} className="sm:flex-1" />
          </div>

          <div aria-live="polite" className="min-h-[1.5rem]">
            {added && (
              <Link to="/bag" className="mt-4 inline-block text-sm underline underline-offset-4">
                {t.product.viewBag}
              </Link>
            )}
          </div>
          <p className="mt-4 text-xs text-stone-warm">{t.product.orderNote}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 sm:mt-28" aria-labelledby="related-title">
          <h2 id="related-title" className="mb-8 font-serif text-3xl sm:text-4xl">{t.product.related}</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
