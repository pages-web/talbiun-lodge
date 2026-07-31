"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const experiences = [
  { key: "horseback", image: "/images/horseback.jpg" },
  { key: "games", image: "/images/games.jpg" },
  { key: "dinner", image: "/images/ger-meal.jpg" },
  { key: "tea", image: "/images/food.jpg" },
  { key: "stargazing", image: "/images/stargazing.jpg" },
  { key: "walks", image: "/images/landscape.jpg" },
];

export default function ServicesSection() {
  const t = useTranslations("services");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-28 lg:py-36 bg-[#f7f4ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] text-[#2663EB] uppercase mb-5 font-medium"
          >
            {t("label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1f1a17] leading-[1.1] mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#6b5e52] leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6 natural-shadow">
                <img
                  src={exp.image}
                  alt={t(`experiences.${exp.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a17]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <div className="text-xs tracking-[0.2em] uppercase text-[#c9a86c] font-medium">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-[#1f1a17] group-hover:text-[#2663EB] transition-colors">
                  {t(`experiences.${exp.key}.title`)}
                </h3>
                <p className="text-[#6b5e52] leading-relaxed">
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

