import StudioGallery from "@/components/StudioGallery";
import { Badge } from "@/components/ui/badge";
import { CameraIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";
import { getShuffledStudioMix } from "@/lib/data";
import { getSessionSeed } from "@/lib/session";

export default async function StudioPage() {
  const seed = await getSessionSeed();
  const items = getShuffledStudioMix(seed, 10);

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 md:gap-12 items-center pb-16">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-12 py-12 md:py-24 bg-linear-to-b from-transparent to-muted/40">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground ">
              // creative work
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight font-pixel-grid">
              Studio
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              When I'm not writing code, I'm capturing moments through my lens
              or crafting 3D worlds in Blender. This is where pixels meet
              passion.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery with Filters */}
      <StudioGallery items={items} />

      {/* Process Section */}
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
                <h3 className="text-lg md:text-xl font-medium">Photography</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                I shoot primarily with Sony and Canon systems, focusing on
                street, landscape, and portrait photography. My approach is
                minimal editing—capturing the moment as authentically as
                possible. Natural light is my favorite tool.
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
                Blender is my playground for 3D work. I love experimenting with
                procedural generation, abstract forms, and photorealistic
                rendering. Whether it's product visualization or pure artistic
                expression, I'm always learning something new.
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

      {/* Philosophy */}
      <section className="w-full px-4 md:px-12">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground ">
            // creative philosophy
          </p>
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
            For me, creative work is about observation and experimentation. It's
            the same mindset I bring to coding—try things, break things, learn,
            iterate. Whether I'm debugging code or adjusting exposure, it's all
            about finding the right balance.
          </p>
        </div>
      </section>
    </div>
  );
}
