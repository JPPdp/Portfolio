"use client";
import { motion } from "framer-motion";

const roles = [
  {
    title: "Chief Technology Officer",
    company: "JD Telecommunication",
    date: "Aug 2021 – June 2025",
    details:
      "Designed and deployed ISP billing system (Flutter + Sheets + IoT). Handled ₱220k+ weekly processing, TR-069 provisioning, remote monitoring.",
  },
  {
    title: "Senior Game Dev & AI Integrator",
    company: "REEV Tech Inc. (Japan)",
    date: "Jan 2022 – May 2025",
    details:
      "Built AI NPCs with GPT in Unity (2D/3D/VR). Developed cross-platform mobile apps using Flutter & Kotlin.",
  },
  {
    title: "Full-Stack Developer",
    company: "Yazilim Mashoor (Turkey)",
    date: "Feb 2023 – Jan 2025",
    details:
      "Custom WordPress & eCommerce builds with PHP, Tailwind, and MySQL. Focused on SEO, performance & UX.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-5xl font-black mb-12 gradient-text text-center">
        Experience
      </h2>
      <div className="relative space-y-12">
        {roles.map((role, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="glass rounded-2xl border border-white/10 p-8 hover:border-violet-400/40 transition hover:shadow-[0_8px_40px_rgba(139,92,246,.35)]"
          >
            <h3 className="text-2xl font-semibold text-white">{role.title}</h3>
            <p className="text-violet-400 text-lg">{role.company}</p>
            <p className="text-sm text-white/60">{role.date}</p>
            <p className="mt-4 text-white/80">{role.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
