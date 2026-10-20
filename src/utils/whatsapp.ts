import { siteConfig } from "@/config/site";
import type { CartLine } from "@/hooks/useCart";
import type { I18nValue } from "@/i18n";

type Fmt = Pick<I18nValue, "t" | "tx" | "formatPrice">;

export function buildOrderMessage(lines: CartLine[], subtotal: number, note: string, i18n: Fmt): string {
  const { t, tx, formatPrice } = i18n;
  const out: string[] = [t.whatsapp.greeting, t.whatsapp.intro, ""];

  lines.forEach(({ item, product, lineTotal }, index) => {
    out.push(`${index + 1}. ${tx(product.name)}`);
    const details: string[] = [];
    if (item.size) details.push(`${t.whatsapp.size}: ${item.size}`);
    if (item.colorId) {
      const color = product.colors.find((c) => c.id === item.colorId);
      if (color) details.push(`${t.whatsapp.color}: ${tx(color.name)}`);
    }
    details.push(`${t.whatsapp.qty}: ${item.quantity}`);
    out.push(`   ${details.join(" | ")}`);
    out.push(`   ${formatPrice(product.price)} × ${item.quantity} = ${formatPrice(lineTotal)}`);
    out.push("");
  });

  out.push(`${t.whatsapp.subtotal}: ${formatPrice(subtotal)}`);
  const cleanNote = note.trim();
  if (cleanNote) out.push(`${t.whatsapp.note}: ${cleanNote}`);
  out.push("", t.whatsapp.closing);
  return out.join("\n");
}

/** Properly URL-encoded WhatsApp click-to-chat link. */
export function buildWhatsAppUrl(message: string, number: string = siteConfig.whatsappNumber): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}
