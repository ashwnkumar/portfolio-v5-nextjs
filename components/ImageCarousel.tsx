"use client";

import { useState, useEffect, TouchEvent } from "react";
import { Button } from "./ui/button";
import {
  CaretLeftIcon,
  CaretRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";

type ImageCarouselProps = {
  images: string[]; // array of image URLs
  instagramUrl: string;
  instagramHandle: string;
  altPrefix?: string; // optional: e.g. "Product photo"
  className?: string;
};

export function ImageCarousel({
  images,
  instagramUrl,
  instagramHandle,
  altPrefix = "Image",
  className = "",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Optional: uncomment for autoplay (but use with caution — many users dislike it)
  // useEffect(() => {
  //   const timer = setInterval(goToNext, 5000);
  //   return () => clearInterval(timer);
  // }, [currentIndex]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (images.length === 0) {
    return <div className="text-muted-foreground">No images available</div>;
  }

  return (
    <div className={`w-full flex flex-col items-center gap-4 ${className}`}>
      {/* Carousel container */}
      <div
        className="relative w-full max-w-md aspect-square overflow-hidden rounded-xl border border-border/60 bg-muted/70 shadow-sm"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Image carousel"
      >
        {/* Current image */}
        <Image
          src={images[currentIndex]}
          alt={`${altPrefix} ${currentIndex + 1} of ${images.length}`}
          fill
          className="object-cover transition-opacity duration-300"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 448px"
        />

        {/* Navigation buttons – bigger touch targets on mobile */}
        <div className="absolute inset-0 flex items-center justify-between px-3 opacity-70 hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="h-10 w-10 rounded-full bg-background/70 backdrop-blur-md hover:bg-background/90 border border-border/40 shadow-sm"
            aria-label="Previous image"
          >
            <CaretLeftIcon className="h-5 w-5" weight="bold" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="h-10 w-10 rounded-full bg-background/70 backdrop-blur-md hover:bg-background/90 border border-border/40 shadow-sm"
            aria-label="Next image"
          >
            <CaretRightIcon className="h-5 w-5" weight="bold" />
          </Button>
        </div>

        {/* Indicators – more modern look */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-primary shadow-sm"
                    : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter – subtle */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md text-xs font-medium text-muted-foreground border border-border/40">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Instagram link – cleaner, better hover */}
      <Link
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 px-5 py-3.5 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span className="text-foreground/90 group-hover:text-primary transition-colors">
          {instagramHandle}
        </span>
        <ArrowUpRightIcon
          className="h-5 w-5 text-muted-foreground/70 group-hover:text-primary group-hover:rotate-12 transition-all"
          weight="bold"
        />
      </Link>
    </div>
  );
}
