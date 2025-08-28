import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import AboutSection from "@/components/home/AboutSection";
import CurrentWork from "@/components/home/CurrentWork";
import QuoteGenerator from "@/components/home/QuoteGenerator";
import ThemeSwitcher from "@/components/home/ThemeSwitcher";
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
      <GridCard className="col-span-4 row-span-2">
        <div className="w-full h-full flex flex-col items-start justify-between">
          <span className="text-4xl font-bold  text-brand">
            <CodeXml size={40} />
          </span>
          <h3 className="text-3xl font-semibold text-primary">
            Developer, Designer, Visual Storyteller.
          </h3>
        </div>
      </GridCard>
      <GridCard className="col-span-5 row-span-5">
        <AboutSection />
      </GridCard>
      <GridCard className="col-span-3 row-span-3 ">
        <div className="w-full h-full relative min-h-full">
          <Image
            src={admin.profile}
            alt="profile"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </GridCard>
      <GridCard className="col-span-4 row-span-3">
        <QuoteGenerator />
      </GridCard>
      <GridCard className="col-span-3 row-span-3 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <ThemeSwitcher />
      </GridCard>
      <GridCard className="col-span-6 row-span-3">
        <CurrentWork />
      </GridCard>
      <GridCard className="col-span-3 row-span-3">
        <div className="w-full h-full flex flex-col items-start justify-start gap-5">
          <h3 className="text-base md:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Based Out Of:
          </h3>
          <p className="text-2xl text-primary font-medium flex items-start justify-center gap-2">
            <span className="text-brand mt-0.5">
              <MapPin size={32} />
            </span>
            {admin.location}
          </p>
        </div>
      </GridCard>
      <GridCard className="col-span-3 row-span-2">
        <div className="w-full h-full flex flex-col items-start justify-start gap-5">
          <h3 className="text-base md:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Coding Since:
          </h3>
          <p className="text-2xl text-primary font-medium flex items-start justify-center gap-2">
            2023
          </p>
        </div>
      </GridCard>
      <div className="col-span-12  flex items-center justify-center w-full gap-5">
        <h2 className="text-3xl font-medium text-primary whitespace-nowrap">
          Featured Projects
        </h2>
        <div className="border border-brand w-full" />
      </div>
      {projects.slice(0, 2).map((project) => (
        <GridCard key={project.id} className="col-span-6 row-span-5">
          <ProjectCard key={project.id} project={project} />
        </GridCard>
      ))}
      <div className="col-span-12 ">
        {projects.length > 2 && (
          <Link
            href={"/projects"}
            className="group w-full h-full shadow-sm rounded-2xl flex items-center text-xl bg-gray hover:text-brand hover:bg-brand-faded hover:border-brand justify-between px-5 py-3  transition-all duration-300 font-medium hover:font-semibold ease-in-out"
          >
            View All Projects
            <span className=" p-1 border border-border rounded-full  transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 duration-500 ease-in-out">
              <ArrowUpRight size={28} />
            </span>
          </Link>
        )}
      </div>
    </GridContainer>
  );
}
