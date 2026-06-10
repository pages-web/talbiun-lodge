"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2C1810] text-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-lg font-bold tracking-[0.2em] uppercase">
                Talbiun
              </span>
              <span className="block text-[10px] tracking-[0.4em] text-[#C9A84C]">
                Lodge
              </span>
            </div>
            <p className="text-sm text-[#F5F0E8]/70 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#C9A84C] uppercase mb-4">
              {t("explore")}
            </h4>
            <ul className="space-y-2">
              {["Accommodations", "Experiences", "About"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#C9A84C] uppercase mb-4">
              {t("contact")}
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F0E8]/70">
              <li>+976 9911 2233</li>
              <li>Orkhon Valley, Mongolia</li>
              <li>info@talbiun.mn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#C9A84C] uppercase mb-4">
              {t("practical")}
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F0E8]/70">
              <li>Orkhon Valley, Mongolia</li>
              <li>Season: June – September</li>
              <li>How to Get Here</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#F5F0E8]/10 text-center">
          <p className="text-xs text-[#F5F0E8]/50">
            &copy; {year} Talbiun Lodge. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
