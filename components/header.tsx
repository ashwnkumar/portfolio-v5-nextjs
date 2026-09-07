"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Highlighter } from "./ui/highlighter";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<boolean>(false);

  const navLinks = [
    { label: "about", href: "/about" },
    { label: "work", href: "/work" },
    { label: "studio", href: "/studio" },
    { label: "contact", href: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-center w-full p-4 sticky top-0">
      <div className="flex items-center justify-between max-w-5xl bg-background/80 backdrop-blur-sm w-full px-4 py-2 rounded-xl">
        <Link href={"/"} className="text-2xl">
          ak
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((i) =>
            pathname === i.href ? (
              <Highlighter action="circle" iterations={1} padding={5}>
                <Link href={i.href}>{i.label}</Link>
              </Highlighter>
            ) : (
              <Link href={i.href}>{i.label}</Link>
            ),
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button>Resume</Button>
          <Button
            onClick={() => setTheme(!theme)}
            size={"icon"}
            variant={"secondary"}
          >
            {theme ? <SunIcon size={32} /> : <MoonIcon size={32} />}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
