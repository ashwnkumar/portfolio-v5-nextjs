import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React, { ReactNode } from "react";

function SectionHeader({
  title,
  href,
  desc,
}: {
  title: string;
  href?: string;
  desc?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start")}>
      {href ? (
        <Link
          href={href}
          className="flex items-center group gap-1 text-lg font-medium group"
        >
          {title}
          <ArrowUpRightIcon className="group-hover:rotate-45 transition-all duration-500 ease-in-out" />
        </Link>
      ) : (
        <h3 className="text-lg font-medium">{title}</h3>
      )}
      {desc && <p className="text-muted-foreground">{desc}</p>}
    </div>
  );
}

export default SectionHeader;
