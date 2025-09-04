import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/constants/projects";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects | Ashwin Kumar – MERN Stack Developer",
  description:
    "Explore Ashwin Kumar's full-stack development projects built with React, Node.js, MongoDB, and Next.js. Showcasing scalable web apps and creative solutions.",
  alternates: {
    canonical: "https://ashwinkumar.dev/projects",
  },
  openGraph: {
    title: "Projects | Ashwin Kumar – MERN Stack Developer",
    description:
      "A showcase of full-stack projects by Ashwin Kumar, specializing in ReactJS, Node.js, MongoDB, and Next.js applications.",
    url: "https://ashwinkumar.dev/projects",
    images: ["/assets/og-image.png"], // generate a nice OG image (grid of projects)
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Ashwin Kumar – MERN Stack Developer",
    description:
      "Explore my full-stack web development projects, built with React, Node.js, MongoDB, and Next.js.",
    images: ["/assets/og-image.png"],
  },
};

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
