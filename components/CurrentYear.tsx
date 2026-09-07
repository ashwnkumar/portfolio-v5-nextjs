"use client";

/**
 * Reading the clock during prerender is disallowed under Cache Components --
 * a prerendered page has no meaningful "now". Next's guidance is to move the
 * expression into a Client Component, which is all this is.
 */
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
