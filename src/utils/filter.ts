import type { Lang, Product } from "@/types";

export type SortKey = "default" | "priceAsc" | "priceDesc";

export interface FilterState {
  query: string;
  category: string; // "all" or a category id
  onlyNew: boolean;
  onlyAvailable: boolean;
  sort: SortKey;
}

export const defaultFilters: FilterState = {
  query: "",
  category: "all",
  onlyNew: false,
  onlyAvailable: false,
  sort: "default",
};

/** Lower-case, accent-insensitive normalisation (so "robe" finds "Rôbe", Arabic is left untouched). */
export const normalize = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

export function filterProducts(list: Product[], f: FilterState, _lang: Lang): Product[] {
  const q = normalize(f.query);
  const result = list.filter((p) => {
    if (f.category !== "all" && p.category !== f.category) return false;
    if (f.onlyNew && !p.isNew) return false;
    if (f.onlyAvailable && p.status !== "available") return false;
    if (q) {
      // search both languages so FR or AR keywords always work
      const haystack = normalize(`${p.name.fr} ${p.name.ar}`);
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  if (f.sort === "priceAsc") return [...result].sort((a, b) => a.price - b.price);
  if (f.sort === "priceDesc") return [...result].sort((a, b) => b.price - a.price);
  // default: keep catalogue order, sold-out items last
  return [...result].sort((a, b) => Number(a.status !== "available") - Number(b.status !== "available"));
}
