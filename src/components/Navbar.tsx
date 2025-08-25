"use client";

import { navbarRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./form/Button";
import { FileText } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const linkClasses = (isActive: boolean) =>
    `${
      isActive ? "text-brand font-medium" : "text-secondary hover:text-primary"
    } 
     px-4 py-2 rounded-md transition-colors duration-300`;

  return (
    <nav className=" w-full p-4 flex items-center justify-between">
      <div className="flex items-center justify-center gap-2 divide-x divide-gray">
        <Link href="/" className="inline-block pr-4">
          <h3 className="text-2xl font-bold text-brand">[AK]</h3>
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
      <Button
        label="Download CV"
        onClick={() => {}}
        variant="outline"
        icon={FileText}
      />
    </nav>
  );
}
