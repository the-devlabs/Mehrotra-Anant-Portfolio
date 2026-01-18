Product Requirements Document (PRD): Never Settle Clone
Target: Pixel-perfect replication of neversettle.it Tech Stack Preference: Next.js (App Router), Tailwind CSS, GSAP (or Framer Motion).

1. Visual Identity & Design System
Before building screens, you need these core tokens.

Primary Font: Oswald or Bebas Neue (Uppercase, Condensed, Bold) — Used for "BUILDING", "NEVER SETTLE".

Secondary Font: Inter or DM Sans (Clean, legible) — Used for body text.

Accent Font: Handwritten / Script style (e.g., "Northwell" or "Signature") — Crucial for the "Websites/Products" animation in the Hero.

Colors:

Background: #0a0a0a (Near Black)

Text Primary: #ffffff (White)

Text Secondary: #9ca3af (Gray-400)

Brand Gold: #c6a87c (Muted Gold) — Used for the "active" lines in the Services section and "Award" icons.

2. Screen-Wise Deduction (Detailed Breakdown)
Screen 1: The "Dynamic" Hero
Visuals:

Main Headline: "Building" (Block Font) + "Websites/Products/Apps" (Script Font).

Sub-text: "On Time | On Budget | Never Settle" (Bottom Left).

Nav: Transparent initially, solid black on scroll.

Key Animation (The "Write-on" Effect):

The word next to "Building" changes. It doesn't just fade; it looks like it's being written out in real-time.

Dev Note: You can achieve this by exporting the handwritten words as SVGs and animating the stroke-dashoffset CSS property, or using a library like Typewriter-effect with a script font.

Interaction:

Parallax Scroll: As you scroll down, the entire Hero text block moves upward slightly slower than the scroll speed (approx 0.5x speed), creating depth before fading out.

Screen 2: Trusted By (Infinite Marquee)
Visuals:

A continuous strip of grayed-out logos (Amazon, Urban Mattress, etc.).

Animation:

Infinite Loop: The logos move left continuously without a visible "seam."

Dev Note: Duplicate the logo array (e.g., [...logos, ...logos]) and translate the container -50% over X seconds linearly.

Interaction:

Hover Pause: The movement MUST stop immediately when the mouse enters the track.

Screen 3: The "Sticky" Services (The Hardest Part)
Visuals:

Layout: A 2-Column Layout.

Left Column: Sticky Title "Agency Services" + Subtext "For Complex Business...".

Right Column: A vertical list of services (01 Branding, 02 Web Dev, etc.).

Logic & Animation:

The Pin: The Left Column becomes position: sticky; top: 100px; so it stays fixed while the Right Column scrolls.

Active State: As "01 Branding" crosses a specific threshold (e.g., center of screen):

The text turns White (from Gray).

The horizontal line above it turns Gold.

The text scales up slightly (approx 1.05x).

Screen 4: Awards & Impact (Parallax Grid)
Visuals:

Left: "Our Awards" text.

Right: A horizontal swipeable list or grid of badges (Clutch, CSS Awards).

Impact Counters:

Large numbers: "281%", "1,500+".

Trigger: The count-up animation (0 to 281) starts only when the element enters the viewport (Use IntersectionObserver).

Screen 5: Client Projects (The "Reveal")
Visuals:

Large, high-res cards (Amazon, Gesa, Lala Daisy).

Animation:

Scroll Reveal: As each image enters the viewport, it has a slight Scale Down effect (starts at 1.1 scale and shrinks to 1.0). This "settling" effect feels premium.

Hover Effect:

Mouse over image -> Image dims slightly -> "See Case Study" button/text appears or slides up from the bottom.

Screen 6: Team & Footer (The "Curtain")
Visuals:

Grid of team faces.

Footer: A massive black section with "Never Settle" and a contact form.

The "Curtain" Effect:

The Footer is fixed at the bottom (z-index: -1).

The Team section (the last white/content section) has a margin-bottom equal to the footer's height.

Result: As you scroll the Team section up, it reveals the Footer sitting underneath it.

3. File & Folder Structure (Production Grade)
Since you are not a junior dev, I have structured this for scalability using Next.js App Router features.

Plaintext

/src
 ├── /app
 │    ├── /layout.tsx        # Global Layout (Lenis Scroll Provider here)
 │    ├── /page.tsx          # Composition of all sections
 │    └── /globals.css       # Tailwind directives & base styles
 │
 ├── /components
 │    ├── /ui                # Reusable atoms
 │    │    ├── Button.tsx
 │    │    ├── AnimatedCounter.tsx  # For the "281%" stats
 │    │    └── Marquee.tsx          # Reusable infinite loop component
 │    │
 │    ├── /layout            # Structural components
 │    │    ├── Navbar.tsx
 │    │    ├── StickyCursor.tsx     # The custom circle cursor
 │    │    └── Footer.tsx           # The "Curtain" footer
 │    │
 │    ├── /sections          # The "Screens" (Big components)
 │    │    ├── Hero.tsx             # Screen 1 (Handwritten anim)
 │    │    ├── TrustedBy.tsx        # Screen 2 (Logos)
 │    │    ├── ServicesSticky.tsx   # Screen 3 (The complex GSAP part)
 │    │    ├── AwardsGrid.tsx       # Screen 4
 │    │    ├── CaseStudies.tsx      # Screen 5
 │    │    └── TeamGrid.tsx         # Screen 6
 │
 ├── /hooks
 │    ├── useScroll.ts       # Hook to access Lenis instance
 │    ├── useMouse.ts        # For cursor tracking logic
 │    └── useDimension.ts    # For responsive calculations
 │
 ├── /lib
 │    ├── animations.ts      # GSAP timeline presets (FadeIn, Reveal)
 │    └── constants.ts       # Text content (Don't hardcode text in JSX)
 │
 └── /public
      ├── /fonts             # Local font files (if not using Google Fonts)
      └── /images            # Optimized WebP images
4. Deliverables Checklist
Repository: Clean Git history.

Performance:

Use next/image for all heavy assets in Screen 5.

Lazy load the video/heavy animations in Screen 1.

Responsiveness:

Mobile: The "Sticky Services" (Screen 3) usually collapses into a simple vertical accordion on mobile. Do not try to keep the 2-column sticky layout on screens < 768px.

Polish:

Lenis Scroll: This is mandatory. The native browser scroll is too "jerky" for this premium feel. Lenis adds that heavy lerp (linear interpolation) smoothing.