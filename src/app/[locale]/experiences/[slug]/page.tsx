import { notFound } from "next/navigation";
import ExperienceDetailClient from "./ExperienceDetailClient";

const validSlugs = [
  "khorkhog",
  "mongolian-ger",
  "horseback-tradition",
  "nomadic-games",
  "tea-ceremony",
  "stargazing-steppe",
];

export function generateStaticParams() {
  return validSlugs.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "mn", slug },
  ]);
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <ExperienceDetailClient slug={slug} locale={locale} />;
}
