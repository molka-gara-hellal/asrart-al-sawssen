import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { Lang, LocalizedText } from "@/types";
import { fr, type Dictionary } from "./fr";
import { ar } from "./ar";

const STORAGE_KEY = "asrart.lang.v1";
const dictionaries: Record<Lang, Dictionary> = { fr, ar };

export interface I18nValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (lang: Lang) => void;
  /** Pick the right language from a {fr, ar} object */
  tx: (text: LocalizedText) => string;
  /** Replace {placeholders} in a string */
  fmt: (template: string, values: Record<string, string | number>) => string;
  formatPrice: (amount: number) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "ar") return stored;
  } catch {
    /* storage unavailable */
  }
  return siteConfig.defaultLang;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const numberFormat = new Intl.NumberFormat(lang === "ar" ? "ar-TN-u-nu-latn" : "fr-TN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    return {
      lang,
      dir,
      t: dictionaries[lang],
      setLang,
      tx: (text) => text[lang],
      fmt: (template, values) =>
        template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? "")),
      formatPrice: (amount) => `${numberFormat.format(amount)} ${siteConfig.currency.symbol[lang]}`,
    };
  }, [lang, dir, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
