import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  DownloadIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Suspense } from "react";
import StudioPreviewSection from "@/components/sections/StudioPreviewSection";
import { GallerySkeleton } from "@/components/sections/GallerySkeleton";
import SkillsGrid from "@/components/SkillsGrid";
import {
  getHomeContent,
  getBio,
  getSkills,
  getAllProjects,
  getExperience,
  getSocialLinks,
} from "@/lib/data";
import DecryptedText from "@/components/DecryptedText";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default async function Page() {
  const [home, bio, skills, allProjects, experience, socials] = await Promise.all([
    getHomeContent(),
    getBio(),
    getSkills(),
    getAllProjects(),
    getExperience(),
    getSocialLinks(),
  ]);

  const projects = allProjects.filter((p) => p.featured).slice(0, 3);
  const currentJob = experience.find((e) => e.isCurrent);

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 md:gap-8 items-center">
      {/* Hero Section - Full Width Impact */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/70">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground ">
              // {bio.tagline}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight font-pixel-grid">
              <DecryptedText
                text={home.hero.greeting}
                speed={50}
                animateOn="view"
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
              />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {home.hero.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="/resume.pdf" download="Ashwin-Kumar-Resume.pdf">
              <Button size="lg" className="gap-2">
                <DownloadIcon className="w-4 h-4" />
                Download Resume
              </Button>
            </a>
            <Link
              href={
                socials.find((s: any) => s.platform === "linkedin")?.url ?? "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="gap-2">
                <LinkedinLogoIcon className="w-4 h-4" />
                LinkedIn
              </Button>
            </Link>
            <Link
              href={
                socials.find((s: any) => s.platform === "github")?.url ?? "#"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="gap-2">
                <GithubLogoIcon className="w-4 h-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Status */}
      {currentJob && (
        <RevealOnScroll>
          <section className="w-full border p-4 md:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm text-muted-foreground ">// currently</p>
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
        </RevealOnScroll>
      )}

      {/* Featured Projects */}
      <RevealOnScroll>
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
                <RevealOnScroll key={project.slug} delay={index * 0.1}>
                  <div className="group border relative overflow-hidden transition-colors">
                    <div className="absolute inset-0 -z-10 bg-linear-to-br md:bg-linear-to-r from-muted to-transparent origin-right md:scale-x-0 md:group-hover:scale-x-100 transition-all md:opacity-0 md:group-hover:opacity-100 duration-700 ease-in-out" />

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
                              <Badge variant="outline" className=" text-xs">
                                {String(index + 1).padStart(2, "0")}
                              </Badge>
                              <Badge variant="secondary">
                                {project.category}
                              </Badge>
                            </div>
                            <h3 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
                              <Link
                                href={`/projects/${project.slug}`}
                                className="after:absolute after:inset-0"
                              >
                                {project.title}
                              </Link>
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground w-full">
                              {project.description}
                            </p>
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
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Skills Grid */}
      <RevealOnScroll>
        <section className="w-full py-8 md:py-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium">
                What I work with
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                My current toolkit (always expanding)
              </p>
            </div>

            <SkillsGrid categories={skills.categories} />
          </div>
        </section>
      </RevealOnScroll>

      {/* Philosophy Section */}
      <RevealOnScroll>
        <section className="w-full  py-8 md:py-16">
          <div className="space-y-6">
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
      </RevealOnScroll>

      {/* Studio Preview */}
      <RevealOnScroll>
        <Suspense fallback={<GallerySkeleton count={6} />}>
          <StudioPreviewSection />
        </Suspense>
      </RevealOnScroll>

      {/* Contact Section */}
      <RevealOnScroll>
        <section className="w-full border p-4 md:p-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-medium">
                Let's build something together
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                Got a project in mind? Want to chat about tech? Or just want to
                say hi? I'm always up for a conversation. Drop me a line and
                let's see what we can create.
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
                      target={
                        social.platform === "email" ? undefined : "_blank"
                      }
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
      </RevealOnScroll>

      {/* Footer Spacer */}
      <div className="w-full  h-px" />
    </div>
  );
}
