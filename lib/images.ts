const BUCKET = "portfolio";

/**
 * Turns a stored object path ("projects/calyx/1.webp") into a public URL.
 *
 * Paths are stored rather than URLs so rows survive a project-ref change or a
 * custom domain; this is the single place that knows how to expand one.
 */
export function imageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
