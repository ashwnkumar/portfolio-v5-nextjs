import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { site, socials } from "@/lib/content";

export function Contact() {
  return (
    <Section id="contact" index="05" title="Contact">
      <div className="max-w-xl">
        <Reveal>
          <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
            Have something in mind? I’m open to work and good conversations.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-lg underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
