"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Calendar, Check, ArrowLeft, Minus, Plus } from "lucide-react";

const gerDetails = {
  deluxe: {
    image: "/images/ger-exterior.jpg",
    gallery: ["/images/ger-interior.jpg", "/images/ger-exterior.jpg"],
  },
  family: {
    image: "/images/ger-interior.jpg",
    gallery: ["/images/ger-exterior.jpg", "/images/ger-interior.jpg"],
  },
  standard: {
    image: "/images/ger-family.jpg",
    gallery: ["/images/ger-interior.jpg", "/images/ger-exterior.jpg"],
  },
};

export default function AccommodationDetailClient({ id }: { id: string }) {
  const t = useTranslations("accommodation");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const ger = gerDetails[id as keyof typeof gerDetails];
  if (!ger) return <div className="text-[#2c2420]">Ger not found</div>;

  const priceString = t(`${id}.price`);
  const pricePerNight = parseInt(priceString.replace(/[^0-9]/g, "")) || 0;
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const totalGuests = adults + children;
  const totalPrice = nights * pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-24 pb-24 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/accommodation" className="inline-flex items-center text-[#8b6914] hover:text-[#6b5010] mb-8 font-medium">
          <ArrowLeft size={20} className="mr-2" />
          {t("detail.backToGers")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-video rounded-2xl overflow-hidden mb-4 natural-shadow">
              <img src={ger.image} alt={t(`${id}.name`)} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ger.gallery.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-xl overflow-hidden natural-shadow">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-[#2c2420] mb-2">{t(`${id}.name`)}</h1>
              <p className="text-[#8a7a6a]">{t(`${id}.description`)}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#e8dcc8]/50 natural-shadow">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#8a7a6a]">{t("detail.pricePerNight")}</span>
                <span className="text-3xl font-bold text-[#8b6914]">{t(`${id}.price`)}</span>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#6b7c3e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-[#6b7c3e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2c2420] mb-2">{t("detail.bookingSent")}</h3>
                  <p className="text-[#8a7a6a]">{t("detail.bookingMessage")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#8a7a6a] mb-1">{t("detail.checkIn")}</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7a6a]" />
                        <input
                          type="date"
                          value={checkIn}
                          min={today}
                          onChange={(e) => {
                            setCheckIn(e.target.value);
                            if (checkOut && e.target.value >= checkOut) setCheckOut("");
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8dcc8] rounded-lg text-[#2c2420] focus:border-[#8b6914] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#8a7a6a] mb-1">{t("detail.checkOut")}</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7a6a]" />
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0] : today}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8dcc8] rounded-lg text-[#2c2420] focus:border-[#8b6914] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#8a7a6a] mb-1">{t("detail.adults")}</label>
                      <div className="flex items-center bg-[#faf8f5] border border-[#e8dcc8] rounded-lg">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="p-3 text-[#8a7a6a] hover:text-[#8b6914] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center text-[#2c2420] font-medium">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(6, adults + 1))}
                          className="p-3 text-[#8a7a6a] hover:text-[#8b6914] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#8a7a6a] mb-1">{t("detail.children")}</label>
                      <div className="flex items-center bg-[#faf8f5] border border-[#e8dcc8] rounded-lg">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="p-3 text-[#8a7a6a] hover:text-[#8b6914] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center text-[#2c2420] font-medium">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(Math.min(4, children + 1))}
                          className="p-3 text-[#8a7a6a] hover:text-[#8b6914] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {nights > 0 && (
                    <div className="bg-[#f5f0e8] rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8a7a6a]">
                          {t(`${id}.price`)} × {nights} {nights === 1 ? t("detail.night") : t("detail.nights")}
                        </span>
                        <span className="text-[#2c2420]">${pricePerNight * nights}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8a7a6a]">{t("detail.guests")}</span>
                        <span className="text-[#2c2420]">{adults} {t("detail.adults")}, {children} {t("detail.children")}</span>
                      </div>
                      <div className="border-t border-[#e8dcc8] pt-2 flex justify-between">
                        <span className="text-[#2c2420] font-medium">{t("detail.total")}</span>
                        <span className="text-[#8b6914] font-bold text-xl">${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#8b6914] text-white font-bold rounded-lg hover:bg-[#6b5010] transition-all"
                  >
                    {t("detail.bookThisGer")}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#2c2420]">{t("detail.amenities")}</h3>
              <div className="grid grid-cols-2 gap-2">
                {["King Bed", "Private Bathroom", "Heating", "Steppe View", "WiFi", "Breakfast Included"].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-[#8a7a6a]">
                    <Check size={16} className="text-[#8b6914]" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
