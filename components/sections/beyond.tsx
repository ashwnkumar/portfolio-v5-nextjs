import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { beyond } from "@/lib/content";

export function Beyond() {
  return (
    <Section id="beyond" index="04" title="Beyond Work">
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
        {beyond.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
