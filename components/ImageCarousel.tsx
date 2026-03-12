"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type ImageCarouselProps = {
  images: string[];
  instagramUrl: string;
  instagramHandle: string;
};

export function ImageCarousel({
  images,
  instagramUrl,
  instagramHandle,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Carousel */}
      <div className="relative aspect-square w-full max-w-md border border-border/70 rounded-lg overflow-hidden bg-muted/20">
        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-transparent" />
          <span className="relative text-muted-foreground/50 text-sm">
            // image {currentIndex + 1} of {images.length}
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <CaretLeftIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <CaretRightIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Instagram Link */}
      <Link
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group w-[77%] flex items-center justify-between p-4 border border-border/70 rounded-lg hover:bg-foreground hover:text-background transition-all duration-300 bg-card/50"
      >
        <span >
          {instagramHandle}
        </span>
        <ArrowUpRightIcon weight="bold" className="w-5 h-5 text-muted-foreground  group-hover:rotate-45 transition-all duration-300" />
      </Link>
    </div>
  );
}
