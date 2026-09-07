"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * Technologies are a set, not a comma-separated string. `suggestions` are the
 * technologies already used across other roles, so "TailwindCSS" stays
 * "TailwindCSS" instead of drifting to "Tailwind CSS".
 */
export function TechChips({
  name,
  defaultValue = [],
  suggestions = [],
}: {
  name: string;
  defaultValue?: string[];
  suggestions?: string[];
}) {
  const [items, setItems] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");

  const matches = useMemo(() => {
    const q = draft.trim().toLowerCase();
    if (!q) return [];
    return suggestions
      .filter((s) => s.toLowerCase().includes(q) && !items.includes(s))
      .slice(0, 6);
  }, [draft, suggestions, items]);

  function add(value: string) {
    const clean = value.trim();
    if (!clean || items.includes(clean)) {
      setDraft("");
      return;
    }
    setItems((prev) => [...prev, clean]);
    setDraft("");
  }

  return (
    <div className="space-y-2">
      <Label className="text-xs">Technologies</Label>
      <input type="hidden" name={name} value={items.join(", ")} />

      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 border border-border pl-2 pr-1 py-0.5 text-xs"
          >
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              onClick={() => setItems((prev) => prev.filter((i) => i !== item))}
              className="text-muted-foreground hover:text-destructive"
            >
              <XIcon className="w-3 h-3" />
            </button>
          </span>
        ))}
        {items.length === 0 && (
          <span className="text-xs text-muted-foreground">None yet.</span>
        )}
      </div>

      <div className="relative">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              // Enter must not submit the surrounding form.
              e.preventDefault();
              add(matches[0] && draft.trim().length > 1 ? matches[0] : draft);
            } else if (e.key === "Backspace" && !draft && items.length) {
              setItems((prev) => prev.slice(0, -1));
            }
          }}
        />
        {matches.length > 0 && (
          <div className="absolute z-20 mt-1 w-full border border-border bg-background shadow-sm">
            {matches.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => add(m)}
                className="block w-full text-left px-2.5 py-1.5 text-xs hover:bg-muted/60"
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
