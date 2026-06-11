"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Maximize, ArrowRight } from "lucide-react";

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
    <div className="pt-24 pb-24 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#8b6914] uppercase mb-4 font-medium">
            {t("subtitle")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#2c2420] mb-4">
            {t("title")}
          </h1>
          <p className="text-[#8a7a6a] max-w-2xl mx-auto">
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
              className="group bg-white rounded-2xl overflow-hidden border border-[#e8dcc8]/50 natural-shadow natural-shadow-hover transition-all"
            >
              <Link href={`/accommodation/${ger.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={ger.image}
                    alt={t(`${ger.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#2c2420] px-4 py-2 rounded-lg font-bold shadow-md">
                    {t(`${ger.key}.price`)}
                    <span className="text-sm font-normal text-[#8a7a6a]">/{t("price")}</span>
                  </div>
                </div>

                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-[#2c2420] mb-2 group-hover:text-[#8b6914] transition-colors">{t(`${ger.key}.name`)}</h3>
                  <p className="text-[#8a7a6a] mb-4">{t(`${ger.key}.description`)}</p>

                  <div className="flex gap-4 mb-4 text-sm text-[#8a7a6a]">
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
                        className="px-3 py-1 bg-[#f5f0e8] text-[#5c4d42] text-xs rounded-full border border-[#e8dcc8]"
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
                  className="flex items-center justify-center gap-2 w-full text-center py-3 bg-[#8b6914] text-white rounded-lg hover:bg-[#6b5010] transition-all font-medium"
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
