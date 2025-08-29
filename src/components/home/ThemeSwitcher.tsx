"use client";
import { useGlobal } from "@/contexts/GlobalContext";
import { BoomBox, Moon, Rabbit, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {};

const themes = [
  { name: "Dark", key: "dark", icon: Moon },
  { name: "Light", key: "light", icon: Sun },
  { name: "Neo", key: "neo", icon: Rabbit },
  { name: "Upside Down", key: "upside-down", icon: BoomBox },
];

const ThemeSwitcher = (props: Props) => {
  const { theme, applyTheme } = useGlobal();

  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-5">
      {themes.map((t) => (
        <button
          type="button"
          onClick={() => applyTheme(t.key)}
          key={t.key}
          className={`w-full h-full col-span-1 row-span-1 flex flex-col items-center justify-center gap-2 cursor-pointer rounded-xl active:scale-100 transition-all duration-300 ease-in-out hover:scale-103 hover:shadow-md shadow-sm ${
            theme === t.key
              ? "border border-brand bg-brand-faded text-brand"
              : "bg-gray"
          }`}
        >
          <span
            className={`border  border-inherit rounded-full p-3 ${
              theme === t.key ? "bg-brand text-bg" : ""
            }`}
          >
            <t.icon size={32} strokeWidth={1} />
          </span>
          <p className="font-medium text-lg">{t.name}</p>
        </button>
      ))}
      {/* <div className="col-span-1 row-span-1 bg-gray">
                <p>test</p>
            </div>
            <div className="col-span-1 row-span-1 bg-gray">
                <p>test</p>
            </div>
            <div className="col-span-1 row-span-1 bg-gray">
                <p>test</p>
            </div> */}
    </div>
  );
};

export default ThemeSwitcher;
