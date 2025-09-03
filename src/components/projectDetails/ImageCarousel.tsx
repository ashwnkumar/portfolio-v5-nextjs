"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  images: { src: string; alt: string; id: number }[];
};

const ImageCarousel = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      {/* Carousel */}
      <div className="w-full h-full relative">
        {images?.map((image, idx) => (
          <div
            key={image.id}
            onClick={() => {
              setCurrentImage(idx);
              setIsLightboxOpen(true);
            }}
            className={`w-full h-full absolute top-0 left-0 rounded-lg cursor-pointer transition-opacity duration-500 ${
              idx === currentImage ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0} // preload first image
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        {images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 active:scale-95 cursor-pointer z-50 left-2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 ease-in-out"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 active:scale-95 cursor-pointer z-50 right-2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 ease-in-out"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>

            <div className="absolute z-50 bottom-0 left-1/2 -translate-x-1/2 gap-2 bg-gradient-to-t from-black w-full flex items-center justify-center py-3">
              {images?.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`size-3 rounded-full ${
                    currentImage === idx ? "bg-brand" : "bg-black"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-xs"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Prevent closing when clicking the image */}
            <div
              className="w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[85vh] max-w-full w-auto h-auto">
                <Image
                  src={images[currentImage].src}
                  alt={images[currentImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 bg-black p-2 rounded-full text-white bg-opacity-60 hover:bg-opacity-80 transition "
              >
                <X size={24} />
              </button>

              {/* Navigation inside lightbox */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-white bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-white bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
              <p className="bg-black text-white absolute bottom-5 text-xl px-4 p-2">
                {images[currentImage].alt}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ImageCarousel;
