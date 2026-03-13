import { getSkills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

function Skills() {
  const { categories } = getSkills();

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 md:py-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 relative w-full border-y px-4 py-3 text-lg md:text-xl text-muted-foreground">
        <span className="whitespace-nowrap">// skills</span>
        <div className="h-px w-full bg-muted-foreground/30" />
      </div>

      {/* Skills Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 px-4">
        {categories.map((category: SkillCategory) => (
          <div
            key={category.name}
            className="group relative border border-border/70 rounded-lg p-6 hover:bg-muted/20 transition-all duration-300"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-sm ">
                  {category.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {category.name}
              </h3>
            </div>

            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Hover Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 bg-foreground/50 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
