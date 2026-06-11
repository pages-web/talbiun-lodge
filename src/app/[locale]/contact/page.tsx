"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-24 pb-24 bg-[#0f1729] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
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
                <div className="w-12 h-12 bg-[#1e3a5f]/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">{t("location")}</h3>
                  <p className="text-slate-400">{t("address")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1e3a5f]/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone</h3>
                  <p className="text-slate-400">{t("phone")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1e3a5f]/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <p className="text-slate-400">{t("email")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1e3a5f]/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-[#3b82f6]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Season</h3>
                  <p className="text-slate-400">{t("season")}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2d5a7b]/30">
              <h3 className="text-white font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/talbiunlodge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#1e3a5f]/50 rounded-lg flex items-center justify-center hover:bg-[#3b82f6]/20 transition-colors"
                >
                  <Facebook size={24} className="text-[#3b82f6]" />
                </a>
                <a
                  href="https://instagram.com/talbiunlodge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#1e3a5f]/50 rounded-lg flex items-center justify-center hover:bg-[#3b82f6]/20 transition-colors"
                >
                  <Instagram size={24} className="text-[#3b82f6]" />
                </a>
              </div>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden bg-[#1e3a5f]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d101.5!3d47.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAwJzAwLjAiTiAxMDHCsDMwJzAwLjAiRQ!5e0!3m2!1sen!2smn!4v1600000000000!5m2!1sen!2smn"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#1e3a5f]/20 rounded-xl p-8 border border-[#2d5a7b]/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t("form.name")}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f1729] border border-[#2d5a7b] rounded-lg text-white placeholder-slate-500 focus:border-[#3b82f6] focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t("form.email")}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f1729] border border-[#2d5a7b] rounded-lg text-white placeholder-slate-500 focus:border-[#3b82f6] focus:outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">{t("form.message")}</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f1729] border border-[#2d5a7b] rounded-lg text-white placeholder-slate-500 focus:border-[#3b82f6] focus:outline-none resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#3b82f6] to-[#1e3a5f] text-white font-bold rounded-lg hover:from-[#2563eb] hover:to-[#1e40af] transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {t("form.send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
