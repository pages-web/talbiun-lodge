"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar } from "lucide-react";

const articleMeta: Record<
  string,
  { image: string; date: string }
> = {
  khorkhog: { image: "/images/ger-meal.jpg", date: "2025-05-15" },
  "mongolian-ger": { image: "/images/about-ger.jpg", date: "2025-04-22" },
  "horseback-tradition": { image: "/images/horseback.jpg", date: "2025-03-10" },
  "nomadic-games": { image: "/images/games.jpg", date: "2025-02-28" },
  "tea-ceremony": { image: "/images/food.jpg", date: "2025-01-18" },
  "stargazing-steppe": { image: "/images/stargazing.jpg", date: "2024-12-05" },
};

const keyBySlug: Record<string, string> = {
  khorkhog: "khorkhog",
  "mongolian-ger": "ger",
  "horseback-tradition": "horseback",
  "nomadic-games": "games",
  "tea-ceremony": "tea",
  "stargazing-steppe": "stargazing",
};

export default function ExperienceDetailClient({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const t = useTranslations("experiences");
  const meta = articleMeta[slug];
  const key = keyBySlug[slug];

  if (!meta || !key) return null;

  const paragraphs = t(`articles.${key}.content`).split("\n\n");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "mn" ? "mn-MN" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="pt-28 pb-28 bg-[#f7f4ef] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/experiences"
          className="inline-flex items-center text-sm text-[#7a5e12] hover:text-[#5a450e] transition-colors font-medium mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backToExperiences")}
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-[#6b5e52] mb-5">
            <Calendar size={16} />
            <span>{formatDate(meta.date)}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1f1a17] leading-[1.1] mb-6">
            {t(`articles.${key}.title`)}
          </h1>

          <p className="text-xl text-[#6b5e52] leading-relaxed">
            {t(`articles.${key}.excerpt`)}
          </p>
        </div>

        <div className="aspect-[16/9] overflow-hidden mb-12 natural-shadow">
          <img
            src={meta.image}
            alt={t(`articles.${key}.title`)}
            className="w-full h-full object-cover"
          />
        </div>

        <article className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#4a3f36] leading-[1.9] mb-6 text-lg"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </article>
      </div>
    </div>
  );
}
