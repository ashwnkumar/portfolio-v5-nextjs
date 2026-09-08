import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  XLogoIcon,
  PaletteIcon,
  CameraIcon,
  LinkSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  email: EnvelopeSimpleIcon,
  instagram: InstagramLogoIcon,
  "instagram-photography": CameraIcon,
  twitter: XLogoIcon,
  artstation: PaletteIcon,
};

/** Icons make seven near-identical text rows scannable at a glance. */
export function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  const Icon = ICONS[platform] ?? LinkSimpleIcon;
  return <Icon className={className} />;
}
