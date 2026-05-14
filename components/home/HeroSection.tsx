import { bio, socials } from "@/data/_index";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import { Highlighter } from "../ui/highlighter";
import { Button } from "../ui/button";

function HeroSection() {
  const current_job = bio.work_exp[0];

  return (
    <div className=" w-full flex flex-col items-start gap-8 py-20">
      <SectionHeader title={bio.header} />
      <p>{bio.tagline}</p>
      <span>
        Currently working as a{" "}
        <Highlighter action="underline" color="var(--muted-foreground)">
          {" "}
          <span className="font-semibold"> {current_job.role} </span>{" "}
        </Highlighter>{" "}
        at{" "}
        <Highlighter action="underline" color="var(--muted-foreground)">
          {" "}
          <span className="font-semibold">{current_job.company} </span>{" "}
        </Highlighter>
      </span>

      <div className="flex items-center gap-2">
        <Button asChild size={"icon"} variant={"ghost"}>
          <Link target="_blank" href={`${socials.github.url}`}>
            <GithubLogoIcon className="w-6! h-6!" />
          </Link>
        </Button>
        <Button asChild size={"icon"} variant={"ghost"}>
          <Link target="_blank" href={`${socials.linkedin.url}`}>
            <LinkedinLogoIcon className="w-6! h-6!" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
