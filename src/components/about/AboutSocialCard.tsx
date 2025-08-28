"use client";

import { admin } from "@/constants/admin";
import RenderIcon from "@/utils/RenderIcon";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const AboutSocialCard = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-5">
      {admin.socialLinks.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          target="_blank"
          rel="noreferrer"
          // className=""
          className="flex flex-col items-center justify-between gap-2 rounded-xl p-4 b-gray hover-link  bg-gray  hover:scale-103 active:scale-95 hover:text-gray-200 transition-all duration-300 ease-in-out"
          style={{
            transition: "background-color 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = item.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-gray)";
          }}
        >
          <div className="flex items-center justify-between w-full">
            <p>{item.title}</p>
            <ArrowUpRight />
          </div>
          <span className="self-start">
            <RenderIcon icon={item.icon} />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AboutSocialCard;
