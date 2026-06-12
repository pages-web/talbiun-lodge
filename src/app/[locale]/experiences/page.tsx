"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    slug: "khorkhog",
    key: "khorkhog",
    image: "/images/ger-meal.jpg",
    date: "2025-05-15",
  },
  {
    slug: "mongolian-ger",
    key: "ger",
    image: "/images/about-ger.jpg",
    date: "2025-04-22",
  },
  {
    slug: "horseback-tradition",
    key: "horseback",
    image: "/images/horseback.jpg",
    date: "2025-03-10",
  },
  {
    slug: "nomadic-games",
    key: "games",
    image: "/images/games.jpg",
    date: "2025-02-28",
  },
  {
    slug: "tea-ceremony",
    key: "tea",
    image: "/images/food.jpg",
    date: "2025-01-18",
  },
  {
    slug: "stargazing-steppe",
    key: "stargazing",
    image: "/images/stargazing.jpg",
    date: "2024-12-05",
  },
];

export default function ExperiencesPage() {
  const t = useTranslations("experiences");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const formatDate = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pt-28 pb-28 bg-[#f7f4ef] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs tracking-[0.35em] text-[#7a5e12] uppercase mb-5 font-medium">
            {t("label")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1f1a17] leading-[1.1] mb-6">
            {t("title")}
          </h1>
          <p className="text-[#6b5e52] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={`/experiences/${article.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6 natural-shadow">
                  <img
                    src={article.image}
                    alt={t(`articles.${article.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f1a17]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="flex items-center gap-2 text-xs text-[#6b5e52] mb-3">
                  <Calendar size={14} />
                  <span>{formatDate(article.date, t("locale") || "en")}</span>
                </div>

                <h3 className="text-xl font-bold text-[#1f1a17] mb-3 group-hover:text-[#7a5e12] transition-colors">
                  {t(`articles.${article.key}.title`)}
                </h3>

                <p className="text-[#6b5e52] leading-relaxed mb-4 line-clamp-3">
                  {t(`articles.${article.key}.excerpt`)}
                </p>

                <span className="inline-flex items-center text-sm font-semibold text-[#7a5e12] group-hover:text-[#5a450e] transition-colors">
                  {t("readMore")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
