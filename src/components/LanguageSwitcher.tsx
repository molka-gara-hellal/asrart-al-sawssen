import { useI18n } from "@/i18n";
import type { Lang } from "@/types";

const options: { code: Lang; label: string; aria: string }[] = [
  { code: "fr", label: "FR", aria: "Français" },
  { code: "ar", label: "AR", aria: "العربية" },
];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.switchLang} className="flex items-center" dir="ltr">
      {options.map((o, i) => (
        <span key={o.code} className="flex items-center">
          {i > 0 && <span className="text-stone-warm/50" aria-hidden="true">/</span>}
          <button
            type="button"
            lang={o.code}
            aria-label={o.aria}
            aria-pressed={lang === o.code}
            onClick={() => setLang(o.code)}
            className={`flex h-11 min-w-[40px] items-center justify-center px-1.5 text-sm tracking-widest transition-colors ${lang === o.code ? "font-semibold text-ink" : "text-stone-warm hover:text-ink"}`}
          >
            {o.label}
          </button>
        </span>
      ))}
    </div>
  );
}
