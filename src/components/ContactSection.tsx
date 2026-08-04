"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contact");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: MapPin, label: t("address"), value: t("address") },
    { icon: Phone, label: t("phone"), value: t("phone") },
    { icon: Mail, label: t("email"), value: t("email") },
    { icon: Clock, label: t("season"), value: t("season") },
  ];

  return (
    <section ref={ref} className="py-28 lg:py-36 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.35em] text-[#2663EB] uppercase mb-5 font-medium">
              {t("label")}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-foreground)] leading-[1.1] mb-6">
              {t("title")}
            </h2>
            <p className="text-[var(--color-foreground)]/85 leading-relaxed mb-12 max-w-md">
              {t("description")}
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                    <div className="w-12 h-12 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.15em] uppercase text-[var(--color-accent)] mb-1">{item.label}</div>
                    <div className="text-[var(--color-foreground)]">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="section-surface p-8 md:p-12"
          >
            <h3 className="text-2xl font-serif text-[var(--color-foreground)] mb-2">{t("formTitle")}</h3>
            <p className="text-muted mb-8">{t("formSubtitle")}</p>

            {submitted ? (
              <div className="flex items-center gap-3 p-4 bg-[#5e6b3a]/10 text-[#5e6b3a]">
                <Check className="w-5 h-5" />
                <span className="text-lg">{t("formSuccess")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder={t("form.name")}
                      className="w-full px-5 py-4 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] text-[var(--color-foreground)] placeholder:text-muted focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("form.email")}
                      className="w-full px-5 py-4 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] text-[var(--color-foreground)] placeholder:text-muted focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                      required
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder={t("form.message")}
                    className="w-full px-5 py-4 bg-[var(--surface)] border border-[rgba(255,255,255,0.06)] text-[var(--color-foreground)] placeholder:text-muted focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                    required
                  />
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#2663EB] text-white font-semibold tracking-[0.1em] uppercase hover:bg-[#1E4CC1] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {t("form.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
