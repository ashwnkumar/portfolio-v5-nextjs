import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import AboutSection from "@/components/home/AboutSection";
import CurrentWork from "@/components/home/CurrentWork";
import QuoteGenerator from "@/components/home/QuoteGenerator";
import ThemeSwitcher from "@/components/home/ThemeSwitcher";
import LinkCard from "@/components/LinkCard";
import ProjectCard from "@/components/ProjectCard";
import { admin } from "@/constants/admin";
import { projects } from "@/constants/projects";
import { CodeXml, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <GridContainer>
      {/* Title and tagline */}
      <GridCard className="col-start-1 col-end-7 lg:col-end-5 row-start-1 row-end-3">
        <div className="w-full h-full flex flex-col items-start justify-between">
          <span className="text-4xl font-bold text-brand">
            <CodeXml size={40} />
          </span>
          <h1 className="text-xl lg:text-3xl font-semibold text-primary">
            Developer, Designer, Visual Storyteller.
          </h1>
        </div>
      </GridCard>

      {/* About section */}
      <GridCard className="col-start-1 lg:col-start-5 col-end-13 lg:col-end-10 row-start-3 lg:row-start-1 row-end-6 ">
        <AboutSection />
      </GridCard>

      {/* Profile image */}
      <GridCard className="col-start-7 lg:col-start-10 col-end-13 row-start-1 row-end-3 lg:row-end-4 !p-3 !lg:p-5">
        <div className="w-full h-full relative min-h-full">
          <Image
            src={admin.profile}
            alt="Ashwin Kumar | MERN Stack Developer"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </GridCard>

      {/* Quote generator */}
      <GridCard className="col-start-1 col-end-7 lg:col-end-5 row-start-6 lg:row-start-3 row-end-9 lg:row-end-6">
        <QuoteGenerator />
      </GridCard>

      {/* Theme switcher */}
      <GridCard className="col-start-7 lg:col-start-10 col-end-13 row-start-6 lg:row-start-4 row-end-9 lg:row-end-7 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <ThemeSwitcher />
      </GridCard>

      {/* Current work */}
      <GridCard className="col-start-1 col-end-13 lg:col-end-7 row-start-9 lg:row-start-6 row-end-12 lg:row-end-9">
        <CurrentWork />
      </GridCard>

      {/* Location and coding since */}
      <GridCard className="col-start-1 lg:col-start-7 col-end-8 lg:col-end-10 row-start-12 lg:row-start-6 row-end-14 lg:row-end-9">
        <div className="w-full h-full flex flex-col items-start justify-start gap-5">
          <h3 className="text-lg lg:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Based Out Of:
          </h3>
          <p className="text-xl lg:text-2xl text-primary font-medium flex items-start justify-center gap-2">
            <span className="text-brand mt-0.5">
              <MapPin size={32} />
            </span>
            {admin.location}
          </p>
        </div>
      </GridCard>

      <GridCard className="col-start-8 lg:col-start-10 col-end-13 row-start-12 lg:row-start-7 row-end-14 lg:row-end-9">
        <div className="w-full h-full flex flex-col items-start justify-start gap-5">
          <h3 className="text-lg lg:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Coding Since:
          </h3>
          <p className="text-2xl text-primary font-medium flex items-start justify-center gap-2">
            2023
          </p>
        </div>
      </GridCard>

      <div className="col-start-1 col-end-13 row-start-14 lg:row-start-9 row-end-15 lg:row-end-10 flex items-center justify-center w-full gap-5">
        <h2 className="text-2xl lg:text-3xl font-medium text-primary whitespace-nowrap">
          Featured Projects
        </h2>
        <div className="border border-brand w-full" />
      </div>

      {projects.slice(0, 2).map((project, i) => (
        <GridCard
          key={project.id}
          className={`${
            i === 0
              ? "col-start-1 col-end-13 row-start-15 row-end-20 lg:col-start-1 lg:col-end-7 lg:row-start-10 lg:row-end-15"
              : "col-start-1 col-end-13 row-start-20 row-end-25 lg:col-start-7 lg:col-end-13 lg:row-start-10 lg:row-end-15"
          }`}
        >
          <ProjectCard project={project} />
        </GridCard>
      ))}

      <div className="col-start-1 col-end-13 row-start-25 row-end-26 lg:row-start-15 lg:row-end-16">
        {projects.length > 2 && (
          <LinkCard
            label="See All Projects"
            href="/projects"
            className="w-full h-full text-xl lg:!bg-gray lg:hover:!bg-brand-faded"
          />
        )}
      </div>
    </GridContainer>
  );
}
