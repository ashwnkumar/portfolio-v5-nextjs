import Link from "next/link";
import { Button } from "./button";
import { RiTerminalLine } from "@remixicon/react";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-center border-y border-border/70">
      <div className="w-full max-w-[80vw] flex items-center justify-between p-4 border-x border-border/70">
        <div className="flex items-center gap-2 font-medium text-xl">
          <Button variant={"ghost"} size={"icon-lg"} asChild>
            <Link href={"/"}>
              <RiTerminalLine />
            </Link>
          </Button>
          <Link href={"/"}>
            ashwin<span className="font-extralight">kumar</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button variant={"outline"} size={"icon"}>
            <LightbulbIcon />
          </Button> */}
          {/* <Button variant={"secondary"}>
            / download resume
            <FileIcon />
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
