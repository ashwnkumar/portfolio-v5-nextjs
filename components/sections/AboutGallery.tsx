import { getShuffledPhotos, getSocialLinks } from "@/lib/data";
import { getSessionSeed } from "@/lib/session";
import { ImageCarousel } from "@/components/ImageCarousel";

const FALLBACK_HANDLE = "ashwin.archives";

/** Dynamic: per-session shuffle of the cached photography list. */
export default async function AboutGallery() {
  const seed = await getSessionSeed();
  const [photos, socials] = await Promise.all([
    getShuffledPhotos(seed, 5),
    getSocialLinks(),
  ]);

  const instagram = socials.find(
    (s) => s.platform === "instagram-photography",
  );

  return (
    <ImageCarousel
      images={photos}
      instagramUrl={instagram?.url ?? `https://instagram.com/${FALLBACK_HANDLE}`}
      // was `instagram?.handle`, a field that has never existed on these
      // objects, so this always fell through to the hardcoded fallback.
      instagramHandle={`@${instagram?.label ?? FALLBACK_HANDLE}`}
    />
  );
}
