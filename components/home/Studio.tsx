"use client";

import { useState } from "react";
import Link from "next/link";
import { StudioItem } from "@/lib/types";
import Lightbox from "@/components/Lightbox";
import {
  ArrowRightIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react/dist/ssr";

interface StudioProps {
  items: StudioItem[];
}

function Studio({ items }: StudioProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const lightboxImages = items.map((item, index) => ({
    id: index,
    src: item.image,
    alt: item.category,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center py-12 md:py-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 relative w-full border-y px-4 py-3 text-base md:text-lg text-muted-foreground">
          <span className="whitespace-nowrap">// studio</span>
          <div className="h-px w-full bg-muted-foreground/30" />
        </div>

        {/* Masonry Grid */}
        <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6 pt-6">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="break-inside-avoid group relative rounded-xl border border-border/70 bg-card overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div
                className={`relative bg-muted overflow-hidden ${
                  item.aspectRatio === "square"
                    ? "aspect-square"
                    : item.aspectRatio === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-video"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                  [{item.category}]
                </div>

                {/* Zoom overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <MagnifyingGlassPlusIcon className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Category badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1.5 text-xs rounded-full bg-primary text-primary-foreground font-medium backdrop-blur-sm shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      {/* View All Studio Link */}
      <Link
        href="/studio"
        className="group flex items-center gap-3 relative w-full border-y px-4 py-3 text-base md:text-lg text-muted-foreground"
      >
        <span className="flex items-center gap-2 whitespace-nowrap  text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          <span>// go to studio</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            <ArrowRightIcon size={20} />
          </span>
        </span>
        <div className="h-px w-full bg-muted-foreground/30" />
      </Link>
    </>
  );
}

export default Studio;
