import { socials } from "@/data/_index";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

function Footer() {
  const socialLinks = Object.values(socials);
  return (
    <footer className="p-2 flex flex-col items-center justify-center gap-4 text-sm border-t pt-4">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-lg">Ashwin Kumar</h3>
          <p className="text-muted-foreground">Crafting Digital Experiences</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {socialLinks.map((l) => (
            <Button key={l.label} variant={"secondary"} size="sm" asChild>
              <Link href={l.url} className="flex items-center gap-1">{l.platform} <ArrowUpRightIcon/> </Link>
            </Button>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground">
        Copyright © 2026 Ashwin Kumar | All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
