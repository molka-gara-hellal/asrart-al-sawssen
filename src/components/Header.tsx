import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/useCart";
import { useI18n } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

function AnnouncementBar() {
  const { tx } = useI18n();
  if (!siteConfig.announcement.enabled) return null;
  return (
    <div className="bg-ink px-4 py-2 text-center text-xs tracking-wide text-blush-50 sm:text-[13px]">
      {tx(siteConfig.announcement.text)}
    </div>
  );
}

export function Header() {
  const { t } = useI18n();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/collections", label: t.nav.collections, end: false },
    { to: "/about", label: t.nav.about, end: true },
    { to: "/contact", label: t.nav.contact, end: true },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex min-h-[44px] items-center border-b border-transparent text-sm tracking-wide transition-colors hover:border-ink ${isActive ? "border-rosegold-dark font-medium" : ""}`;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-white px-4 py-3 text-sm focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t.nav.skipToContent}
      </a>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-blush-200 bg-blush-100/95 backdrop-blur">
        <div className="container-x flex h-[72px] items-center justify-between gap-4 sm:h-[84px]">
          <Link to="/" aria-label={`${siteConfig.brand.name} — ${t.nav.home}`} className="shrink-0">
            <img
              src="/assets/brand/logo-mark.png"
              alt={siteConfig.brand.name}
              width={370}
              height={330}
              className="h-14 w-auto mix-blend-multiply sm:h-16"
            />
          </Link>

          <nav aria-label={t.nav.mainNav} className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <LanguageSwitcher />
            <Link to="/bag" aria-label={`${t.nav.bag} (${count})`} className="relative flex h-11 w-11 items-center justify-center hover:text-rosegold-dark">
              <ShoppingBag size={22} strokeWidth={1.5} aria-hidden="true" />
              {count > 0 && (
                <span
                  key={count}
                  className="absolute end-0.5 top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rosegold-dark px-1 text-[11px] font-medium text-white motion-safe:animate-pop"
                >
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={24} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label={t.nav.mainNav} className="border-t border-blush-200 bg-blush-100 md:hidden">
            <ul className="container-x flex flex-col py-3">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={({ isActive }) => `flex min-h-[52px] items-center font-serif text-2xl ${isActive ? "text-rosegold-dark" : ""}`}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
