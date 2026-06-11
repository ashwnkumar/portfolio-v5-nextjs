"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { Highlighter } from "./ui/highlighter";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/studio", label: "studio" },
];

function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center justify-between w-full sticky top-0 z-50 bg-background p-2">
      <Link href="/" className="text-2xl font-medium">
        Ashwin<span className="text-muted-foreground">Kumar</span>
      </Link>

      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {isActive(link.href) ? (
                  <Highlighter
                  iterations={1}
                    action="circle"
                    color="var(--muted-foreground)"
                    animationDuration={400}
                    padding={6}
                  >
                    <span className="text-foreground font-medium">
                      {link.label}
                    </span>
                  </Highlighter>
                ) : (
                  link.label
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Button variant={"secondary"} className="text-sm!">
            resume
          </Button>
          <AnimatedThemeToggler duration={600} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
