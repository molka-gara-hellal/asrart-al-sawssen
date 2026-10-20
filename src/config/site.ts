import type { SiteConfig } from "@/types";

/**
 * CENTRAL SITE CONFIGURATION — edit this file to change contact details.
 * Values marked "FROM BUSINESS CARD" were read from the card you supplied; please confirm them.
 */
export const siteConfig: SiteConfig = {
  brand: {
    name: "Asr'Art Al Sawssen",
    nameAr: "أسرار السوسن",
    designer: "Sawssen Saïdane", // FROM BUSINESS CARD
    designerRole: { fr: "Styliste modéliste", ar: "مصممة أزياء ومصممة نماذج" }, // FROM BUSINESS CARD
  },

  defaultLang: "fr",

  currency: { code: "TND", symbol: { fr: "TND", ar: "د.ت" } },

  /**
   * WhatsApp number in international format, digits only (no "+", no spaces).
   * FROM BUSINESS CARD: 24 661 267 (Tunisia, +216). Confirm this number is the one linked to WhatsApp.
   */
  whatsappNumber: "21624661267",

  contact: {
    phoneDisplay: "+216 24 661 267", // FROM BUSINESS CARD
    email: "", // Leave empty to hide. Example: "contact@votre-domaine.tn"
    address: {
      fr: "Ksar Hellal, près de la clinique Sahel", // FROM BUSINESS CARD
      ar: "قصر هلال، بالقرب من مصحة الساحل",
    },
  },

  social: {
    instagram: "https://www.instagram.com/asrart_al_sawssen", // FROM SOCIAL CARD
    instagramHandle: "@asrart_al_sawssen",
    /** Paste the full Facebook page URL here to show the Facebook link. Empty = hidden. */
    facebook: "",
    facebookName: "Sawssen Saidane / Asr'Art Al Sawssen", // FROM SOCIAL CARD
  },

  /** Top banner. Set enabled: false to hide it. */
  announcement: {
    enabled: true,
    text: {
      fr: "Commande simple via WhatsApp — confirmation du stock et de la livraison directement avec la boutique.",
      ar: "الطلب سهل عبر واتساب — تأكيد المخزون والتوصيل مباشرة مع المتجر.",
    },
  },

  maxQuantityPerItem: 10,
};
