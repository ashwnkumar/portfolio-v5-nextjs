import BentoCard from "@/components/bento-card";
import { Highlighter } from "@/components/ui/highlighter";
import { MapPinIcon } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-5xl h-full grid grid-cols-12 auto-rows-20 grid-flow-dense gap-2">
        <BentoCard className="col-span-8 row-span-3 flex flex-col items-start justify-between">
          <div className="flex flex-col items-start">
            <p className="text-lg ">Hello world, I'm</p>
            <h1 className="text-6xl font-medium ">Ashwin Kumar</h1>
            <p className="text-lg ">
              and I build things for the{" "}
              <Highlighter action="underline">web</Highlighter>{" "}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPinIcon size={20} strokeWidth={1.5} />
              <span className="font-mono">Pune, MH, India</span>
            </div>
          </div>
        </BentoCard>
        <BentoCard className="col-span-4 row-span-3">Small</BentoCard>
      </div>
    </div>
  );
}

export default page;
