"use client";

import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { DEVICON_ICONS, type DeviconEntry } from "@/lib/devicon-list";
import { deviconUrl } from "@/lib/devicon";
import { cn } from "@/lib/utils";

export type IconChoice = { iconId: string; iconVariant: string };

/** Title-cases a devicon id as a starting point for the skill name. */
function suggestName(id: string) {
  return id.charAt(0).toUpperCase() + id.slice(1);
}

function search(query: string, limit = 8): DeviconEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts: DeviconEntry[] = [];
  const contains: DeviconEntry[] = [];
  for (const icon of DEVICON_ICONS) {
    if (icon.id.startsWith(q)) starts.push(icon);
    else if (icon.id.includes(q) || icon.terms.toLowerCase().includes(q)) contains.push(icon);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

/**
 * Type a skill name, pick from live-rendered devicon results. Each result is
 * shown on a light AND a dark chip so a mark that vanishes on one theme is
 * obvious before you commit to it — that is what the invert toggle is for.
 */
export function IconPicker({
  value,
  onSelect,
  placeholder = "Search icons — react, postgres, figma…",
  autoFocus,
}: {
  value?: IconChoice | null;
  onSelect: (choice: IconChoice, suggestedName: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => search(query), [query]);

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2">
        {value?.iconId && (
          <span className="w-9 h-9 shrink-0 border border-border/70 flex items-center justify-center p-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={deviconUrl(value.iconId, value.iconVariant)!}
              alt=""
              className="w-full h-full object-contain"
            />
          </span>
        )}
        <Input
          value={query}
          autoFocus={autoFocus}
          placeholder={value?.iconId ? `${value.iconId} — search to change` : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="font-mono text-xs"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-30 mt-1 w-full max-h-72 overflow-y-auto border border-border/70 bg-background shadow-md">
          {results.map((icon) => (
            <button
              key={icon.id + icon.variant}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onSelect({ iconId: icon.id, iconVariant: icon.variant }, suggestName(icon.id));
                setQuery("");
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-2.5 py-2 hover:bg-muted/60 text-left"
            >
              {/* light chip */}
              <span className="w-8 h-8 shrink-0 bg-white border border-border/70 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={deviconUrl(icon.id, icon.variant)!} alt="" className="w-full h-full object-contain" />
              </span>
              {/* dark chip — a mark that disappears here needs invert */}
              <span className="w-8 h-8 shrink-0 bg-neutral-900 border border-border/70 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={deviconUrl(icon.id, icon.variant)!} alt="" className="w-full h-full object-contain" />
              </span>

              <span className="flex-1 min-w-0">
                <span className="block text-sm truncate">{suggestName(icon.id)}</span>
                <span className="block font-mono text-[10px] text-muted-foreground truncate">
                  {icon.id}
                  {icon.variant !== "original" && ` · ${icon.variant}`}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className={cn("absolute z-30 mt-1 w-full border border-border/70 bg-background p-3")}>
          <p className="text-xs text-muted-foreground">
            No icon matches “{query}”. Save the skill without one — the grid falls
            back to a two-letter monogram.
          </p>
        </div>
      )}
    </div>
  );
}
