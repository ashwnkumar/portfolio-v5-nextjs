import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const GridContainer = ({ children, className }: Props) => {
  return (
    <div className="container">
      <div
        className={`grid grid-cols-12 auto-rows-[86.5px] gap-5  ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default GridContainer;
