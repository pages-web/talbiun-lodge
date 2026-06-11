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
    <div className="pt-24 pb-24 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#8b6914] uppercase mb-4 font-medium">
            {t("label")}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif text-[#2c2420] mb-4"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#8a7a6a] max-w-2xl mx-auto"
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
                <div className="w-12 h-12 bg-[#f5f0e8] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e8dcc8]">
                  <MapPin size={24} className="text-[#8b6914]" />
                </div>
                <div>
                  <h3 className="text-[#2c2420] font-medium mb-1">{t("location")}</h3>
                  <p className="text-[#8a7a6a]">{t("address")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f5f0e8] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e8dcc8]">
                  <Phone size={24} className="text-[#8b6914]" />
                </div>
                <div>
                  <h3 className="text-[#2c2420] font-medium mb-1">Phone</h3>
                  <p className="text-[#8a7a6a]">{t("phone")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f5f0e8] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e8dcc8]">
                  <Mail size={24} className="text-[#8b6914]" />
                </div>
                <div>
                  <h3 className="text-[#2c2420] font-medium mb-1">Email</h3>
                  <p className="text-[#8a7a6a]">{t("email")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f5f0e8] rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e8dcc8]">
                  <Clock size={24} className="text-[#8b6914]" />
                </div>
                <div>
                  <h3 className="text-[#2c2420] font-medium mb-1">Season</h3>
                  <p className="text-[#8a7a6a]">{t("season")}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e8dcc8]/50">
              <h3 className="text-[#2c2420] font-medium mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/talbiunlodge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#f5f0e8] rounded-lg flex items-center justify-center hover:bg-[#8b6914]/10 transition-colors border border-[#e8dcc8]"
                >
                  <Facebook size={24} className="text-[#8b6914]" />
                </a>
                <a
                  href="https://instagram.com/talbiunlodge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#f5f0e8] rounded-lg flex items-center justify-center hover:bg-[#8b6914]/10 transition-colors border border-[#e8dcc8]"
                >
                  <Instagram size={24} className="text-[#8b6914]" />
                </a>
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-[#e8dcc8]/30 border border-[#e8dcc8]/50">
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
            className="bg-white rounded-2xl p-8 border border-[#e8dcc8]/50 natural-shadow"
          >
            <h2 className="text-2xl font-bold text-[#2c2420] mb-6">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#6b7c3e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-[#6b7c3e]" />
                </div>
                <h3 className="text-xl font-bold text-[#2c2420] mb-2">Message Sent!</h3>
                <p className="text-[#8a7a6a]">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-[#8a7a6a] mb-2">{t("form.name")}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dcc8] rounded-lg text-[#2c2420] placeholder-[#8a7a6a] focus:border-[#8b6914] focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8a7a6a] mb-2">{t("form.email")}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dcc8] rounded-lg text-[#2c2420] placeholder-[#8a7a6a] focus:border-[#8b6914] focus:outline-none"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#8a7a6a] mb-2">{t("form.message")}</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8dcc8] rounded-lg text-[#2c2420] placeholder-[#8a7a6a] focus:border-[#8b6914] focus:outline-none resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#8b6914] text-white font-bold rounded-lg hover:bg-[#6b5010] transition-all flex items-center justify-center gap-2"
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
