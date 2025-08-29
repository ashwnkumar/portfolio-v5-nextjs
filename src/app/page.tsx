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
import { ArrowUpRight, CodeXml, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <GridContainer>
      <GridCard className="col-start-1 col-end-7 md:col-end-5 row-start-1 row-end-3">
        <div className="w-full h-full flex flex-col items-start justify-between">
          <span className="text-4xl font-bold text-brand">
            <CodeXml size={40} />
          </span>
          <h3 className="text-xl md:text-3xl font-semibold text-primary">
            Developer, Designer, Visual Storyteller.
          </h3>
        </div>
      </GridCard>

      <GridCard className="col-start-1 md:col-start-5 col-end-13 md:col-end-10 row-start-3 md:row-start-1 row-end-6 ">
        <AboutSection />
      </GridCard>

      <GridCard className="col-start-7 md:col-start-10 col-end-13 row-start-1 row-end-3 md:row-end-4 !p-3 !md:p-5">
        <div className="w-full h-full relative min-h-full">
          <Image
            src={admin.profile}
            alt="profile"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </GridCard>

      <GridCard className="col-start-1 col-end-7 md:col-end-5 row-start-6 md:row-start-3 row-end-9 md:row-end-6">
        <QuoteGenerator />
      </GridCard>

      <GridCard className="col-start-7 md:col-start-10 col-end-13 row-start-6 md:row-start-4 row-end-9 md:row-end-7 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <ThemeSwitcher />
      </GridCard>

      <GridCard className="col-start-1 col-end-13 md:col-end-7 row-start-9 md:row-start-6 row-end-12 md:row-end-9">
        <CurrentWork />
      </GridCard>

      <GridCard className="col-start-1 md:col-start-7 col-end-8 md:col-end-10 row-start-12 md:row-start-6 row-end-14 md:row-end-9">
        <div className="w-full h-full flex flex-col items-start justify-start gap-5">
          <h3 className="text-base md:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Based Out Of:
          </h3>
          <p className="text-xl md:text-2xl text-primary font-medium flex items-start justify-center gap-2">
            <span className="text-brand mt-0.5">
              <MapPin size={32} />
            </span>
            {admin.location}
          </p>
        </div>
      </GridCard>

      <GridCard className="col-start-8 md:col-start-10 col-end-13 row-start-12 md:row-start-7 row-end-14 md:row-end-9">
        <div className="w-full h-full flex flex-col items-start justify-start gap-5">
          <h3 className="text-base md:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Coding Since:
          </h3>
          <p className="text-2xl text-primary font-medium flex items-start justify-center gap-2">
            2023
          </p>
        </div>
      </GridCard>

      <div className="col-start-1 col-end-13 row-start-14 md:row-start-9 row-end-15 md:row-end-10 flex items-center justify-center w-full gap-5">
        <h2 className="text-2xl md:text-3xl font-medium text-primary whitespace-nowrap">
          Featured Projects
        </h2>
        <div className="border border-brand w-full" />
      </div>

      {projects.slice(0, 2).map((project, i) => (
        <GridCard
          key={project.id}
          className={`${
            i === 0
              ? "col-start-1 col-end-13 row-start-15 row-end-20 md:col-start-1 md:col-end-7 md:row-start-10 md:row-end-15"
              : "col-start-1 col-end-13 row-start-20 row-end-25 md:col-start-7 md:col-end-13 md:row-start-10 md:row-end-15"
          }`}
        >
          <ProjectCard project={project} />
        </GridCard>
      ))}

      <div className="col-start-1 col-end-13 row-start-25 row-end-26 md:row-start-15 md:row-end-16">
        {projects.length > 2 && (
          <LinkCard label="See All Projects" href="/projects" className="w-full h-full text-xl" />
        )}
      </div>
    </GridContainer>
  );
}
