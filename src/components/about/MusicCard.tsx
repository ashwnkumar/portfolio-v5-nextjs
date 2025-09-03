"use client";
import React, { useEffect, useRef, useState } from "react";
import songData from "../../constants/music.json";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";

type Song = {
  title: string;
  artist: string;
  cover: string;
  src: string;
};

const MusicCard: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current: Song = (songData as Song[])[currentIdx];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const next = (currentIdx + 1) % (songData as Song[]).length;
    setCurrentIdx(next);
  };

  const playPrev = () => {
    const prev =
      (currentIdx - 1 + (songData as Song[]).length) %
      (songData as Song[]).length;
    setCurrentIdx(prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [currentIdx, isPlaying]);

  return (
    <div className="group w-full h-full flex flex-col items-start justify-start gap-3">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Image
          src={current.cover}
          alt={current.title}
          fill
          className={`object-cover transition-all duration-500 ${
            isPlaying ? "animate-vibe saturate-100" : "saturate-0"
          }`}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="w-full flex flex-col items-center justify-center px-4 text-primary">
          <p className="text-md lg:text-2xl">{current.title}</p>
          <p className="text-md text-secondary">{current.artist}</p>
        </div>

        <div className="flex items-center justify-evenly w-full">
          <button
            type="button"
            onClick={playPrev}
            className="text-primary rounded-full cursor-pointer active:translate-y-0.5 transition duration-300"
          >
            <SkipBack className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="text-primary rounded-full cursor-pointer active:translate-y-0.5 transition duration-300"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 lg:w-6 lg:h-6" />
            ) : (
              <Play className="w-5 h-5 lg:w-6 lg:h-6" />
            )}
          </button>
          <button
            type="button"
            onClick={playNext}
            className="text-primary rounded-full cursor-pointer active:translate-y-1 transition duration-300"
          >
            <SkipForward className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={current.src} onEnded={playNext} />
    </div>
  );
};

export default MusicCard;
