"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, Trophy } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Authority({ id }: { id?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);



    const { contextSafe } = useGSAP({ scope: containerRef });

    useEffect(() => {
        // Particle System with Mouse Repulsion
        if (!particlesRef.current) return;

        const particleCount = 20;
        const colors = ["#FFC107", "#FFD700", "#DAA520"];
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement("div");
            const size = Math.random() * 6 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.position = "absolute";
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.borderRadius = "50%";
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.opacity = `${Math.random() * 0.6 + 0.2}`;
            p.style.filter = "blur(1px)"; // Soft look

            // Store original position for return
            p.dataset.ox = p.style.left;
            p.dataset.oy = p.style.top;

            particlesRef.current.appendChild(p);
            particles.push(p);

            // Floating Animation
            gsap.to(p, {
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: Math.random() * 0.8,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }

        // Mouse Move Interaction (Repel)
        const handleMouseMove = (e: MouseEvent) => {
            if (!particlesRef.current) return;
            const rect = particlesRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            particles.forEach(p => {
                const pRect = p.getBoundingClientRect();
                const pX = pRect.left - rect.left + pRect.width / 2;
                const pY = pRect.top - rect.top + pRect.height / 2;

                const dist = Math.hypot(mouseX - pX, mouseY - pY);
                const maxDist = 150;

                if (dist < maxDist) {
                    const angle = Math.atan2(mouseY - pY, mouseX - pX);
                    const force = (maxDist - dist) / maxDist;
                    const moveX = Math.cos(angle) * force * -50; // Repel by 50px max
                    const moveY = Math.sin(angle) * force * -50;

                    gsap.to(p, { x: `+=${moveX}`, y: `+=${moveY}`, duration: 0.5, overwrite: "auto" });
                } else {
                    // Return to floating state (not perfect return to origin, but stabilizing)
                    // Simplified: just let the float animation take over, or gently drift back. 
                    // For now, let's just let them drift.
                }
            });
        };

        particlesRef.current.addEventListener("mousemove", handleMouseMove);

        return () => {
            if (particlesRef.current) {
                particlesRef.current.innerHTML = '';
                particlesRef.current.removeEventListener("mousemove", handleMouseMove);
            }
        }
    }, []);

    useGSAP(() => {
        // Text Reveal Animation
        if (textRef.current) {
            const lines = textRef.current.querySelectorAll(".reveal-line");
            gsap.fromTo(lines,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section
            id={id}
            ref={containerRef}
            className="relative z-10 -mt-[40px] md:-mt-[150px] pt-[100px] md:pt-[180px] pb-16 md:pb-32 bg-white text-black min-h-screen"
            style={{
                // Top Tab Shape (Matches Screen 1->2 transition)
                // Left Low (100px), Slope Up, Right High (0px)
                clipPath: "polygon(0% 100px, 45% 100px, 50% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-x-20 items-start md:items-center">

                {/* Left Column: Badge */}
                <div className="col-span-12 md:col-span-4 flex justify-center md:justify-start relative w-full h-[250px] md:h-[400px] overflow-visible">
                    {/* Faint Wireframe Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        {/* Simple SVG Pattern for Hexagons */}
                        <svg width="100%" height="100%">
                            <defs>
                                <pattern id="hex-grid" width="100" height="174" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                                    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <path d="M50 87 L100 112 L100 162 L50 187 L0 162 L0 112 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hex-grid)" />
                        </svg>
                    </div>

                    {/* Active Badge Hexagon - Scaled on Mobile */}
                    <div className="absolute top-0 md:top-10 left-1/2 md:left-10 transform -translate-x-1/2 md:translate-x-0 group cursor-pointer scale-75 md:scale-100 origin-center md:origin-top-left">
                        <div className="relative w-48 h-52 transition-transform duration-500 group-hover:scale-110">
                            {/* Hexagon Shape CSS/SVG */}
                            <svg viewBox="0 0 100 115" className="w-full h-full drop-shadow-xl">
                                <path
                                    d="M50 0 L95 25 L95 75 L50 100 L5 75 L5 25 Z"
                                    fill="white"
                                    stroke="#e5e7eb"
                                    strokeWidth="1"
                                    className="transition-all duration-500 group-hover:stroke-[#FFC107] group-hover:stroke-[2px]"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                <Trophy className="w-8 h-8 text-[#FFC107] mb-2 transition-transform duration-500 group-hover:rotate-12" />
                                <span className="text-xs font-bold tracking-widest uppercase font-[family-name:var(--font-inter)]">About <br /> Me</span>
                            </div>
                        </div>
                        {/* Connector Line - Hidden on Mobile */}
                        <div className="hidden md:block absolute top-1/2 left-full w-24 h-[1px] bg-gray-200 origin-left transition-all duration-500 group-hover:w-32 group-hover:bg-[#FFC107]" />
                        <div className="hidden md:block absolute top-1/2 left-full translate-x-24 -translate-y-[4px] w-2 h-2 rounded-full border border-gray-300 bg-white group-hover:translate-x-32 group-hover:border-[#FFC107] transition-all duration-500" />
                    </div>
                </div>

                {/* Right Column: Text Content */}
                <div className="col-span-12 md:col-span-8 relative">
                    {/* Floating Particles Area */}
                    <div ref={particlesRef} className="absolute -top-20 -right-20 w-96 h-96 z-0" />

                    <div ref={textRef} className="space-y-4 md:space-y-6 relative z-10 text-center md:text-left">
                        <span className="inline-block text-base md:text-lg font-[family-name:var(--font-script)] italic text-gray-500 reveal-line block">
                            A little bit about me...
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-oswald uppercase leading-[0.9] tracking-tight">
                            <span className="reveal-line block">A software engineer deeply</span>
                            <span className="reveal-line block">passionate about <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-500">AI</span> and</span>
                            <span className="reveal-line block">building intelligent</span>
                            <span className="reveal-line block">solutions.</span>
                        </h2>
                    </div>


                </div>
            </div>



        </section>
    );
}
