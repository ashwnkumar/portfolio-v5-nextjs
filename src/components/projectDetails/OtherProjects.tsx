"use client";
import { projects } from "@/constants/projects";
import { ArrowUpRight } from "lucide-react";
import React, { useMemo } from "react";
import PageHeader from "../PageHeader";
import Link from "next/link";

type Props = {
  projectId: string;
};

const OtherProjects = ({ projectId }: Props) => {
  const arr = useMemo(() => {
    const filtered = projects.filter((p) => p.id !== projectId);
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [projectId]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 py-4">
      <PageHeader label="Other Projects" />
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5 cursor-pointer">
        {arr.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            className="group w-full h-full bg-gray rounded-xl col-span-1 flex flex-col items-start justify-between gap-4 p-3"
          >
            <div className=" rounded-lg overflow-hidden ">
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="group-hover:scale-105 w-full object-cover duration-500 transition-transform ease-in-out"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-between w-full mt-4 group-hover:bg-brand-faded px-3 rounded-lg">
                <div className="flex flex-col items-start justify-center">
                  <h3 className="text-xl lg:text-2xl font-semibold text-primary group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <p className="pe-4">{project.subTitle}</p>
                </div>
                <span className="group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 transition-all duration-300 rounded-full border border-border">
                  <ArrowUpRight size={32} />
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-sm font-medium  rounded-lg  px-3 py-1 border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherProjects;
