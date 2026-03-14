# Session-Based Image Shuffle System

## Overview

The portfolio uses a session-based shuffle system to display a unique but consistent arrangement of studio images (photography and 3D renders) per visitor session. Each time a user opens the site in a new browser session, they see a fresh randomized selection. Within the same session, the order stays consistent across page navigations.

## How It Works

```
Browser Request
  │
  ▼
middleware.ts ─── Has "session-seed" cookie? ─── Yes ──▶ Pass through
  │                                                        │
  No                                                       │
  │                                                        │
  ▼                                                        │
  Set cookie: session-seed = <random 0–999999>             │
  (session-scoped, no maxAge)                              │
  │                                                        │
  ◀────────────────────────────────────────────────────────┘
  │
  ▼
Server Component (e.g. /studio, /about, /)
  │
  ▼
lib/session.ts ─── getSessionSeed()
  │                 Reads "session-seed" from cookies()
  │                 Returns parsed integer
  │
  ▼
lib/data.ts ─── getShuffledPhotos(seed, count?)
  │              getShuffledRenders(seed, count?)
  │              getShuffledStudioMix(seed, photoCount?)
  │              │
  │              ├── readImageDir("photos" | "renders")
  │              │   Reads public/images/studio/<subdir>/
  │              │   Filters by image extensions
  │              │   Returns array of public URL paths
  │              │
  │              └── seededShuffle(array, seed)
  │                  Deterministic Fisher-Yates shuffle
  │                  Same seed + same input = same output
  │
  ▼
Component receives shuffled image paths as props
```

## Files Involved

### `middleware.ts`

Runs on every request to `/`, `/about`, `/studio`, and `/contact`. Checks for the `session-seed` cookie. If absent, generates a random integer (0–999,999) and sets it as a session cookie (no `maxAge`, so it expires when the browser closes).

### `lib/random.ts`

Contains two functions:

- **`seededRandom(seed)`** — Returns a pseudo-random number generator function using a linear congruential generator (LCG). Each call to the returned function produces the next number in a deterministic sequence based on the initial seed.

- **`seededShuffle(array, seed)`** — Takes an array and a seed, returns a new array shuffled using the Fisher-Yates algorithm powered by `seededRandom`. The original array is not mutated. Given the same seed and same input array, the output is always identical.

### `lib/session.ts`

- **`getSessionSeed()`** — Async function that reads the `session-seed` cookie using Next.js `cookies()` from `next/headers`. Returns the parsed integer. Falls back to a random number if the cookie is somehow missing (shouldn't happen with middleware in place, but acts as a safety net).

### `lib/data.ts`

Three exported functions handle image retrieval:

- **`getShuffledPhotos(seed, count?)`** — Reads all image files from `public/images/studio/photos/`, shuffles them with the session seed, and optionally slices to `count`.

- **`getShuffledRenders(seed, count?)`** — Same as above but reads from `public/images/studio/renders/`.

- **`getShuffledStudioMix(seed, photoCount?)`** — Combines photos and renders into a single array with category metadata (`"Photography"` or `"3D Art"`), then shuffles the combined array so the two types are interleaved naturally. `photoCount` controls how many photos to include (renders are all included).

Internal helper:

- **`readImageDir(subdir)`** — Reads `public/images/studio/<subdir>/` using `fs.readdirSync`, filters for image extensions (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`), and returns public URL paths (e.g., `/images/studio/photos/photo-lake.jpg`).

## Where Each Function Is Used

| Page       | Function Called                                              | Result                                 |
| ---------- | ------------------------------------------------------------ | -------------------------------------- |
| `/` (home) | `getShuffledPhotos(seed, 3)` + `getShuffledRenders(seed, 3)` | 3 photos + 3 renders for StudioPreview |
| `/about`   | `getShuffledPhotos(seed, 5)`                                 | 5 photos for the gallery carousel      |
| `/studio`  | `getShuffledStudioMix(seed, 10)`                             | 10 photos + all renders, interleaved   |

## Image Directory Structure

```
public/images/studio/
├── photos/          ← Photography (shuffled, used everywhere)
│   ├── photo-lake.jpg
│   ├── photo-crow.jpg
│   └── ...
└── renders/         ← 3D Art (shuffled, studio + home only)
    ├── blender-batarang-1.png
    ├── blender-donut.png
    └── ...
```

## Adding New Images

Just drop files into the appropriate subdirectory. No JSON or config updates needed — the system reads the filesystem directly. The new images will be included in the shuffle pool automatically on the next request.

## Session Behavior

- **Same session**: Navigating between pages shows the same shuffled order. The seed is consistent because the cookie persists.
- **New session**: Opening a new browser window/tab after closing all previous ones generates a new seed, producing a different arrangement.
- **Hard refresh**: Same session, same order (cookie still exists).
- **Incognito/private**: Each incognito window gets its own seed.
