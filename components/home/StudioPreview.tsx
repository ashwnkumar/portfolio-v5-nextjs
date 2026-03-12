"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { StudioItem } from "@/lib/types";

interface StudioPreviewProps {
  items: StudioItem[];
}

export default function StudioPreview({ items }: StudioPreviewProps) {
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

  const lightboxImages = items.map((item: any, index: number) => ({
    id: index,
    src: item.image,
    alt: item.category,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      <section className="w-full max-w-[90vw] md:max-w-[70vw]  border-border/70 py-12 md:py-16">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-medium">Studio</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                When I'm not coding, I'm creating
              </p>
            </div>
            <Link href="/studio">
              <Button variant="ghost" className="gap-2">
                See more
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {items.map((item: any, index: number) => (
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
                        ? "aspect-3/4"
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
      </section>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  );
}
