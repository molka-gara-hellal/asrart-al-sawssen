import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useI18n } from "@/i18n";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

function Row({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 border-b border-blush-200 py-5">
      <Icon size={22} strokeWidth={1.4} className="mt-0.5 shrink-0 text-rosegold-dark" aria-hidden="true" />
      <div>
        <p className="eyebrow mb-1">{label}</p>
        {children}
      </div>
    </li>
  );
}

export default function Contact() {
  const { t, tx } = useI18n();
  usePageMeta(t.meta.contactTitle, t.contact.subtitle);
  const { contact, social } = siteConfig;
  const linkCls = "inline-flex min-h-[44px] items-center text-lg underline-offset-4 hover:underline";

  return (
    <div className="container-x grid gap-12 py-12 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-24">
      <div>
        <p className="eyebrow mb-3">{t.contact.subtitle}</p>
        <h1 className="font-serif text-5xl sm:text-6xl">{t.contact.title}</h1>
        <p className="mt-6 max-w-md text-stone-warm">{siteConfig.brand.name} — {siteConfig.brand.designer}</p>
        <WhatsAppButton label={t.contact.whatsappCta} href={buildWhatsAppUrl(t.contact.whatsappGreeting)} className="mt-8" />
      </div>

      <ul className="border-t border-blush-200">
        <Row icon={MessageCircle} label={t.contact.whatsapp}>
          <a className={linkCls} dir="ltr" href={buildWhatsAppUrl(t.contact.whatsappGreeting)} target="_blank" rel="noopener noreferrer">
            {contact.phoneDisplay}
          </a>
        </Row>
        <Row icon={Phone} label={t.contact.phone}>
          <a className={linkCls} dir="ltr" href={`tel:${contact.phoneDisplay.replace(/\s/g, "")}`}>
            {contact.phoneDisplay}
          </a>
        </Row>
        <Row icon={Instagram} label={t.contact.instagram}>
          <a className={linkCls} dir="ltr" href={social.instagram} target="_blank" rel="noopener noreferrer">
            {social.instagramHandle}
          </a>
        </Row>
        {social.facebook && (
          <Row icon={Facebook} label={t.contact.facebook}>
            <a className={linkCls} href={social.facebook} target="_blank" rel="noopener noreferrer">
              {social.facebookName}
            </a>
          </Row>
        )}
        {contact.email && (
          <Row icon={Mail} label={t.contact.email}>
            <a className={linkCls} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </Row>
        )}
        <Row icon={MapPin} label={t.contact.address}>
          <p className="py-1 text-lg">{tx(contact.address)}</p>
        </Row>
      </ul>
    </div>
  );
}
