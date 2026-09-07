-- =============================================================================
-- 02 · Content tables
-- =============================================================================
-- Design notes:
--
--  * Image columns store the object PATH inside the `portfolio` storage bucket
--    (e.g. 'projects/calyx-preview.webp'), never a full URL. Paths survive a
--    project ref change, bucket rename, or custom domain; baked URLs do not.
--
--  * Singleton tables use `id smallint primary key default 1 check (id = 1)`,
--    so a second row is a constraint violation rather than a silent duplicate
--    that the app would arbitrarily pick between.
--
--  * Every editable table carries sort_order + timestamps from day one. The
--    admin panel is a later phase, but retrofitting these onto live data is
--    exactly the second migration we are trying to avoid.
--
--  * Date fields on experience stay `text` ('Nov 2024', 'July 2025'). They are
--    display strings today; converting to `date` would change how they render.
--    Explicit sort_order handles ordering instead.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Site chrome
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id                    smallint primary key default 1 check (id = 1),
  nav_brand_name        text not null,
  nav_brand_href        text not null default '/',
  footer_brand_name     text not null,
  footer_brand_tagline  text not null,
  updated_at            timestamptz not null default now()
);

create table if not exists public.nav_links (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  href        text not null,
  sort_order  integer not null default 0,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Deliberately separate from nav_links: the footer uses different labels
-- ('About') than the navbar ('/about') for the same destinations.
create table if not exists public.footer_links (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  href        text not null,
  sort_order  integer not null default 0,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- `platform` is the lookup key the pages filter on (github, linkedin, email,
-- instagram, instagram-photography, artstation, twitter), so it is unique.
create table if not exists public.social_links (
  id          uuid primary key default gen_random_uuid(),
  platform    text not null unique,
  label       text not null,
  url         text not null,
  username    text,
  sort_order  integer not null default 0,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Profile & page copy
-- -----------------------------------------------------------------------------
create table if not exists public.profile (
  id                smallint primary key default 1 check (id = 1),
  name              text not null,
  tagline           text not null,
  image_home_path   text,
  image_about_path  text,
  image_alt         text not null default '',
  updated_at        timestamptz not null default now()
);

create table if not exists public.home_content (
  id                       smallint primary key default 1 check (id = 1),
  hero_greeting            text not null,
  hero_tagline             text not null,
  hero_cta_primary_text    text not null,
  hero_cta_primary_href    text not null,
  hero_cta_secondary_text  text not null,
  hero_cta_secondary_href  text not null,
  philosophy_title         text not null,
  philosophy_quote         text not null,
  philosophy_author        text not null,
  philosophy_note          text not null,
  philosophy_cta_text      text not null,
  philosophy_cta_href      text not null,
  updated_at               timestamptz not null default now()
);

create table if not exists public.about_content (
  id                        smallint primary key default 1 check (id = 1),
  hero_title                text not null,
  hero_intro                text not null,
  background_title          text not null,
  background_content        text not null,
  life_outside_work_title   text not null,
  life_outside_work_content text not null,
  updated_at                timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Skills
-- -----------------------------------------------------------------------------
create table if not exists public.skill_categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- icon_id feeds https://skillicons.dev/icons?i=<icon_id>. Nullable: SkillsGrid
-- already falls back to a two-letter monogram when it is absent.
create table if not exists public.skills (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references public.skill_categories(id) on delete cascade,
  name         text not null,
  icon_id      text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists skills_category_sort_idx
  on public.skills (category_id, sort_order);

-- -----------------------------------------------------------------------------
-- Work history
-- -----------------------------------------------------------------------------
create table if not exists public.experience (
  id            uuid primary key default gen_random_uuid(),
  company       text not null,
  role          text not null,
  location      text not null default '',
  start_date    text not null,
  end_date      text,
  is_current    boolean not null default false,
  description   text not null default '',
  achievements  text[] not null default '{}',
  technologies  text[] not null default '{}',
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- At most one role may be flagged current; the home page assumes a single hit.
create unique index if not exists experience_single_current_idx
  on public.experience ((true)) where is_current;

create table if not exists public.education (
  id           uuid primary key default gen_random_uuid(),
  degree       text not null,
  institution  text not null,
  score        text,
  year         text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Projects
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  title              text not null,
  category           text not null,
  description        text not null default '',
  content            text,
  tech               text[] not null default '{}',
  github_url         text,
  live_url           text,
  preview_image_path text,
  is_featured        boolean not null default false,
  is_published       boolean not null default true,
  sort_order         integer not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

comment on column public.projects.content is
  'Long-form markdown body, migrated from data/projects/<slug>.md. Rendered '
  'through react-markdown on the project detail page.';

create index if not exists projects_published_sort_idx
  on public.projects (is_published, sort_order);

create table if not exists public.project_images (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  image_path  text not null,
  alt         text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists project_images_project_sort_idx
  on public.project_images (project_id, sort_order);

-- -----------------------------------------------------------------------------
-- Studio gallery
-- -----------------------------------------------------------------------------
-- Replaces the fs.readdirSync scan of public/images/studio/{photos,renders}.
-- The public pages shuffle these per session, but sort_order gives the admin
-- panel a stable list to reorder against.
create table if not exists public.studio_images (
  id            uuid primary key default gen_random_uuid(),
  image_path    text not null unique,
  category      text not null check (category in ('photography', '3d-art')),
  title         text,
  alt           text,
  sort_order    integer not null default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists studio_images_category_sort_idx
  on public.studio_images (category, sort_order) where is_published;

-- -----------------------------------------------------------------------------
-- updated_at triggers
-- -----------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'nav_links', 'footer_links', 'social_links',
    'profile', 'home_content', 'about_content',
    'skill_categories', 'skills', 'experience', 'education',
    'projects', 'studio_images'
  ]
  loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I; '
      'create trigger set_updated_at before update on public.%I '
      'for each row execute function public.set_updated_at();',
      t, t
    );
  end loop;
end;
$$;
