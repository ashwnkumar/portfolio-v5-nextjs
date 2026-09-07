import { getShuffledStudioMix } from "@/lib/data";
import { getSessionSeed } from "@/lib/session";
import StudioGallery from "@/components/StudioGallery";

/** Dynamic: per-session shuffle of the cached studio image list. */
export default async function StudioGallerySection() {
  const seed = await getSessionSeed();
  const items = await getShuffledStudioMix(seed, 10);

  return <StudioGallery items={items} />;
}
