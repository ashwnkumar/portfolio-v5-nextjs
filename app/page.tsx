import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectSection from "@/components/home/ProjectSection";
import StudioSection from "@/components/home/StudioSection";

function page() {
 
  return (
    <div className="w-full flex flex-col items-start gap-4">
     <HeroSection/>
     <ProjectSection/>
     <StudioSection/>
     <ContactSection/>
    </div>
  );
}

export default page;
