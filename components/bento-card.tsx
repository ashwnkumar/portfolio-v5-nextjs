import { cn } from "cn";
import React, { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

function BentoCard({ children, className }: Props) {
  return <div className={cn("bg-accent p-4 rounded-lg", className)}>{children}</div>;
}

export default BentoCard;
