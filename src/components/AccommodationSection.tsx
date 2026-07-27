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
    <section ref={ref} className="py-12 lg:py-20 bg-[#efe9df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.35em] text-[#7a5e12] uppercase mb-3 font-medium"
            >
              {t("subtitle")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#1f1a17] leading-[1.1] mb-3"
            >
              {t("title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#6b5e52] leading-relaxed text-xs"
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
              className="inline-flex items-center text-xs tracking-[0.1em] uppercase text-[#7a5e12] hover:text-[#5a450e] transition-colors font-semibold group"
            >
              {t("viewAll") || "View All Gers"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gers.map((ger, index) => (
            <motion.div
              key={ger.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group bg-[#f7f4ef] natural-shadow natural-shadow-hover transition-all"
            >
              <Link href={`/accommodation/${ger.id}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={ger.image}
                    alt={t(`${ger.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#1f1a17] px-2.5 py-1 font-serif text-sm">
                    {t(`${ger.key}.price`)}
                    <span className="text-xs font-sans font-normal text-[#6b5e52] ml-1">/{t("price")}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-[#1f1a17] group-hover:text-[#7a5e12] transition-colors">
                      {t(`${ger.key}.name`)}
                    </h3>
                    <span className="text-[10px] text-[#6b5e52]">{ger.size}</span>
                  </div>

                  <p className="text-[#6b5e52] mb-3 leading-relaxed text-xs line-clamp-2">{t(`${ger.key}.description`)}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ger.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-0.5 bg-white text-[#4a3f36] text-[9px] tracking-wide"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-xs font-semibold text-[#7a5e12] group-hover:text-[#5a450e] transition-colors">
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
