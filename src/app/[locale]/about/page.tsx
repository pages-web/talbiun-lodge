"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutPage() {
  const t = useTranslations("about");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="pt-24 pb-24 bg-[#f7f4ef] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#7a5e12] uppercase mb-4 font-medium">
            {t("label")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-[#1f1a17] mb-4"
          >
            {t("title")}
          </motion.h1>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden natural-shadow"
          >
            <img
              src="/images/about-ger.jpg"
              alt="Traditional Mongolian Ger"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a17]/20 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none text-[#4a3f36]"
          >
            <p className="text-xl leading-relaxed mb-8">
              {t("description")}
            </p>
            <p className="mb-6">
              Our lodge is built on the principles of sustainable tourism and cultural preservation. 
              We work closely with local nomadic families to offer authentic experiences that 
              benefit the community while providing our guests with unforgettable memories.
            </p>
            <p className="mb-6">
              Each ger in our camp is handcrafted using traditional techniques passed down through 
              generations. The felt, wood, and canvas are all locally sourced, ensuring that your 
              stay supports the local economy and preserves Mongolian craftsmanship.
            </p>
            <p>
              Whether you are seeking adventure, tranquility, or cultural immersion, Talbiun Lodge 
              offers a unique gateway to the heart of Mongolia.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
