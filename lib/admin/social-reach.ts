/**
 * Where each platform slug is consumed on the public site.
 *
 * These slugs are a contract: the site filters on them in ~17 places, and a
 * rename turns a link into href="#" with no error (that is how the studio
 * Instagram link was dead for so long). Surfacing the reach in the admin is
 * what makes hiding or renaming a considered action rather than a guess.
 *
 * Derived from grepping `platform === "..."` across app/ and components/.
 * If you add a hardcoded reference, add it here too.
 */
export const SOCIAL_REACH: Record<string, string[]> = {
  github: ["home hero", "projects page", "home contact", "footer"],
  linkedin: ["home hero", "contact page", "footer"],
  email: ["home contact", "contact page", "contact form", "footer"],
  instagram: ["contact page", "footer"],
  "instagram-photography": ["studio page", "about gallery", "footer"],
  artstation: ["studio page", "footer"],
  twitter: ["footer"],
};

/** Slugs the code depends on by name — renaming one breaks those surfaces. */
export const WIRED_SLUGS = Object.keys(SOCIAL_REACH);

export function reachFor(platform: string): string[] {
  return SOCIAL_REACH[platform] ?? ["footer"];
}

export function isWired(platform: string): boolean {
  return platform in SOCIAL_REACH;
}
