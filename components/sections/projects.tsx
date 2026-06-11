import Link from "next/link";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <Section id="projects" index="03" title="Selected Work">
      <ul className="-mt-2">
        {projects.map((project, i) => {
          const inner = (
            <div className="flex flex-col gap-1 border-b border-border py-6 transition-opacity group-hover:opacity-100 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {project.year}
                </span>
                <h3 className="text-xl font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {project.title}
                </h3>
              </div>
              <p className="max-w-md leading-relaxed text-muted-foreground sm:text-right">
                {project.blurb}
              </p>
            </div>
          );

          return (
            <Reveal as="li" key={project.title} delay={i * 0.06}>
              {project.href ? (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  {inner}
                </Link>
              ) : (
                <div className="group block">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
