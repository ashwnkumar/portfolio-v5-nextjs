"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface LightboxImage {
  id: number;
  alt: string;
  title?: string;
  description?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 size-10 sm:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="size-5 sm:size-6 text-white" />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-2 sm:left-4 size-10 sm:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
              aria-label="Previous image"
            >
              <ArrowLeft className="size-5 sm:size-6 text-white" />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 sm:right-4 size-10 sm:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
              aria-label="Next image"
            >
              <ArrowRight className="size-5 sm:size-6 text-white" />
            </button>
          )}

          {/* Image Container */}
          <motion.div
            className="relative max-w-7xl max-h-[90vh] w-full mx-4 flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            key={currentIndex}
          >
            {/* Image Placeholder */}
            <div className="relative flex-1 flex items-center justify-center">
              <div className="max-w-full max-h-[90vh] aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                [Image Placeholder]
              </div>
            </div>

            {/* Info Sidebar */}
            {(currentImage.title || currentImage.description) && (
              <div className="md:w-80 shrink-0 p-4 sm:p-6 rounded-lg bg-white/10 backdrop-blur-md">
                {currentImage.title && (
                  <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                    {currentImage.title}
                  </h3>
                )}
                {currentImage.description && (
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    {currentImage.description}
                  </p>
                )}
                <p className="text-white/60 text-xs">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>
            )}

            {/* Simple counter for images without title/description */}
            {!currentImage.title && !currentImage.description && (
              <div className="absolute bottom-4 left-4 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md">
                <p className="text-white/80 text-sm">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
