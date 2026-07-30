"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  const scrollToAbout = () => {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen snap-start flex flex-col items-center justify-center pt-16 pb-16 overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Talbiun Lodge Mongolian steppe"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center ken-burns"
          loading="eager"
          decoding="async"
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-12 pb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.35em] text-[#c9a86c] uppercase mb-4 font-medium"
        >
          {t("subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.05] mb-6 text-shadow-hero"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg text-white/85 mb-8 max-w-2xl mx-auto font-light tracking-wide"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/accommodation"
            className="inline-block px-8 py-3 bg-[#c9a86c] text-[#1f1a17] text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#b89a60] transition-all shadow-lg font-semibold"
          >
            {t("cta")}
          </Link>
          <Link
            href="/about"
            className="inline-block px-8 py-3 border-2 border-white/60 text-white text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            {t("learnMore")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-white" />
      </motion.button>
    </section>
  );
}
