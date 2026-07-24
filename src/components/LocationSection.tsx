"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LocationSection() {
  const t = useTranslations("location");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-12 bg-[#3D2314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase">
              {t("label")}
            </p>
            <h3 className="text-2xl md:text-3xl font-serif text-[#F5F0E8]">
              {t("title")}
            </h3>
            <p className="text-[#F5F0E8]/70 leading-relaxed text-sm">
              {t("description")}
            </p>
            <p className="text-sm text-[#C9A84C]">
              {t("address")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-[16/10] rounded-lg overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/landscape.jpg')` }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
