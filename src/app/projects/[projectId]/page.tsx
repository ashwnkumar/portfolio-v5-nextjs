"use client";
import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import PageHeader from "@/components/PageHeader";
import FeaturesCard from "@/components/projectDetails/FeaturesCard";
import ImageCarousel from "@/components/projectDetails/ImageCarousel";
import LinksCard from "@/components/projectDetails/LinksCard";
import OtherProjects from "@/components/projectDetails/OtherProjects";
import StackCard from "@/components/projectDetails/StackCard";
import { projects } from "@/constants/projects";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";

type Props = {
  params: Promise<{ projectId: string }>; // 👈 params is now a Promise
};

const Page = ({ params }: Props) => {
  const router = useRouter();
  const unwrapped = use(params); // 👈 unwrap the promise
  const { projectId } = unwrapped;

  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const data = projects.find((p) => p.id === projectId);
    setProject(data || null);
  }, [projectId]);

  if (!projectId) {
    return <div>No Project ID</div>;
  }

  return (
    <GridContainer>
      <GridCard className="col-span-1 row-span-1 !p-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft size={48} strokeWidth={1.5} />
        </button>
      </GridCard>
      <GridCard className="col-span-11 row-span-1">
        <h3 className="w-full h-full text-3xl text-primary font-medium flex items-center justify-start gap-2">
          {project?.title}
        </h3>
      </GridCard>
      <GridCard className="col-span-8 row-span-5 hover:!scale-100">
        <ImageCarousel images={project?.images} />
      </GridCard>
      <GridCard
        className={`${
          project?.links?.length > 0 ? "row-span-7" : "row-span-9"
        } col-span-4 `}
      >
        <FeaturesCard features={project?.features} />
      </GridCard>
      <GridCard className="col-span-4 row-span-3">
        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
          <h3 className="text-base md:text-xl text-secondary flex items-center justify-center font-medium">
            Overview:
          </h3>
          <p className="text-xl text-primary overflow-auto custom-scrollbar">
            {project?.description}
          </p>
        </div>
      </GridCard>
      <GridCard className="col-span-4 row-span-3">
        <StackCard stack={project?.stack} />
      </GridCard>
      {project?.links?.length > 0 && (
        <GridCard className="col-span-4 row-span-1 !bg-bg !p-0 !shadow-none hover:!scale-100">
          <LinksCard links={project?.links} />
        </GridCard>
      )}
      <GridCard className="col-span-12 row-span-4 !bg-bg hover:!scale-100 !p-0 ">
        <OtherProjects projectId={projectId} />
      </GridCard>
    </GridContainer>
  );
};

export default Page;
