import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WorkExpSection from "@/components/home/WorkExpSection";
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen gap-20 py-10">
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <WorkExpSection />
    </main>
  );
}
