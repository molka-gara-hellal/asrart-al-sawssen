import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function Legal() {
  const { t } = useI18n();
  usePageMeta(t.meta.legalTitle);
  const L = t.legal;
  const sections = [
    { id: "delivery", title: L.deliveryTitle, body: L.deliveryBody },
    { id: "returns", title: L.returnsTitle, body: L.returnsBody },
    { id: "privacy", title: L.privacyTitle, body: L.privacyBody },
    { id: "terms", title: L.termsTitle, body: L.termsBody },
  ];

  return (
    <div className="container-x max-w-3xl py-12 sm:py-20">
      <h1 className="font-serif text-4xl sm:text-5xl">{L.title}</h1>
      <p className="mt-6 border-s-2 border-terracotta bg-blush-100 px-4 py-3 text-sm">{L.notice}</p>
      <div className="mt-10 space-y-10">
        {sections.map((s) => (
          <section key={s.id} aria-labelledby={`legal-${s.id}`}>
            <h2 id={`legal-${s.id}`} className="mb-3 font-serif text-2xl">{s.title}</h2>
            <p className="leading-relaxed text-stone-warm">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
