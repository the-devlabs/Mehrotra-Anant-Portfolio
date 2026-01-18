"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!followerRef.current) return;

        // Follower with lag
        const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.3, ease: "power3" });
        const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.3, ease: "power3" });

        const width = 40; // Follower width

        const onMouseMove = (e: MouseEvent) => {
            // Standard System Pointer handles itself. We just move the follower.

            xToFollower(e.clientX - width / 2);
            yToFollower(e.clientY - width / 2);
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <>
            {/* Ghost Follower */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-[40px] h-[40px] border border-white/20 rounded-full pointer-events-none z-[99999] mix-blend-difference will-change-transform" // Increased z-index
            />
        </>
    );
}
