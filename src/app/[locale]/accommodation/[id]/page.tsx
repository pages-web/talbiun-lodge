"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Calendar, Users, Check, ArrowLeft } from "lucide-react";

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
    image: "/images/ger-exterior.jpg",
    gallery: ["/images/ger-interior.jpg", "/images/ger-exterior.jpg"],
  },
};

export default function AccommodationDetailPage() {
  const t = useTranslations("accommodation");
  const params = useParams();
  const gerId = params.id as string;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [submitted, setSubmitted] = useState(false);

  const ger = gerDetails[gerId as keyof typeof gerDetails];
  if (!ger) return <div>Ger not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-24 bg-[#0f1729] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/accommodation" className="inline-flex items-center text-[#3b82f6] hover:text-[#60a5fa] mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to All Gers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-video rounded-xl overflow-hidden mb-4">
              <img src={ger.image} alt={t(`${gerId}.name`)} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ger.gallery.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{t(`${gerId}.name`)}</h1>
              <p className="text-slate-400">{t(`${gerId}.description`)}</p>
            </div>

            <div className="bg-[#1e3a5f]/30 rounded-xl p-6 border border-[#2d5a7b]/30">
              <div className="flex items-center justify-between mb-6">
                <span className="text-slate-400">Price per night</span>
                <span className="text-3xl font-bold text-[#3b82f6]">{t(`${gerId}.price`)}</span>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Booking Request Sent!</h3>
                  <p className="text-slate-400">We will contact you shortly to confirm your reservation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Check In</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#0f1729] border border-[#2d5a7b] rounded-lg text-white focus:border-[#3b82f6] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1">Check Out</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#0f1729] border border-[#2d5a7b] rounded-lg text-white focus:border-[#3b82f6] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Guests</label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#0f1729] border border-[#2d5a7b] rounded-lg text-white focus:border-[#3b82f6] focus:outline-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#3b82f6] to-[#1e3a5f] text-white font-bold rounded-lg hover:from-[#2563eb] hover:to-[#1e40af] transition-all shadow-lg shadow-blue-900/30"
                  >
                    {t("detail.bookThisGer")}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">{t("detail.amenities")}</h3>
              <div className="grid grid-cols-2 gap-2">
                {["King Bed", "Private Bathroom", "Heating", "Steppe View", "WiFi", "Breakfast Included"].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-slate-400">
                    <Check size={16} className="text-[#3b82f6]" />
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
