"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Bath, Maximize, Check } from "lucide-react";

const gers = [
  {
    id: "deluxe",
    key: "ger1",
    image: "/images/ger-exterior.jpg",
    amenities: ["King Bed", "Private Bathroom", "Heating", "Steppe View"],
    capacity: "2 guests",
    size: "35 m²",
  },
  {
    id: "family",
    key: "ger2",
    image: "/images/ger-interior.jpg",
    amenities: ["Two Queen Beds", "Ensuite Bathroom", "Heating", "Family Space"],
    capacity: "4 guests",
    size: "45 m²",
  },
  {
    id: "standard",
    key: "ger3",
    image: "/images/ger-exterior.jpg",
    amenities: ["Double Bed", "Shared Bathroom", "Heating", "Traditional Decor"],
    capacity: "2 guests",
    size: "25 m²",
  },
];

export default function AccommodationSection() {
  const t = useTranslations("accommodation");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] text-[#3b82f6] uppercase mb-4"
          >
            {t("subtitle")}
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
            className="text-slate-400 max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gers.map((ger, index) => (
            <motion.div
              key={ger.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-[#1e3a5f]/20 rounded-xl overflow-hidden border border-[#2d5a7b]/30 hover:border-[#3b82f6]/50 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={ger.image}
                  alt={t(`${ger.key}.name`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-bold">
                  {t(`${ger.key}.price`)}
                  <span className="text-sm font-normal">/{t("price")}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{t(`${ger.key}.name`)}</h3>
                <p className="text-slate-400 mb-4">{t(`${ger.key}.description`)}</p>

                <div className="flex gap-4 mb-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{ger.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize size={16} />
                    <span>{ger.size}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {ger.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-[#2d5a7b]/30 text-slate-300 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/accommodation/${ger.id}`}
                  className="block w-full text-center py-3 bg-gradient-to-r from-[#3b82f6] to-[#1e3a5f] text-white rounded-lg hover:from-[#2563eb] hover:to-[#1e40af] transition-all"
                >
                  {t("bookNow")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
