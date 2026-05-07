"use client";

import { useEffect, useCallback } from "react";
import { XIcon, ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors cursor-pointer z-10"
        aria-label="Close lightbox"
      >
        <XIcon size={24} />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 text-white/80 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Previous image"
        >
          <ArrowLeftIcon size={24} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt=""
        className="max-h-[85vh] max-w-[90vw] object-contain rounded"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 text-white/80 hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Next image"
        >
          <ArrowRightIcon size={24} />
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <span className="absolute bottom-4 text-white/70 text-sm">
          {currentIndex + 1} / {images.length}
        </span>
      )}
    </div>
  );
}
