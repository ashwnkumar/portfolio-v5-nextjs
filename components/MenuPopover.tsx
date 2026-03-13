"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { NavItem } from "@/lib/types";

type MenuPopoverProps = {
  navItems: NavItem[];
};

export function MenuPopover({ navItems }: MenuPopoverProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="group relative w-10 h-10 border border-border/70 hover:border-primary/50 transition-all duration-300"
          aria-label="Menu"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute left-0 w-full h-[2px] bg-foreground transition-all duration-300",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-foreground transition-all duration-300",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-full h-[2px] bg-foreground transition-all duration-300",
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1",
                )}
              />
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[70vw] p-0 border border-border/70 bg-background backdrop-blur-sm overflow-hidden"
      >
        <div className="relative">
          {/* Menu items */}
          <div className="relative p-4 space-y-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group relative block py-4 px-6 border bg-accent/10 border-border/50 transition-all duration-300",
                    "hover:border-primary/50 hover:bg-accent/50",
                    isActive && "border-primary/70 bg-accent/20",
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "  transition-all duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "text-xs  transition-all duration-300",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground/50 group-hover:text-primary/70",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Hover line effect */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
