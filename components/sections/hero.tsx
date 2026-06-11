"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content";

/**
 * Full-height opening. Staggered entrance on load (not scroll-triggered).
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="top"
      className="flex min-h-[88vh] flex-col justify-center py-24"
    >
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          {site.role}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-2xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {site.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex items-center gap-6">
          <a
            href="#work"
            className="text-sm font-medium underline-offset-4 transition-opacity hover:opacity-60"
          >
            View work
          </a>
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {site.email}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
