"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Script from "next/script";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="pt-24 pb-24 section-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#2663EB] uppercase mb-4 font-medium">
            {t("label")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-[var(--color-foreground)] mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.06)]">
                  <MapPin size={24} className="text-[#2663EB]" />
                </div>
                <div>
                  <h3 className="text-[#1f1a17] font-medium mb-1">{t("location")}</h3>
                  <p className="text-[#6b5e52]">{t("address")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.06)]">
                  <Phone size={24} className="text-[#2663EB]" />
                </div>
                <div>
                  <h3 className="text-[var(--color-foreground)] font-medium mb-1">Phone</h3>
                  <p className="text-muted">{t("phone")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.06)]">
                  <Mail size={24} className="text-[#2663EB]" />
                </div>
                <div>
                  <h3 className="text-[var(--color-foreground)] font-medium mb-1">Email</h3>
                  <p className="text-muted">{t("email")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12bg-[var(--surface)] rounded-lg flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.06)]">
                  <Clock size={24} className="text-[#2663EB]" />
                </div>
                <div>
                  <h3 className="text-[var(--color-foreground)] font-medium mb-1">Season</h3>
                  <p className="text-muted">{t("season")}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(255,255,255,0.06)]">
              <h3 className="text-[var(--color-foreground)] font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/talbiunlodge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)]/10 transition-colors border border-[rgba(255,255,255,0.06)]"
                >
                  <Facebook size={24} className="text-[#2663EB]" />
                </a>
                <a
                  href="https://instagram.com/talbiunlodge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[var(--surface)] rounded-lg flex items-center justify-center hover:bg-[var(--color-accent)]/10 transition-colors border border-[rgba(255,255,255,0.06)]"
                >
                  <Instagram size={24} className="text-[#2663EB]" />
                </a>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d101.5!3d47.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAwJzAwLjAiTiAxMDHCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2smn!4v1600000000000!5m2!1sen!2smn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="section-surface rounded-2xl p-8"
          >
          
            <div data-erxes-embed="MnEB9Q" />

            <Script
              id="erxes-settings"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.erxesSettings = { forms: [{ form_id: 'MnEB9Q', channel_id: 'nz3tin9FdxgSZZSocAW2K' }] };`,
              }}
            />

            <Script
              src="https://talbiuncamp.nextwidgets.erxes.io/formBundle.js"
              strategy="afterInteractive"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

