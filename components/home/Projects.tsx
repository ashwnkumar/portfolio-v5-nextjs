import { getFeaturedProjects } from "@/lib/data";
import { ProjectType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

function Projects() {
  const projects = getFeaturedProjects();

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 md:py-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 relative w-full border-y px-4 py-3 text-base md:text-lg text-muted-foreground">
        <span className="whitespace-nowrap">// featured projects</span>
        <div className="h-px w-full bg-muted-foreground/30" />
      </div>

      {/* Projects Grid */}
      <div className="w-full grid grid-cols-1">
        {projects.map((project: ProjectType) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="group w-full flex flex-col items-center justify-center border-b"
          >
            <div className="w-full px-5 md:px-20">
              <div className="w-full border-x h-5 md:h-20 " />
            </div>
            <div className="w-full h-full flex-1 px-5 md:px-20 border-y">
              <div className="w-full h-full border">
                <div className="relative w-full aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.preview}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[102%] transition-all duration-500 md:saturate-0 md:group-hover:saturate-100 ease-in-out"
                  />
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-2 p-2 md:p-4 md:bg-background bg-muted/50 group-hover:bg-muted/50 transition-colors duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-base md:text-lg text-foreground">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 border border-border/50 rounded">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.map((tech: string) => (
                      <Badge variant="secondary" key={tech}>
                        {tech}
                      </Badge>
                    ))}
                    {/* {project.tech.length > 3 && (
                    <span className="text-xs text-muted-foreground/80 px-2 py-0.5">
                    +{project.tech.length - 3}
                    </span>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-5 md:px-20">
              <div className="w-full border-x h-5 md:h-20 " />
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={"/projects"}
        className="group flex items-center gap-3 relative w-full border-y pl-4 text-base md:text-lg text-muted-foreground"
      >
        <div className="h-px w-full bg-muted-foreground/30" />
        <div className="relative bg-muted text-foreground group-hover:text-background group-hover:bg-foreground flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap text-sm md:text-base transition-colors duration-300">
          <span>// go to projects</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            <ArrowRightIcon size={20} />
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Projects;
