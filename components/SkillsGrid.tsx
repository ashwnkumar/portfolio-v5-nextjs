"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deviconUrl } from "@/lib/devicon";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  iconId: string | null;
  iconVariant?: string | null;
  /**
   * devicon ships plain logos; a few (nextjs, express, vercel) carry no fill
   * and render black, i.e. invisible on the dark theme. Inverting every icon
   * would destroy the coloured marks, so only this subset is flipped.
   */
  invertDark?: boolean | null;
};

type Category = {
  name: string;
  skills: Skill[];
};

export default function SkillsGrid({ categories }: { categories: Category[] }) {
  return (
    <>
      {/* Mobile: grid with labels */}
      <div className="flex flex-col gap-6 md:hidden">
        {categories.map((cat, i) => (
          <div key={i} className="space-y-2">
            <p className="uppercase text-xs text-muted-foreground">
              {cat.name}
            </p>
            <div className="grid grid-cols-4 gap-3">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-1.5"
                >
                  {skill.iconId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={deviconUrl(skill.iconId, skill.iconVariant)!}
                      alt={skill.name}
                      loading="lazy"
                      className={cn(
                        "w-10 h-10 object-contain",
                        skill.invertDark && "dark:invert",
                      )}
                    />
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground border rounded-lg w-10 h-10 flex items-center justify-center bg-muted/40">
                      {skill.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal with tooltips + group hover */}
      <div className="hidden md:flex flex-wrap gap-2 group/skills">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="flex flex-col items-start gap-1 transition-opacity duration-300 group-has-[:hover]/skills:opacity-50 hover:opacity-100!"
          >
            <p className="uppercase text-xs text-muted-foreground">
              {cat.name}
            </p>
            <div className="flex items-center gap-2 border-r pr-2 last:border-0">
              {cat.skills.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg cursor-default">
                      {skill.iconId ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={deviconUrl(skill.iconId, skill.iconVariant)!}
                          alt={skill.name}
                          loading="lazy"
                          className={cn(
                            "w-11 h-11 object-contain",
                            skill.invertDark && "dark:invert",
                          )}
                        />
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground border rounded-lg w-12 h-12 flex items-center justify-center bg-muted/40">
                          {skill.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{skill.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
