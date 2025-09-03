import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/constants/projects";
import React from "react";

const page = () => {
  return (
    <GridContainer>
      {projects.map((project) => (
        <GridCard
          loading={!project}
          key={project.id}
          className="col-span-12 lg:col-span-6 row-span-5"
        >
          <ProjectCard project={project} />
        </GridCard>
      ))}
    </GridContainer>
  );
};

export default page;
