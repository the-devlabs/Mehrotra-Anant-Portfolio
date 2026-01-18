import Hero from "@/components/sections/Hero";
import WorkSlider from "@/components/sections/WorkSlider";
import Authority from "@/components/sections/Authority";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Authority id="about" />
      <WorkSlider id="projects" />
      <Services id="experience" />
      <TechStack id="tech-stack" />
      <Footer />
    </main>
  );
}
