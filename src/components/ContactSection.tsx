"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contact");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0f1729] to-[#0a1628]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] text-[#3b82f6] uppercase mb-4"
        >
          Stay Connected
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-white mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 mb-10"
        >
          {t("description")}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-6 py-3 bg-[#1e3a5f]/30 border border-[#2d5a7b] text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-[#3b82f6]"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#1e3a5f] text-white font-medium rounded-lg hover:from-[#2563eb] hover:to-[#1e40af] transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Subscribe
          </button>
        </motion.form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-400"
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </section>
  );
}
