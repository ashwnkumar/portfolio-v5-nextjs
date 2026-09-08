import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PaperPlaneIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getSocialLinks } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";
import DecryptedText from "@/components/DecryptedText";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ashwin Kumar for collaborations, freelance projects, or just to say hi.",
};

export default async function ContactPage() {
  const socials = await getSocialLinks();

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 md:gap-12 items-center pb-16">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/70">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground ">
              // let's connect
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight font-pixel-grid">
              <DecryptedText
                text={"Contact"}
                speed={50}
                animateOn="view"
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
              />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Got a project in mind? Want to collaborate? Or just want to chat
              about tech, design, or photography? Drop me a message and let's
              start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <RevealOnScroll>
        <div className="w-full px-4 md:px-12 grid md:grid-cols-[1fr_400px] gap-8 md:gap-12">
          {/* Contact Form */}
          <section className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground ">
                // send a message
              </p>
              <h2 className="text-2xl md:text-3xl font-medium">
                What's on your mind?
              </h2>
            </div>

            <ContactForm />
          </section>

          {/* Sidebar - Contact Info */}
          <aside className="space-y-6">
            {/* Direct Contact */}
            <div className="border p-4 md:p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground ">
                  // direct contact
                </p>
                <h3 className="text-lg font-medium">Other ways to reach me</h3>
              </div>

              <div className="space-y-3">
                {socials
                  .filter((s: any) =>
                    ["email", "instagram", "linkedin"].includes(s.platform),
                  )
                  .map((social: any) => {
                    const Icon =
                      social.platform === "email"
                        ? EnvelopeSimpleIcon
                        : social.platform === "github"
                          ? GithubLogoIcon
                          : LinkedinLogoIcon;
                    return (
                      <Link
                        key={social.platform}
                        href={social.url}
                        target={
                          social.platform === "email" ? undefined : "_blank"
                        }
                        rel={
                          social.platform === "email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="flex items-center gap-3 p-3 border hover:bg-muted/50 transition-colors group"
                      >
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {social.display_name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {social.platform === "email"
                              ? social.url.replace("mailto:", "")
                              : `@${social.label}`}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Response Time */}
            <div className="border p-4 md:p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground ">
                  // response time
                </p>
                <h3 className="text-lg font-medium">What to expect</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full aspect-square w-2 bg-green-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">
                      Usually within 24 hours
                    </p>
                    <p className="text-xs text-muted-foreground">
                      I try to respond to all messages quickly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full aspect-square w-2 bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">Open to opportunities</p>
                    <p className="text-xs text-muted-foreground">
                      Freelance projects, collaborations, or full-time roles
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full aspect-square w-2 bg-purple-500 mt-2" />
                  <div>
                    <p className="text-sm font-medium">Always learning</p>
                    <p className="text-xs text-muted-foreground">
                      Love discussing new tech, tools, and ideas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border p-4 md:p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground ">// location</p>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Based in Pune, MH, IN</h3>
                </div>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="gap-2">
                  <div className="rounded-full aspect-square w-2 bg-green-500" />
                  Available for remote work
                </Badge>
              </div>
            </div>
          </aside>
        </div>
      </RevealOnScroll>

      {/* Philosophy Section */}
      <RevealOnScroll>
        <section className="w-full px-4 md:px-12 py-8 md:py-16">
          <div className="space-y-6">
            <blockquote className="border-l-4 border-primary/50 pl-6 py-2">
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                "Alone we can do so little; together we can do so much."
              </p>
              <footer className="mt-3 text-xs md:text-sm text-muted-foreground">
                — Helen Keller
              </footer>
            </blockquote>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              I believe the best work happens when people with different
              perspectives come together. Whether you're a designer with a
              vision, a founder with an idea, or a developer looking to
              collaborate, I'm always excited to explore new possibilities.
              Let's build something meaningful.
            </p>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
