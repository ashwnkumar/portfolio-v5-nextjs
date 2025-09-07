import { projects } from "@/constants/projects";
import type { Metadata } from "next";
import ProjectDetails from "./ProjectDetails";

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: "Project Not Found | Ashwin Kumar",
      description: "The project you are looking for does not exist.",
    };
  }

  const ogImages = project.images?.map((img) => ({
    url: typeof img === "string" ? img : img.src,
    alt: typeof img === "string" ? project.title : img.alt,
  })) ?? ["/assets/og-image.png"];

  return {
    title: `${project.title} | Ashwin Kumar – MERN Stack Developer`,
    description: project.description,
    alternates: {
      canonical: `https://ashwinkumar.dev/projects/${project.id}`,
    },
    openGraph: {
      title: `${project.title} | Ashwin Kumar`,
      description: project.description,
      url: `https://ashwinkumar.dev/projects/${project.id}`,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ashwin Kumar`,
      description: project.description,
      images: ogImages,
    },
  };
}

export default async function Page({ params }: Props) {
  const { projectId } = await params;
  return <ProjectDetails projectId={projectId} />;
}
