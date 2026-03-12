import { SocialLink } from "@/lib/types";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";

type FooterProps = {
  socials: SocialLink[];
};

function Footer({ socials }: FooterProps) {
  return (
    <div className="w-full flex items-center justify-center border-y text-muted-foreground text-sm">
      <div className="w-full max-w-[90vw] md:max-w-[70vw] flex px-4 items-center justify-between border-x">
        <p className="text-center md:text-left">© 2026 | All Rights Reserved</p>
        <p className=" text-center p-3">
          //now go build something{" "}
          <span className="text-foreground"> cool. </span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
