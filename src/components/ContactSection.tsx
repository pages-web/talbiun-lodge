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
    <section ref={ref} className="py-24 bg-[#f5f0e8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] text-[#8b6914] uppercase mb-4 font-medium"
        >
          Stay Connected
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif text-[#2c2420] mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#8a7a6a] mb-10"
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
            className="flex-1 px-6 py-3 bg-white border border-[#e8dcc8] text-[#2c2420] placeholder-[#8a7a6a] rounded-lg focus:outline-none focus:border-[#8b6914]"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-[#8b6914] text-white font-medium rounded-lg hover:bg-[#6b5010] transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Subscribe
          </button>
        </motion.form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-[#6b7c3e]"
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </section>
  );
}
