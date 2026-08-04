"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { CP_MENUS } from "@/graphql/cms/queries/menu";
import type { CpMenusData, CpMenusVariables } from "@/graphql/cms/queries/menu";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const { data } = useQuery<CpMenusData, CpMenusVariables>(CP_MENUS, {
    variables: { language: locale, kind: "footer", webId: process.env.NEXT_PUBLIC_ERXES_WEB_ID },
    fetchPolicy: "cache-and-network",
  });

  const navItems = (data?.cpMenus?.length
    ? data.cpMenus
        .filter((item) => item.kind !== "main")
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({ label: item.label || t("nav.about"), href: item.url || "/" }))
    : [
        { label: t("nav.about"), href: "/about" },
        { label: t("nav.accommodation"), href: "/accommodation" },
        { label: t("nav.experiences"), href: "/experiences" },
        { label: t("nav.contact"), href: "/contact" },
      ]);

  return (
    <footer className="bg-[var(--dark-background)] border-t border-[rgba(255,255,255,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2663EB] to-[#1E4CC1] rounded-sm transform rotate-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wide text-[var(--color-foreground)]">Talbiun</span>
                <span className="block text-[10px] tracking-[0.3em] text-[var(--color-accent)] uppercase">Lodge</span>
              </div>
            </div>
            <p className="text-muted leading-relaxed max-w-sm mb-8">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/talbiunlodge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-white/10 flex items-center justify-center hover:border-[#2663EB] hover:bg-[#2663EB]/10 transition-all"
              >
                <Facebook size={18} className="social-icon-brown" />
              </a>
              <a
                href="https://instagram.com/talbiunlodge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border border-white/10 flex items-center justify-center hover:border-[#2663EB] hover:bg-[#2663EB]/10 transition-all"
              >
                <Instagram size={18} className="social-icon-brown" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.25em] text-[var(--color-accent)] uppercase mb-6">
              {t("explore")}
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-[var(--color-foreground)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold tracking-[0.25em] text-[var(--color-accent)] uppercase mb-6">
              {t("contact")}
            </h4>
            <ul className="space-y-3 text-muted">
              <li>{t("phone")}</li>
              <li>{t("email")}</li>
              <li className="leading-relaxed">{t("address")}</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.25em] text-[var(--color-accent)] uppercase mb-6">
              {t("hours")}
            </h4>
            <p className="text-muted leading-relaxed">
              {t("season")}
            </p>
          </div>
        </div>

        <div className="py-8 border-t border-[rgba(255,255,255,0.03)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {year} Talbiun Lodge. {t("rights")}.
          </p>
          <Link href="/" className="text-xs text-muted hover:text-[var(--color-accent)] transition-colors">
            {t("backToTop")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
