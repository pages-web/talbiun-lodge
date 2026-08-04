"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

const gers = [
  {
    id: "deluxe",
    key: "deluxe",
    image: "/images/ger-exterior.jpg",
    amenities: ["King Bed", "Private Bathroom", "Heating", "Steppe View"],
    capacity: "2 guests",
    size: "35 m²",
  },
  {
    id: "family",
    key: "family",
    image: "/images/ger-interior.jpg",
    amenities: ["Two Queen Beds", "Ensuite Bathroom", "Heating", "Family Space"],
    capacity: "4 guests",
    size: "45 m²",
  },
  {
    id: "standard",
    key: "standard",
    image: "/images/ger-family.jpg",
    amenities: ["Double Bed", "Shared Bathroom", "Heating", "Traditional Decor"],
    capacity: "2 guests",
    size: "25 m²",
  },
];

export default function AccommodationSection() {
  const t = useTranslations("accommodation");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-28 lg:py-36 section-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.35em] text-[#2663EB] uppercase mb-5 font-medium"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-foreground)] leading-[1.1] mb-5"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/accommodation"
              className="inline-flex items-center text-sm tracking-[0.1em] uppercase text-[#2663EB] hover:text-[#1E4CC1] transition-colors font-semibold group"
            >
              {t("viewAll") || "View All Gers"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gers.map((ger, index) => (
            <motion.div
              key={ger.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group section-surface natural-shadow natural-shadow-hover transition-all"
            >
              <Link href={`/accommodation/${ger.id}`} className="block flex flex-col h-full">
                <div className="relative aspect-[16/5] overflow-hidden">
                  <img
                    src={ger.image}
                    alt={t(`${ger.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-5 right-5 bg-[var(--surface)]/95 backdrop-blur-sm text-[var(--color-foreground)] px-5 py-2.5 font-serif text-lg">
                    {t(`${ger.key}.price`)}
                    <span className="text-xs font-sans font-normal text-muted ml-1">/{t("price")}</span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors">
                      {t(`${ger.key}.name`)}
                    </h3>
                      <span className="text-xs text-muted">{ger.size}</span>
                  </div>

                    <p className="text-muted mb-5 leading-relaxed">{t(`${ger.key}.description`)}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {ger.amenities.map((amenity) => (
                      <span key={amenity} className="px-3 py-1 bg-[rgba(255,255,255,0.03)] text-muted text-xs tracking-wide rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-sm font-semibold text-[#2663EB] group-hover:text-[#1a4db3] transition-colors">
                    {t("bookNow")}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
