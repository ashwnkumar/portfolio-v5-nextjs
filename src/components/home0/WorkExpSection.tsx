"use client";
import React, { useState } from "react";
import PageHeader from "../PageHeader";
import { admin } from "@/constants/admin";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

type WorkExperience = {
  id: string | number;
  company: string;
  position: string;
  from: string;
  to?: string;
  skills: string[];
  work: string[];
};

const WorkExpSection = () => {
  const workExps: WorkExperience[] = admin.workExp;
  const [activeId, setActiveId] = useState<string | number | null>(
    workExps[0]?.id ?? null
  );

  const toggleActive = (id: string | number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <PageHeader label="Work Experience" />

      <div className="w-full max-w-3xl space-y-4">
        {workExps.slice(0, 2).map((exp) => (
          <article
            key={exp.id}
            role="button"
            tabIndex={0}
            onClick={() => toggleActive(exp.id)}
            onKeyDown={(e) =>
              e.key === "Enter" || e.key === " " ? toggleActive(exp.id) : null
            }
            className={`w-full p-4 rounded-xl cursor-pointer shadow-sm transition-all duration-300 ease-in-out ${
              activeId === exp.id ? "bg-brand-faded" : "bg-gray"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    activeId === exp.id ? "text-brand" : "text-primary"
                  }`}
                >
                  {exp.company}
                </h3>
                <p className="text-md text-primary">
                  {exp.position} | {exp.from} - {exp.to || "Present"}
                </p>
              </div>
              <ChevronDown
                size={28}
                className={`transition-transform duration-300 ${
                  activeId === exp.id ? "rotate-180 text-brand" : ""
                }`}
              />
            </div>

            {/* Details */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeId === exp.id
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col gap-5 border-t border-border pt-4">
                <div>
                  <p className="font-medium">Skills Used:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="border border-border px-2 py-1 rounded-lg text-primary text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Work Done:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    {exp.work.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}

        {workExps.length > 2 && (
          <Link
            href="/about#work-exp"
            className="group w-full shadow-sm rounded-2xl flex items-center justify-between px-5 py-3 text-lg font-medium bg-gray hover:bg-brand-faded hover:text-brand hover:font-semibold transition-all duration-300 ease-in-out"
          >
            View All Experience
            <span className="p-1 border border-border rounded-full transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 duration-500 ease-in-out">
              <ArrowUpRight size={28} />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default WorkExpSection;
