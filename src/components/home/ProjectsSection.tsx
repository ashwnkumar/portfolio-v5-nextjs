import { projects } from "@/constants/projects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PageHeader from "../PageHeader";

type Props = {};

const ProjectsSection = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <PageHeader label="Featured Projects" />
      <div className=" p-4 md:p-6  rounded-3xl w-full gap-5 space-y-5 border border-border max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-border rounded-3xl p-4 md:p-6">
          {projects.slice(0, 2).map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="group flex flex-col items-start justify-start w-full rounded-2xl bg-gray p-4 md:p-6 transition-all duration-300 "
            >
              <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-xl ">
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between w-full mt-4">
                <h3 className="text-lg md:text-xl font-semibold text-primary group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
                <span className=" group-hover:border-brand border-border group-hover:text-bg group-hover:bg-brand p-1 rounded-md transition-all duration-300 ease-in-out">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm font-medium  rounded-lg  px-3 py-1 border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <Link
          href={"/projects"}
          className="group w-full  rounded-full flex items-center bg-gray hover:text-brand hover:bg-teal-600/20 hover:border-brand justify-between px-4 py-2 pe-2  transition-colors duration-300 font-medium "
        >
          View All Projects
          <span className=" p-1 rounded-full transition-all  group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45  duration-500 ease-in-out">
            <ArrowUpRight size={28} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsSection;
