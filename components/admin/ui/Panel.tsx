import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./AdminPage";

/** Bordered, square-cornered container — the site's `w-full border` section. */
export function Panel({
  label,
  action,
  className,
  children,
}: {
  label?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("w-full border border-border/70", className)}>
      {label && (
        <div className="flex items-center justify-between gap-3 border-b border-border/70 pl-4 pr-2 py-1.5 min-h-10">
          <SectionLabel>{label}</SectionLabel>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="font-pixel-square text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

/** One row in an admin list. Square edges, hairline separators. */
export function Row({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-muted/40",
        className,
      )}
    >
      {children}
    </li>
  );
}

export function RowList({ children }: { children: ReactNode }) {
  return <ul className="divide-y divide-border/70">{children}</ul>;
}
