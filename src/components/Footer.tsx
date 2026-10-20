import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/i18n";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export function Footer() {
  const { t, tx } = useI18n();
  const { social, contact, brand } = siteConfig;
  const year = new Date().getFullYear();

  const linkCls = "inline-flex min-h-[40px] items-center text-sm hover:text-rosegold-dark hover:underline underline-offset-4";
  const iconCls = "flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-blush-50";

  return (
    <footer className="border-t border-rosegold/40 bg-blush-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <img src="/assets/brand/logo-mark.png" alt={brand.name} width={370} height={330} loading="lazy" className="h-24 w-auto mix-blend-multiply" />
          <p className="font-serif text-2xl" lang="ar">{brand.nameAr}</p>
          <p className="text-sm text-stone-warm">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.navigate}>
          <h2 className="eyebrow mb-3">{t.footer.navigate}</h2>
          <ul>
            <li><Link className={linkCls} to="/">{t.nav.home}</Link></li>
            <li><Link className={linkCls} to="/collections">{t.nav.collections}</Link></li>
            <li><Link className={linkCls} to="/about">{t.nav.about}</Link></li>
            <li><Link className={linkCls} to="/contact">{t.nav.contact}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-3">{t.footer.info}</h2>
          <ul>
            <li><Link className={linkCls} to="/legal">{t.footer.legal}</Link></li>
            <li><a className={linkCls} href={`tel:${contact.phoneDisplay.replace(/\s/g, "")}`} dir="ltr">{contact.phoneDisplay}</a></li>
            {contact.email && <li><a className={linkCls} href={`mailto:${contact.email}`}>{contact.email}</a></li>}
            <li className="py-2 text-sm text-stone-warm">{tx(contact.address)}</li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-3">{t.footer.follow}</h2>
          <div className="flex gap-3">
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${social.instagramHandle}`} className={iconCls}>
              <Instagram size={18} aria-hidden="true" />
            </a>
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Facebook ${social.facebookName}`} className={iconCls}>
                <Facebook size={18} aria-hidden="true" />
              </a>
            )}
            <a href={buildWhatsAppUrl(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconCls}>
              <MessageCircle size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 py-5 text-center text-xs text-stone-warm">
        © {year} {brand.name} — {t.footer.rights}
      </div>
    </footer>
  );
}
