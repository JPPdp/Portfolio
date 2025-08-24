"use client";
import { motion } from "framer-motion";

const skills = {
  "Programming": ["JavaScript", "TypeScript", "Dart", "Kotlin", "Python", "PHP"],
  "Frameworks": ["Next.js", "React.js", "Flutter", "Node.js", "Laravel"],
  "Databases & Cloud": ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Supabase", "AWS"],
  "Tools & DevOps": ["Git", "Docker", "Postman", "VS Code"]
};

export default function Skills() {
  return (
    <section id="skills" className="relative max-w-7xl mx-auto px-6 py-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-grid-mask pointer-events-none" />
      <div className="absolute -top-28 -right-28 size-[28rem] rounded-full bg-[radial-gradient(circle_at_60%_60%,rgba(139,92,246,.15),transparent_70%)] blur-3xl" />
      <div className="absolute -bottom-32 -left-28 size-[28rem] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(236,72,153,.12),transparent_70%)] blur-3xl" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-center mb-16 gradient-text"
      >
        Skills & Expertise
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {Object.entries(skills).map(([category, list], index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl p-10 glass border border-white/10 backdrop-blur-xl hover:scale-105 transition hover:shadow-[0_12px_45px_rgba(139,92,246,.3)]"
          >
            {/* Gradient border animation */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-violet-500 via-pink-500 to-purple-500 opacity-0 transition duration-500 group-hover:opacity-100 blur-lg" />
            
            <h3 className="relative z-10 text-2xl font-semibold mb-6 gradient-text">
              {category}
            </h3>

            <div className="relative z-10 flex flex-wrap gap-3">
              {list.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-gradient-to-r hover:from-violet-500 hover:to-pink-500 hover:text-white hover:shadow-lg transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
