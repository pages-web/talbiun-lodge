"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useLocalAuth } from "@/lib/auth/LocalAuthContext";
import { User, Calendar, XCircle, LogOut, MapPin, Mail, Phone } from "lucide-react";

type Tab = "info" | "bookings" | "canceled";

export default function ProfilePage() {
  const t = useTranslations("auth.profile");
  const at = useTranslations("auth");
  const router = useRouter();
  const { user, loading, logout, updateProfile, changePassword, bookings, cancelBooking } = useLocalAuth();
  const [tab, setTab] = useState<Tab>("info");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center section-surface">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center section-surface px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-4">{at("login")}</h1>
          <Link href="/login" className="px-8 py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all">
            {at("login")}
          </Link>
        </div>
      </div>
    );
  }

  const activeBookings = bookings.filter((b) => b.status === "active");
  const canceledBookings = bookings.filter((b) => b.status === "canceled");

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ firstName, lastName, phone });
    setMessage("Profile updated");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = changePassword(currentPassword, newPassword);
    if (ok) {
      setMessage("Password changed");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setMessage("Current password incorrect");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] section-surface px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)]">{t("title")}</h1>
            <p className="text-muted">{user.email}</p>
          </div>
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="flex items-center justify-center gap-2 px-6 py-2.5 border border-[var(--color-accent)] text-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent)] hover:text-white transition-all"
          >
            <LogOut size={18} />
            {at("logout")}
          </button>
        </div>

        {message && (
          <div className="mb-6 p-3 bg-[rgba(255,255,255,0.03)] text-[var(--color-accent)] rounded-lg text-sm">{message}</div>
        )}

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { key: "info", label: t("personalInfo") },
            { key: "bookings", label: t("myBookings") },
            { key: "canceled", label: t("canceledBookings") },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key as Tab)}
              className={`px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                tab === item.key
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--surface)] text-muted border border-[rgba(255,255,255,0.06)] hover:border-[var(--color-accent)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="section-surface rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] natural-shadow">
              <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">{t("personalInfo")}</h2>
              <form onSubmit={handleSaveInfo} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted mb-1">{at("firstName")}</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1">{at("lastName")}</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">{at("email")}</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">{at("phone")}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all"
                >
                  {t("save")}
                </button>
              </form>
            </div>

            <div className="section-surface rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] natural-shadow">
              <h2 className="text-xl font-bold text-[var(--color-foreground)] mb-6">{t("changePassword")}</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm text-muted mb-1">{t("currentPassword")}</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">{t("newPassword")}</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all"
                >
                  {t("changePassword")}
                </button>
              </form>
            </div>
          </div>
        )}

        {tab === "bookings" && (
          <div className="section-surface rounded-2xl border border-[rgba(255,255,255,0.06)] natural-shadow overflow-hidden">
            <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold text-[var(--color-foreground)]">{t("myBookings")}</h2>
            </div>
            {activeBookings.length === 0 ? (
              <div className="p-12 text-center text-muted">{t("noBookings")}</div>
            ) : (
              <div className="divide-y divide-[rgba(255,255,255,0.06)]">
                {activeBookings.map((booking) => (
                  <div key={booking.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-[var(--color-foreground)]">{booking.gerName}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted">
                          <span className="flex items-center gap-1"><Calendar size={14} /> {booking.checkIn} → {booking.checkOut}</span>
                          <span>{booking.adults} {t("adults")}, {booking.children} {t("children")}</span>
                          <span className="font-medium text-[var(--color-accent)]">${booking.totalPrice}</span>
                        </div>
                        <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          {t("active")}
                        </div>
                      </div>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <XCircle size={16} />
                        {t("cancel")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "canceled" && (
          <div className="section-surface rounded-2xl border border-[rgba(255,255,255,0.06)] natural-shadow overflow-hidden">
            <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold text-[var(--color-foreground)]">{t("canceledBookings")}</h2>
            </div>
            {canceledBookings.length === 0 ? (
              <div className="p-12 text-center text-muted">{t("noCanceled")}</div>
            ) : (
              <div className="divide-y divide-[rgba(255,255,255,0.06)]">
                {canceledBookings.map((booking) => (
                  <div key={booking.id} className="p-6 opacity-70">
                    <div className="space-y-2">
                      <h3 className="font-bold text-[var(--color-foreground)]">{booking.gerName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {booking.checkIn} → {booking.checkOut}</span>
                        <span>{booking.adults} {t("adults")}, {booking.children} {t("children")}</span>
                        <span className="font-medium text-[var(--color-accent)]">${booking.totalPrice}</span>
                      </div>
                      <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
                        {t("canceled")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

