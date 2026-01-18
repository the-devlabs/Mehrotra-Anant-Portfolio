"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import FireflyParticles from "@/components/ui/FireflyParticles";

const words = ["AI", "Python", "LLMs"];

export default function Hero() {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptTextRef = useRef<HTMLSpanElement>(null);

    // Mouse Move Parallax & Tilt Logic
    useGSAP(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 1. Script Text Parallax (Inverted movement)
            if (scriptTextRef.current) {
                const xPosScript = ((clientX / width) - 0.5) * -30;
                const yPosScript = ((clientY / height) - 0.5) * -30;

                gsap.to(scriptTextRef.current, {
                    x: xPosScript,
                    y: yPosScript,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }

            // 2. Review Card Tilt - REMOVED for strict vertical float
            // const card = document.querySelector(".review-card");
            // if (card) { ... }

        };

        // 3. Floating Animation for Review Card (Up to Down)
        gsap.to(".review-card", {
            y: 20,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef }); // Scope properly set

    // Word cycling logic with "Write-on" animation
    useEffect(() => {
        const el = scriptTextRef.current;
        if (!el) return;

        // Animate In (Write-on)
        gsap.fromTo(el,
            { clipPath: "polygon(0 0, 0% 100%, 0% 100%, 0 0)", opacity: 1 }, // Start masked
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 1.5, ease: "power4.out" } // Reveal
        );

        // Schedule exit
        const timer = setTimeout(() => {
            gsap.to(el, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % words.length);
                }
            });
        }, 4000);

        return () => clearTimeout(timer);
    }, [index]);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden pt-20">

            {/* Reusable Particles Component - Golden Fireflies */}
            <FireflyParticles count={25} colors={["#D4AF37", "#FFD700", "#FFF"]} />

            {/* Eyebrow */}
            <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] text-white uppercase mb-4 opacity-80">
                SOFTWARE ENGINEER
            </h3>

            {/* Main Headline */}
            <div className="relative z-10 mt-12 md:mt-0">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-[family-name:var(--font-syne)] font-bold bg-gradient-to-r from-[#F9F6EE] to-[#FFF8DC] bg-clip-text text-transparent uppercase leading-[0.9] tracking-tight mb-4 text-center md:text-left">
                    Hi My Name Is Anant Mehrotra
                </h1>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-[family-name:var(--font-syne)] font-bold bg-gradient-to-r from-[#F9F6EE] to-[#FFF8DC] bg-clip-text text-transparent uppercase leading-[0.9] tracking-tight flex flex-col md:flex-row items-center md:items-center flex-wrap justify-center md:justify-start">
                    <span>I Work With</span>
                    {/* Dynamic Script Word */}
                    <div className="relative inline-block mt-2 md:mt-0 ml-0 md:ml-8 z-20 pointer-events-none min-w-[200px] md:min-w-[300px] h-[0.9em] text-center md:text-left">
                        <span
                            ref={scriptTextRef}
                            className="absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 text-5xl md:text-7xl lg:text-9xl font-[family-name:var(--font-syne)] font-bold text-brand-gold bg-gradient-to-r from-brand-gold to-[#eebb77] bg-clip-text text-transparent normal-case tracking-normal whitespace-nowrap"
                            style={{
                                filter: "drop-shadow(0 0 15px rgba(198, 168, 124, 0.3))",
                                willChange: "transform, opacity, clip-path",
                                lineHeight: 0.9,
                                height: "auto",
                                width: "auto",
                                overflow: "visible"
                            }}
                        >
                            {words[index]}
                        </span>
                    </div>
                </h1>
            </div>

            {/* Subtext -> Replaced with Social Icons */}
            <div className="flex items-center gap-8 mt-12">
                <a href="https://github.com/anant22027" target="_blank" className="text-white/80 hover:text-brand-gold transition-colors duration-300 transform hover:scale-110">
                    <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" className="text-white/80 hover:text-brand-gold transition-colors duration-300 transform hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mehrotraanant10@gmail.com" className="text-white/80 hover:text-brand-gold transition-colors duration-300 transform hover:scale-110">
                    <Mail className="w-6 h-6" />
                </a>
            </div>

            {/* Trusted By Anchor - REMOVED per user request */}

            {/* Floater / Social Proof */}
            <div className="absolute top-[40%] right-12 transform -translate-y-1/2 hidden xl:block perspective-1000">
                <div className="review-card bg-neutral-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-64 shadow-2xl" style={{ transformStyle: "preserve-3d" }}>
                    <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <svg key={i} className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        ))}
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4 font-[family-name:var(--font-syne)] font-bold">&quot;Automating Software On the Go&quot;</p>

                    {/* Cut corner visual simulation */}
                    <div className="absolute bottom-[-10px] right-[-10px] w-8 h-8 bg-black transform rotate-45 translate-x-1/2 translate-y-1/2 z-10"></div>
                </div>
            </div>

        </section>
    );
}
