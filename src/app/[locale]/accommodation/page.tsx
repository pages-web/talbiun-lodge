"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Maximize, ArrowRight } from "lucide-react";

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

export default function AccommodationPage() {
  const t = useTranslations("accommodation");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-24 pb-24 bg-[#f7f4ef] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#7a5e12] uppercase mb-4 font-medium">
            {t("subtitle")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1f1a17] mb-4">
            {t("title")}
          </h1>
          <p className="text-[#6b5e52] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gers.map((ger, index) => (
            <motion.div
              key={ger.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#d8c9b3]/50 natural-shadow natural-shadow-hover transition-all"
            >
              <Link href={`/accommodation/${ger.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={ger.image}
                    alt={t(`${ger.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#1f1a17] px-4 py-2 rounded-lg font-bold shadow-md">
                    {t(`${ger.key}.price`)}
                    <span className="text-sm font-normal text-[#6b5e52]">/{t("price")}</span>
                  </div>
                </div>

                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-[#1f1a17] mb-2 group-hover:text-[#7a5e12] transition-colors">{t(`${ger.key}.name`)}</h3>
                  <p className="text-[#6b5e52] mb-4">{t(`${ger.key}.description`)}</p>

                  <div className="flex gap-4 mb-4 text-sm text-[#6b5e52]">
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
                        className="px-3 py-1 bg-[#efe9df] text-[#4a3f36] text-xs rounded-full border border-[#d8c9b3]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6">
                <Link
                  href={`/accommodation/${ger.id}`}
                  className="flex items-center justify-center gap-2 w-full text-center py-3 bg-[#7a5e12] text-white rounded-lg hover:bg-[#5a450e] transition-all font-medium"
                >
                  {t("bookNow")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
