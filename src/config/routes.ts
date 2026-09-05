/**
 * Every route the application owns. Import from here instead of writing route
 * strings inline so renames stay mechanical.
 */
export const routes = {
  home: "/",
  about: "/about",
  youth: "/youth",
  projects: "/projects",
  drosos: "/drosos",
  alumni: "/alumni",
  alumniProfile: (slug: string) => `/alumni/${slug}`,
  contact: "/contact",
  references: "/references",
} as const;

/**
 * Routes whose hero paints a dark background behind the fixed header.
 */
export const darkHeroRoutes: readonly string[] = [routes.home, routes.drosos];

/** Static routes included in the sitemap. Dynamic ones are appended there. */
export const staticRoutes = [
  routes.home,
  routes.about,
  routes.youth,
  routes.projects,
  routes.drosos,
  routes.alumni,
  routes.contact,
] as const;
