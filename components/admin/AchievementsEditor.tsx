"use client";

import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DotsSixVerticalIcon, XIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";

type Item = { id: string; value: string };

const newItem = (value = ""): Item => ({
  id: Math.random().toString(36).slice(2),
  value,
});

function AchievementRow({
  item,
  onChange,
  onRemove,
}: {
  item: Item;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-1.5 bg-background"
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 touch-none"
      >
        <DotsSixVerticalIcon className="w-4 h-4" />
      </button>
      <span className="text-muted-foreground select-none">•</span>
      <Input
        value={item.value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What did you achieve?"
        className="flex-1"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
        aria-label="Remove achievement"
        onClick={onRemove}
      >
        <XIcon className="w-3.5 h-3.5" />
      </Button>
    </Reorder.Item>
  );
}

/**
 * Achievements are a list, so they get a list editor: one input per bullet,
 * drag to reorder, remove in place. Serialised to a hidden newline-delimited
 * field on submit so the server action keeps its simple FormData contract.
 */
export function AchievementsEditor({
  name,
  defaultValue = [],
}: {
  name: string;
  defaultValue?: string[];
}) {
  const [items, setItems] = useState<Item[]>(
    defaultValue.length ? defaultValue.map((v) => newItem(v)) : [newItem()],
  );

  const update = (id: string, value: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, value } : i)));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">Achievements</Label>
        <span className="font-mono text-[10px] text-muted-foreground">
          {items.filter((i) => i.value.trim()).length} bullet
          {items.filter((i) => i.value.trim()).length === 1 ? "" : "s"}
        </span>
      </div>

      <input
        type="hidden"
        name={name}
        value={items.map((i) => i.value.trim()).filter(Boolean).join("\n")}
      />

      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-1.5">
        {items.map((item) => (
          <AchievementRow
            key={item.id}
            item={item}
            onChange={(value) => update(item.id, value)}
            onRemove={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
          />
        ))}
      </Reorder.Group>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="gap-1.5"
        onClick={() => setItems((prev) => [...prev, newItem()])}
      >
        <PlusIcon className="w-3.5 h-3.5" />
        Add achievement
      </Button>
    </div>
  );
}
