"use client";

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="pt-32 pb-24 bg-[#F5F0E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#8B6914] uppercase mb-4">
            {t("label")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D2314]">
            {t("title")}
          </h1>
        </div>

        <div className="prose prose-lg max-w-none text-[#3D2314]/80">
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
        </div>
      </div>
    </div>
  );
}
