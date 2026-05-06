"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import {
  DownloadIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimatedThemeToggler } from "./animated-theme-toggler";

function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="flex items-center justify-between w-full sticky top-0 z-50 bg-background p-2">
      <h1 className="text-2xl font-medium">
        Ashwin<span className="text-muted-foreground">Kumar</span>
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Button variant={"secondary"}>resume</Button>
        <AnimatedThemeToggler duration={600}/>
        {/* <Button
          onClick={handleThemeToggle}
          variant="outline"
          className="relative w-16 overflow-hidden"
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center text-light transition-all duration-400 ease-in-out",
              theme === "dark"
                ? "translate-x-full opacity-0"
                : "translate-x-0 opacity-100",
            )}
          >
            dark
          </span>

          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center text-light transition-all duration-400 ease-in-out",
              theme === "light"
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100",
            )}
          >
            light
          </span>
        </Button> */}
      </div>
    </nav>
  );
}

export default Header;
