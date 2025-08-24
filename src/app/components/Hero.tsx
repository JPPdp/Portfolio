"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const roles = [
    "CTO who ships revenue",
    "Full-Stack & Cross-Platform Dev",
    "AI Integrator (Unity • LLMs)",
    "Game Dev (2D/3D/VR)",
];

const projectCards = [
    { title: "ISP Billing System", tag: "Flutter • Sheets • BT Printing" },
    { title: "BillWise (SaaS)", tag: "Next.js • Stripe • Postgres" },
    { title: "AI NPC System", tag: "Unity • GPT" },
];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400);
        return () => clearInterval(id);
    }, []);

    return (
        <section
        className="relative min-h-[92vh] w-full overflow-hidden"
        aria-label="James Patrick Paloyo — Portfolio Hero"
        >
        {/* Background: grid + spotlight + blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-obsidian" />
            <div className="absolute inset-0 bg-grid-mask" />
            <div className="absolute -top-24 -left-24 size-[38rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,.22),transparent_60%)] blur-3xl" />
            <div className="absolute -bottom-24 -right-24 size-[40rem] rounded-full bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,.18),transparent_60%)] blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-10 md:px-10 lg:py-28">
            {/* Left: Identity & CTAs */}
            <div className="relative">
            {/* subtle spotlight that follows mouse */}
            <MouseSpotlight />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
                <span className="size-2.5 rounded-full bg-emerald-400/90 shadow-[0_0_18px_2px_rgba(16,185,129,.55)]" />
                open to exciting work & collaborations
            </div>

            <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
                James Patrick{" "}
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Paloyo
                </span>
            </h1>

            {/* kinetic subtitle */}
            <div className="mt-5 h-10 md:h-12 overflow-hidden">
                <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-lg md:text-xl text-white/80"
                >
                    {roles[index]}
                </motion.p>
                </AnimatePresence>
            </div>

            {/* resume-driven highlights */}
            <ul className="mt-6 flex flex-wrap gap-3">
                {[
                "CTO • JD Telecommunication",
                "₱220k+/week collections processed",
                "Hackathon Champion • 2024",
                "Unity • Flutter • Next.js",
                ].map((chip) => (
                <li
                    key={chip}
                    className="group relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-violet-400/40 hover:text-white"
                >
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/0 via-fuchsia-500/0 to-pink-500/0 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30" />
                    {chip}
                </li>
                ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-[0_8px_30px_rgba(99,102,241,.25)] transition hover:shadow-[0_12px_40px_rgba(244,114,182,.35)]"
                >
                View Projects
                <svg
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                </a>

                <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white/85 backdrop-blur transition hover:border-white/25 hover:text-white"
                >
                Contact
                <svg className="size-4" viewBox="0 0 24 24" fill="none">
                    <path
                    d="M4 4h16v16H4z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    opacity=".35"
                    />
                    <path
                    d="M4 8h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    />
                </svg>
                </a>

                <a
                href="/JamesPDPP.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-300 hover:border-emerald-400/40 hover:text-emerald-200"
                >
                Download CV
                </a>
            </div>
        </div>

        {/* Right: Tilted “project stack” card cluster */}
        <div className="relative">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[2rem] bg-conic" />
            <div className="perspective-1200">
                <div className="preserve-3d group relative mx-auto w-full max-w-md">
                {projectCards.map((card, i) => (
                    <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30, rotateX: -12, rotateY: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                    className="preserve-3d relative mb-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,.25)] transition hover:border-white/20"
                    style={{
                        transform: `translateZ(${(3 - i) * 24}px) rotateX(-10deg) rotateY(8deg)`,
                    }}
                    >
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/6 to-white/2" />
                    <h3 className="text-lg font-semibold text-white">
                        {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{card.tag}</p>

                    {/* faux preview window */}
                    <div className="mt-4 h-28 overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))]">
                        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.06)_0px,rgba(255,255,255,.06)_1px,transparent_1px,transparent_8px)]" />
                    </div>
                    </motion.div>
                ))}
                </div>
            </div>

            {/* signature avatar ring */}
            <div className="absolute -bottom-6 -right-4 hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 backdrop-blur md:flex">
                <Image
                src="/profile.jpg"
                alt="James Patrick"
                width={30}
                height={30}
                className="rounded-full ring-2 ring-violet-400/60"
                />
                <span>Based in Pangasinan, PH</span>
            </div>
            </div>
        </div>
        </section>
    );
}

/* ====== Helpers ====== */
function MouseSpotlight() {
  // light follows the cursor for a subtle premium feel
    useEffect(() => {
        const el = document.getElementById("spotlight-root");
        const handle = (e: MouseEvent) => {
        if (!el) return;
        const { clientX: x, clientY: y } = e;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
        };
        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    return (
        <div
        id="spotlight-root"
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl [mask-image:radial-gradient(200px_200px_at_var(--x)_var(--y),black,transparent_60%)]"
        >
        <div className="h-full w-full bg-[radial-gradient(closest-side,rgba(168,85,247,.25),rgba(168,85,247,0))]" />
        </div>
    );
}
