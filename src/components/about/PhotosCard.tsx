"use client";
import React, { useState } from "react";
import photos from "../../constants/photos.json";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LinkCard from "../LinkCard";

type Props = {};

const PhotosCard = (props: Props) => {
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

      <div className="w-full flex-1 overflow-hidden rounded-2xl shadow-lg flex items-center justify-center">
        <img
          src={photos[current].src}
          alt={photos[current].alt}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* <Link href={"https://www.instagram.com/frames.by.ashwin/"} className="">
                Visit Instagram Page
            </Link> */}
      {/* <Link
                href={"https://www.instagram.com/frames.by.ashwin"}
                className="group w-full shadow-sm rounded-2xl flex items-center text-lg bg-gray hover:text-brand hover:bg-brand-faded hover:border-brand justify-between px-3 py-2 transition-all duration-300 font-medium hover:font-semibold ease-in-out"
            >
                Visit Instagram Page
                <span className=" p-1 border border-border rounded-full  transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 duration-500 ease-in-out">
                    <ArrowUpRight size={28} />
                </span>
            </Link> */}
      <LinkCard
        label="@frames.by.ashwin"
        href={"https://www.instagram.com/frames.by.ashwin/"}
        className="text-xs lg:text-base !px-2 lg:!px-4"
      />
    </div>
  );
};

export default PhotosCard;
