import React from "react";

type Props = {
  label: string;
};

const PageHeader = ({ label }: Props) => {
  return (
    <div className="flex items-center justify-center w-full gap-5">
      <h2 className="text-2xl md:text-3xl font-medium text-primary whitespace-nowrap">
        {label}
      </h2>
      <div className="border border-brand w-full" />
    </div>
  );
};

export default PageHeader;
