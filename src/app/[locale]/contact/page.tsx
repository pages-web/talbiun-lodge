"use client";

import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[#3D2314] mb-2">Phone</h3>
              <p className="text-[#3D2314]/70">{t("phone")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#3D2314] mb-2">Address</h3>
              <p className="text-[#3D2314]/70">{t("address")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#3D2314] mb-2">Season</h3>
              <p className="text-[#3D2314]/70">{t("season")}</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#3D2314] mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-[#3D2314]/20 bg-white focus:outline-none focus:border-[#8B6914]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3D2314] mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-[#3D2314]/20 bg-white focus:outline-none focus:border-[#8B6914]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3D2314] mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-[#3D2314]/20 bg-white focus:outline-none focus:border-[#8B6914]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-[#3D2314] text-[#F5F0E8] text-sm tracking-wide hover:bg-[#2C1810] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
