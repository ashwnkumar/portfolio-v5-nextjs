import { admin } from "@/constants/admin";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import LinkCard from "../LinkCard";

type Props = {};

const CurrentWork = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between">
      <h3 className="text-base md:text-xl text-secondary flex items-center justify-center font-medium">
        Currently Working At:
      </h3>
      <div className="w-full flex flex-col items-start justify-start gap-5">
        <div className="flex flex-col items-start justify-center gap-2">
          <h3 className="text-2xl md:text-3xl text-primary font-medium">
            {admin.workExp[0].company}
          </h3>
          <p className="text-xl md:text-2xl text-secondary font-medium">
            {admin.workExp[0].position} | {admin.workExp[0].from} -{" "}
            {admin.workExp[0].to || "Present"}
          </p>
        </div>
        <LinkCard label="See All Experience" href="/about" />
      </div>
    </div>
  );
};

export default CurrentWork;
