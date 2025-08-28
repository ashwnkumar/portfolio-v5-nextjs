import React from "react";
import PageHeader from "../PageHeader";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { admin } from "@/constants/admin";

type Props = {};

const AboutSection = (props: Props) => {
  return (
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
