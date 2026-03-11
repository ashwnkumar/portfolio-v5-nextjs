import { getSocialLinks } from "@/lib/data";
import { Button } from "./ui/button";
import { RiArrowRightUpLine, RiCornerUpRightLine } from "@remixicon/react";

type SocialLink = {
  platform: string;
  username: string;
  url: string;
  label: string;
  icons: {
    line: string;
    fill: string;
  };
};

function Footer() {
  const socials = getSocialLinks();
  console.log("socials", socials);
  return (
    <div className="w-full flex items-center justify-center border-y border-border/70 text-muted-foreground text-sm">
      <div className="w-full max-w-[80vw] flex flex-col items-center justify-center border-x border-border/70">
        <div className="flex items-start justify-between w-full p-4">
          <div className="flex items-center gap-2 p-2">
            <p>© 2026 | All Rights Reserved</p>
          </div>
          <div className=" grid grid-cols-2 items-center gap-2">
            {socials.map((i: SocialLink) => (
              <Button variant={"ghost"} key={i.label} className="group">
                // {i.label}
                <RiArrowRightUpLine className="group-hover:rotate-45 transition-all duration-500 ease-in-out" />
              </Button>
            ))}
          </div>
        </div>
        <p className="font-mono border-t w-full text-center p-3">
          //now go build something{" "}
          <span className="text-foreground"> cool. </span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
