import React from "react";
import PageHeader from "../PageHeader";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { admin } from "@/constants/admin";

type Props = {};

const AboutSection = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full ">
      <PageHeader label="About Me" />
      <div className="w-full max-w-3xl space-y-4 border border-border rounded-3xl p-5">
        <div className="grid grid-cols-12 grid-rows-12 gap-4 border border-border rounded-3xl p-5 ">
          <div className="flex flex-col justify-start gap-1 row-span-12 col-span-6 bg-gray rounded-xl p-4">
            <p className="text-lg">Who Am I?</p>
            <p className="text-xl text-primary font-medium">
              I'm Ashwin Kumar, a passionate Full Stack Developer with expertise
              in building dynamic and responsive web applications. I love
              turning ideas into reality using code.
            </p>
          </div>

          <div className="col-span-6 row-span-12 p-4 bg-gray rounded-xl flex items-center justify-center relative">
            <Image
              src="/projects/frames-by-ashwin/1.png"
              alt="profile"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-start gap-1 row-span-3 col-span-3 bg-gray rounded-xl p-4">
            <p className="text-lg">Where I'm From</p>
            <p className="text-xl text-primary font-medium">
              📍 Pune, Maharashtra, India
            </p>
          </div>
          <div className="flex flex-col justify-start gap-1 row-span-3 col-span-3 bg-gray rounded-xl p-4">
            <p className="text-lg">Coding Since</p>
            <p className="text-xl text-primary font-medium">2024</p>
          </div>
          <div className="flex flex-col justify-start gap-1 row-span-3 col-span-12 bg-gray rounded-xl p-4">
            <p className="text-lg">Tech Stack</p>
            <div className="flex flex-wrap gap-4">
              {admin.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border px-2 py-1 rounded-lg text-primary font-medium text-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link
          href={"/about"}
          className="group w-full  rounded-full flex items-center bg-gray hover:text-brand hover:bg-teal-600/20 hover:border-brand justify-between px-4 py-2 pe-2  transition-colors duration-300 font-medium "
        >
          See More
          <span className=" p-1 rounded-full transition-all  group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45  duration-500 ease-in-out">
            <ArrowUpRight size={28} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
