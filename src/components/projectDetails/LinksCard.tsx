import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  links: { name: string; url: string }[];
};

const LinksCard = ({ links }: Props) => {
  return (
    <div className="w-full h-full flex flex-row items-center justify-center gap-5">
      {links?.map((link) => (
        <Link
          href={link.url}
          key={link.name}
          className="relative bg-gray rounded-xl p-4 text-primary  flex flex-col items-center justify-center text-xl w-full h-full hover:scale-103 active:scale-95 hover:text-brand transition-all duration-300 ease-in-out hover:bg-brand-faded"
        >
          {link.name}
          <span className="absolute top-3 right-3">
            <ArrowUpRight size={32} />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default LinksCard;
