export const NAME = 'Inbils';

/** The application repository (public). */
export const REPO = 'https://github.com/madmouse17/isp_inbils';
/** This site's repository, for edit links. */
export const DOCS_REPO = 'https://github.com/madmouse17/inbils-documentation';
/** Where an interested ISP reaches the author. Every contact link on the site points here. */
export const CONTACT_URL = 'https://github.com/madmouse17';

/** Public address of the site, without the trailing slash. Matches `site` and `base` in astro.config.mjs. */
export const SITE_URL = 'https://madmouse17.github.io/inbils-documentation';

/** Prefix a site path (starting with `/`) with the Astro base, so links work under any Pages address. */
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, '')}${path}`;

export const SITE_DESCRIPTION =
  'Inbils is multi-tenant ISP management software: customers, subscriptions, RADIUS and MikroTik, work orders, inventory, Midtrans billing and ticketing with SLA.';
