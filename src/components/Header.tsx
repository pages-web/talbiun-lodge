"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("accommodation"), href: "/accommodation" },
    { label: t("experiences"), href: "/experiences" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8dcc8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b6914] to-[#6b5010] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide text-[#2c2420]">
                Talbiun
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#8b6914] uppercase">
                Lodge
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-[#8b6914] font-medium"
                    : "text-[#5c4d42] hover:text-[#2c2420]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div 
              className="relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-[#5c4d42] hover:text-[#2c2420] transition-colors">
                <span>EN</span>
                <ChevronDown size={14} />
              </button>
              
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 py-1 bg-white border border-[#e8dcc8] rounded-md shadow-lg min-w-[80px]">
                  <Link 
                    href={pathname} 
                    locale="en"
                    className="block px-4 py-2 text-sm text-[#5c4d42] hover:text-[#2c2420] hover:bg-[#faf8f5] transition-colors"
                  >
                    English
                  </Link>
                  <Link 
                    href={pathname} 
                    locale="mn"
                    className="block px-4 py-2 text-sm text-[#5c4d42] hover:text-[#2c2420] hover:bg-[#faf8f5] transition-colors"
                  >
                    Монгол
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/accommodation"
              className="px-6 py-2.5 bg-[#8b6914] text-white text-sm font-medium rounded-lg hover:bg-[#6b5010] transition-all shadow-md"
            >
              {t("bookNow")}
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-[#2c2420]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e8dcc8]/50">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#5c4d42] hover:text-[#2c2420] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-[#e8dcc8]/50">
              <Link href={pathname} locale="en" className="text-sm text-[#8b6914]">EN</Link>
              <Link href={pathname} locale="mn" className="text-sm text-[#8b6914]">MN</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
