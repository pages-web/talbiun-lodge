"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Calendar, Check, ArrowLeft, Minus, Plus, CreditCard, Users } from "lucide-react";
import { useLocalAuth } from "@/lib/auth/LocalAuthContext";

const MAX_GUESTS_PER_GER = 6;

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
  const { user, addBooking } = useLocalAuth();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showGuestOverflow, setShowGuestOverflow] = useState(false);
  const [processing, setProcessing] = useState(false);

  const ger = gerDetails[id as keyof typeof gerDetails];
  if (!ger) return <div className="text-[var(--color-foreground)]">Ger not found</div>;

  const priceString = t(`${id}.price`);
  const pricePerNight = parseInt(priceString.replace(/[^0-9]/g, "")) || 0;
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const totalGuests = adults + children;
  const totalPrice = nights * pricePerNight;

  const handleBookClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (totalGuests > MAX_GUESTS_PER_GER) {
      setShowGuestOverflow(true);
      return;
    }

    setShowInvoice(true);
  };

  const confirmGuestLimit = (addGer: boolean) => {
    setShowGuestOverflow(false);
    if (addGer) {
      // Redirect to accommodation listing to choose another ger
      window.location.href = "/accommodation";
      return;
    }
    // Keep only first 6 guests: reduce children first, then adults if needed
    let remaining = MAX_GUESTS_PER_GER;
    const newAdults = Math.min(adults, remaining);
    remaining -= newAdults;
    const newChildren = Math.min(children, remaining);
    setAdults(newAdults);
    setChildren(newChildren);
    setShowInvoice(true);
  };

  const handlePay = async () => {
    if (!user) return;
    setProcessing(true);
    // Simulate demo payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    addBooking({
      gerId: id,
      gerName: t(`${id}.name`),
      gerNameMn: id,
      checkIn,
      checkOut,
      adults,
      children,
      nights,
      pricePerNight,
      totalPrice,
    });
    setProcessing(false);
    setShowInvoice(false);
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-24 pb-24 section-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/accommodation" className="inline-flex items-center text-[#2663EB] hover:text-[#1E4CC1] mb-8 font-medium">
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
              <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2">{t(`${id}.name`)}</h1>
              <p className="text-muted">{t(`${id}.description`)}</p>
            </div>

            <div className="section-surface rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] natural-shadow relative">
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted">{t("detail.pricePerNight")}</span>
                <span className="text-3xl font-bold text-[var(--color-accent)]">{t(`${id}.price`)}</span>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#6b7c3e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-[#6b7c3e]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1f1a17] mb-2">{t("detail.bookingSent")}</h3>
                  <p className="text-[#6b5e52]">{t("detail.bookingMessage")}</p>
                </div>
              ) : !user ? (
                  <div className="text-center py-8 bg-[rgba(255,255,255,0.03)] rounded-2xl border border-[rgba(255,255,255,0.06)]">
                  <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-3">{t("detail.signInToBook")}</h3>
                  <Link
                    href="/login"
                    className="inline-block px-8 py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all"
                  >
                    {t("detail.signInToBook")}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBookClick} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#6b5e52] mb-1">{t("detail.checkIn")}</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5e52]" />
                        <input
                          type="date"
                          value={checkIn}
                          min={today}
                          onChange={(e) => {
                            setCheckIn(e.target.value);
                            if (checkOut && e.target.value >= checkOut) setCheckOut("");
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] placeholder:text-muted focus:border-[var(--color-accent)] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#6b5e52] mb-1">{t("detail.checkOut")}</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b5e52]" />
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0] : today}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] placeholder:text-muted focus:border-[var(--color-accent)] focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#6b5e52] mb-1">{t("detail.adults")}</label>
                      <div className="flex items-center bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="p-3 text-muted hover:text-[var(--color-accent)] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center text-[var(--color-foreground)] font-medium">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="p-3 text-muted hover:text-[var(--color-accent)] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-[#6b5e52] mb-1">{t("detail.children")}</label>
                      <div className="flex items-center bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="p-3 text-muted hover:text-[var(--color-accent)] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex-1 text-center text-[var(--color-foreground)] font-medium">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="p-3 text-[#6b5e52] hover:text-[#2663EB] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {totalGuests > MAX_GUESTS_PER_GER && (
                    <div className="bg-[#c94a4a]/10 border border-[#c94a4a]/30 rounded-lg p-3 text-sm text-[#9e2b2b]">
                      {t("detail.maxGuestsReached", { count: totalGuests })}
                    </div>
                  )}

                  {nights > 0 && (
                    <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">
                          {t(`${id}.price`)} × {nights} {nights === 1 ? t("detail.night") : t("detail.nights")}
                        </span>
                        <span className="text-[var(--color-foreground)]">${pricePerNight * nights}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">{t("detail.guests")}</span>
                        <span className="text-[var(--color-foreground)]">{adults} {t("detail.adults")}, {children} {t("detail.children")}</span>
                      </div>
                      <div className="border-t border-[#d8c9b3] pt-2 flex justify-between">
                        <span className="text-[var(--color-foreground)] font-medium">{t("detail.total")}</span>
                        <span className="text-[var(--color-accent)] font-bold text-xl">${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!checkIn || !checkOut || nights === 0}
                    className="w-full py-4 bg-[#2663EB] text-white font-bold rounded-lg hover:bg-[#1E4CC1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("detail.bookThisGer")}
                  </button>
                </form>
              )}

              {/* Guest Overflow Modal */}
              {showGuestOverflow && (
                  <div className="absolute inset-0 z-10 bg-[var(--surface)]/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-[#c94a4a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={28} className="text-[#c94a4a]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-3">{t("detail.guestsOverflow")}</h3>
                    <p className="text-muted mb-2">{t("detail.maxGuestsReached", { count: totalGuests })}</p>
                    <p className="text-muted mb-6">{t("detail.addAnotherGer")}</p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => confirmGuestLimit(false)}
                        className="px-5 py-2.5 border border-[rgba(255,255,255,0.06)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--surface)] transition-colors font-medium"
                      >
                        {t("detail.addAnotherGerNo")}
                      </button>
                      <Link
                        href="/accommodation"
                        onClick={() => setShowGuestOverflow(false)}
                        className="px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors font-medium"
                      >
                        {t("detail.addAnotherGerYes")}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Modal */}
              {showInvoice && (
                <div className="absolute inset-0 z-10 bg-[var(--surface)]/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[var(--color-foreground)]">{t("detail.invoiceTitle")}</h3>
                    <button
                      onClick={() => setShowInvoice(false)}
                      className="text-muted hover:text-[var(--color-foreground)] transition-colors"
                    >
                      {t("detail.cancel")}
                    </button>
                  </div>
                  <p className="text-muted text-sm mb-4">{t("detail.invoiceDescription")}</p>

                  <div className="flex-1 overflow-auto">
                    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">{t("detail.bookingSummary")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-foreground)]">{t(`${id}.name`)}</span>
                        <span className="text-[var(--color-foreground)] font-medium">{t(`${id}.price`)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6b5e52]">{nights} {nights === 1 ? t("detail.night") : t("detail.nights")}</span>
                        <span className="text-[#1f1a17]">${pricePerNight * nights}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6b5e52]">{t("detail.guests")}</span>
                        <span className="text-[#1f1a17]">{adults} {t("detail.adults")}, {children} {t("detail.children")}</span>
                      </div>
                      <div className="border-t border-[#d8c9b3] pt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6b5e52]">{t("detail.subtotal")}</span>
                          <span className="text-[#1f1a17]">${pricePerNight * nights}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6b5e52]">{t("detail.taxes")}</span>
                          <span className="text-[#1f1a17]">$0</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-[#1f1a17] font-bold">{t("detail.total")}</span>
                          <span className="text-[#2663EB] font-bold text-xl">${totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 border border-[rgba(255,255,255,0.06)]">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard size={20} className="text-[#2663EB]" />
                        <span className="font-bold text-[var(--color-foreground)]">{t("detail.demoPayment")}</span>
                      </div>
                      <p className="text-sm text-muted">{t("detail.demoPaymentNote")}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <button
                      onClick={handlePay}
                      disabled={processing}
                      className="w-full py-3.5 bg-[#2663EB] text-white font-bold rounded-lg hover:bg-[#1E4CC1] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t("detail.processing")}
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} />
                          {t("detail.payNow")} — ${totalPrice}
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowInvoice(false)}
                      disabled={processing}
                      className="w-full py-3 border border-[#d8c9b3] text-[#1f1a17] font-medium rounded-lg hover:bg-[#f7f4ef] transition-colors disabled:opacity-50"
                    >
                      {t("detail.back")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#1f1a17]">{t("detail.amenities")}</h3>
              <div className="grid grid-cols-2 gap-2">
                {["King Bed", "Private Bathroom", "Heating", "Steppe View", "WiFi", "Breakfast Included"].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-[#6b5e52]">
                    <Check size={16} className="text-[#2663EB]" />
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

