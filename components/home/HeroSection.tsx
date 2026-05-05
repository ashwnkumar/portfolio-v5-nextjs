import { bio } from "@/data/_index";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import { Highlighter } from "../ui/highlighter";

function HeroSection() {
  const current_job = bio.work_exp[0];
  return (
    <div className=" w-full flex flex-col items-start gap-8 py-20">
      {" "}
      <SectionHeader title={bio.header}/>
      <p>{bio.tagline}</p>
      <Link href={"/about"} className="group flex items-center gap-2">
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
        <ArrowUpRightIcon className="group-hover:rotate-45 transition-all duration-500 ease-in-out"/>
      </Link>
    </div>
  );
}

export default HeroSection;
