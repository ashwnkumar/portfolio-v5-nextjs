"use client";
import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import FeaturesCard from "@/components/projectDetails/FeaturesCard";
import ImageCarousel from "@/components/projectDetails/ImageCarousel";
import LinksCard from "@/components/projectDetails/LinksCard";
import OtherProjects from "@/components/projectDetails/OtherProjects";
import StackCard from "@/components/projectDetails/StackCard";
import { projects, type Project } from "@/constants/projects";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";

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

  // map your custom project.images to OG format
  const ogImages = project.images?.map((img) => ({
    url: typeof img === "string" ? img : img.src, // ✅ ensure url field exists
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
      images: ogImages, // ✅ now correct type
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ashwin Kumar`,
      description: project.description,
      images: ogImages, // ✅ same fix
    },
  };
}

const Page = ({ params }: Props) => {
  const router = useRouter();
  const unwrapped = use(params);
  const { projectId } = unwrapped;

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = projects.find((p) => p.id === projectId) || null;
        setProject(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [projectId]);

  if (!projectId) {
    return <div>No Project ID</div>;
  }

  return (
    <GridContainer>
      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 row-start-1 row-end-2"
      >
        <div className="w-full h-full flex items-center justify-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={36} strokeWidth={1.5} className="pe-1" />
          </button>
          <h1 className="w-full h-full text-2xl lg:text-3xl text-primary font-medium flex items-center justify-start gap-2">
            {project?.title}
          </h1>
        </div>
      </GridCard>

      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 lg:col-end-9 row-start-2 row-end-5 lg:row-end-7 hover:!scale-100"
      >
        <ImageCarousel images={project?.images || []} />
      </GridCard>

      <GridCard
        loading={!project}
        className={`${
          project?.links?.length
            ? "row-start-5 row-end-11 lg:row-start-2 lg:row-end-9"
            : "row-start-5 row-end-12 lg:row-start-2 lg:row-end-10"
        } col-start-1 col-end-13 lg:col-start-9 lg:col-end-13 `}
      >
        <FeaturesCard features={project?.features || []} />
      </GridCard>

      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 lg:col-end-5 row-start-12 row-end-15 lg:row-start-7 lg:row-end-10"
      >
        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
          <h3 className="text-lg lg:text-xl text-secondary flex items-center justify-center font-medium">
            Overview:
          </h3>
          <p className="text-lg lg:text-xl text-primary overflow-auto custom-scrollbar pe-5">
            {project?.description}
          </p>
        </div>
      </GridCard>

      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 lg:col-start-5 lg:col-end-9 row-start-15 row-end-18 lg:row-start-7 lg:row-end-10"
      >
        <StackCard stack={project?.stack || []} />
      </GridCard>

      {project?.links && (
        <GridCard
          loading={!project}
          className="col-start-1 lg:col-start-9 col-end-13 row-start-11 row-end-12 lg:row-start-9 lg:row-end-10 !bg-bg !p-0 !shadow-none hover:!scale-100"
        >
          {project?.links && <LinksCard links={project.links} />}
        </GridCard>
      )}

      <GridCard className="col-start-1 col-end-13 row-start-18 row-end-32 lg:row-start-10 lg:row-end-16 !bg-bg hover:!scale-100 !p-0 !shadow-none">
        <OtherProjects projectId={projectId} />
      </GridCard>
    </GridContainer>
  );
};

export default Page;
