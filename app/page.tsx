import HeroSection from "@/components/home/HeroSection";
import ProjectSection from "@/components/home/ProjectSection";

function page() {
 
  return (
    <div className="w-full flex flex-col items-start gap-4">
     <HeroSection/>
     <ProjectSection/>
    </div>
  );
}

export default page;
