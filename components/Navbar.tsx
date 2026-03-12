"use client";
import { NavItem } from "@/lib/types";
import { TerminalIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type NavbarProps = {
  navItems: NavItem[];
};

function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname();
  return (
    <div className="w-full flex items-center justify-center border-y border-border/70">
      <div className="w-full max-w-[70vw] flex items-center justify-between p-4 border-x border-border/70">
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
        {/* <div className="flex items-center gap-2">
          {navItems.map((item: NavItem) => (
            <Button
              key={item.label}
              variant={"ghost"}
              asChild
              className={cn(
                "text-muted-foreground transition-all duration-500 ease-in-out",
                pathname === item.href && "text-foreground",
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
