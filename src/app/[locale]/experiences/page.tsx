"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const experiences = [
  { key: "horseback", image: "/images/horseback.jpg" },
  { key: "games", image: "/images/ger-interior.jpg" },
  { key: "dinner", image: "/images/ger-meal.jpg" },
  { key: "tea", image: "/images/about-ger.jpg" },
  { key: "stargazing", image: "/images/hero-bg.jpg" },
  { key: "walks", image: "/images/ger-family.jpg" },
];

export default function ExperiencesPage() {
  const t = useTranslations("services");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-24 pb-24 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#8b6914] uppercase mb-4 font-medium">
            {t("label")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2c2420] mb-4">
            {t("title")}
          </h1>
          <p className="text-[#8a7a6a] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e8dcc8]/50 natural-shadow natural-shadow-hover transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exp.image}
                  alt={t(`experiences.${exp.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2420]/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2c2420] mb-2">
                  {t(`experiences.${exp.key}.title`)}
                </h3>
                <p className="text-[#8a7a6a]">
                  {t(`experiences.${exp.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
