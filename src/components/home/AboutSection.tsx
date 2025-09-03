import React from "react";
import LinkCard from "../LinkCard";

const AboutSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between ">
      <div className="space-y-6">
        <div>
          <p className="text-lg lg:text-xl font-semibold">Hey there!</p>
          <p className="text-3xl lg:text-4xl font-semibold text-primary">
            I&apos;m Ashwin Kumar.
          </p>
        </div>
        <p>
          <span className="text-xl lg:text-2xl  font-medium">
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
