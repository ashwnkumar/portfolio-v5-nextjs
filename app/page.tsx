import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Projects } from "@/components/sections/projects";
import { Beyond } from "@/components/sections/beyond";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 sm:px-8">
        <Hero />
        <About />
        <Work />
        <Projects />
        <Beyond />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
