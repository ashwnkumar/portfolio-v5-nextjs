/** Suspense fallback for the dynamic, session-shuffled gallery sections. */
export function GallerySkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square bg-muted/60 animate-pulse rounded-md" />
      ))}
    </div>
  );
}
