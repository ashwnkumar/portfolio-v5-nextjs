import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import StudioPreview from "@/components/home/StudioPreview";
import {
  getHomeContent,
  getBio,
  getSkills,
  getAllProjects,
  getExperience,
  getSocialLinks,
  getAllStudioItems,
} from "@/lib/data";

export default function Page() {
  const home = getHomeContent();
  const bio = getBio();
  const skills = getSkills();
  const projects = getAllProjects()
    .filter((p: any) => p.featured)
    .slice(0, 3);
  const experience = getExperience();
  const currentJob = experience.find((e: any) => e.isCurrent);
  const socials = getSocialLinks();
  const studioItems = getAllStudioItems().slice(0, 4);

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 md:gap-8 items-center">
      {/* Hero Section - Full Width Impact */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/40">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground font-mono">
              // {bio.tagline}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight">
              {home.hero.greeting}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {home.hero.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/projects">
              <Button size="lg" className="gap-2">
                {home.hero.cta.primary.text}
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="secondary" className="gap-2">
                {home.hero.cta.secondary.text}
                <ArrowUpRightIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Status */}
      {currentJob && (
        <section className="w-full border p-4 md:p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm text-muted-foreground font-mono">
                // currently
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-medium">
                {currentJob.role} at {currentJob.company}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                {currentJob.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {currentJob.technologies.slice(0, 6).map((tech: string) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      <section className="w-full py-8 md:py-16">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-medium">
                Things I've built
              </h2>
              <p className="text-muted-foreground">
                A few projects I'm proud of
              </p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="gap-2">
                See all
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {projects.map((project: any, index: number) => (
              <div
                key={project.slug}
                className="group border relative overflow-hidden transition-colors"
              >
                <div className="absolute inset-0 -z-10 bg-linear-to-br md:bg-linear-to-r from-muted/40 to-transparent origin-right md:scale-x-0 md:group-hover:scale-x-100 transition-all md:opacity-0 md:group-hover:opacity-100 duration-700 ease-in-out" />

                <div className="grid md:grid-cols-[300px_1fr] gap-6">
                  {/* Project Image */}
                  <div className="relative aspect-video w-full h-full overflow-hidden bg-muted">
                    {project.preview ? (
                      <img
                        src={project.preview}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        [Project Preview]
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 md:p-8 md:pl-0 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </Badge>
                          <Badge variant="secondary">{project.category}</Badge>
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground w-full">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="icon" variant="ghost">
                              <GithubLogoIcon className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                        {project.live && (
                          <Link
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="icon" variant="ghost">
                              <ArrowUpRightIcon className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="w-full  py-8 md:py-16">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium">
              What I work with
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              My current toolkit (always expanding)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {skills.categories.map((category: any) => (
              <div key={category.name} className="space-y-4 border p-6">
                <h3 className="text-sm md:text-base font-mono text-muted-foreground">
                  // {category.name.toLowerCase()}
                </h3>
                <div className="flex flex-wrap gap-2 ">
                  {category.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full  py-8 md:py-16">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground font-mono">
            // philosophy
          </p>
          <h2 className="text-xl md:text-3xl font-medium">
            {home.philosophy.title}
          </h2>
          <div className="space-y-4">
            <blockquote className="border-l-4 border-primary/50 pl-6 py-2">
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                "{home.philosophy.quote}"
              </p>
              <footer className="mt-3 text-xs md:text-sm text-muted-foreground">
                — {home.philosophy.author}
              </footer>
            </blockquote>
            <p className="text-sm md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {home.philosophy.personalNote}
            </p>
          </div>
          <Link href={home.philosophy.cta.href}>
            <Button variant="outline" className="gap-2">
              {home.philosophy.cta.text}
              <ArrowRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Studio Preview */}
      {studioItems.length > 0 && <StudioPreview items={studioItems} />}

      {/* Contact Section */}
      <section className="w-full border p-4 md:p-8">
        <div className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-medium">
              Let's build something together
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Got a project in mind? Want to chat about tech? Or just want to
              say hi? I'm always up for a conversation. Drop me a line and let's
              see what we can create.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {socials
              .filter((s: any) =>
                ["email", "github", "linkedin"].includes(s.platform),
              )
              .map((social: any) => {
                const Icon =
                  social.platform === "email"
                    ? EnvelopeSimpleIcon
                    : social.platform === "github"
                      ? GithubLogoIcon
                      : LinkedinLogoIcon;
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target={social.platform === "email" ? undefined : "_blank"}
                    rel={
                      social.platform === "email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                  >
                    <Button variant="outline" className="gap-2">
                      <Icon className="w-4 h-4" />
                      {social.platform.charAt(0).toUpperCase() +
                        social.platform.slice(1)}
                    </Button>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="w-full  h-px" />
    </div>
  );
}
