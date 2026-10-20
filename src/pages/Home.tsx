import { ArrowRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { products } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";

export default function Home() {
  const { t, tx } = useI18n();
  usePageMeta(t.meta.homeTitle, t.meta.homeDesc, true);

  const featured = products.filter((p) => p.featured).slice(0, 4);
  const fresh = products.filter((p) => p.isNew).slice(0, 4);
  const g = media.gallery;

  return (
    <>
      {/* HERO */}
      <section className="bg-blush-100">
        <div className="container-x grid items-center gap-8 pb-14 pt-6 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="relative lg:order-2 lg:col-span-7">
            <div className="aspect-[4/5] max-h-[78vh] w-full overflow-hidden bg-blush-200 sm:aspect-[4/3] lg:aspect-[4/5]">
              <ProductImage src={media.hero.src} alt={tx(media.hero.alt)} priority className="object-center" />
            </div>
            <div className="absolute -bottom-8 -start-6 hidden aspect-[4/3] w-[38%] border-[10px] border-blush-100 bg-blush-200 shadow-xl lg:block">
              <ProductImage src={media.heroSecondary.src} alt={tx(media.heroSecondary.alt)} />
            </div>
          </div>

          <div className="animate-fade-up lg:order-1 lg:col-span-5">
            <p className="eyebrow mb-5">{t.hero.eyebrow}</p>
            <p className="mb-2 font-serif text-xl text-rosegold-dark">{siteConfig.brand.name}</p>
            <p className="mb-6 font-serif text-2xl text-rosegold-dark" lang="ar">
              {siteConfig.brand.nameAr}
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-warm">{t.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collections" className="btn-primary">
                {t.hero.cta}
                <ArrowRight size={16} className="rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link to="/about" className="btn-outline">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="container-x py-16 sm:py-24">
          <SectionHeading eyebrow={t.home.featuredSub} title={t.home.featuredTitle} linkTo="/collections" linkLabel={t.home.viewAll} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* NEW ARRIVALS */}
      {fresh.length > 0 && (
        <section className="bg-blush-100/60 py-16 sm:py-24">
          <div className="container-x">
            <SectionHeading eyebrow={t.home.newSub} title={t.home.newTitle} linkTo="/collections?new=1" linkLabel={t.home.viewAll} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {fresh.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STORY */}
      <section className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="aspect-[4/3] overflow-hidden bg-blush-100">
            <ProductImage src={media.story.src} alt={tx(media.story.alt)} />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow mb-3">{t.home.storyEyebrow}</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{t.home.storyTitle}</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-stone-warm">{t.home.storyBody}</p>
          <Link to="/about" className="btn-outline mt-8">
            {t.home.storyCta}
          </Link>
        </Reveal>
      </section>

      {/* GALLERY */}
      <section className="bg-blush-100/60 py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow={t.home.gallerySub} title={t.home.galleryTitle} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
            <Reveal className="col-span-2 md:col-span-7">
              <div className="aspect-[16/10] overflow-hidden bg-blush-100">
                <ProductImage src={g[0].src} alt={tx(g[0].alt)} />
              </div>
            </Reveal>
            <Reveal className="col-span-1 md:col-span-5 md:row-span-2" delay={100}>
              <div className="aspect-[4/5] overflow-hidden bg-blush-100 md:aspect-auto md:h-full">
                <ProductImage src={g[2].src} alt={tx(g[2].alt)} />
              </div>
            </Reveal>
            <Reveal className="col-span-1 md:col-span-7" delay={200}>
              <div className="aspect-[4/5] overflow-hidden bg-blush-100 md:aspect-[16/10]">
                <ProductImage src={g[1].src} alt={tx(g[1].alt)} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="container-x py-16 text-center sm:py-24">
        <Instagram size={30} strokeWidth={1.3} className="mx-auto mb-5 text-rosegold-dark" aria-hidden="true" />
        <h2 className="font-serif text-4xl sm:text-5xl">{t.home.socialTitle}</h2>
        <p className="mx-auto mt-4 max-w-md text-stone-warm">{t.home.socialSub}</p>
        <p className="mt-2 font-medium" dir="ltr">{siteConfig.social.instagramHandle}</p>
        <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
          {t.home.socialCta}
        </a>
      </section>
    </>
  );
}
