import React from "react";

type Props = {
  stack: string[];
};

const StackCard = ({ stack }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-5">
      <h3 className="text-lg lg:text-xl text-secondary flex items-center justify-center font-medium">
        Technologies Used:
      </h3>
      <div className="w-full flex flex-wrap overflow-auto gap-2">
        {stack?.map((tech) => (
          <div
            key={tech}
            className=" rounded-xl border border-border p-2 px-4 flex items-center justify-center "
          >
            <p className="text-md lg:text-lg text-primary font-medium">
              {tech}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackCard;
