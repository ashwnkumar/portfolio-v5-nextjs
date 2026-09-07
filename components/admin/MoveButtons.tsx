"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CaretUpIcon, CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

export function MoveButtons({
  onMove,
  isFirst,
  isLast,
}: {
  onMove: (direction: "up" | "down") => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={pending || isFirst}
        aria-label="Move up"
        onClick={() => startTransition(() => void onMove("up"))}
      >
        <CaretUpIcon className="w-3 h-3" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={pending || isLast}
        aria-label="Move down"
        onClick={() => startTransition(() => void onMove("down"))}
      >
        <CaretDownIcon className="w-3 h-3" />
      </Button>
    </div>
  );
}
