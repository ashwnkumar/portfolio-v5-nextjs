import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { about } from "@/lib/content";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="max-w-xl space-y-6">
        {about.body.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-lg leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
