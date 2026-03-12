import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Studio from "@/components/home/Studio";
import Contact from "@/components/home/Contact";
import { getAllStudioItems } from "@/lib/data";

export default function Page() {
  const studioItems = getAllStudioItems().slice(0, 6);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Studio items={studioItems} />
      <Contact />
    </div>
  );
}
