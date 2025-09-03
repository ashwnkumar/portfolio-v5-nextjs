import React from "react";
import { SimpleIcon } from "simple-icons";

type RenderIconProps = {
  icon: SimpleIcon | React.ComponentType<{ size?: number; color?: string }>;
  size?: number;
  color?: string;
};

const RenderIcon: React.FC<RenderIconProps> = ({
  icon,
  size = 24,
  color = "currentColor",
}) => {
  // If it's a SimpleIcon (object with `path`)
  if (typeof icon === "object" && "path" in icon) {
    return (
      <span role="img" aria-label={icon.title}>
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={icon.path} />
        </svg>
      </span>
    );
  }

  // Otherwise, treat as a React component (Lucide)
  const LucideComponent = icon as React.ComponentType<{
    size?: number;
    color?: string;
  }>;
  return <LucideComponent size={size} color={color} />;
};

export default RenderIcon;
