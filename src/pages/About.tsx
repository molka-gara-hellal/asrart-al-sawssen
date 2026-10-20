import { Link } from "react-router-dom";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function About() {
  const { t, tx } = useI18n();
  usePageMeta(t.meta.aboutTitle, t.about.body1);

  return (
    <div className="container-x grid items-center gap-12 py-12 sm:py-20 lg:grid-cols-2 lg:gap-20">
      <Reveal>
        <div className="aspect-[4/3] overflow-hidden bg-blush-100">
          <ProductImage src={media.heroSecondary.src} alt={tx(media.heroSecondary.alt)} priority />
        </div>
      </Reveal>

      <div>
        <p className="eyebrow mb-3">{t.about.title}</p>
        <h1 className="font-serif text-4xl leading-tight sm:text-6xl">{t.about.lead}</h1>
        <div className="mt-8 max-w-lg space-y-5 leading-relaxed text-stone-warm">
          <p>{t.about.body1}</p>
          <p>{t.about.body2}</p>
          <p className="text-sm italic">{t.about.body3}</p>
        </div>

        <div className="mt-10 border-s-2 border-rosegold ps-5">
          <p className="eyebrow mb-1">{t.about.designerLabel}</p>
          <p className="font-serif text-2xl">{siteConfig.brand.designer}</p>
          <p className="text-sm text-stone-warm">{tx(siteConfig.brand.designerRole)}</p>
        </div>

        <Link to="/collections" className="btn-primary mt-10">
          {t.about.cta}
        </Link>
      </div>
    </div>
  );
}
