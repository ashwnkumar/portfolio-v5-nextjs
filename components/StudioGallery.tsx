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
import Image from "next/image";

type GalleryItem = {
  src: string;
  category: "Photography" | "3D Art";
};

interface StudioGalleryProps {
  items: GalleryItem[];
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
    src: item.src,
    alt: item.category,
  }));

  return (
    <>
      {/* Filter Section */}
      <section className="w-full px-4 md:px-12 ">
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const count =
              category.id === "all"
                ? items.length
                : items.filter((i) => i.category === category.id).length;
            return (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.label}
                <Badge
                  variant={filter === category.id ? "secondary" : "outline"}
                  className="ml-1"
                >
                  {count}
                </Badge>
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
                key={item.src}
                className="break-inside-avoid group relative overflow-hidden border border-border/70 bg-card hover:shadow-lg transition-all cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative bg-muted overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.category}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

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
