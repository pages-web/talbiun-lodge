import { useTranslations } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences | Talbiun Lodge",
  description: "Authentic Mongolian activities and traditions at Talbiun Lodge.",
};

export default function ExperiencesPage() {
  const t = useTranslations("services");

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
          <p className="mt-4 text-[#3D2314]/60">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["horseback", "games", "dinner", "tea", "stargazing", "walks"].map((exp) => (
            <div key={exp} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-video bg-[#3D2314]/10" />
              <div className="p-6">
                <h3 className="text-xl font-medium text-[#3D2314] mb-2">
                  {t(`experiences.${exp}.title`)}
                </h3>
                <p className="text-[#3D2314]/60">
                  {t(`experiences.${exp}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
