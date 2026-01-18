"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, EffectCreative, Parallax, Autoplay, EffectFade } from "swiper/modules";
import { ArrowLeft, ArrowRight, Github, Brain, Database, FileText, Terminal, Layers, Sparkles, AppWindow, Sigma } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

// Custom Python Icon Component (Simple Icons)
const PythonIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.13.37-.07.35-.03.32-.02.27 0 .21.02.13v5.69l.06.63.13.55.21.46.26.38.3.31.33.25.35.19.35.14.33.1.3.07.26.04.21.02H18.87l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.13-.37.07-.35.03-.32.02-.27 0-.21-.02-.13V8.5l-.06-.63-.13-.55-.21-.46-.26-.38-.3-.31-.33-.25-.35-.19-.35-.14-.33-.1-.3-.07-.26-.04-.21-.02h-4.66l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.13.37-.07.35-.03.32-.02.27 0 .21.02.13v3.75l.1.58.26.54.4.45.52.32.61.16H18.91l.63-.07.59-.22.5-.38.37-.53.21-.66.03-.78V8.5l-.06-.63-.13-.55.21-.46-.26-.38-.3-.31-.33-.25-.35-.19-.35-.14-.33-.1-.3-.07-.26-.04-.21-.02h-2.13l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.13.37-.07.35-.03.32-.02.27 0 .21.02.13M6.15 6.38l.68.17.58.33.43.48.24.64-.01.78-.26.7-1.46 1.48-.5.22-.59.14-.69.05H2.17l-.63-.06-.59-.21-.5-.38-.37-.53-.21-.66-.03-.78V5.38l.06-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02H6.15zM7.5 16.59l.68.17.58.33.43.48.24.64-.01.78-.26.7-1.46 1.48-.5.22-.59.14-.69.05H3.52l-.63-.06-.59-.21-.5-.38-.37-.53-.21-.66-.03-.78v-2.12l.06-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02H7.5z" />
    </svg>
);

interface TechItem {
    name: string;
    icon: any; // Using 'any' for Lucide/Custom components flexibility
}

interface Project {
    id: string;
    title: string;
    tech: string[];
    description: string;
    stats: string;
    link: string;
    bg: string;
    accent: string;
    text: string;
    image: string;
}

const projects: Project[] = [
    {
        id: "01",
        title: "AI Email Classifier",
        tech: ["Python", "Pandas", "NumPy", "scikit-learn"],
        description: "Developed an advanced machine learning-based email classification system that processes and cleans text using NLP techniques to automatically categorize and route emails, improving operational efficiency and customer service.",
        stats: "92% classification accuracy • 60% less manual triage",
        link: "https://github.com/anant22027/Email-Classification",
        bg: "#FFC107", // Yellow
        accent: "text-black",
        text: "text-black/80",
        image: "/projects/email.png"
    },
    {
        id: "02",
        title: "Ace Poker Engine",
        tech: ["Python"],
        description: "Developed a poker game with complete card distribution and hand evaluation logic, achieving 95% unit test coverage through Test-Driven Development (TDD) and Object-Oriented Programming, reducing post-release bugs by 70% and ensuring reliable gameplay.",
        stats: "95% unit test coverage • 70% fewer bugs",
        link: "https://github.com/anant22027/Test-Driven-Poker-Game-Development-in-Python",
        bg: "#dcfce7", // Emerald Light
        accent: "text-emerald-950",
        text: "text-emerald-900/80",
        image: "/projects/poker.png"
    },
    {
        id: "03",
        title: "PDF AI Assistant",
        tech: ["Python", "Streamlit", "LangChain", "FAISS", "Google Gemini AI", "PyPDF2"],
        description: "Developed an AI-powered PDF assistant using LangChain and FAISS for semantic search, integrating Google Gemini AI to deliver context-aware responses. Built a Streamlit-based web interface enabling interactive processing of multiple 50+ page PDFs in under 2 seconds.",
        stats: "Process 50+ pages in <2s • 80% efficiency boost",
        link: "#",
        bg: "#FF5252", // Red
        accent: "text-black",
        text: "text-black/80",
        image: "/projects/pdf.png"
    }
];

// Helper to get icon for tech name
const getTechIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("python")) return PythonIcon;
    if (lower.includes("github")) return Github;
    if (lower.includes("ai") || lower.includes("gemini") || lower.includes("nlp")) return Sparkles;
    if (lower.includes("data") || lower.includes("pandas") || lower.includes("numpy") || lower.includes("faiss")) return Database;
    if (lower.includes("scikit") || lower.includes("learning")) return Brain;
    if (lower.includes("streamlit") || lower.includes("app")) return AppWindow;
    if (lower.includes("pdf")) return FileText;
    return Terminal; // Default
};

export default function WorkSlider({ id }: { id?: string }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleImageEnter = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.stop();
        }
    };

    const handleImageLeave = () => {
        if (swiperRef.current && swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start();
        }
    };

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    return (
        <section
            id={id}
            ref={containerRef}
            className={cn(
                "relative z-20 -mt-[80px] md:-mt-[150px] cursor-none",
                "cursor-default"
            )}
        >
            {/* Custom Navigation & Title */}
            <div className="absolute top-[80px] md:top-[120px] left-0 right-0 z-30 px-6 md:px-12 flex justify-between items-end pointer-events-none">
                {/* Nav Buttons */}
                <div className="flex gap-4 pointer-events-auto">
                    <button onClick={handlePrev} className="bg-white text-black p-3 md:p-4 rounded-full hover:bg-brand-gold hover:scale-110 transition-all shadow-lg">
                        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button onClick={handleNext} className="bg-white text-black p-3 md:p-4 rounded-full hover:bg-brand-gold hover:scale-110 transition-all shadow-lg">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Section Title - Moved to avoid overlap and sit in free space */}
                <h2 className="hidden md:block absolute -top-20 right-12 text-6xl md:text-7xl font-bold font-oswald text-black/10 uppercase tracking-tighter mix-blend-overlay pointer-events-none">
                    Projects
                </h2>
            </div>

            <div
                className="relative w-full min-h-[140vh] md:min-h-screen"
                style={{
                    clipPath: "polygon(0% 100px, 55% 100px, 60% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
            >
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    speed={800}
                    loop={true}
                    modules={[Autoplay]}
                    className="h-full w-full"
                >
                    {projects.map((project, idx) => (
                        <SwiperSlide key={idx} className="w-full h-full">
                            {/* Slide Container: MUST have opaque background to prevent bleed-through */}
                            <div
                                className="flex flex-col lg:flex-row min-h-[140vh] lg:min-h-full items-center gap-8 lg:gap-20 px-4 md:px-12 pt-[120px] md:pt-[140px] pb-[250px] md:pb-64 transition-colors duration-700"
                                style={{ backgroundColor: project.bg }}
                            >

                                {/* Left: Image / Visual */}
                                <div
                                    className="w-full lg:w-1/2 relative group"
                                    data-swiper-parallax="-200"
                                    onMouseEnter={handleImageEnter}
                                    onMouseLeave={handleImageLeave}
                                >
                                    <div className="relative aspect-[4/3] bg-black overflow-hidden transform transition-transform duration-700 hover:scale-[1.02] shadow-2xl rounded-2xl border-4 border-black/5">
                                        <div className="absolute inset-0 bg-neutral-900" />

                                        {/* Actual Project Image */}
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                        {/* Decorative Borders */}
                                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-xl" />
                                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/30 rounded-bl-xl" />
                                    </div>
                                    <div className="absolute -bottom-16 -left-8 hidden lg:block">
                                        <span className="text-9xl font-oswald text-black/5 font-bold">{project.id}</span>
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="w-full lg:w-1/2 relative z-10" data-swiper-parallax="100">
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-black/50 pl-6">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full border border-black/10">
                                                <Github className="w-4 h-4 text-black/70" />
                                                <span className="text-xs font-bold uppercase tracking-wider text-black/70">Github</span>
                                            </div>
                                        </div>

                                        <h3 className={cn("text-4xl md:text-6xl font-black font-oswald uppercase leading-[0.9]", project.accent)}>
                                            {project.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-4 md:space-y-8 relative z-20 mt-6 md:mt-8">
                                        <div className="flex flex-wrap gap-2 md:gap-3">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-3 py-1 bg-black/5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider backdrop-blur-sm border border-black/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <p className={cn("text-lg md:text-xl font-medium leading-relaxed max-w-xl", project.text)}>
                                            {project.description}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col mr-8">
                                                <span className="text-xs font-bold uppercase tracking-wider text-black/40">Impact</span>
                                                <span className="text-sm font-bold text-black/80">{project.stats}</span>
                                            </div>

                                            {/* View Project Button */}
                                            {/* View Project Button */}
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative px-6 py-3 bg-black text-white font-bold uppercase tracking-wider overflow-hidden rounded-sm hover:shadow-lg transition-shadow inline-flex items-center"
                                            >
                                                <span className="relative z-10 group-hover:text-brand-gold transition-colors flex items-center gap-2">
                                                    View Project <ArrowRight className="w-4 h-4" />
                                                </span>
                                                <div className="absolute inset-0 bg-neutral-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <style jsx global>{`
           .swiper-button-prev-custom, .swiper-button-next-custom {
               pointer-events: auto;
           }
        `}</style>
        </section >
    );
}
