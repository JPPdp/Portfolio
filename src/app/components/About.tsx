"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative max-w-6xl mx-auto px-6 py-24">
      <div className="absolute inset-0 bg-grid-mask pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass rounded-3xl border border-white/10 p-10 backdrop-blur-xl"
      >
        <h2 className="text-5xl font-black mb-6 gradient-text">About Me</h2>
        <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
          I’m James Patrick, a builder at heart. From leading <span className="text-fuchsia-400 font-semibold">ISP billing systems </span> that 
          process over <span className="text-emerald-400 font-semibold">₱220k/week </span> 
          to crafting <span className="text-fuchsia-400 font-semibold">AI-driven NPCs for immersive gaming</span>, I thrive on solving real-world 
          problems with code. My passion lies in connecting scalable systems, 
          <span className="text-fuchsia-400 font-semibold">beautiful interfaces</span>, and smart AI solutions whether for business, 
          entertainment, or next-gen platforms.
        </p>
      </motion.div>
    </section>
  );
}
