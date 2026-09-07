import { getShuffledPhotos, getShuffledRenders } from "@/lib/data";
import { getSessionSeed } from "@/lib/session";
import StudioPreview from "@/components/home/StudioPreview";

/**
 * Dynamic: reads the session-seed cookie, so it must render inside a Suspense
 * boundary under cacheComponents. The underlying image list is cached; only
 * the per-visitor shuffle happens here.
 */
export default async function StudioPreviewSection() {
  const seed = await getSessionSeed();
  const [photos, renders] = await Promise.all([
    getShuffledPhotos(seed, 3),
    getShuffledRenders(seed, 3),
  ]);

  return <StudioPreview photos={photos} renders={renders} />;
}
