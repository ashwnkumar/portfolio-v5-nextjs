-- =============================================================================
-- 06 · Social link display names
-- =============================================================================
-- The contact page derived its label by capitalising the platform slug
-- (platform.charAt(0).toUpperCase() + platform.slice(1)), which publishes
-- "Linkedin" rather than "LinkedIn". Display text belongs in the data, not in
-- a string transform.
--
-- Also drops `username`, which was selected, typed and editable but read by no
-- component -- three of seven rows were null and the rest disagreed with
-- `label`.
-- =============================================================================

alter table public.social_links
  add column if not exists display_name text;

-- -----------------------------------------------------------------------------
-- Backfill with correct casing; fall back to a capitalised slug for anything
-- added later that is not in this list.
-- -----------------------------------------------------------------------------
update public.social_links set display_name = case platform
  when 'github'                then 'GitHub'
  when 'linkedin'              then 'LinkedIn'
  when 'email'                 then 'Email'
  when 'instagram'             then 'Instagram'
  when 'instagram-photography' then 'Photography'
  when 'twitter'               then 'X'
  when 'artstation'            then 'ArtStation'
  else initcap(replace(platform, '-', ' '))
end
where display_name is null;

alter table public.social_links
  alter column display_name set not null;

-- -----------------------------------------------------------------------------
-- GitHub was stored with an insecure scheme
-- -----------------------------------------------------------------------------
update public.social_links
  set url = 'https://' || substring(url from 8)
  where url like 'http://%';

-- -----------------------------------------------------------------------------
-- Remove the dead column
-- -----------------------------------------------------------------------------
alter table public.social_links
  drop column if exists username;

comment on column public.social_links.display_name is
  'Human-facing name for this link (GitHub, LinkedIn, X). Never derive this '
  'from the platform slug -- that is a lookup key, not display text.';

comment on column public.social_links.platform is
  'Lookup key. The site filters on these values in ~17 places (github, '
  'linkedin, email, instagram, instagram-photography, artstation, twitter); '
  'renaming one silently breaks those links.';
