"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FireflyParticlesProps {
    count?: number;
    className?: string;
    colors?: string[]; // Allow custom colors for particles
    area?: { minX: number; maxX: number; minY: number; maxY: number }; // Customizable area
}

export default function FireflyParticles({
    count = 20,
    className,
    colors = ["#D4AF37"], // Default Brand Gold
    area
}: FireflyParticlesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Clear existing just in case
        containerRef.current.innerHTML = "";

        const particles = Array.from({ length: count });
        particles.forEach(() => {
            const el = document.createElement("div");
            el.className = cn("absolute w-1 h-1 rounded-full blur-[1px] opacity-0", className);
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Positioning Logic
            // If area is provided, use it. Otherwise default to a broad area relative to container
            // We use percentages for responsiveness if no specific px area

            const initialX = area
                ? gsap.utils.random(area.minX, area.maxX)
                : gsap.utils.random(0, containerRef.current?.offsetWidth || 1000);

            const initialY = area
                ? gsap.utils.random(area.minY, area.maxY)
                : gsap.utils.random(0, containerRef.current?.offsetHeight || 500);

            gsap.set(el, {
                x: initialX,
                y: initialY,
            });

            containerRef.current?.appendChild(el);

            // Blink Animation
            gsap.to(el, {
                opacity: gsap.utils.random(0.4, 0.8),
                duration: gsap.utils.random(1, 2),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Float Animation
            gsap.to(el, {
                x: `+=${gsap.utils.random(-100, 100)}`,
                y: `+=${gsap.utils.random(-50, 50)}`,
                duration: gsap.utils.random(3, 5),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

    }, { scope: containerRef }); // Re-run if props change? Maybe. For now scope is enough.

    return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10" />;
}
