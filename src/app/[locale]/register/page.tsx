"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useLocalAuth } from "@/lib/auth/LocalAuthContext";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { register } = useLocalAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    const success = register({ firstName, lastName, email, phone, password });
    if (success) {
      router.push("/profile");
    } else {
      setError(t("emailExists"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center section-surface px-4 py-24">
      <div className="w-full max-w-md section-surface rounded-2xl border border-[rgba(255,255,255,0.06)] p-8 natural-shadow">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2 text-center">{t("register")}</h1>
        <p className="text-muted text-center mb-8">Talbiun Lodge</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#4a3f36] mb-1">{t("firstName")}</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#4a3f36] mb-1">{t("lastName")}</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7f4ef] border border-[#d8c9b3] rounded-lg text-[#1f1a17] focus:border-[#2663EB] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("phone")}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7f4ef] border border-[#d8c9b3] rounded-lg text-[#1f1a17] focus:border-[#2663EB] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7f4ef] border border-[#d8c9b3] rounded-lg text-[#1f1a17] focus:border-[#2663EB] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("confirmPassword")}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7f4ef] border border-[#d8c9b3] rounded-lg text-[#1f1a17] focus:border-[#2663EB] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-all"
          >
            {t("createAccount")}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted">
          {t("hasAccount")} {" "}
          <Link href="/login" className="text-[var(--color-accent)] font-medium hover:underline">
            {t("login")}
          </Link>
        </div>
      </div>
    </div>
  );
}

