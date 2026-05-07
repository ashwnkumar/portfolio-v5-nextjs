"use client";

import { StudioImage } from "@/lib/typs";
import { useSessionImages } from "@/lib/use-shuffle";
import { EyeIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import Lightbox from "../Lightbox";

const CATEGORIES = ["All", "Photography", "3D Art"] as const;

interface StudioGalleryProps {
  allImages: StudioImage[];
  /** Preview mode shows a shuffled subset without filters (for home page) */
  preview?: boolean;
  /** Number of images to show in preview mode */
  previewCount?: number;
}

export default function StudioGallery({
  allImages,
  preview = false,
  previewCount = 10,
}: StudioGalleryProps) {
  const shuffled = useSessionImages(allImages, previewCount);
  const [active, setActive] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = preview ? shuffled : allImages;

  const filtered =
    preview || active === "All"
      ? images
      : images.filter((i) => i.category === active);

  const srcs = filtered.map((i) => i.src);

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        {!preview && (
          <div className="flex items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActive(cat);
                  setLightboxIndex(null);
                }}
                className={`px-3 py-1 text-sm rounded border transition-all duration-300 cursor-pointer ${
                  active === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className={preview ? "columns-3" : "columns-2 sm:columns-3 gap-4"}>
          {filtered.map((i, idx) => (
            <div
              key={i.src}
              className="relative mb-4 break-inside-avoid cursor-zoom-in group"
              onClick={() => setLightboxIndex(idx)}
            >
              <img src={i.src} alt="" className="w-full rounded" />
              <Badge className="absolute top-2 right-2" variant={"secondary"}>
                {i.category}
              </Badge>
              <div className="inset-0 absolute bg-black/30 opacity-0 group-hover:opacity-100 duration-500 transition-all ease-in-out flex items-center justify-center rounded">
                <EyeIcon size={32} color="white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={srcs}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) => ((prev ?? 0) + 1) % srcs.length)
          }
          onPrev={() =>
            setLightboxIndex(
              (prev) => ((prev ?? 0) - 1 + srcs.length) % srcs.length,
            )
          }
        />
      )}
    </>
  );
}
