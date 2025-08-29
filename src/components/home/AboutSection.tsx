import React from "react";
import PageHeader from "../PageHeader";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { admin } from "@/constants/admin";
import LinkCard from "../LinkCard";

type Props = {};

const AboutSection = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between ">
      <div className="space-y-6">
        <div>
          <p className="text-lg md:text-xl font-semibold">Hey there!</p>
          <p className="text-3xl md:text-4xl font-semibold text-primary">
            I'm Ashwin Kumar.
          </p>
        </div>
        <p>
          <span className="text-xl md:text-2xl  font-medium">
            <span className="text-primary"> A Full Stack Web Developer, </span>{" "}
            specializing in creating clean, user-focused web interfaces.
          </span>
        </p>
      </div>
      <LinkCard label="Read More" href="/about" />
    </div>
  );
};

export default AboutSection;
