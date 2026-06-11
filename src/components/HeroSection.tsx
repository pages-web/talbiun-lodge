"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1729] via-[#1e3a5f] to-[#0f1729]">
        <div
          className="absolute inset-0 opacity-40 ken-burns"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1729]/70 via-transparent to-[#0f1729]/90" />
        
        {/* Natural vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 41, 0.4) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.3em] text-[#3b82f6] uppercase mb-6"
        >
          {t("subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-serif text-white leading-tight mb-6 drop-shadow-lg"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-slate-200 mb-10 drop-shadow-md"
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
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#3b82f6] to-[#1e3a5f] text-white text-sm tracking-[0.15em] uppercase rounded-lg hover:from-[#2563eb] hover:to-[#1e40af] transition-all shadow-lg shadow-blue-900/30 natural-shadow"
          >
            {t("cta")}
          </Link>
          <Link
            href="/about"
            className="inline-block px-10 py-4 border border-[#3b82f6]/50 text-[#3b82f6] text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#3b82f6]/10 transition-all backdrop-blur-sm"
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
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
