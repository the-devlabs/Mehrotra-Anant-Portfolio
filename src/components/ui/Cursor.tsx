"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cursorRef.current || !followerRef.current) return;

        // Use GSAP quickTo for performance
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0, ease: "none" });
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0, ease: "none" });

        // Follower with lag
        const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.3, ease: "power3" });
        const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.3, ease: "power3" });

        const width = 40; // Follower width
        const cursorWidth = 8; // Pointer width (if we were hiding custom, but we are using native + follower)

        const onMouseMove = (e: MouseEvent) => {
            // Native cursor is visible, so we don't strictly need a custom dot, 
            // but user asked for "Standard System Pointer" + "Ghost Follower".
            // The standard system pointer handles itself. We just move the follower.

            // We'll hide the small dot cursorRef if we are using system pointer, 
            // OR we can keep it as a tiny "center" reference. 
            // "Primary State: Standard System Pointer" -> implies we might NOT need the little dot.
            // But let's keep the follower.

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
