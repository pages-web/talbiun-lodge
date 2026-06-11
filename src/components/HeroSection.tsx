"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 ken-burns"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/40 via-transparent to-[#faf8f5]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/30 via-transparent to-[#faf8f5]/30" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] text-[#8b6914] uppercase mb-6 font-medium"
        >
          {t("subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif text-[#2c2420] leading-tight mb-6 text-shadow-hero"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-[#5c4d42] mb-10 max-w-2xl mx-auto"
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
            className="inline-block px-10 py-4 bg-[#8b6914] text-white text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#6b5010] transition-all shadow-lg natural-shadow"
          >
            {t("cta")}
          </Link>
          <Link
            href="/about"
            className="inline-block px-10 py-4 border-2 border-[#8b6914] text-[#8b6914] text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#8b6914]/10 transition-all backdrop-blur-sm"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-[#8b6914]/60" />
      </motion.div>
    </section>
  );
}
