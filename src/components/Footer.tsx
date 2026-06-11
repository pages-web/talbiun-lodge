"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2c2420] border-t border-[#e8dcc8]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b6914] to-[#6b5010] rounded-md transform rotate-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-wide text-white">Talbiun</span>
                <span className="block text-[8px] tracking-[0.3em] text-[#8b6914] uppercase">Lodge</span>
              </div>
            </div>
            <p className="text-sm text-[#a09080] leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#8b6914] uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {["about", "accommodation", "experiences", "contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item}`}
                    className="text-sm text-[#a09080] hover:text-white transition-colors capitalize"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#8b6914] uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-[#a09080]">
              <li>+976 9911 2233</li>
              <li>Orkhon Valley, Mongolia</li>
              <li>info@talbiun.mn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#8b6914] uppercase mb-4">
              {t("followUs")}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/talbiunlodge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3a3028] rounded-lg flex items-center justify-center hover:bg-[#8b6914]/30 transition-colors"
              >
                <Facebook size={18} className="text-[#8b6914]" />
              </a>
              <a
                href="https://instagram.com/talbiunlodge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3a3028] rounded-lg flex items-center justify-center hover:bg-[#8b6914]/30 transition-colors"
              >
                <Instagram size={18} className="text-[#8b6914]" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#e8dcc8]/10 text-center">
          <p className="text-xs text-[#8a7a6a]">
            &copy; {year} Talbiun Lodge. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
