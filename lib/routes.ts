/**
 * The site's navigation, as code.
 *
 * These were nav_links / footer_links tables until it became clear they were a
 * mirror of the app's route structure rather than content: the only things you
 * could change were a label, or an href pointing at a page that does not exist
 * — a silent 404 in your own navbar.
 *
 * Adding a page means adding app/(site)/<route>/page.tsx, so adding its entry
 * here belongs in the same change, where the href can actually be checked.
 */
export type SiteRoute = {
  href: string;
  /** Navbar label — the site styles these as paths. */
  nav: string;
  /** Footer label — plain title case. */
  footer: string;
};

export const SITE_ROUTES: SiteRoute[] = [
  { href: "/about", nav: "/about", footer: "About" },
  { href: "/projects", nav: "/projects", footer: "Projects" },
  { href: "/studio", nav: "/studio", footer: "Studio" },
  { href: "/contact", nav: "/contact", footer: "Contact" },
];

export const NAV_ITEMS = SITE_ROUTES.map((r) => ({ label: r.nav, href: r.href }));
export const FOOTER_LINKS = SITE_ROUTES.map((r) => ({ name: r.footer, href: r.href }));
