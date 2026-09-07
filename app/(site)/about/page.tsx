import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import SkillsGrid from "@/components/SkillsGrid";
import {
  getAboutContent,
  getBio,
  getExperience,
  getEducation,
  getSkills,
} from "@/lib/data";
import Image from "next/image";
import { Suspense } from "react";
import AboutGallery from "@/components/sections/AboutGallery";
import { GallerySkeleton } from "@/components/sections/GallerySkeleton";
import Link from "next/link";
import type { Metadata } from "next";
import DecryptedText from "@/components/DecryptedText";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Ashwin Kumar — a full-stack developer, photographer, and creative explorer based in Pune, India.",
};

export default async function AboutPage() {
  const [bio, aboutData, experience, education, skills] = await Promise.all([
    getBio(),
    getAboutContent(),
    getExperience(),
    getEducation(),
    getSkills(),
  ]);

  // getExperience() already returns newest-first, derived from the dates.

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 md:gap-8 items-center">
      {/* Hero Section - Full Width Impact */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/70">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="space-y-8 flex-1">
            <div className="space-y-4">
              <p className="text-sm md:text-base text-muted-foreground ">
                // about
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight font-pixel-grid">
                <DecryptedText
                  text={aboutData.hero.title}
                  speed={50}
                  animateOn="view"
                  revealDirection="start"
                  sequential
                  useOriginalCharsOnly={false}
                />
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {aboutData.hero.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/resume.pdf" download="Ashwin-Kumar-Resume.pdf">
                <Button size="lg" className="gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Download CV
                </Button>
              </a>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="gap-2">
                  View Projects
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {bio.images.about && (
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 overflow-hidden rounded-md">
              <Image
                src={bio.images.about}
                alt={bio.imageAlt}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Background Section */}
      <RevealOnScroll>
        <section className="w-full border p-4 md:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground ">// background</p>
              <h2 className="text-2xl md:text-3xl font-medium">
                {aboutData.background.title}
              </h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {aboutData.background.content}
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Work Experience Section */}
      <RevealOnScroll>
        <section className="w-full py-8 md:py-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-medium">
                Work Experience
              </h2>
              <p className="text-muted-foreground">
                My professional journey so far
              </p>
            </div>

            <div className="space-y-4">
              {experience.map((job: any, index: number) => (
                <div
                  key={job.id}
                  className="group border relative overflow-hidden transition-colors"
                >
                  <div className="absolute inset-0 -z-10 bg-linear-to-br md:bg-linear-to-r from-muted/70 to-transparent origin-right md:scale-x-0 md:group-hover:scale-x-100 transition-all md:opacity-0 md:group-hover:opacity-100 duration-700 ease-in-out" />

                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className=" text-xs">
                            {String(index + 1).padStart(2, "0")}
                          </Badge>
                          {job.isCurrent && (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                              <Badge variant="secondary">Current</Badge>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium">
                          {job.role}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {job.company} • {job.startDate} -{" "}
                          {job.isCurrent ? "Present" : job.endDate}
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground pt-2">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    {job.technologies && job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech: string) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="space-y-2 text-sm text-muted-foreground list-none pt-2">
                        {job.achievements.map(
                          (achievement: string, i: number) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>{achievement}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Education Section */}
      <RevealOnScroll>
        <section className="w-full py-8 md:py-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-medium">Education</h2>
              <p className="text-muted-foreground">Academic background</p>
            </div>

            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div
                  key={edu.id}
                  className="group border relative overflow-hidden transition-colors"
                >
                  <div className="absolute inset-0 -z-10 bg-linear-to-br md:bg-linear-to-r from-muted/70 to-transparent origin-right md:scale-x-0 md:group-hover:scale-x-100 transition-all md:opacity-0 md:group-hover:opacity-100 duration-700 ease-in-out" />

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {String(index + 1).padStart(2, "0")}
                          </Badge>
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium">
                          {edu.degree}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant="secondary">{edu.score}</Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Skills Section */}
      <RevealOnScroll>
        <section className="w-full py-8 md:py-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium">
                Skills &amp; Technologies
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                My current toolkit (always expanding)
              </p>
            </div>

            <SkillsGrid categories={skills.categories} />
          </div>
        </section>
      </RevealOnScroll>

      {/* Life Outside Work */}
      <RevealOnScroll>
        <section className="w-full border p-4 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="space-y-4 w-full ">
              <p className="text-sm text-muted-foreground ">
                // life outside work
              </p>
              <h2 className="text-2xl md:text-3xl font-medium">
                {aboutData.lifeOutsideWork.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {aboutData.lifeOutsideWork.content}
              </p>
            </div>

            <div className="flex justify-center w-full">
              <Suspense fallback={<GallerySkeleton count={2} />}>
                <AboutGallery />
              </Suspense>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Footer Spacer */}
      <div className="w-full h-px" />
    </div>
  );
}
