"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useLocalAuth } from "@/lib/auth/LocalAuthContext";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useLocalAuth();

  const isHome = pathname === "/" || pathname === "/mn";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("accommodation"), href: "/accommodation" },
    { label: t("experiences"), href: "/experiences" },
    { label: t("contact"), href: "/contact" },
  ];

  const headerBg = isTransparent
    ? "bg-transparent"
    : "bg-[#f7f4ef]/95 backdrop-blur-md border-b border-[#d8c9b3]/50";

  const logoText = isTransparent ? "text-white" : "text-[#1f1a17]";
  const logoSub = isTransparent ? "text-[#c9a86c]" : "text-[#2663EB]";
  const mutedText = isTransparent
    ? "text-white/80 hover:text-white"
    : "text-[#4a3f36] hover:text-[#1f1a17]";
  const activeText = isTransparent ? "text-[#c9a86c]" : "text-[#2663EB]";
  const iconColor = isTransparent ? "text-white" : "text-[#1f1a17]";

  return (
    <header
      className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a86c] to-[#2663EB] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-wide transition-colors ${logoText}`}>
                Talbiun
              </span>
              <span className={`text-[10px] tracking-[0.3em] uppercase transition-colors ${logoSub}`}>
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
                    ? `${activeText} font-medium`
                    : mutedText
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
              <button className={`flex items-center gap-1 text-sm transition-colors ${mutedText}`}>
                <span>EN</span>
                <ChevronDown size={14} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-1 py-1 bg-white border border-[#d8c9b3] rounded-md shadow-lg min-w-[80px]">
                  <Link
                    href={pathname}
                    locale="en"
                    className="block px-4 py-2 text-sm text-[#4a3f36] hover:text-[#1f1a17] hover:bg-[#f7f4ef] transition-colors"
                  >
                    English
                  </Link>
                  <Link
                    href={pathname}
                    locale="mn"
                    className="block px-4 py-2 text-sm text-[#4a3f36] hover:text-[#1f1a17] hover:bg-[#f7f4ef] transition-colors"
                  >
                    Монгол
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/accommodation"
              className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all shadow-md ${
                isTransparent
                  ? "bg-[#c9a86c] text-[#1f1a17] hover:bg-[#b89a60]"
                  : "bg-[#2663EB] text-white hover:bg-[#1E4CC1]"
              }`}
            >
              {t("bookNow")}
            </Link>

            {user ? (
              <Link
                href="/profile"
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${mutedText}`}
              >
                <User size={16} />
                {t("myProfile")}
              </Link>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isTransparent
                    ? "border border-white/60 text-white hover:bg-white/10"
                    : "border border-[#2663EB] text-[#2663EB] hover:bg-[#2663EB] hover:text-white"
                }`}
              >
                <User size={16} />
                {t("signIn")}
              </Link>
            )}
          </nav>

          <button
            className={`md:hidden p-2 transition-colors ${iconColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#d8c9b3]/50">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#4a3f36] hover:text-[#1f1a17] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#d8c9b3]/50 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-[#2663EB] font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User size={16} />
                    {t("myProfile")}
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 text-[#4a3f36] hover:text-[#1f1a17]"
                  >
                    <LogOut size={16} />
                    {t("logout")}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-[#2663EB] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={16} />
                  {t("signIn")}
                </Link>
              )}
            </div>
            <div className="flex gap-4 pt-2 border-t border-[#d8c9b3]/50">
              <Link href={pathname} locale="en" className="text-sm text-[#2663EB]">EN</Link>
              <Link href={pathname} locale="mn" className="text-sm text-[#2663EB]">MN</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

