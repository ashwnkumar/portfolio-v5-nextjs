import { admin } from "@/constants/admin";
import Link from "next/link";
import React from "react";
import Button from "../form/Button";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-2 py-10 h-[60vh] ">
      <h4 className="text-2xl ">Hello world, I'm</h4>
      <h1 className="text-6xl font-bold text-primary">Ashwin Kumar.</h1>
      <h4 className="text-3xl font-medium">I create things for the Web.</h4>
      <div className="flex items-center justify-center gap-5 mt-5">
        <Button
          label="[github]"
          navTo={admin.links.github}
          className="!text-xl "
        />
        <Button
          label="[linkedin]"
          navTo={admin.links.linkedin}
          className="!text-xl "
        />
      </div>
    </div>
  );
};

export default HeroSection;
