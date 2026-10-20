import { Search, X } from "lucide-react";
import { categories } from "@/data/products";
import { useI18n } from "@/i18n";
import type { FilterState, SortKey } from "@/utils/filter";

interface Props {
  value: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
  resultCount: number;
  isDirty: boolean;
}

export function CollectionFilters({ value, onChange, onReset, resultCount, isDirty }: Props) {
  const { t, tx, fmt } = useI18n();

  const toggle = (checked: boolean) =>
    `chip ${checked ? "border-ink bg-ink text-blush-50" : "border-stone-warm/40 bg-white/60 hover:border-ink"}`;

  return (
    <div className="mb-10 space-y-6 border-y border-blush-200 py-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="product-search" className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-warm">
            {t.collections.search}
          </label>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-stone-warm" aria-hidden="true" />
            <input
              id="product-search"
              type="search"
              value={value.query}
              onChange={(e) => onChange({ query: e.target.value })}
              placeholder={t.collections.searchPlaceholder}
              className="field ps-11"
            />
          </div>
        </div>
        <div>
          <label htmlFor="product-sort" className="mb-2 block text-xs font-medium uppercase tracking-widest text-stone-warm">
            {t.collections.sort}
          </label>
          <select id="product-sort" value={value.sort} onChange={(e) => onChange({ sort: e.target.value as SortKey })} className="field">
            <option value="default">{t.collections.sortDefault}</option>
            <option value="priceAsc">{t.collections.sortPriceAsc}</option>
            <option value="priceDesc">{t.collections.sortPriceDesc}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.collections.category}>
        <button type="button" aria-pressed={value.category === "all"} onClick={() => onChange({ category: "all" })} className={toggle(value.category === "all")}>
          {t.collections.all}
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" aria-pressed={value.category === c.id} onClick={() => onChange({ category: c.id })} className={toggle(value.category === c.id)}>
            {tx(c.label)}
          </button>
        ))}
        <span className="mx-1 hidden h-6 w-px bg-blush-300 sm:block" aria-hidden="true" />
        <button type="button" aria-pressed={value.onlyNew} onClick={() => onChange({ onlyNew: !value.onlyNew })} className={toggle(value.onlyNew)}>
          {t.collections.onlyNew}
        </button>
        <button type="button" aria-pressed={value.onlyAvailable} onClick={() => onChange({ onlyAvailable: !value.onlyAvailable })} className={toggle(value.onlyAvailable)}>
          {t.collections.onlyAvailable}
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm text-stone-warm">
        <p aria-live="polite">{fmt(t.collections.results, { count: resultCount })}</p>
        {isDirty && (
          <button type="button" onClick={onReset} className="inline-flex min-h-[44px] items-center gap-1.5 underline underline-offset-4 hover:text-ink">
            <X size={14} aria-hidden="true" />
            {t.collections.reset}
          </button>
        )}
      </div>
    </div>
  );
}
