import React from "react";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{title}</h3>;
    </div>
  );
}

export default SectionHeader;
