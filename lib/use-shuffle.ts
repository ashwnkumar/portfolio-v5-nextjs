"use client";
import { useEffect, useState } from "react";
import { StudioImage } from "./typs";

function shuffle(array: StudioImage[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const useSessionImages = (allImages: StudioImage[], count: number) => {
  const [images, setImages] = useState<StudioImage[]>([]);

  useEffect(() => {
    const key = "session-images";
    const stored = sessionStorage.getItem(key);
    if (stored) {
      setImages(JSON.parse(stored));
      return;
    }

    const selected = shuffle(allImages).slice(0, count);
    setImages(selected);
    sessionStorage.setItem(key, JSON.stringify(selected));
  }, [allImages, count]);

  return images;
};
