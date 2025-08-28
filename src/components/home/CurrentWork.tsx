import { admin } from "@/constants/admin";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const CurrentWork = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between">
      <h3 className="text-base md:text-xl text-secondary flex items-center justify-center font-medium">
        Currently Working At:
      </h3>
      <div className="w-full flex flex-col items-start justify-start gap-5">
        <div className="flex flex-col items-start justify-center gap-2">
          <h3 className="text-3xl text-primary font-medium">
            {admin.workExp[0].company}
          </h3>
          <p className="text-2xl text-secondary font-medium">
            {admin.workExp[0].position} | {admin.workExp[0].from} -{" "}
            {admin.workExp[0].to || "Present"}
          </p>
        </div>
        <Link
          href={"/about#work"}
          className="group w-full shadow-sm rounded-xl bg-bg flex items-center text-lg  hover:text-brand hover:bg-brand-faded hover:border-brand justify-between px-5 py-3  transition-all duration-300 font-medium hover:font-semibold ease-in-out"
        >
          See All Experience
          <span className=" p-1 border border-border rounded-full transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 duration-500 ease-in-out">
            <ArrowUpRight size={28} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CurrentWork;
