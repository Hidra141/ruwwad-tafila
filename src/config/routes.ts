/**
 * Every route the application owns. Import from here instead of writing route
 * strings inline so renames stay mechanical.
 */
export const routes = {
  home: "/",
  about: "/about",
  youth: "/youth",
  drosos: "/drosos",
  alumni: "/alumni",
  alumniProfile: (slug: string) => `/alumni/${slug}`,
  contact: "/contact",
  references: "/references",
} as const;

/**
 * Routes whose hero paints a dark background behind the fixed header.
 *
 * The header sits over the hero with no background of its own until the reader
 * scrolls, so on these pages it has to draw itself in white. Everywhere else
 * white would be invisible — which is exactly what happened when the youth
 * programme's hero changed from a dark photograph to the shared light one and
 * this list was not changed with it: the whole navigation bar disappeared into
 * the gradient until the first scroll.
 *
 * The list is the contract. A route belongs here only while its hero is dark,
 * and changing a hero's background means changing this line in the same commit.
 * It lives here rather than inside the header so it is findable from the route
 * table, next to the pages it describes.
 */
export const darkHeroRoutes: readonly string[] = [routes.home, routes.drosos];

/** Static routes included in the sitemap. Dynamic ones are appended there. */
export const staticRoutes = [
  routes.home,
  routes.about,
  routes.youth,
  routes.drosos,
  routes.alumni,
  routes.contact,
] as const;
