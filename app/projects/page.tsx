import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/_index";
import Link from "next/link";

function ProjectsPage() {
  // Group projects by category
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  // Sort projects within each category by order
  const getProjectsByCategory = (category: string) =>
    projects
      .filter((p) => p.category === category)
      .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex flex-col items-start gap-8 py-20">
        <SectionHeader
          title="Projects"
          desc="A collection of things I've built — from full-stack apps to small experiments."
        />

        <div className="w-full flex flex-col gap-12">
          {categories.map((category) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {category}
              </h4>
              <div className="flex flex-col items-center justify-center gap-4">
                {getProjectsByCategory(category).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="px-4 py-2 hover:-translate-y-0.5 flex gap-4 items-center hover:shadow-md active:translate-y-0.5 transition-all duration-300 ease-in-out border rounded w-full"
                  >
                    <div className="bg-foreground font-heading text-background rounded aspect-square w-10 flex items-center justify-center shrink-0">
                      {p.title.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{p.title}</span>
                      <span className="text-muted-foreground text-sm">
                        {p.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
