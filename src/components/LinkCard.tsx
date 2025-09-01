import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type LinkCardProps = {
  href: string;
  label: string;
  className?: string;
};

const LinkCard = ({ label, href, className = "" }: LinkCardProps) => {
  return (
    <Link
      href={href}
      className={`group w-full flex items-center justify-between px-4 py-3 
        rounded-xl shadow-sm transition-all duration-300 ease-in-out
        text-base lg:text-lg font-medium
        bg-brand-faded lg:bg-bg
        text-brand lg:text-primary lg:hover:text-brand
        hover:font-semibold  lg:hover:bg-brand-faded hover:border-brand
        ${className}`}
    >
      <span className="pe-1">{label}</span>

      <span
        className="p-1 rounded-full border border-border 
          bg-brand lg:bg-bg
          text-bg lg:text-primary
          transition-all duration-500 ease-in-out
          group-hover:rotate-45 group-hover:border-brand
          lg:group-hover:bg-brand lg:group-hover:text-bg"
      >
        <ArrowUpRight size={20} strokeWidth={2} />
      </span>
    </Link>
  );
};

export default LinkCard;
