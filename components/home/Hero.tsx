import { Button } from "@/components/ui/button";
import { getSocialLinks } from "@/lib/data";
import { SocialLink } from "@/lib/types";
import {
    DownloadIcon,
    GithubLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
function Hero() {
     const socials = getSocialLinks();
     const githubUrl = socials.find(
       (s: SocialLink) => s.platform === "github",
     )?.url;
     const linkedinUrl = socials.find(
       (s: SocialLink) => s.platform === "linkedin",
     )?.url;
  return (
    <div className="w-full  min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full flex border-y flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Content Section */}
        <div className="flex-2 flex flex-col justify-center space-y-4 md:space-y-6">
          <p className=" text-sm sm:text-base md:text-lg text-muted-foreground">
            Hello World,
          </p>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              I'm <span className=" text-foreground">Ashwin</span>
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground leading-tight">
              I craft things for the web.
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Full-stack developer and designer passionate about creating
            beautiful, functional experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-4">
            <Button variant={"secondary"} size={"lg"}>
              <DownloadIcon />
              Download Resume
            </Button>
            <Button variant={"ghost"} size={"icon-lg"} asChild>
              <Link href={githubUrl}>
                <GithubLogoIcon className="size-6" weight="thin" />
              </Link>
            </Button>
            <Button variant={"ghost"} size={"icon-lg"} asChild>
              <Link href={linkedinUrl}>
                <LinkedinLogoIcon className="size-6" weight="thin" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Image Placeholder Section */}
        <div className="flex-1 flex items-center justify-center mt-6 md:mt-0">
          <div className="relative w-full aspect-square max-w-[280px] sm:max-w-sm border border-border/70 rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-transparent" />
            <span className="relative text-muted-foreground/50  text-xs sm:text-sm">
              // image placeholder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
