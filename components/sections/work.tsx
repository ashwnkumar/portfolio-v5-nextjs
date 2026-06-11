import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { work, skills } from "@/lib/content";

export function Work() {
  return (
    <Section id="work" index="02" title="Work">
      <div className="space-y-12">
        {/* Experience timeline */}
        <ul className="space-y-10">
          {work.map((item, i) => (
            <Reveal as="li" key={item.company} delay={i * 0.06}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-medium tracking-tight">
                  {item.company}
                </h3>
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-foreground/80">
                {item.role}
              </p>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                {item.summary}
              </p>
            </Reveal>
          ))}
        </ul>

        {/* Skills */}
        <Reveal>
          <div className="border-t border-border pt-10">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {skills.map((s) => (
                <div key={s.group}>
                  <dt className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {s.group}
                  </dt>
                  <dd>
                    <ul className="space-y-1.5">
                      {s.items.map((skill) => (
                        <li key={skill} className="text-sm text-foreground/90">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
