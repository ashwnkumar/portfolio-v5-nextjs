"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Fixed top bar. Transparent at the top of the page; gains a subtle
 * backdrop + border once you start scrolling.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6 sm:px-8">
        <Link
          href="#top"
          className="text-sm font-medium tracking-tight transition-opacity hover:opacity-60"
        >
          {site.name}
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          <ul className="hidden items-center gap-5 sm:flex sm:gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
