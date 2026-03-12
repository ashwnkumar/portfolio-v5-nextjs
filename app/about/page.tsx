import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@phosphor-icons/react/dist/ssr";
import { getAboutContent, getExperience, getSocialLinks } from "@/lib/data";
import { ImageCarousel } from "@/components/ImageCarousel";

export default function AboutPage() {
  const aboutData = getAboutContent();
  const experience = getExperience().reverse();
  const socials = getSocialLinks();
  const instagramLink = socials.find((s: any) => s.platform === "instagram");

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-[90vw] md:max-w-[70vw] border-x border-border/70 py-12 md:py-20">
        <div className="space-y-6">
          <p className="text-sm md:text-base text-muted-foreground">// about</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium">
            {aboutData.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {aboutData.hero.intro}
          </p>
          <Button variant="secondary" size="lg">
            <DownloadIcon />
            Download CV
          </Button>
        </div>
      </section>

      {/* Background Section */}
      <section className="w-full max-w-[90vw] md:max-w-[70vw] border-x border-t border-border/70 py-12 md:py-16">
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-medium">
            {aboutData.background.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {aboutData.background.content}
          </p>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="w-full max-w-[90vw] md:max-w-[70vw] border-x border-t border-border/70 py-12 md:py-16">
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-medium">Work Experience</h2>

          {experience.map((job: any) => (
            <div
              key={job.id}
              className={`space-y-4 border-l-2 ${
                job.isCurrent ? "border-primary/50" : "border-border/50"
              } pl-6`}
            >
              <div>
                <h3 className="text-xl font-medium">{job.company}</h3>
                <p className="text-muted-foreground">
                  {job.role} | {job.startDate} -{" "}
                  {job.isCurrent ? "Present" : job.endDate}
                </p>
              </div>
              {job.technologies && job.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
              {job.achievements && job.achievements.length > 0 && (
                <ul className="space-y-2 text-muted-foreground list-none">
                  {job.achievements.map((achievement: string, i: number) => (
                    <li key={i}>• {achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full max-w-[90vw] md:max-w-[70vw] border-x border-t border-border/70 py-12 md:py-16">
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-medium">
            Skills/Technologies
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono text-muted-foreground">
                // frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.frontend.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono text-muted-foreground">
                // backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.backend.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Other */}
            <div className="space-y-4">
              <h3 className="text-lg font-mono text-muted-foreground">
                // other
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.other.map((skill: string) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Outside Work */}
      <section className="w-full  border-x border-t border-border/70 ">
        <div className="flex items-center justify-center ">
          <div className="space-y-6  w-full">
            <h2 className="text-2xl md:text-3xl font-medium">
              {aboutData.lifeOutsideWork.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {aboutData.lifeOutsideWork.content}
            </p>
          </div>
          <div className="flex justify-center w-full ">
            <ImageCarousel
              images={aboutData.lifeOutsideWork.images}
              instagramUrl={"https://instagram.com/ashwin.archives"}
              instagramHandle={`@${"ashwin.archives"}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
