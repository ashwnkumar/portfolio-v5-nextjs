import { admin } from "@/constants/admin";
import RenderIcon from "@/utils/RenderIcon";
import React from "react";
import { SimpleIcon } from "simple-icons";

type TechStackItem = {
  name: string;
  icon: SimpleIcon;
};

const StackCard = () => {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <h3 className="text-base md:text-xl text-secondary font-semibold">
        Tech I Use
      </h3>

      <ul className="flex flex-col gap-4 w-full overflow-auto">
        {admin.stack.map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-3 text-xl md:text-2xl text-primary "
          >
            <RenderIcon icon={tech.icon} size={28} />
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StackCard;
