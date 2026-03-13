"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CameraIcon,
  CubeIcon,
  MagnifyingGlassPlusIcon,
  FunnelIcon,
} from "@phosphor-icons/react/dist/ssr";
import Lightbox from "@/components/Lightbox";
import { StudioItem } from "@/lib/types";

interface StudioGalleryProps {
  items: StudioItem[];
}

export default function StudioGallery({ items }: StudioGalleryProps) {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", label: "All Work", icon: FunnelIcon },
    { id: "Photography", label: "Photography", icon: CameraIcon },
    { id: "3D Art", label: "3D Art", icon: CubeIcon },
  ];

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1,
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1,
    );
  };

  const lightboxImages = filteredItems.map((item, index) => ({
    id: index,
    src: item.image,
    alt: item.category,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      {/* Filter Section */}
      <section className="w-full px-4 md:px-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.label}
                {category.id !== "all" && (
                  <Badge
                    variant={filter === category.id ? "secondary" : "outline"}
                    className="ml-1"
                  >
                    {items.filter((i) => i.category === category.label).length}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full px-4 md:px-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-muted-foreground">No items found</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filteredItems.map((item, index) => (
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
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                    [{item.category}]
                  </div>

                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <MagnifyingGlassPlusIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="backdrop-blur-sm shadow-lg"
                    >
                      {item.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 space-y-2">
                  <h3 className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
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
