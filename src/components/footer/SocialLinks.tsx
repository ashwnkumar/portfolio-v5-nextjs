"use client";
import { admin } from "@/constants/admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const SocialLinks = (props: Props) => {
  return (
    <div className="w-full h-full grid grid-rows-2 gap-5">
      <Link
        href={`mailto:${admin.email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group hover:bg-brand-faded bg-gray rounded-xl px-4 py-1 flex items-center justify-between transition-all duration-300 text-2xl hover:text-brand hover:border-brand hover:scale-103"
      >
        {admin.email}
        <span className="group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 transition-all duration-300 rounded-full border border-border">
          <ArrowUpRight size={32} />
        </span>
      </Link>

      <div className="grid grid-cols-4 gap-5 w-full h-full">
        {/* <div className="bg-gray rounded-xl p-4 flex items-center justify-center">
                    <p>Card 1</p>
                </div>
                <div className="bg-gray rounded-xl p-4 flex items-center justify-center">
                    <p>Card 2</p>
                </div>
                <div className="bg-gray rounded-xl p-4 flex items-center justify-center">
                    <p>Card 3</p>
                </div> */}
        {admin.socialLinks.map((item) => {
          return (
            <Link
              href={item.link}
              key={item.title}
              target="_blank"
              rel="noreferrer"
              className=" hover-link rounded-xl flex flex-col bg-gray items-center justify-center hover:scale-103 active:scale-95 hover:text-gray-200 transition-all duration-300 ease-in-out"
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
              <FontAwesomeIcon icon={item.icon} size="2xl" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
