import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  /** Monospace index label, e.g. "01". */
  index: string;
  title: string;
  children: ReactNode;
};

/**
 * A consistent section shell: mono index + title in a left rail, content beside it.
 * Collapses to a single column on small screens.
 */
export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border py-20 sm:py-28"
    >
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[10rem_1fr] sm:gap-16">
        <Reveal>
          <div className="flex items-baseline gap-3 sm:flex-col sm:gap-2">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">
              {index}
            </span>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {title}
            </h2>
          </div>
        </Reveal>
        <div>{children}</div>
      </div>
    </section>
  );
}
