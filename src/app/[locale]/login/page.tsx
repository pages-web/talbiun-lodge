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
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#f7f4ef] px-4 py-24">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#d8c9b3] p-8 natural-shadow">
        <h1 className="text-3xl font-bold text-[#1f1a17] mb-2 text-center">{ t("login")}</h1>
        <p className="text-[#6b5e52] text-center mb-8">Talbiun Lodge</p>

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
              className="w-full px-4 py-3 bg-[#f7f4ef] border border-[#d8c9b3] rounded-lg text-[#1f1a17] focus:border-[#7a5e12] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#4a3f36] mb-1">{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f7f4ef] border border-[#d8c9b3] rounded-lg text-[#1f1a17] focus:border-[#7a5e12] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#7a5e12] text-white font-bold rounded-lg hover:bg-[#5a450e] transition-all"
          >
            {t("loginSubmit")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#6b5e52]">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-[#7a5e12] font-medium hover:underline">
            {t("register")}
          </Link>
        </div>
      </div>
    </div>
  );
}
