import React from "react";
import PageHeader from "../PageHeader";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { admin } from "@/constants/admin";

const GridCard = ({
  title,
  children,
  className = "row-span-1 col-span-1",
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col justify-start gap-1 bg-gray rounded-xl p-4 shadow-sm hover:shadow-md cursor-default hover:scale-101 transition-all duration-300 ease-in-out ${className}`}
    >
      {title && <p className="text-lg">{title}</p>}
      {children}
    </div>
  );
};

type Props = {};

const AboutSection = (props: Props) => {
  return (
    // <div className="flex flex-col items-center justify-center gap-5 w-full ">
    //   <PageHeader label="About Me" />
    //   <div className="w-full max-w-3xl space-y-4 ">
    //     <div className="grid grid-cols-12 grid-rows-[repeat(8,minmax(0,0.5fr))] gap-5  ">

    //       <GridCard title="Who Am I?" className="row-span-4 col-span-6">
    //         <p
    //           className="text-xl text-primary font-medium"
    //           dangerouslySetInnerHTML={{ __html: admin.aboutShort }}
    //         />
    //       </GridCard>

    //       <GridCard className="row-span-6 col-span-6">

    //       </GridCard>

    //       <GridCard title="Where I'm From" className="row-span-2 col-span-3">
    //         <p className="text-xl text-primary font-medium flex items-start justify-start gap-1">
    //           <span className="text-brand mt-0.5"><MapPin /></span> Pune, Maharashtra, India
    //         </p>
    //       </GridCard>

    //       <GridCard title="Coding Since" className="row-span-2 col-span-3">
    //         <p className="text-xl text-primary font-medium">
    //           2023
    //         </p>
    //       </GridCard>

    //       <GridCard title="Tech Stack" className="row-span-3 col-span-12">
    //         <div className="flex flex-wrap gap-5">
    //           {admin.stack.map((tech) => (
    //             <span
    //               key={tech}
    //               className="border border-border px-2 py-1 rounded-lg text-primary font-medium text-lg"
    //             >
    //               {tech}
    //             </span>
    //           ))}
    //         </div>
    //       </GridCard>

    //     </div>
    //     <Link
    //       href={"/about"}
    //       className="group w-full shadow-sm rounded-2xl flex items-center text-lg bg-gray hover:text-brand hover:bg-brand-faded hover:border-brand justify-between px-5 py-3 pe-2 transition-all duration-300 font-medium hover:font-semibold ease-in-out"
    //     >
    //       See More
    //       <span className=" p-1 border border-border rounded-full transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 duration-500 ease-in-out">
    //         <ArrowUpRight size={28} />
    //       </span>
    //     </Link>
    //   </div>
    // </div>
    <div className="w-full h-full flex flex-col items-start justify-between ">
      <div className="space-y-6">
        <div>
          <p className="text-xl font-semibold">Hey there!</p>
          <p className="text-4xl font-semibold text-primary">
            I'm Ashwin Kumar.
          </p>
        </div>
        <p>
          <span className="text-2xl  font-medium">
            <span className="text-primary"> A Full Stack Web Developer, </span>{" "}
            specializing in creating clean, user-focused web interfaces.
          </span>
        </p>
      </div>
      <Link
        href={"/about"}
        className="group w-full shadow-sm rounded-xl flex items-center text-lg bg-bg hover:text-brand hover:bg-brand-faded hover:border-brand justify-between px-4 py-3 transition-all duration-300 font-medium hover:font-semibold ease-in-out"
      >
        Read More
        <span className=" p-1 border border-border rounded-full transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 duration-500 ease-in-out">
          <ArrowUpRight size={28} />
        </span>
      </Link>
    </div>
  );
};

export default AboutSection;
