-- =============================================================================
-- 07 · Move skill icons from skillicons.dev to devicon
-- =============================================================================
-- skillicons has no machine-readable icon list, caps out at ~240 icons, and has
-- no React Native mark -- which is why "React Native" currently reuses React's
-- icon and the public grid shows the React logo twice.
--
-- devicon publishes devicon.json (578 icons, with tags), so the admin picker
-- can be manifest-backed and kept fresh from one file.
--
-- Two new columns:
--   icon_variant  devicon URLs need name AND variant. One devicon name contains
--                 a hyphen and 19 icons have no 'original', so the variant
--                 cannot be parsed back out of a combined string.
--   invert_dark   devicon ships plain logos. Three of these (nextjs, express,
--                 vercel) carry no fill and render black, i.e. invisible on the
--                 dark theme. skillicons solved this with themed tile art;
--                 here the fix is a CSS invert on that subset.
--
-- icon_id_legacy keeps the old skillicons slugs so this is reversible.
-- =============================================================================

alter table public.skills
  add column if not exists icon_variant   text    not null default 'original',
  add column if not exists invert_dark    boolean not null default false,
  add column if not exists icon_id_legacy text;

-- Preserve the skillicons slugs before overwriting them.
update public.skills
  set icon_id_legacy = icon_id
  where icon_id_legacy is null;

-- -----------------------------------------------------------------------------
-- Remap. Keyed on skill NAME, not icon_id: React and React Native both hold
-- 'react' today and must diverge.
-- -----------------------------------------------------------------------------
with mapping (name, devicon, variant, mono) as (
  values
  ('React', 'react', 'original', false),
  ('Next.js', 'nextjs', 'original', true),
  ('TypeScript', 'typescript', 'original', false),
  ('JavaScript', 'javascript', 'original', false),
  ('HTML', 'html5', 'original', false),
  ('CSS', 'css3', 'original', false),
  ('TailwindCSS', 'tailwindcss', 'original', false),
  ('Bootstrap', 'bootstrap', 'original', false),
  ('React Native', 'reactnative', 'original', false),
  ('Node.js', 'nodejs', 'original', false),
  ('Express', 'express', 'original', true),
  ('PostgreSQL', 'postgresql', 'original', false),
  ('Supabase', 'supabase', 'original', false),
  ('MongoDB', 'mongodb', 'original', false),
  ('Firebase', 'firebase', 'original', false),
  ('Git', 'git', 'original', false),
  ('Postman', 'postman', 'original', false),
  ('Figma', 'figma', 'original', false),
  ('Blender 3D', 'blender', 'original', false),
  ('Vercel', 'vercel', 'original', true)
)
update public.skills s
   set icon_id      = m.devicon,
       icon_variant = m.variant,
       invert_dark  = m.mono
  from mapping m
 where s.name = m.name;

comment on column public.skills.icon_id is
  'devicon icon name, e.g. "postgresql". Combined with icon_variant to build '
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<icon_id>/<icon_id>-<icon_variant>.svg';

comment on column public.skills.invert_dark is
  'True for single-colour marks that carry no fill and render black. The public '
  'grid applies a CSS invert to these in dark mode only; inverting every icon '
  'would destroy the coloured logos.';

comment on column public.skills.icon_id_legacy is
  'Pre-migration skillicons.dev slug, retained so this change is reversible.';
