"use client";

import { StudioImage } from "@/lib/typs";
import { useSessionImages } from "@/lib/use-shuffle";
import { Badge } from "../ui/badge";

export default function StudioGallery({
  allImages,
}: {
  allImages: StudioImage[];
}) {
  const shuffled = useSessionImages(allImages, 10);

  return (
    <div className="columns-3">
      {shuffled.map((i) => (
        <div key={i.src} className="relative">
          <img  src={i.src} alt="" className="mb-4" />
          <Badge className="absolute top-2 right-2" variant={"secondary"}>{i.category}</Badge>
        </div>
      ))}
    </div>
  );
}
