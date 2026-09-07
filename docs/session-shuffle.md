# Session-Based Image Shuffle System

## Overview

The portfolio shows a unique but consistent arrangement of studio images
(photography and 3D renders) per visitor session. A new browser session sees a
fresh order; within a session the order stays put across navigations.

## How It Works

```
Browser Request
  │
  ▼
proxy.ts ─── Has "session-seed" cookie? ─── Yes ──▶ Pass through
  │                                                   │
  No → set session-seed = <random 0–999999>           │
  │     (session-scoped, no maxAge)                   │
  ◀───────────────────────────────────────────────────┘
  │
  ▼
Page (static shell, prerendered)
  │
  ▼
<Suspense> ─── components/sections/*Section.tsx     ← dynamic, streamed
  │
  ├── lib/session.ts   getSessionSeed()   reads the cookie
  │
  └── lib/data.ts      getShuffledPhotos / getShuffledRenders /
                       getShuffledStudioMix
                         │
                         ├── getStudioImages()   ← CACHED ("use cache",
                         │     one Supabase query, tag: studio_images)
                         │
                         └── seededShuffle(rows, seed)   ← NOT cached
```

## The caching split

This is the part worth understanding. `getStudioImages()` is marked
`"use cache"` and tagged, so the database is queried once per revalidation and
the result is shared by every visitor. The shuffle helpers that consume it are
deliberately **not** cached: they take a per-session seed, so caching them would
create one cache entry per visitor and defeat the point. Shuffling a
39-element array costs microseconds.

## Why the Suspense boundaries

`cacheComponents` is enabled in `next.config.ts`. Under it, reading `cookies()`
makes a subtree dynamic, and dynamic subtrees must sit inside a Suspense
boundary or the build fails. So the cookie read and the shuffle live in small
async components under `components/sections/`, which the pages render inside
`<Suspense>`:

| Page | Section component | Result |
|------|-------------------|--------|
| `/` | `StudioPreviewSection` | 3 photos + 3 renders |
| `/about` | `AboutGallery` | 5 photos, plus the Instagram link |
| `/studio` | `StudioGallerySection` | 10 photos + all renders, interleaved |

The payoff shows up in the build output: those routes are `◐ Partial
Prerender` — static HTML shell, with just the gallery streamed in per request.

## Files Involved

- **`proxy.ts`** — sets the `session-seed` cookie when absent. (Formerly
  `middleware.ts`; Next 16 renamed the convention.)
- **`lib/random.ts`** — `seededRandom` (LCG) and `seededShuffle`
  (Fisher-Yates). Same seed + same input = same output. Unchanged by the
  Supabase migration: it is a pure function over an array.
- **`lib/session.ts`** — `getSessionSeed()` reads the cookie.
- **`lib/data.ts`** — the cached fetch and the uncached shuffle helpers.

## Adding New Images

Insert a row in `studio_images` with the storage path and category
(`photography` or `3d-art`), and upload the file to the `portfolio` bucket —
the admin panel will do both. Then the cache needs busting:
`revalidateTag("studio_images")`. Until the admin panel lands, the tag expires
on its own within a day.

Previously this was "drop a file in `public/images/studio/`", which worked
because the gallery scanned the directory. It no longer does.

## Session Behavior

- **Same session**: same order across navigations (cookie persists).
- **New session**: new seed, different arrangement.
- **Hard refresh**: same order.
- **Incognito**: its own seed.
