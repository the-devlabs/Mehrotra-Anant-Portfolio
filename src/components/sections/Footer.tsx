"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-50 bg-neutral-950 text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/10 pt-12">

                    {/* Brand / Name */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-oswald font-bold uppercase tracking-widest mb-2">
                            Anant Mehra
                        </h2>
                        <p className="text-neutral-500 font-mono text-sm">
                            Software Engineer & AI Enthusiast
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-8">
                        <a href="mailto:mehrotraanant10@gmail.com" className="text-neutral-400 hover:text-brand-gold transition-colors">
                            <Mail className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" className="text-neutral-400 hover:text-brand-gold transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://github.com/anant22027" target="_blank" className="text-neutral-400 hover:text-brand-gold transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-neutral-600 text-xs font-mono uppercase tracking-widest">
                            © {new Date().getFullYear()} Anant Mehra.
                        </p>
                        <p className="text-neutral-700 text-[10px] mt-1">
                            Designed & Built with Passion
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
