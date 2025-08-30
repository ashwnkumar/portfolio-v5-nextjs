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
    const getData = async () => {
      try {
        const data = projects.find((project) => project.id === projectId);
        setProject(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
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
            className="flex items-center justify-center cursor-pointer "
          >
            <ChevronLeft size={36} strokeWidth={1.5} className="pe-1" />
          </button>
          <h3 className="w-full h-full text-2xl md:text-3xl text-primary font-medium flex items-center justify-start gap-2">
            {project?.title}
          </h3>
        </div>
      </GridCard>

      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 md:col-end-9 row-start-2 row-end-5 md:row-end-7 hover:!scale-100"
      >
        <ImageCarousel images={project?.images} />
      </GridCard>

      <GridCard
        loading={!project}
        className={`${
          project?.links?.length > 0
            ? "row-start-5 row-end-11 md:row-start-2 md:row-end-9"
            : "row-start-5 row-end-12 md:row-start-2 md:row-end-10"
        } col-start-1 col-end-13 md:col-start-9 md:col-end-13 `}
      >
        <FeaturesCard features={project?.features} />
      </GridCard>

      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 md:col-end-5 row-start-12 row-end-15 md:row-start-7 md:row-end-10"
      >
        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
          <h3 className="text-lg md:text-xl text-secondary flex items-center justify-center font-medium">
            Overview:
          </h3>
          <p className="text-lg md:text-xl text-primary overflow-auto custom-scrollbar pe-5">
            {project?.description}
          </p>
        </div>
      </GridCard>

      <GridCard
        loading={!project}
        className="col-start-1 col-end-13 md:col-start-5 md:col-end-9 row-start-15 row-end-18 md:row-start-7 md:row-end-10"
      >
        <StackCard stack={project?.stack} />
      </GridCard>

      {project?.links?.length > 0 && (
        <GridCard
          loading={!project}
          className="col-start-1  md:col-start-9 col-end-13 row-start-11 row-end-12 md:row-start-9 md:row-end-10 !bg-bg !p-0 !shadow-none hover:!scale-100"
        >
          <LinksCard links={project?.links} />
        </GridCard>
      )}

      <GridCard
        className="col-start-1 col-end-13 row-start-18 row-end-29 md:row-start-10 md:row-end-15 !bg-bg hover:!scale-100 !p-0 !shadow-none"
      >
        <OtherProjects projectId={projectId} />
      </GridCard>
    </GridContainer>
  );
};

export default Page;
