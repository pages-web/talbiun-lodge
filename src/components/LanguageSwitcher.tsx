"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  en: "EN",
  mn: "МН",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const locales = ["en", "mn"];

  return (
    <div className="flex gap-2 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          className={`px-2 py-1 transition-colors ${
            l === locale
              ? "font-bold text-[#3D2314]"
              : "text-[#3D2314]/50 hover:text-[#3D2314]"
          }`}
        >
          {LABELS[l] ?? l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
