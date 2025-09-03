"use client";

import { admin } from "@/constants/admin";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const AboutExpCard = () => {
  const [selectedId, setSelectedId] = useState(admin.workExp[0].id);

  const toggleSelected = (id: string) => {
    setSelectedId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full h-full flex flex-col items-start gap-4">
      <h3 className="text-lg lg:text-xl text-secondary font-semibold">
        Work Experience
      </h3>

      <div className="w-full flex flex-col gap-4 overflow-auto">
        {admin.workExp.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <div
              key={item.id}
              className={`w-full rounded-lg cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
                isSelected ? "bg-brand-faded" : "bg-bg"
              }`}
            >
              <button
                onClick={() => toggleSelected(item.id)}
                className="w-full p-4 flex justify-between items-center text-left cursor-pointer  active:scale-95 transition-all duration-300 ease-in-out"
                aria-expanded={isSelected}
                aria-controls={`exp-details-${item.id}`}
              >
                <div className="flex flex-col">
                  <h4
                    className={`text-lg font-semibold ${
                      isSelected ? "text-brand" : "text-primary"
                    }`}
                  >
                    {item.company}
                  </h4>
                  <p className="text-sm text-muted">
                    {item.position} | {item.from} - {item.to || "Present"}
                  </p>
                </div>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isSelected ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSelected && (
                <div className="space-y-4 px-6 pb-4 max-h-full overflow-y-auto ">
                  <div className="flex flex-wrap gap-1">
                    {item.skills.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-bg text-primary text-sm px-3 border border-border py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div id={`exp-details-${item.id}`}>
                    <ul className="list-disc pl-5 mt-2 text-sm text-primary">
                      {item.work.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutExpCard;
