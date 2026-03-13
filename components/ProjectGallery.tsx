"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const lightboxImages = images.map((img, index) => ({
    id: index,
    src: img,
    alt: `Project screenshot ${index + 1}`,
  }));

  // Show first 4 images in 2x2 grid
  const displayImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-video overflow-hidden border bg-muted hover:border-primary/50 transition-colors"
          >
            <img
              src={image}
              alt={`Project screenshot ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

            {/* Show "+X more" overlay on last image if there are more */}
            {index === 3 && remainingCount > 0 && (
              <div className="absolute inset-0 bg-black/60  flex items-center justify-center">
                <span className="text-white text-2xl md:text-3xl font-medium">
                  +{remainingCount} more
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </>
  );
}
