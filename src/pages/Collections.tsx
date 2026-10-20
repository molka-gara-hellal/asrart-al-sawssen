import { SearchX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CollectionFilters } from "@/components/CollectionFilters";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { categories, products } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";
import { defaultFilters, filterProducts, type FilterState } from "@/utils/filter";

const validCategory = (c: string | null): string => (c && categories.some((x) => x.id === c) ? c : "all");

export default function Collections() {
  const { t, lang } = useI18n();
  usePageMeta(t.meta.collectionsTitle, t.collections.subtitle);

  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    category: validCategory(params.get("category")),
    onlyNew: params.get("new") === "1",
  }));

  // Keep filters in sync when the URL changes (e.g. clicking "new arrivals" from the homepage)
  useEffect(() => {
    setFilters((f) => ({ ...f, category: validCategory(params.get("category")), onlyNew: params.get("new") === "1" }));
  }, [params]);

  const update = (patch: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...patch }));
    if ("category" in patch || "onlyNew" in patch) {
      const next = new URLSearchParams(params);
      const category = patch.category ?? filters.category;
      const onlyNew = patch.onlyNew ?? filters.onlyNew;
      if (category === "all") next.delete("category");
      else next.set("category", category);
      if (onlyNew) next.set("new", "1");
      else next.delete("new");
      setParams(next, { replace: true });
    }
  };

  const reset = () => {
    setFilters(defaultFilters);
    setParams(new URLSearchParams(), { replace: true });
  };

  const visible = useMemo(() => filterProducts(products, filters, lang), [filters, lang]);
  const isDirty = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <div className="container-x py-12 sm:py-20">
      <SectionHeading as="h1" eyebrow={t.collections.subtitle} title={t.collections.title} />
      <CollectionFilters value={filters} onChange={update} onReset={reset} resultCount={visible.length} isDirty={isDirty} />

      {visible.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t.collections.emptyTitle}
          body={t.collections.emptyBody}
          action={
            <button type="button" onClick={reset} className="btn-outline">
              {t.collections.reset}
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
