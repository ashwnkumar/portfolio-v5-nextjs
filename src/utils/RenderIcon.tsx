import React from "react";
import { SimpleIcon } from "simple-icons";
import { LucideIcon } from "lucide-react";

type RenderIconProps = {
  icon: SimpleIcon | LucideIcon;
  size?: number;
  color?: string;
};

const RenderIcon: React.FC<RenderIconProps> = ({
  icon,
  size = 24,
  color = "currentColor",
}) => {
  // If it's a function (React component) → Lucide
  if (typeof icon === "function") {
    const LucideComponent = icon as LucideIcon;
    return <LucideComponent size={size} color={color} />;
  }

  // If it's an object with a `path` → SimpleIcon
  if ("path" in icon) {
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

  return null;
};

export default RenderIcon;
