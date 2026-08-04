"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client/react";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import type { CpPostsData, CpPostsVariables } from "@/graphql/cms/queries/post";
import { resolveErxesMediaUrl } from "@/lib/erxes/config";

const experiences = [
  { key: "horseback", image: "/images/horseback.jpg" },
  { key: "games", image: "/images/games.jpg" },
  { key: "dinner", image: "/images/ger-meal.jpg" },
  { key: "tea", image: "/images/food.jpg" },
  { key: "stargazing", image: "/images/stargazing.jpg" },
  { key: "walks", image: "/images/landscape.jpg" },
];

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const { data } = useQuery<CpPostsData, CpPostsVariables>(CP_POSTS, {
    variables: { language: locale, type: "experience", limit: 6, status: "published" },
    fetchPolicy: "cache-and-network",
  });

  const posts = data?.cpPosts ?? [];

  return (
    <section ref={ref} className="py-28 lg:py-36 section-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] text-[#2663EB] uppercase mb-5 font-medium"
          >
            {t("label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.length > 0 ? posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 natural-shadow">
                <img
                  src={resolveErxesMediaUrl(post.thumbnail?.url) || experiences[index % experiences.length].image}
                  alt={post.title || t("title")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 image-dark-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <div className="text-xs tracking-[0.2em] uppercase text-[#2663EB] font-medium">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title || t(`experiences.${experiences[index % experiences.length].key}.title`)}
                </h3>
                <p className="text-muted leading-relaxed">
                  {post.excerpt || t(`experiences.${experiences[index % experiences.length].key}.description`)}
                </p>
              </div>
            </motion.div>
          )) : experiences.map((exp, index) => (
            <motion.div
              key={exp.key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6 natural-shadow">
                <img
                  src={exp.image}
                  alt={t(`experiences.${exp.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 image-dark-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <div className="text-xs tracking-[0.2em] uppercase text-[#2663EB] font-medium">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                  {t(`experiences.${exp.key}.title`)}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t(`experiences.${exp.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

