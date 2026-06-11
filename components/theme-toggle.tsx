"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Minimal text toggle — shows the theme you'll switch TO.
 * Renders a stable placeholder until mounted to avoid hydration mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
    >
      {mounted ? (isDark ? "Light" : "Dark") : " "}
    </button>
  );
}
