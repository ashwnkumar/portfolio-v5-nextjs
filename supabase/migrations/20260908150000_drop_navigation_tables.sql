-- =============================================================================
-- 08 · Drop nav_links and footer_links
-- =============================================================================
-- These mirrored the app's route structure rather than holding content: both
-- tables listed the same four destinations that exist as pages, differing only
-- in label styling ("/about" vs "About").
--
-- Nothing useful could be edited through them. Changing an href could only
-- point the navbar at a route that does not exist — a silent 404 — and adding
-- a page requires writing app/(site)/<route>/page.tsx anyway, which is where
-- the nav entry now lives (lib/routes.ts), type-checkable alongside the route
-- it refers to.
--
-- site_settings is deliberately kept: brand name and tagline are real content.
-- =============================================================================

drop table if exists public.nav_links;
drop table if exists public.footer_links;
