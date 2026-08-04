"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useLocalAuth } from "@/lib/auth/LocalAuthContext";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { login } = useLocalAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      router.push("/profile");
    } else {
      setError(t("invalidCredentials"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center section-surface px-4 py-24">
      <div className="w-full max-w-md section-surface rounded-2xl border border-[rgba(255,255,255,0.06)] p-8 natural-shadow">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2 text-center">{ t("login")}</h1>
        <p className="text-muted text-center mb-8">Talbiun Lodge</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[var(--color-foreground)] focus:border-[var(--color-accent)] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#2663EB] text-white font-bold rounded-lg hover:bg-[#1E4CC1] transition-all"
          >
            {t("loginSubmit")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-[#2663EB] font-medium hover:underline">
            {t("register")}
          </Link>
        </div>
      </div>
    </div>
  );
}

