import React from "react";
import SectionHeader from "../SectionHeader";
import { projects } from "@/data/_index";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

function ProjectSection() {
  const featuredProjects = projects.filter((project) => project.featured);
  return (
    <div className=" w-full flex flex-col items-start gap-8 py-20">
      <SectionHeader title={"Projects"} href="/projects" />
      <div className="flex flex-col items-center justify-center gap-4">
        {featuredProjects.map((p) => (
          <Link
          key={p.slug}
            href={`/projects/${p.slug}`}
            className="px-4 py-2 hover:-translate-y-0.5 flex gap-4 items-center hover:shadow-md active:translate-y-0.5 transition-all duration-300 ease-in-out border rounded w-full"
          >
            <div className="bg-foreground font-heading text-background rounded aspect-square w-10 flex items-center justify-center">
              {p.title.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold">{p.title}</span>
              <span className="text-muted-foreground">{p.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectSection;
