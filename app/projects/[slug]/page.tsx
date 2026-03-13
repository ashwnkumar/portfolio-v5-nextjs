import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/ProjectGallery";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 md:gap-8 items-center">
      {/* Back Button */}
      <div className="w-full px-4 md:px-12 pt-8">
        <Link href="/projects">
          <Button variant="ghost" className="gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="w-full px-4 md:px-12 py-8 md:py-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{project.category}</Badge>
              {project.featured && <Badge variant="outline">Featured</Badge>}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  View Live
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Button>
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="secondary" className="gap-2">
                  <GithubLogoIcon className="w-4 h-4" />
                  View Code
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="w-full border p-4 md:p-8">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground ">// tech stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Project Images */}
      {project.images && project.images.length > 0 && (
        <section className="w-full py-8 md:py-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-medium">
                Project Gallery
              </h2>
              <p className="text-muted-foreground">
                Screenshots and visuals from the project
              </p>
            </div>

            <ProjectGallery images={project.images} />
          </div>
        </section>
      )}

      {/* Project Details (Markdown Content) */}
      {project.content && (
        <section className="w-full py-8 md:py-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h2 className="text-3xl md:text-4xl font-medium mt-12 mb-6">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="text-2xl md:text-3xl font-medium mt-10 mb-4">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="text-xl md:text-2xl font-medium mt-8 mb-3">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-none space-y-2 my-6">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="flex gap-2 text-sm md:text-base text-muted-foreground">
                    <span className="text-primary">•</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary/50 pl-6 py-2 my-6 italic">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm ">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                    {children}
                  </pre>
                ),
              }}
            >
              {project.content}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* Footer Spacer */}
      <div className="w-full h-px" />
    </div>
  );
}
