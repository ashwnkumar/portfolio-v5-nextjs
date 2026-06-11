// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for site content.
// Edit anything here — copy, work history, projects, links — without touching
// component code. Placeholders are marked with TODO so they're easy to find.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Ashwin Kumar",
  role: "Full-stack developer, design-first",
  email: "hello@neuralarc.ai",
  // The single sentence a stranger should remember.
  tagline:
    "I build clean, considered interfaces for the web — full-stack when it counts, design-led always.",
} as const;

export const about = {
  // 2–3 sentences. Keep it human. TODO: refine in your own voice.
  body: [
    "I’m a full-stack developer who leans hard into the design side of the craft. I work mostly in React and Next.js, and I care most about the parts people actually touch — the typography, the spacing, the way a page moves.",
    "I can take a product end to end, but if I had to choose one thing to be known for, it’s interfaces that feel quiet, fast, and intentional.",
  ],
} as const;

export type WorkItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
};

export const work: WorkItem[] = [
  {
    company: "Neural Arc Inc.",
    role: "Full-stack AI Developer",
    period: "Jan 2026 — Present",
    summary:
      "Building full-stack, AI-driven web products with a focus on the interface and user experience. TODO: add a line or two on what you’ve shipped.",
  },
  // Add older roles here as you go — newest first.
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Core", items: ["React", "Next.js", "TypeScript", "JavaScript"] },
  { group: "Design", items: ["UI / UX", "Design systems", "Tailwind CSS", "Framer Motion"] },
  { group: "Full-stack", items: ["Node.js", "REST APIs", "Databases", "AI integration"] },
];

export type Project = {
  title: string;
  year: string;
  blurb: string;
  href?: string;
};

// TODO: replace with real projects. Newest first.
export const projects: Project[] = [
  {
    title: "Project One",
    year: "2026",
    blurb: "A short, plain-spoken sentence about what it is and what you did.",
    href: undefined,
  },
  {
    title: "Project Two",
    year: "2025",
    blurb: "What problem it solved and the part you’re proud of.",
    href: undefined,
  },
  {
    title: "Project Three",
    year: "2025",
    blurb: "Keep these to one tight line — let the work speak.",
    href: undefined,
  },
];

// The creative half — equal billing with the professional side.
export const beyond: { title: string; body: string }[] = [
  {
    title: "Photography",
    body: "I shoot when I can — light, quiet streets, the ordinary made still. A dedicated gallery is coming.",
  },
  {
    title: "Music",
    body: "Always something playing. It sets the pace for everything else I make.",
  },
  {
    title: "Japanese",
    body: "Learning a little at a time. Slow, deliberate, and good for the brain — 少しずつ。",
  },
];

export type SocialLink = { label: string; href: string };

// TODO: fill in / add your real profiles.
export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
] as const;
