-- =============================================================================
-- 04 · Storage bucket and policies
-- =============================================================================
-- Single public bucket `portfolio`, laid out as:
--
--   portfolio/
--     profile/                  profile-about.webp, ...
--     projects/<slug>/          preview.webp, 1.webp, 2.webp, ...
--     studio/photography/       photo-lake.webp, ...
--     studio/3d-art/            blender-donut.webp, ...
--
-- Paths mirror what the DB stores in *_image_path / image_path columns.
-- The bucket is public because every asset on the site is public anyway; RLS
-- below still restricts who can WRITE to it.
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio',
  'portfolio',
  true,
  10485760,  -- 10 MB; comfortably above post-WebP sizes, below the originals
  array['image/webp', 'image/jpeg', 'image/png', 'image/avif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- -----------------------------------------------------------------------------
-- Read
-- -----------------------------------------------------------------------------
-- A public bucket already serves objects over the CDN without a policy, but
-- this is required for API-side list()/info() calls -- which the admin panel's
-- media browser will need.
drop policy if exists "portfolio_public_read" on storage.objects;
create policy "portfolio_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'portfolio');

-- -----------------------------------------------------------------------------
-- Write (admins only)
-- -----------------------------------------------------------------------------
drop policy if exists "portfolio_admin_insert" on storage.objects;
create policy "portfolio_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'portfolio' and public.is_admin());

drop policy if exists "portfolio_admin_update" on storage.objects;
create policy "portfolio_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'portfolio' and public.is_admin())
  with check (bucket_id = 'portfolio' and public.is_admin());

drop policy if exists "portfolio_admin_delete" on storage.objects;
create policy "portfolio_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'portfolio' and public.is_admin());
