import React from "react";

type Props = {
  features: string[];
};

const FeaturesCard = ({ features = [] }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <h3 className="text-base md:text-xl text-secondary flex items-center justify-center font-medium">
        Features:
      </h3>
      <ul className="w-full list-disc flex flex-col items-start justify-start gap-2 p-4 overflow-auto">
        {features?.map((feature, index) => (
          <li key={index} className="text-xl text-primary font-medium ">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesCard;
