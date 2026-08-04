"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { CP_POSTS } from "@/graphql/cms/queries/post";
import type { CpPostsData, CpPostsVariables } from "@/graphql/cms/queries/post";
import { resolveErxesMediaUrl } from "@/lib/erxes/config";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const { data } = useQuery<CpPostsData, CpPostsVariables>(CP_POSTS, {
    variables: { language: locale, limit: 3, status: "published" },
    fetchPolicy: "cache-and-network",
  });

  const featuredPost = data?.cpPosts?.[0];
  const stats = [
    { number: "10+", label: t("stats.experience") },
    { number: "50+", label: t("stats.guests") },
    { number: "6", label: t("stats.gers") },
  ];

  return (
    <section id="about" ref={ref} className="py-28 lg:py-36 bg-[#f7f4ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <p className="text-xs tracking-[0.35em] text-[#2663EB] uppercase mb-5 font-medium">
              {t("label")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1f1a17] leading-[1.1] mb-8">
              {t("title")}
            </h2>

            <div className="space-y-5 mb-10">
              <p className="text-[#4a3f36] leading-[1.8] text-lg">
                {featuredPost?.excerpt || t("description")}
              </p>
              <p className="text-[#6b5e52] leading-[1.8]">
                {featuredPost?.content ? featuredPost.content.replace(/<[^>]+>/g, "").slice(0, 220) + (featuredPost.content.length > 220 ? "…" : "") : t("extra")}
              </p>
            </div>

            <Link 
              href="/about"
              className="inline-flex items-center text-sm tracking-[0.1em] uppercase text-[#2663EB] hover:text-[#1E4CC1] transition-colors font-semibold group"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#d8c9b3]">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-serif text-[#1f1a17] mb-1">{stat.number}</div>
                  <div className="text-xs tracking-[0.15em] uppercase text-[#6b5e52]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden natural-shadow">
                <img
                  src={resolveErxesMediaUrl(featuredPost?.thumbnail?.url) || "/images/about-ger.jpg"}
                  alt={featuredPost?.title || "Traditional Mongolian Ger"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

