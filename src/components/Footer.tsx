"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const navItems = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.accommodation"), href: "/accommodation" },
    { label: t("nav.experiences"), href: "/experiences" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[#181412] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a86c] to-[#7a5e12] rounded-sm transform rotate-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wide text-white">Talbiun</span>
                <span className="block text-[10px] tracking-[0.3em] text-[#c9a86c] uppercase">Lodge</span>
              </div>
            </div>
            <p className="text-[#a09080] leading-relaxed max-w-sm mb-8">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/talbiunlodge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-white/10 flex items-center justify-center hover:border-[#c9a86c] hover:bg-[#c9a86c]/10 transition-all"
              >
                <Facebook size={18} className="text-[#c9a86c]" />
              </a>
              <a
                href="https://instagram.com/talbiunlodge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-white/10 flex items-center justify-center hover:border-[#c9a86c] hover:bg-[#c9a86c]/10 transition-all"
              >
                <Instagram size={18} className="text-[#c9a86c]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.25em] text-[#c9a86c] uppercase mb-6">
              {t("explore")}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#a09080] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.25em] text-[#c9a86c] uppercase mb-6">
              {t("contact")}
            </h4>
            <ul className="space-y-3 text-[#a09080]">
              <li>{t("phone")}</li>
              <li>{t("email")}</li>
              <li className="leading-relaxed">{t("address")}</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.25em] text-[#c9a86c] uppercase mb-6">
              {t("hours")}
            </h4>
            <p className="text-[#a09080] leading-relaxed">
              {t("season")}
            </p>
          </div>
        </div>

        <div className="py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6b5e52]">
            &copy; {year} Talbiun Lodge. {t("rights")}.
          </p>
          <Link href="/" className="text-xs text-[#6b5e52] hover:text-[#c9a86c] transition-colors">
            {t("backToTop")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
