"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const menuItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Tech Stack", id: "tech-stack" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    return (
        <nav ref={containerRef} className="fixed top-0 left-0 w-full z-50">
            {/* Top Bar */}
            <div className="relative z-50 px-8 py-6 w-full flex items-start justify-between mix-blend-difference text-white">
                {/* Logo */}
                <div
                    className="text-4xl font-bold tracking-tighter font-oswald text-neutral-400 mt-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    A/M
                </div>

                {/* Desktop Menu */}
                <div className={cn(
                    "hidden md:flex items-center gap-12 translate-y-4 transition-all duration-500 ease-in-out",
                    isScrolled ? "opacity-0 -translate-y-10 pointer-events-none" : "opacity-100 translate-y-4"
                )}>
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative cursor-pointer px-4 py-2"
                            onClick={() => scrollToSection(item.id)}
                        >
                            <div className="flex items-center gap-1 opacity-100 group-hover:opacity-70 transition-opacity duration-300">
                                <span className="text-sm uppercase tracking-wider font-medium text-white">
                                    {item.label}
                                </span>
                                <span className="text-brand-gold">/</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hamburger Menu Action */}
                <div className="flex items-center translate-y-2">
                    <button
                        onClick={toggleMobileMenu}
                        className={cn(
                            "flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-all duration-500",
                            isScrolled || isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
                        )}
                    >
                        <div className="flex flex-col gap-1.5 w-6">
                            <span className={cn("w-full h-0.5 bg-neutral-400 transition-all duration-300", isMobileMenuOpen && "rotate-45 translate-y-2")} />
                            <span className={cn("w-full h-0.5 bg-neutral-400 transition-all duration-300", isMobileMenuOpen && "opacity-0")} />
                            <span className={cn("w-full h-0.5 bg-neutral-400 transition-all duration-300", isMobileMenuOpen && "-rotate-45 -translate-y-2")} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
                    <div className="flex flex-col gap-8 text-center">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(item.id)}
                                className="text-5xl md:text-7xl font-oswald font-bold text-white uppercase hover:text-brand-gold transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
