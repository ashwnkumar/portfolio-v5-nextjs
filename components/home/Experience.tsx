import { getExperience } from "@/lib/data";
import { ExperienceType } from "@/lib/types";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

function Experience() {
  const experience = getExperience().reverse();

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 md:py-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 relative w-full border-y px-4 py-3 text-lg md:text-xl text-muted-foreground">
        <span className="whitespace-nowrap">// experience</span>
        <div className="h-px w-full bg-muted-foreground/30" />
      </div>

      {/* Experience List */}
      <div className="w-full flex flex-col">
        {experience.map((exp: ExperienceType, index: number) => (
          <div
            className="group relative w-full flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/70 p-4 md:p-6 hover:bg-muted/20 transition-colors duration-300"
            key={exp.id}
          >
            {/* Left Content */}
            <div className="flex flex-col items-start gap-1 mb-3 sm:mb-0">
              <h3 className="font-semibold text-lg md:text-xl text-foreground">
                {exp.company}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {exp.role}
              </p>
            </div>

            {/* Right Content - Date */}
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <span>{exp.startDate}</span>
              <ArrowRightIcon />
              <span>{exp.endDate ? exp.endDate : "Present"}</span>
            </div>

            {/* Hover Effects */}
            <div className="absolute inset-0 -z-10 w-0 bg-gradient-to-r from-muted/30 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-foreground/50 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
