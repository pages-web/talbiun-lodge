"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("about");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] text-[#8b6914] uppercase mb-4 font-medium"
          >
            {t("label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-[#2c2420]"
          >
            {t("title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl natural-shadow"
          >
            <img
              src="/images/about-ger.jpg"
              alt="Traditional Mongolian Ger"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c2420]/20 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-[#5c4d42] leading-relaxed text-lg">
              {t("description")}
            </p>
            <p className="text-[#8a7a6a] leading-relaxed">
              Our lodge is built on the principles of sustainable tourism and cultural preservation. 
              We work closely with local nomadic families to offer authentic experiences that 
              benefit the community while providing our guests with unforgettable memories.
            </p>
            <a
              href="/about"
              className="inline-flex items-center text-sm text-[#8b6914] hover:text-[#6b5010] transition-colors font-medium"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "10+", label: "Years Experience" },
            { number: "50+", label: "Happy Guests" },
            { number: "6", label: "Traditional Gers" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center p-8 bg-white rounded-2xl border border-[#e8dcc8]/50 natural-shadow natural-shadow-hover transition-all"
            >
              <div className="text-4xl font-bold text-[#8b6914] mb-2">{stat.number}</div>
              <div className="text-[#8a7a6a]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
