import type { ReactNode } from "react";

/**
 * The site's section motif: a lowercase `// label` above the heading.
 * Pixel face on the label and heading, Geist on everything else — the admin
 * carries the design language without paying for it in form legibility.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-pixel-square text-xs text-muted-foreground">
      // {children}
    </p>
  );
}

export function AdminPage({
  label,
  title,
  description,
  action,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="space-y-1.5">
          <SectionLabel>{label}</SectionLabel>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight font-pixel-grid">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
