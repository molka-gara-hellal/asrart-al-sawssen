import { Minus, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n";

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = siteConfig.maxQuantityPerItem }: Props) {
  const { t } = useI18n();
  return (
    <div className="inline-flex items-center border border-stone-warm/40 bg-white/70" role="group" aria-label={t.product.quantity}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={t.bag.decrease}
        className="flex h-11 w-11 items-center justify-center transition-colors hover:bg-blush-100 disabled:opacity-40"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-[2.5rem] text-center text-sm font-medium tabular-nums">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={t.bag.increase}
        className="flex h-11 w-11 items-center justify-center transition-colors hover:bg-blush-100 disabled:opacity-40"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
