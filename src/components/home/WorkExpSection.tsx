"use client";
import React, { useState } from "react";
import PageHeader from "../PageHeader";
import { admin } from "@/constants/admin";
import { ChevronDown } from "lucide-react";

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
  const [activeId, setActiveId] = useState(workExps[0]?.id);

  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <PageHeader label="Work Experience" />
      <div className="w-full max-w-3xl space-y-4 border border-border rounded-3xl p-5">
        {workExps.map((exp) => {
          const isActive = exp.id === activeId;
          return (
            <article
              key={exp.id}
              onClick={() => setActiveId(exp.id)}
              role="button"
              tabIndex={0}
              className={`w-full px-4 py-2 rounded-xl border cursor-pointer transition-colors duration-300
                ${
                  isActive
                    ? "border-brand bg-muted/30"
                    : "border-border hover:border-brand/50"
                }
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4">
                <div>
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <p className="text-md text-primary">
                    {exp.position} | {exp.from} - {exp.to || "Present"}
                  </p>
                </div>
                <ChevronDown
                  size={28}
                  className={`transition-transform duration-300 ${
                    isActive ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Details */}
              {isActive && (
                <div className="flex flex-col gap-5 border-t border-border pt-4">
                  <div>
                    <p className="font-medium">Skills Used:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
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
                      {exp.work.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WorkExpSection;
