import { SocialLink } from "@/lib/types";
import { ArrowUpRightIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type FooterProps = {
  socials: SocialLink[];
  quickLinks?: Array<{ name: string; href: string }>;
  brand?: { name: string; tagline: string };
};

function Footer({ socials, quickLinks, brand }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="w-full max-w-[90vw] md:max-w-[70vw] border-x mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 p-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {brand?.name || "Ashwin"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {brand?.tagline || "Full-stack developer & creative explorer"}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with code and creativity.
            </p>
          </div>

          {quickLinks && quickLinks.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Navigate
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg border border-border hover:border-foreground transition-all duration-300 p-3"
                  aria-label={social.label}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                      {social.platform}
                    </span>
                    <ArrowUpRightIcon className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {brand?.name || "Ashwin"}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/50 font-mono">
              // now go build something{" "}
              <span className="text-foreground/70">cool</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
