"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { href: "/admin", label: "overview", exact: true },
  { href: "/admin/projects", label: "projects" },
  { href: "/admin/studio", label: "studio" },
  { href: "/admin/experience", label: "experience" },
  { href: "/admin/education", label: "education" },
  { href: "/admin/skills", label: "skills" },
  { href: "/admin/socials", label: "socials" },
  { href: "/admin/content", label: "content" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-x-1 gap-y-1 border-b border-border px-1">
      {SECTIONS.map((s) => {
        const active = s.exact
          ? pathname === s.href
          : pathname.startsWith(s.href);
        return (
          <Link
            key={s.href}
            href={s.href}
            className={cn(
              "font-pixel-square text-xs px-2.5 py-2 -mb-px border-b-2 border-transparent",
              "text-muted-foreground hover:text-foreground transition-colors",
              active && "border-foreground text-foreground",
            )}
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
