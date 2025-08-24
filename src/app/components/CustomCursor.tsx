"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button, .hoverable")) {
            setHovering(true);
        } else {
            setHovering(false);
        }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
        window.removeEventListener("mousemove", moveCursor);
        window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
        className={`pointer-events-none fixed z-[9999] rounded-full transition-transform duration-300 ${
  hovering
    ? "w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 opacity-50 blur-xl"
    : "w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-700 opacity-40 blur-lg"
}`}
        style={{
            top: `${position.y - (hovering ? 24 : 16)}px`,
            left: `${position.x - (hovering ? 24 : 16)}px`,
            transform: `translate3d(0, 0, 0)`,
        }}
        />
    );
}
