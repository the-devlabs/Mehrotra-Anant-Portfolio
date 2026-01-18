"use client";

import { useState, useRef } from "react";
import { ArrowRight, ChevronDown, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Services({ id }: { id?: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section
            id={id}
            className="relative z-30 -mt-[50px] md:-mt-[100px] pt-[150px] md:pt-[200px] pb-32 bg-black text-white min-h-screen"
            style={{
                // Inverted Folder Tab Shape
                clipPath: "polygon(0% 100px, 55% 100px, 60% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Heading */}
                <h2 className="text-4xl md:text-6xl font-bold font-oswald uppercase mb-16 tracking-tight text-center md:text-left">
                    Education & <span className="text-neutral-500">Experience</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32">

                    {/* Education Column */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4 text-neutral-500">
                            <GraduationCap className="w-6 h-6" />
                            <h2 className="text-xl font-mono uppercase tracking-widest">Education</h2>
                        </div>

                        <div className="relative pl-8 border-l border-white/10 space-y-2">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-white rounded-full" />
                            <h3 className="text-3xl md:text-4xl font-bold font-oswald text-white">
                                SRM Institute of Science and Technology
                            </h3>
                            <p className="text-xl text-neutral-400">Bachelor of Technology, CSE</p>
                            <div className="flex flex-wrap gap-4 text-sm font-mono text-neutral-500 pt-2">
                                <span>Chennai, India</span>
                                <span>•</span>
                                <span>2021 - 2025</span>
                                <span>•</span>
                                <span className="text-brand-gold">CGPA: 8.7</span>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-6 pt-8">
                            <div className="flex items-center gap-4 text-neutral-500">
                                <GraduationCap className="w-6 h-6 text-brand-gold" />
                                <h2 className="text-xl font-mono uppercase tracking-widest text-white">Certifications</h2>
                            </div>
                            <ul className="space-y-4 pl-4">
                                {[
                                    "IBM Generative AI Essentials for Software Developers",
                                    "Oracle Certified Generative AI Professional",
                                    "Python for Data Science and Machine Learning Bootcamp",
                                    "AWS Academy Machine Learning Foundation"
                                ].map((cert, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-400 hover:text-white transition-colors">
                                        <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mt-2.5" />
                                        <span className="text-lg">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Experience Column */}
                    <div className="space-y-12">
                        <div className="flex items-center gap-4 text-neutral-500">
                            <Briefcase className="w-6 h-6" />
                            <h2 className="text-xl font-mono uppercase tracking-widest">Experience</h2>
                        </div>

                        {/* Interactive Card */}
                        <div
                            className={cn(
                                "group relative border border-white/10 bg-white/5 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer",
                                isExpanded ? "bg-white/10 border-white/20" : "hover:border-white/30 hover:bg-white/10"
                            )}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {/* Card Header */}
                            <div className="p-8 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold font-oswald text-white mb-2">
                                            Intern at EY
                                        </h3>
                                        <p className="text-lg text-neutral-300">Technology Consultant Intern</p>
                                    </div>
                                    <div className={cn(
                                        "bg-white/10 p-2 rounded-full transition-transform duration-300",
                                        isExpanded ? "rotate-180" : "group-hover:translate-y-1"
                                    )}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm font-mono text-neutral-500 mb-4">
                                    <span>EY Global Delivery Services</span>
                                    <span>•</span>
                                    <span>Mar 2025 – Aug 2025</span>
                                    <span>•</span>
                                    <span>Chennai, India</span>
                                </div>

                                {/* Hover Prompt (Hidden when expanded) */}
                                <div className={cn(
                                    "flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-wider transition-opacity duration-300",
                                    isExpanded ? "opacity-0 h-0" : "opacity-0 group-hover:opacity-100"
                                )}>
                                    Know More <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <div
                                className={cn(
                                    "px-8 text-neutral-300 transition-all duration-500 ease-in-out overflow-hidden",
                                    isExpanded ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <ul className="space-y-3 list-disc pl-4 marker:text-brand-gold">
                                    <li>Automated 30+ test workflows using Python & Selenium WebDriver, cutting manual testing time by 40% and improving regression accuracy.</li>
                                    <li>Designed and executed test cases for policy issuance, claims, underwriting, and billing modules, ensuring 100% compliance with insurance domain requirements.</li>
                                    <li>Managed and tracked 200+ defects through Jira & HP ALM, reducing defect resolution turnaround time by 25%.</li>
                                    <li>Worked in Agile Scrum teams, leveraging Confluence, Git, and automation feasibility analysis, helping accelerate sprint cycles by 25%.</li>
                                    <li>Gained exposure to SDLC, STLC, automation frameworks, and QA best practices, bridging testing and development for higher-quality releases.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
