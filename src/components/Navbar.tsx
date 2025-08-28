"use client";
import { navbarRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./form/Button";
import { BoomBox, FileText, Moon, Rabbit, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "@/contexts/GlobalContext";

const themes = [
  { name: "Dark", key: "dark", icon: Moon },
  { name: "Light", key: "light", icon: Sun },
  { name: "Neo", key: "neo", icon: Rabbit },
  { name: "Upside Down", key: "upside-down", icon: BoomBox },
];

export default function Navbar() {
  const { theme } = useGlobal();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClasses = (isActive: boolean) =>
    `${
      isActive ? "text-brand " : "text-secondary hover:text-primary"
    } px-4 py-2 rounded-md transition-all duration-300 ease-in-out active:scale-95 font-semibold`;

  const getLogo = () => {
    switch (theme) {
      case "neo":
        return "Neo";
      case "upside-down":
        return "11";
      default:
        return "AK";
    }
  };

  return (
    <nav className="w-full p-4 flex items-center justify-between ">
      <div className="flex items-center justify-center gap-2 divide-x divide-border">
        <Link href="/" className="inline-block px-4">
          <h3 className="text-3xl font-bold text-brand active:scale-95 transition-all duration-300 ease-in-out uppercase ">
            [{getLogo()}]
          </h3>
        </Link>
        <ul className="flex flex-row items-center">
          {navbarRoutes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <li key={route.name}>
                <Link
                  href={route.path}
                  aria-current={isActive ? "page" : undefined}
                  className={linkClasses(isActive)}
                >
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-5">
        <Button
          label="Download CV"
          onClick={() => {}}
          variant="outline"
          icon={FileText}
        />

        {/* <div className="relative text-primary" ref={dropdownRef}>
          <button
            type="button"
            className={`p-2 rounded-full cursor-pointer transition-all  duration-300 ease-in-out border ${isOpen ? "bg-brand-faded  border-brand" : "hover:bg-hover border-border"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {(() => {
              const Icon = themes.find((t) => t.key === theme)?.icon || Moon;
              return <Icon size={24} strokeWidth={1.5} />;
            })()}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 min-w-48 w-fit border border-border rounded-md shadow-md overflow-hidden z-50 p-2 space-y-2 bg-bg">
              {themes.map((t) => {
                const Icon = t.icon;
                const isActive = t.key === theme;
                return (
                  <button
                    key={t.key}
                    className={`w-full  flex items-center gap-2 p-2 whitespace-nowrap transition-colors duration-300 ease-in-out rounded-sm ${isActive ? "bg-brand-faded text-brand font-medium" : "hover:bg-hover"}`}
                    onClick={() => {
                      applyTheme(t.key);
                      setIsOpen(false);
                    }}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                    {t.name}
                  </button>
                );
              })}
            </div>
          )}
        </div> */}
      </div>
    </nav>
  );
}
