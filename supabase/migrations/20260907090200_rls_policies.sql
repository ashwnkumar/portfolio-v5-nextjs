-- =============================================================================
-- 03 · Row Level Security
-- =============================================================================
-- Model:
--   anon          -> read-only, and only rows flagged visible/published
--   authenticated -> same reads, plus full write when public.is_admin()
--
-- The publishable key is safe to ship to browsers precisely because of this
-- file. If a policy here is wrong, the key stops being safe -- so every table
-- gets RLS enabled explicitly, with no "enable later" gaps.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Grants (Supabase's default privileges usually cover these; stated explicitly
-- so the schema is correct even if defaults are ever changed on the project)
-- -----------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon, authenticated;
grant insert, update, delete on all tables in schema public to authenticated;

-- admin_emails is never client-readable under any role.
revoke all on public.admin_emails from anon, authenticated;

-- -----------------------------------------------------------------------------
-- Enable RLS everywhere
-- -----------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'nav_links', 'footer_links', 'social_links',
    'profile', 'home_content', 'about_content',
    'skill_categories', 'skills', 'experience', 'education',
    'projects', 'project_images', 'studio_images'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Admin write policies (uniform across every content table)
-- -----------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'nav_links', 'footer_links', 'social_links',
    'profile', 'home_content', 'about_content',
    'skill_categories', 'skills', 'experience', 'education',
    'projects', 'project_images', 'studio_images'
  ]
  loop
    execute format(
      'drop policy if exists %I on public.%I; '
      'create policy %I on public.%I for all to authenticated '
      'using (public.is_admin()) with check (public.is_admin());',
      t || '_admin_write', t,
      t || '_admin_write', t
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Public read: unconditional tables
-- -----------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'profile', 'home_content', 'about_content',
    'skill_categories', 'skills', 'experience', 'education'
  ]
  loop
    execute format(
      'drop policy if exists %I on public.%I; '
      'create policy %I on public.%I for select to anon, authenticated '
      'using (true);',
      t || '_public_read', t,
      t || '_public_read', t
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Public read: visibility-gated tables
-- -----------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['nav_links', 'footer_links', 'social_links']
  loop
    execute format(
      'drop policy if exists %I on public.%I; '
      'create policy %I on public.%I for select to anon, authenticated '
      'using (is_visible);',
      t || '_public_read', t,
      t || '_public_read', t
    );
  end loop;
end;
$$;

-- -----------------------------------------------------------------------------
-- Public read: publish-gated tables
-- -----------------------------------------------------------------------------
drop policy if exists projects_public_read on public.projects;
create policy projects_public_read on public.projects
  for select to anon, authenticated
  using (is_published);

drop policy if exists studio_images_public_read on public.studio_images;
create policy studio_images_public_read on public.studio_images
  for select to anon, authenticated
  using (is_published);

-- Gallery images inherit their parent's publish state, so an unpublished
-- project does not leak its screenshots through the images table.
drop policy if exists project_images_public_read on public.project_images;
create policy project_images_public_read on public.project_images
  for select to anon, authenticated
  using (
    exists (
      select 1
      from public.projects p
      where p.id = project_images.project_id
        and p.is_published
    )
  );
