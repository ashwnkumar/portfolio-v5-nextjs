import { Button } from "@/components/ui/button";
import { getSocialLinks } from "@/lib/data";
import { SocialLink } from "@/lib/types";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

function Contact() {
  const socials = getSocialLinks();
  const githubUrl = socials.find(
    (s: SocialLink) => s.platform === "github",
  )?.url;
  const linkedinUrl = socials.find(
    (s: SocialLink) => s.platform === "linkedin",
  )?.url;

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 md:py-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 relative w-full border-y px-4 py-3 text-base md:text-lg text-muted-foreground">
        <span className="whitespace-nowrap">// get in touch</span>
        <div className="h-px w-full bg-muted-foreground/30" />
      </div>

      {/* Contact Content */}
      <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-4">
        <div className="max-w-2xl text-center space-y-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            Let's work together
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I'm always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            feel free to reach out.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="mailto:your.email@example.com">
                <EnvelopeSimpleIcon className="size-5" />
                Send me an email
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <span className="text-sm text-muted-foreground">
              Or connect with me on
            </span>
            <div className="flex gap-2">
              {githubUrl && (
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubLogoIcon className="size-5" />
                  </Link>
                </Button>
              )}
              {linkedinUrl && (
                <Button variant="ghost" size="icon" asChild>
                  <Link
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinLogoIcon className="size-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
