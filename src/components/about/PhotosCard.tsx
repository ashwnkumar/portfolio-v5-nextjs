"use client";
import React, { useState } from "react";
import Image from "next/image";
import photos from "../../constants/photos.json";
import LinkCard from "../LinkCard";

const PhotosCard = () => {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-center gap-3 cursor-pointer"
      onClick={handleNext}
    >
      {/* <h3 className="text-lg lg:text-xl text-secondary font-semibold">
        Life Beyond the 9-5
      </h3> */}

      <div className="w-full flex-1 overflow-hidden rounded-2xl shadow-lg flex items-center justify-center relative">
        <Image
          src={photos[current].src}
          alt={photos[current].alt}
          fill
          sizes="100%"
          className="object-cover transition-all duration-500"
        />
      </div>

      <LinkCard
        label="@frames.by.ashwin"
        href={"https://www.instagram.com/frames.by.ashwin/"}
        className="text-xs lg:text-base !px-2 lg:!px-4"
      />
    </div>
  );
};

export default PhotosCard;
