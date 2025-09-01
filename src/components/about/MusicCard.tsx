"use client";
import React, { useEffect, useRef, useState } from "react";
import songData from "../../constants/music.json";
import { Disc3, Pause, Play, SkipBack, SkipForward } from "lucide-react";

type Song = {
  title: string;
  artist: string;
  cover: string;
  src: string;
};

const MusicCard: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [currentIdx]);

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
    <div className="group  w-full h-full flex flex-col items-start justify-start gap-3">
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={current.cover}
          alt={current.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isPlaying ? "animate-vibe saturate-100" : "saturate-0"
          }`}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="w-full flex flex-col items-center justify-center px-4 text-primary ">
          <p className="text-md lg:text-2xl ">{current.title}</p>
          <p className="text-md text-secondary">{current.artist}</p>
          {/* <input
                        type="range"
                        name="range"
                        id="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full accent-gray-200 my-2 h-1 "
                    />
                    <div className="flex items-center justify-between w-full text-xs lg:text-sm">
                        <span> {formatTime(currentTime)} </span>
                        <span> {formatTime(duration)} </span>
                    </div> */}
        </div>
        <div className="flex items-center justify-evenly w-full">
          <button
            type="button"
            onClick={playPrev}
            className="text-primary rounded-full  cursor-pointer active:translate-y-0.5 transition duration-300"
          >
            <SkipBack className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="text-primary rounded-full  cursor-pointer active:translate-y-0.5 transition duration-300"
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
            className="text-primary rounded-full  cursor-pointer active:translate-y-1 transition duration-300"
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
