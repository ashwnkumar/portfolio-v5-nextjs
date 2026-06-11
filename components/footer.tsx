import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="font-mono text-xs tracking-widest text-muted-foreground">
          © {site.name}
        </p>
        <p className="font-mono text-xs tracking-widest text-muted-foreground">
          Built with Next.js — design-first.
        </p>
      </div>
    </footer>
  );
}
