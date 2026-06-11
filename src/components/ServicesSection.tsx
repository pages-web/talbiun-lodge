"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const experiences = [
  { key: "horseback", image: "/images/horseback.jpg" },
  { key: "games", image: "/images/ger-interior.jpg" },
  { key: "dinner", image: "/images/ger-exterior.jpg" },
  { key: "tea", image: "/images/about-group.jpg" },
  { key: "stargazing", image: "/images/hero-bg.jpg" },
  { key: "walks", image: "/images/horseback.jpg" },
];

export default function ServicesSection() {
  const t = useTranslations("services");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-[#0f1729]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] text-[#3b82f6] uppercase mb-4"
          >
            {t("label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-[#1e3a5f]/20 rounded-xl overflow-hidden border border-[#2d5a7b]/30 hover:border-[#3b82f6]/50 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exp.image}
                  alt={t(`experiences.${exp.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(`experiences.${exp.key}.title`)}
                </h3>
                <p className="text-sm text-slate-400">
                  {t(`experiences.${exp.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
