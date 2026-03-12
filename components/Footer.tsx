import { SocialLink } from "@/lib/types";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";

type FooterProps = {
  socials: SocialLink[];
};

function Footer({ socials }: FooterProps) {
  return (
    <div className="w-full flex items-center justify-center border-y  text-muted-foreground text-sm">
      <div className="w-full max-w-[70vw] flex flex-col items-center justify-center border-x ">
        <div className="flex items-start justify-between w-full p-4">
          <div className="flex items-center gap-2 p-2">
            <p>© 2026 | All Rights Reserved</p>
          </div>
          <div className=" grid grid-cols-2 items-center gap-2">
            {socials.map((i: SocialLink) => (
              <Button variant={"ghost"} key={i.label} className="group">
                // {i.label}
                <ArrowUpRightIcon className="group-hover:rotate-45 transition-all duration-500 ease-in-out" />
              </Button>
            ))}
          </div>
        </div>
        <p className=" border-t w-full text-center p-3">
          //now go build something{" "}
          <span className="text-foreground"> cool. </span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
