import StudioGallery from "@/components/StudioGallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CameraIcon,
  CubeIcon,
  InstagramLogoIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getShuffledStudioMix, getSocialLinks } from "@/lib/data";
import { getSessionSeed } from "@/lib/session";
import type { Metadata } from "next";
import DecryptedText from "@/components/DecryptedText";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Photography and 3D art by Ashwin Kumar — capturing moments and crafting worlds in Blender.",
};

export default async function StudioPage() {
  const seed = await getSessionSeed();
  const items = getShuffledStudioMix(seed, 10);
  const socials = getSocialLinks();
  const instagramUrl = socials.find(
    (s: any) => s.platform === "instagram-photography",
  )?.url;
  const artstationUrl = socials.find(
    (s: any) => s.platform === "artstation",
  )?.url;

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 md:gap-12 items-center pb-16">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/70">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground ">
              // creative work
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight font-pixel-grid">
              <DecryptedText
                text={"Studio"}
                speed={50}
                animateOn="view"
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
              />
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              When I'm not writing code, I'm capturing moments through my lens
              or crafting 3D worlds in Blender. This is where pixels meet
              passion.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {instagramUrl && (
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="secondary" className="gap-2">
                  <InstagramLogoIcon className="w-4 h-4" />
                  Photography
                </Button>
              </Link>
            )}
            {artstationUrl && (
              <Link
                href={artstationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="secondary" className="gap-2">
                  <ArrowUpRightIcon className="w-4 h-4" />
                  ArtStation
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Gallery with Filters */}
      <RevealOnScroll>
        <StudioGallery items={items} />
      </RevealOnScroll>

      {/* Process Section */}
      <RevealOnScroll>
        <section className="w-full px-4 md:px-12 py-8 md:py-16">
          <div className="border p-6 md:p-12 space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground ">// process</p>
              <h2 className="text-2xl md:text-3xl font-medium">How I create</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CameraIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg md:text-xl font-medium">
                    Photography
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  I shoot primarily with my smartphone (Galaxy S24) and
                  occasionally the Canon EOS 550D. I love capturing candid
                  moments, street scenes, and landscapes. My approach leans
                  toward little to no editing — I try to get the best shot I can
                  straight out of the camera.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">Sony A7III</Badge>
                  <Badge variant="secondary">Canon EOS R5</Badge>
                  <Badge variant="secondary">Lightroom</Badge>
                  <Badge variant="secondary">Capture One</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CubeIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg md:text-xl font-medium">3D Art</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Blender is my playground for 3D work. In the short time I
                  spent learning it, I managed to put together a handful of
                  models, basic animations, and small environments. I really
                  enjoy building out scenes and objects — photorealistic
                  rendering was always the dream, but my old laptop had other
                  plans. Maybe one day.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">Blender</Badge>
                  <Badge variant="secondary">Cycles</Badge>
                  <Badge variant="secondary">Geometry Nodes</Badge>
                  <Badge variant="secondary">Photoshop</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Philosophy */}
      <RevealOnScroll>
        <section className="w-full px-4 md:px-12">
          <div className="space-y-6">
            <blockquote className="border-l-4 border-primary/50 pl-6 py-2">
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                "Creativity is just connecting things. When you ask creative
                people how they did something, they feel a little guilty because
                they didn't really do it, they just saw something."
              </p>
              <footer className="mt-3 text-xs md:text-sm text-muted-foreground">
                — Steve Jobs
              </footer>
            </blockquote>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              For me, creative work is about observation and experimentation.
              It's the same mindset I bring to coding—try things, break things,
              learn, iterate. Whether I'm debugging code or adjusting exposure,
              it's all about finding the right balance.
            </p>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
