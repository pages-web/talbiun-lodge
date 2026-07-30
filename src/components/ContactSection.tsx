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
    <section ref={ref} className="h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] snap-start flex items-center justify-center bg-[#1f1a17] py-6 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.35em] text-[#c9a86c] uppercase mb-4 font-medium">
              {t("label")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-[1.1] mb-4">
              {t("title")}
            </h2>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md text-base">
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
                  <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#c9a86c]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.15em] uppercase text-[#c9a86c] mb-1">{item.label}</div>
                    <div className="text-white/90">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#f7f4ef] p-8 md:p-12"
          >
            <h3 className="text-2xl font-serif text-[#1f1a17] mb-2">{t("formTitle")}</h3>
            <p className="text-[#6b5e52] mb-6">{t("formSubtitle")}</p>

            {submitted ? (
              <div className="flex items-center gap-3 p-6 bg-[#5e6b3a]/10 text-[#5e6b3a]">
                <Check className="w-5 h-5" />
                <span>{t("formSuccess")}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder={t("form.name")}
                    className="w-full px-5 py-4 bg-white border border-[#d8c9b3] text-[#1f1a17] placeholder-[#a09080] focus:outline-none focus:border-[#7a5e12] transition-colors"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("form.email")}
                    className="w-full px-5 py-4 bg-white border border-[#d8c9b3] text-[#1f1a17] placeholder-[#a09080] focus:outline-none focus:border-[#7a5e12] transition-colors"
                    required
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder={t("form.message")}
                  className="w-full px-5 py-4 bg-white border border-[#d8c9b3] text-[#1f1a17] placeholder-[#a09080] focus:outline-none focus:border-[#7a5e12] transition-colors resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#7a5e12] text-white font-semibold tracking-[0.1em] uppercase hover:bg-[#5a450e] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
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
