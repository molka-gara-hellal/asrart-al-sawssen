import { ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCart } from "@/hooks/useCart";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";
import { buildOrderMessage, buildWhatsAppUrl, openWhatsApp } from "@/utils/whatsapp";

export default function Bag() {
  const i18n = useI18n();
  const { t, tx, formatPrice } = i18n;
  usePageMeta(t.meta.bagTitle);
  const { lines, subtotal, setQuantity, removeItem, clear, removedNotice, dismissNotice } = useCart();
  const [note, setNote] = useState("");

  const order = () => {
    if (lines.length === 0) return;
    openWhatsApp(buildWhatsAppUrl(buildOrderMessage(lines, subtotal, note, i18n)));
  };

  return (
    <div className="container-x py-12 sm:py-20">
      <h1 className="mb-10 font-serif text-4xl sm:text-5xl">{t.bag.title}</h1>

      {removedNotice && (
        <div role="status" className="mb-8 flex items-start justify-between gap-4 border-s-2 border-terracotta bg-blush-100 px-4 py-3 text-sm">
          <p>{t.bag.removedUnavailable}</p>
          <button type="button" onClick={dismissNotice} aria-label={t.common.close} className="flex h-8 w-8 shrink-0 items-center justify-center">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      {lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title={t.bag.empty}
          body={t.bag.emptyBody}
          action={<Link to="/collections" className="btn-primary">{t.bag.continue}</Link>}
        />
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <ul className="divide-y divide-blush-200 border-y border-blush-200">
            {lines.map(({ item, product, lineTotal }) => {
              const color = product.colors.find((c) => c.id === item.colorId);
              const name = tx(product.name);
              return (
                <li key={item.key} className="grid grid-cols-[88px_1fr] gap-4 py-6 sm:grid-cols-[120px_1fr] sm:gap-6">
                  <Link to={`/collections/${product.id}`} className="block aspect-[3/4] overflow-hidden bg-blush-100">
                    <ProductImage src={product.images[0]} alt={name} />
                  </Link>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/collections/${product.id}`} className="font-serif text-xl hover:text-rosegold-dark">
                          {name}
                        </Link>
                        <p className="mt-1 text-sm text-stone-warm">
                          {item.size && <span>{t.product.size}: {item.size}</span>}
                          {item.size && color && <span aria-hidden="true"> · </span>}
                          {color && <span>{t.product.color}: {tx(color.name)}</span>}
                        </p>
                        <p className="mt-1 text-sm text-stone-warm">{t.bag.unitPrice}: {formatPrice(product.price)}</p>
                      </div>
                      <p className="font-medium">{formatPrice(lineTotal)}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <QuantitySelector value={item.quantity} onChange={(q) => setQuantity(item.key, q)} />
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`${t.bag.remove}: ${name}`}
                        className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-stone-warm underline-offset-4 hover:text-ink hover:underline"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                        {t.bag.remove}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit space-y-6 bg-blush-100 p-6 sm:p-8 lg:sticky lg:top-28" aria-label={t.bag.subtotal}>
            <p className="flex items-baseline justify-between text-lg">
              <span>{t.bag.subtotal}</span>
              <span className="font-serif text-3xl">{formatPrice(subtotal)}</span>
            </p>

            <div>
              <label htmlFor="order-note" className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-warm">
                {t.bag.noteLabel}
              </label>
              <textarea
                id="order-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.bag.notePlaceholder}
                rows={3}
                maxLength={500}
                className="field py-3"
              />
            </div>

            <WhatsAppButton label={t.bag.order} onClick={order} className="w-full" />

            <div className="space-y-2 text-xs leading-relaxed text-stone-warm">
              <p>{t.bag.noPayment}</p>
              <p>{t.bag.confirmInfo}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-blush-300 pt-4 text-sm">
              <Link to="/collections" className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                {t.bag.continue}
              </Link>
              <button type="button" onClick={clear} className="inline-flex min-h-[44px] items-center text-stone-warm underline underline-offset-4 hover:text-ink">
                {t.bag.clear}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
