"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 flex w-[90%] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        >
        {/* Logo */}
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            JPPdp.dev
        </h1>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-white/80">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
            <li key={item} className="relative group">
                <a
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:text-white"
                >
                {item}
                </a>
                {/* Hover underline animation */}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
            ))}
            <li>
                <a href="/photoshop" className="hover:text-purple-400">Switch Mode</a>
            </li>
        </ul>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
            <a
            href="/JamesPDPP.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-gradient-to-r from-violet-500/20 to-pink-500/20 px-4 py-2 text-sm font-semibold text-white/90 hover:border-violet-400 hover:shadow-[0_4px_20px_rgba(168,85,247,0.35)] transition"
            >
            Download CV
            </a>
        </div>
        </motion.nav>
    );
}
