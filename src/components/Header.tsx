"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, ChevronDown, Facebook, Instagram } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-[#0f1729]/95 backdrop-blur-md border-b border-[#1e3a5f]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#1e3a5f] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide text-white">
                Talbiun
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#3b82f6] uppercase">
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
                    ? "text-[#3b82f6] font-medium"
                    : "text-slate-300 hover:text-white"
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
              <button className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors">
                <span>EN</span>
                <ChevronDown size={14} />
              </button>
              
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 py-1 bg-[#1e3a5f] border border-[#2d5a7b] rounded-md shadow-lg min-w-[80px]">
                  <Link 
                    href={pathname} 
                    locale="en"
                    className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2d5a7b] transition-colors"
                  >
                    English
                  </Link>
                  <Link 
                    href={pathname} 
                    locale="mn"
                    className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#2d5a7b] transition-colors"
                  >
                    Монгол
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/accommodation"
              className="px-6 py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:from-[#2563eb] hover:to-[#1e40af] transition-all shadow-lg shadow-blue-900/20"
            >
              {t("bookNow")}
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0f1729] border-t border-[#1e3a5f]/30">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 border-t border-[#1e3a5f]/30">
              <Link href={pathname} locale="en" className="text-sm text-slate-400">EN</Link>
              <Link href={pathname} locale="mn" className="text-sm text-slate-400">MN</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
