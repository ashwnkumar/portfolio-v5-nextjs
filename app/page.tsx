import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Hero />
      <Experience />
    </div>
  );
}
