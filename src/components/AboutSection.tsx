"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("about");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const stats = [
    { number: "10+", label: t("stats.experience") },
    { number: "50+", label: t("stats.guests") },
    { number: "6", label: t("stats.gers") },
  ];

  return (
    <section id="about" ref={ref} className="h-full min-h-full snap-start flex items-center justify-center bg-[#f7f4ef] py-6 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.35em] text-[#7a5e12] uppercase mb-3 font-medium">
              {t("label")}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#1f1a17] leading-[1.1] mb-4">
              {t("title")}
            </h2>

            <div className="space-y-2 mb-4">
              <p className="text-[#4a3f36] leading-[1.5] text-sm">
                {t("description")}
              </p>
              <p className="text-[#6b5e52] leading-[1.5] text-sm">
                {t("extra")}
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center text-xs tracking-[0.1em] uppercase text-[#7a5e12] hover:text-[#5a450e] transition-colors font-semibold group"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="grid grid-cols-3 gap-6 mt-6 pt-4 border-t border-[#d8c9b3]">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-serif text-[#1f1a17] mb-1">{stat.number}</div>
                  <div className="text-xs tracking-[0.12em] uppercase text-[#6b5e52]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden natural-shadow">
                <img
                  src="/images/about-ger.jpg"
                  alt="Traditional Mongolian Ger"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
