"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Contact() {
    return (
        <section
        id="contact"
        className="relative max-w-4xl mx-auto px-6 py-24 text-center"
        >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-mask pointer-events-none" />
        <div className="absolute -top-24 -left-24 size-[32rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,.18),transparent_60%)] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-[32rem] rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,.15),transparent_60%)] blur-3xl" />

        {/* Content */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-white/10 p-12 backdrop-blur-xl"
        >
            <h2 className="text-5xl font-extrabold mb-6 gradient-text">
            Let’s Build Something
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Looking for a <span className="text-violet-400 font-semibold">Full-Stack Developer</span> or 
            <span className="text-pink-400 font-semibold"> AI Integrator</span> to bring your next big idea to life? 
            I’d love to collaborate and create something extraordinary.
            </p>

            {/* CTA */}
            <motion.a
            href="mailto:payloyo@gmail.com"
            whileHover={{ scale: 1.08 }}
            className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_8px_30px_rgba(236,72,153,.35)] transition hover:shadow-[0_12px_45px_rgba(236,72,153,.5)]"
            >
            Email Me
            </motion.a>

            {/* Social Links */}
            <div className="mt-10 flex justify-center gap-6">
            <motion.a
                whileHover={{ scale: 1.15 }}
                href="https://github.com/jppdp"
                target="_blank"
                className="group relative size-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(139,92,246,.35)]"
            >
                <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
                className="opacity-80 group-hover:opacity-100"
                />
            </motion.a>

            <motion.a
                whileHover={{ scale: 1.15 }}
                href="https://www.linkedin.com/in/james-patrick-paloyo-3ab052298/"
                target="_blank"
                className="group relative size-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(236,72,153,.35)]"
            >
                <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="opacity-80 group-hover:opacity-100"
                />
            </motion.a>
            </div>
        </motion.div>
        </section>
    );
}
