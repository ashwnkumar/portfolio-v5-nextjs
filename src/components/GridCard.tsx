import React from "react";

type GridCardProps = {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
};

const GridCard: React.FC<GridCardProps> = ({
  children,
  className = "row-span-1 col-span-1",
  loading = false,
}) => {

  return (
    <div
      className={`bg-gray rounded-xl p-5 shadow-sm hover:shadow-md  cursor-default hover:scale-101 transition-all duration-300 ease-in-out ${className}`}
    >
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 md:h-4 bg-bg/80 rounded w-full"></div>
          {/* <div className="h-3 md:h-4 bg-bg/80 rounded w-1/2"></div> */}
          <div className="h-3 md:h-4 bg-bg/80 rounded w-3/4"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default GridCard;
