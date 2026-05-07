import { about } from "@/data/_index";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import SkillsGrid from "@/components/SkillsGrid";
import Image from "next/image";

function AboutPage() {
  return (
    <div className="w-full flex flex-col items-start gap-4 py-20">
      {/* Intro */}
      <section className="w-full flex flex-col items-start gap-8">
        <SectionHeader title="About" />
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-48 h-48 shrink-0 rounded overflow-hidden">
            <Image
              src="/images/profile-about.jpg"
              alt="Ashwin Kumar"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4">
            <p>{about.intro}</p>
            <p className="text-muted-foreground">{about.background}</p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="w-full flex flex-col items-start gap-8 py-20">
        <SectionHeader title="Experience" />
        <div className="flex flex-col gap-6 w-full">
          {about.experience.map((job) => (
            <div
              key={`${job.company}-${job.startDate}`}
              className="flex flex-col gap-2 border rounded px-4 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{job.role}</span>
                  <span className="text-muted-foreground text-sm">
                    {job.company} · {job.location}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm shrink-0">
                  {job.startDate} – {job.isCurrent ? "Present" : job.endDate}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{job.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="w-full flex flex-col items-start gap-8 py-20">
        <SectionHeader title="Skills" />
        <SkillsGrid categories={about.skills.categories} />
      </section>

      {/* Life Outside Work */}
      <section className="w-full flex flex-col items-start gap-8 py-20">
        <SectionHeader title="Life Outside Work" />
        <p>{about.lifeOutsideWork}</p>
      </section>
    </div>
  );
}

export default AboutPage;
