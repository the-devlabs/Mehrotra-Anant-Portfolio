"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
    Code2,
    Database,
    TestTube2,
    Wrench,
    GitBranch,
    Terminal,
    Cpu,
    Bug,
    ClipboardList,
    Layout,
    FileJson,
    Binary
} from "lucide-react";

// Categories data
const categories = [
    {
        title: "Languages & Scripting",
        icon: Code2,
        skills: [
            { name: "Python", icon: "python" },
            { name: "C", icon: "c" },
            { name: "C++", icon: "cpp" },
            { name: "JavaScript", icon: "js" },
            { name: "HTML", icon: "html" },
            { name: "CSS", icon: "css" },
            { name: "SQL", icon: "database" }
        ]
    },
    {
        title: "Testing & Automation",
        icon: TestTube2,
        skills: [
            { name: "Selenium WebDriver", icon: "selenium" },
            { name: "Test Case Design", icon: "test" },
            { name: "Defect Management", icon: "bug" },
            { name: "Automation Testing", icon: "bot" }
        ]
    },
    {
        title: "Tools",
        icon: Wrench,
        skills: [
            { name: "Jira", icon: "jira" },
            { name: "ALM", icon: "alm" },
            { name: "Git", icon: "git" },
            { name: "Streamlit", icon: "streamlit" }
        ]
    },
    {
        title: "ML & Data Science",
        icon: Cpu,
        skills: [
            { name: "TensorFlow", icon: "tf" },
            { name: "PyTorch", icon: "pytorch" },
            { name: "Scikit-learn", icon: "scikit" },
            { name: "Pandas", icon: "pandas" },
            { name: "NumPy", icon: "numpy" },
            { name: "Keras", icon: "keras" }
        ]
    }
];

// Simple Icon Components (SVG Paths)
// Simple Icon Components (SVG Paths)
const Icons: Record<string, React.FC<React.ComponentProps<"svg">>> = {
    python: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.13.37-.07.35-.03.32-.02.27 0 .21.02.13v5.69l.06.63.13.55.21.46.26.38.3.31.33.25.35.19.35.14.33.1.3.07.26.04.21.02H18.87l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.13-.37.07-.35.03-.32.02-.27 0-.21-.02-.13V8.5l-.06-.63-.13-.55-.21-.46-.26-.38-.3-.31-.33-.25-.35-.19-.35-.14-.33-.1-.3-.07-.26-.04-.21-.02h-4.66l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.13.37-.07.35-.03.32-.02.27 0 .21.02.13v3.75l.1.58.26.54.4.45.52.32.61.16H18.91l.63-.07.59-.22.5-.38.37-.53.21-.66.03-.78V8.5l-.06-.63-.13-.55.21-.46-.26-.38-.3-.31-.33-.25-.35-.19-.35-.14-.33-.1-.3-.07-.26-.04-.21-.02h-2.13l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.13.37-.07.35-.03.32-.02.27 0 .21.02.13M6.15 6.38l.68.17.58.33.43.48.24.64-.01.78-.26.7-1.46 1.48-.5.22-.59.14-.69.05H2.17l-.63-.06-.59-.21-.5-.38-.37-.53-.21-.66-.03-.78V5.38l.06-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02H6.15zM7.5 16.59l.68.17.58.33.43.48.24.64-.01.78-.26.7-1.46 1.48-.5.22-.59.14-.69.05H3.52l-.63-.06-.59-.21-.5-.38-.37-.53-.21-.66-.03-.78v-2.12l.06-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02H7.5z" /></svg>,
    js: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-1.035.402-2.941.402-4.965V11.031z" /></svg>,
    git: (props) => <GitBranch {...props} />,
    database: (props) => <Database {...props} />,
    c: (props) => <FileCode {...props} />,
    cpp: (props) => <FileCode {...props} />,
    html: (props) => <Code2 {...props} />,
    css: (props) => <Layout {...props} />,
    selenium: (props) => <TestTube2 {...props} />,
    test: (props) => <ClipboardList {...props} />,
    bug: (props) => <Bug {...props} />,
    bot: (props) => <Binary {...props} />,
    jira: (props) => <Trello {...props} />,
    alm: (props) => <Network {...props} />,
    streamlit: (props) => <Layout {...props} />,
    tf: (props) => <BrainCircuit {...props} />,
    pytorch: (props) => <BrainCircuit {...props} />,
    scikit: (props) => <Brain {...props} />,
    pandas: (props) => <FileJson {...props} />,
    numpy: (props) => <Binary {...props} />,
    keras: (props) => <Cpu {...props} />
};

import { Brain, FileCode, Trello, Network, BrainCircuit } from "lucide-react";

export default function TechStack({ id }: { id?: string }) {
    return (
        <section id={id} className="relative z-40 bg-black text-white py-20 md:py-32 -mt-0 md:-mt-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold font-oswald uppercase tracking-tight mb-4">
                        Tech Stack <span className="text-neutral-500">& Skills</span>
                    </h2>
                    <div className="h-1 w-24 bg-brand-gold" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {categories.map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-white/10 rounded-lg text-brand-gold">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold font-oswald uppercase tracking-wide">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {category.skills.map((skill, sIdx) => {
                                        const SkillIcon = Icons[skill.icon] || Terminal;
                                        return (
                                            <div key={sIdx} className="flex items-center gap-2.5 px-4 py-2 bg-black/40 rounded-full border border-white/10 hover:border-white/30 transition-colors cursor-default">
                                                <SkillIcon className="w-4 h-4 text-neutral-400" />
                                                <span className="text-sm font-medium text-neutral-200">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
