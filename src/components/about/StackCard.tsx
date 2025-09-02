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
    <section className="w-full h-full flex flex-col gap-4 ">
      <h3 className="text-lg lg:text-xl text-secondary font-semibold">
        Skills/Technologies:
      </h3>
      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        {admin.stack.map((item) => (
          <div
            key={item.title}
            className="w-full h-full flex flex-col items-start justify-start gap-4 overflow-auto custom-scrollbar"
          >
            <p className="uppercase text-lg lg:text-xl font-medium">
              {item.title}
            </p>
            <ul className="flex flex-col gap-4 w-full overflow-auto">
              {item.skills.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-3 text-xl lg:text-2xl text-primary "
                >
                  <RenderIcon icon={tech.icon} size={28} />
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackCard;
