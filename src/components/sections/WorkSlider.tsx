"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";



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
        title: "NLP-Based Automated Email Classifier",
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
        title: "LLM-Powered Interactive PDF Assistant",
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



export default function WorkSlider({ id }: { id?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

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
                <h2 className="hidden md:block absolute -top-20 right-12 text-6xl md:text-7xl font-bold font-oswald text-black/50 uppercase tracking-tighter mix-blend-overlay pointer-events-none">
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

                                        <h3 className={cn("text-3xl md:text-5xl font-black font-oswald uppercase leading-[0.9]", project.accent)}>
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
