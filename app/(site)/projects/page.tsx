import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getAllProjects, getSocialLinks } from "@/lib/data";
import type { Metadata } from "next";
import DecryptedText from "@/components/DecryptedText";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of full-stack applications and experiments built by Ashwin Kumar.",
};

export default async function ProjectsPage() {
  const [allProjects, socials] = await Promise.all([
    getAllProjects(),
    getSocialLinks(),
  ]);
  const githubUrl = socials.find((s: any) => s.platform === "github")?.url;

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 md:gap-8 items-center">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/70">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground ">
              // projects
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight font-pixel-grid">
              <DecryptedText
                text={"Things I've built"}
                speed={50}
                animateOn="view"
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
              />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A collection of projects I've worked on - from full-stack
              applications to experimental side projects. Each one taught me
              something new.
            </p>
          </div>

          {githubUrl && (
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="gap-2">
                  <GithubLogoIcon className="w-4 h-4" />
                  GitHub
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <RevealOnScroll>
        <section className="w-full py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjects.map((project: any, index: number) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group border relative overflow-hidden transition-all hover:border-primary/50 block"
              >
                {/* Project Image - Hero */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                  {project.preview ? (
                    <img
                      src={project.preview}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      [Project Preview]
                    </div>
                  )}

                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4">
                    <Badge>{project.category}</Badge>
                  </div>

                  {/* Action Buttons on Image */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background flex items-center justify-center transition-colors"
                      >
                        <GithubLogoIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="size-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background flex items-center justify-center transition-colors"
                      >
                        <ArrowUpRightIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 relative h-full">
                  <div className="absolute inset-0 -z-10 bg-linear-to-br  md:bg-linear-to-r from-transparent to-muted origin-left md:scale-x-0 md:group-hover:scale-x-100 transition-all md:opacity-0 md:group-hover:opacity-100 duration-700 ease-in-out" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className=" text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </Badge>
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* Footer Spacer */}
      <div className="w-full h-px" />
    </div>
  );
}
