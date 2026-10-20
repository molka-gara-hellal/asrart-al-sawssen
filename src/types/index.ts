export type Lang = "fr" | "ar";

export interface LocalizedText {
  fr: string;
  ar: string;
}

export interface ProductColor {
  id: string;
  name: LocalizedText;
  /** CSS color used for the swatch */
  hex: string;
}

export interface Category {
  id: string;
  label: LocalizedText;
}

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  /** Price in TND */
  price: number;
  /** Optional previous price in TND (shown struck through) */
  originalPrice?: number;
  category: string;
  /** First image is the main image. Paths are relative to /public, e.g. "/assets/products/robe-01-a.jpg" */
  images: string[];
  /** Leave empty for one-size items (e.g. accessories) */
  sizes: string[];
  /** Subset of `sizes` that are currently out of stock */
  unavailableSizes?: string[];
  /** Leave empty when the item has a single colour */
  colors: ProductColor[];
  /** "available" or "unavailable" (sold out) */
  status: "available" | "unavailable";
  featured?: boolean;
  isNew?: boolean;
  /** Marks development sample data. Remove this line on real products. */
  isSample?: boolean;
}

export interface CartItem {
  /** `${productId}|${size}|${colorId}` */
  key: string;
  productId: string;
  size?: string;
  colorId?: string;
  quantity: number;
}

export interface SiteConfig {
  brand: {
    name: string;
    nameAr: string;
    designer: string;
    designerRole: LocalizedText;
  };
  defaultLang: Lang;
  currency: { code: string; symbol: LocalizedText };
  /** International format without "+" or spaces, e.g. 21624661267 */
  whatsappNumber: string;
  contact: {
    phoneDisplay: string;
    email: string;
    address: LocalizedText;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
    facebookName: string;
  };
  announcement: { enabled: boolean; text: LocalizedText };
  maxQuantityPerItem: number;
}
