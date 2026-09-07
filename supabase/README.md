# Supabase

Schema for the portfolio content migration.

## Running the migrations

Preferred: `supabase db push` (see **CLI setup** below). Otherwise paste them
**in order** into the SQL Editor.

Filenames use the CLI's mandatory `YYYYMMDDHHmmss_` format â migration history is
keyed on that timestamp, and `db push` ignores files without one. Each file is
idempotent (`if not exists` / `drop policy if exists`), so re-running is safe.

| # | File | What it does |
|---|------|--------------|
| 1 | `20260907090000_init_helpers.sql` | `admin_emails` allowlist, `is_admin()`, `set_updated_at()` |
| 2 | `20260907090100_content_tables.sql` | 14 content tables, indexes, triggers |
| 3 | `20260907090200_rls_policies.sql` | RLS on every table, grants, read/write policies |
| 4 | `20260907090300_storage.sql` | `portfolio` bucket + storage policies |

On a first run, files 2-4 emit `NOTICE: ... does not exist, skipping` lines from
the idempotency guards. That is expected, not an error.

## Security model

- **`anon` (publishable key)** — read only, and only rows flagged
  `is_published` / `is_visible`. Cannot read `admin_emails`, cannot call
  `is_admin()`, has no insert/update/delete grant on anything.
- **`authenticated`** — same reads, plus full write *only* when
  `public.is_admin()` returns true.
- **Admin identity is keyed on email**, not `auth.users.id`, so the first OTP
  login already resolves as admin. Add or remove admins by editing
  `public.admin_emails`.

`project_images` inherits its parent's publish state, so an unpublished project
does not leak screenshots through the images table.

### Verified behaviour

Executed against Postgres 16 with stubs for `auth.jwt()` / `storage.*`:

- Singleton tables reject a second row.
- At most one `experience` row can be `is_current`.
- `studio_images.category` rejects anything outside `photography` / `3d-art`.
- `anon` sees published rows only; drafts, hidden socials and their images are
  invisible; all writes are denied at the grant level.
- A non-admin `authenticated` user sees published rows only and is blocked by
  RLS on write.
- `updated_at` advances on update.

## Storage layout

Bucket `portfolio` (public read, 10 MB limit, image mime types only):

```
portfolio/
  profile/                profile-about.webp
  projects/<slug>/        preview.webp, 1.webp, 2.webp, ...
  studio/photography/     photo-lake.webp, ...
  studio/3d-art/          blender-donut.webp, ...
```

Tables store the **object path** (`projects/calyx/1.webp`), never a full URL, so
the rows survive a project-ref change, bucket rename, or custom domain.

## Schema decisions worth knowing

- **`experience.start_date` / `end_date` are `text`** (`'Nov 2024'`), matching
  how they render today. Converting to `date` would change the display; explicit
  `sort_order` handles ordering instead.
- **`studio_images.category` uses slugs** (`photography`, `3d-art`) rather than
  the display strings the components expect (`Photography`, `3D Art`). The data
  layer maps between them, so no component changes.
- **`nav_links` and `footer_links` are separate tables** despite pointing at the
  same routes — the navbar labels them `/about`, the footer labels them `About`.
- **The social platform previously named `photography` is seeded as
  `instagram-photography`**, which is what `app/studio/page.tsx` already looks
  for. That fixes the broken studio Instagram link as a data change.

## Not migrated (dead in the current site)

`data/studio/index.json` (15 placeholder items pointing at nonexistent images),
`data/profile/playlist.json` (placeholder tracks, no `public/music/`),
`data/profile/contact.json` (never read), plus the unused keys `home.stats`,
`about.favorites`, `about.skills`, `about.lifeOutsideWork.images`,
`skills.hobbies`, `bio.traits`, `bio.japaneseText`, `footer.copyright`, and all
the `icon` / `icons` name strings.

## Seeding (Phase 1)

Two scripts, run in order from the repo root. Node 24 reads `.env` natively, so
no `dotenv` is involved:

```bash
node --env-file=.env scripts/verify-remote.mjs          # read-only preflight
node --env-file=.env scripts/migrate-images.mjs --dry-run
node --env-file=.env scripts/migrate-images.mjs         # convert + upload
node --env-file=.env scripts/seed-content.mjs           # insert rows
```

`migrate-images.mjs` converts `public/images/**` to WebP (quality 80, long edge
capped at 2400px), uploads to the bucket, and writes
`scripts/.image-manifest.json` mapping old public paths to storage paths.
Measured locally: **152.0 MB -> 9.7 MB across 90 files (-94%)**. Uploads use
upsert, so an interrupted run resumes cleanly; the manifest is only written on a
fully clean run.

`seed-content.mjs` consumes that manifest plus `data/*.json` and the seven
project markdown bodies. It refuses to run against non-empty content tables
unless given `--force`, so it cannot silently overwrite edits made later in
Supabase Studio or the admin panel.

Both scripts use `SUPABASE_SECRET_KEY` and live under `scripts/`. Nothing under
`app/` imports them.

## CLI setup

### Install

`supabase` is in homebrew-core, so no tap is needed:

```bash
brew install supabase
supabase --version
```

The Supabase docs still say `brew install supabase/tap/supabase`. That form
fails on Homebrew 6.x unless you `brew tap supabase/tap` first; the core formula
is simpler and tracks the same releases.

There is no global npm install — npm/pnpm/yarn install the CLI as a *project*
dev dependency (`npm install supabase --save-dev`, then `npx supabase ...`),
which needs Node 20+. Homebrew is the better fit here.

Upgrade later with `brew upgrade supabase`.

### Wire up the project

From the repo root:

```bash
supabase init                                  # creates supabase/config.toml
supabase login                                 # opens a browser
supabase link --project-ref jjtdueacespkyypqdeww
```

`init` may ask about generating Deno/VS Code settings; N is fine, they only
affect Edge Functions, which this project does not use. It writes
`supabase/config.toml` alongside these migrations — safe to commit.

`link` treats the database password as **optional** — it is only used to
validate database settings, and you can press enter past it. `db push` will
prompt for it when it actually needs to connect. It is the Postgres password
from Project Settings → Database, not your Supabase account password; reset it
there if you do not have it. For non-interactive runs, set `SUPABASE_DB_PASSWORD`.

### Apply

```bash
supabase db push --dry-run   # lists what would run, changes nothing
supabase db push             # applies them
```

`db push` creates `supabase_migrations.schema_migrations` on first run and
records each applied timestamp, so re-running skips what is already applied. To
correct history without re-executing SQL, use `supabase migration repair` rather
than editing that table by hand.

For later phases, `supabase migration new <name>` stamps a correctly formatted
file for you.
