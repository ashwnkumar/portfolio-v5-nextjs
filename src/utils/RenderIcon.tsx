import React from "react";
import { SimpleIcon } from "simple-icons";

type RenderIconProps = {
  icon: SimpleIcon;
  size?: number;
  color?: string;
};

const RenderIcon: React.FC<RenderIconProps> = ({
  icon,
  size = 24,
  color = "currentColor",
}) => {
  return (
    <span role="img" aria-label={icon.title}>
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={color} // 👈 ignore brand hex
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
};

export default RenderIcon;
