"use client";
import { NavItem } from "@/lib/types";
import { TerminalIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { MenuPopover } from "./MenuPopover";
import { cn } from "@/lib/utils";

type NavbarProps = {
  navItems: NavItem[];
};

function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 w-full flex items-center justify-center border-y border-border bg-background/95 backdrop-blur-sm">
      <div className="w-full max-w-[90vw] md:max-w-[70vw] flex items-center justify-between p-2 md:p-4 border-x border-border">
        <div className="flex items-center gap-2 font-medium text-xl">
          <Button variant={"ghost"} size={"icon-lg"} asChild>
            <Link href={"/"}>
              <TerminalIcon />
            </Link>
          </Button>
          <Link href={"/"}>
            ashwin<span className="font-extralight">kumar</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item: NavItem) => (
            <Button
              key={item.label}
              variant={"ghost"}
              asChild
              className={cn(
                "text-muted-foreground transition-all duration-300 text-base",
                pathname === item.href &&
                  "text-foreground font-semibold underline",
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MenuPopover navItems={navItems} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
