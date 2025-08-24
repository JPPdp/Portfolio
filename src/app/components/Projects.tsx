"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "BillWise SaaS",
    desc: "Subscription billing platform with Stripe & PDF invoices.",
    tech: "Next.js • Node • PostgreSQL • Docker",
  },
  {
    title: "AI NPC System",
    desc: "Unity NPCs powered by GPT for realistic game dialogues.",
    tech: "Unity • OpenAI API • C#",
  },
  {
    title: "ISP Billing App",
    desc: "Collector app with Bluetooth printing & Google Sheets backend.",
    tech: "Flutter • Sheets API • IoT",
  },
  {
    title: "Temu Clone",
    desc: "E-commerce web app replicating Temu's core UI and flow.",
    tech: "Next.js • Tailwind • Vercel",
  },
  {
    title: "VR Training Simulator",
    desc: "Immersive VR training platform for industrial safety.",
    tech: "Unity • Oculus SDK • C#",
  },
  {
    title: "AI Chat Assistant",
    desc: "Conversational assistant for customer support automation.",
    tech: "Node.js • OpenAI API • React",
  },
];


export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-5xl font-black mb-12 gradient-text text-center">
        Featured Projects
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="glass rounded-2xl p-8 border border-white/10 hover:border-fuchsia-400/40 hover:scale-105 transition hover:shadow-[0_10px_40px_rgba(236,72,153,.3)]"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
            <p className="text-white/70 mb-4">{project.desc}</p>
            <p className="text-sm text-violet-300">{project.tech}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
