import { href, t, type Lang } from './i18n';
import { REPO } from './site';

export interface NavItem {
  label: string;
  href: string;
  /** Points outside the site: opens as a normal link and carries a marker for it. */
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/** The three groups of the top bar, also used by the small-screen menu and the footer. */
export const navFor = (lang: Lang): NavGroup[] => [
  {
    label: t(lang, 'nav.product'),
    items: [
      { label: t(lang, 'nav.lifecycle'), href: href(lang, '/#lifecycle') },
      { label: t(lang, 'nav.network'), href: href(lang, '/#network') },
      { label: t(lang, 'nav.field'), href: href(lang, '/#field') },
      { label: t(lang, 'nav.billing'), href: href(lang, '/#billing') },
      { label: t(lang, 'nav.office'), href: href(lang, '/#office') },
      { label: t(lang, 'nav.platform'), href: href(lang, '/#platform') },
      { label: t(lang, 'nav.apps'), href: href(lang, '/#apps') },
    ],
  },
  {
    label: t(lang, 'nav.docs'),
    items: [
      { label: t(lang, 'nav.docsHome'), href: href(lang, '/docs/') },
      { label: t(lang, 'nav.gettingStarted'), href: href(lang, '/docs/getting-started/') },
      { label: t(lang, 'nav.guides'), href: href(lang, '/docs/guides/') },
      { label: t(lang, 'nav.modules'), href: href(lang, '/docs/modules/') },
      { label: t(lang, 'nav.architecture'), href: href(lang, '/docs/architecture/') },
      { label: t(lang, 'nav.operations'), href: href(lang, '/docs/operations/') },
    ],
  },
  {
    label: t(lang, 'nav.developers'),
    items: [
      { label: t(lang, 'nav.api'), href: href(lang, '/docs/api/') },
      { label: t(lang, 'nav.apiReference'), href: href(lang, '/docs/api/reference/') },
      { label: t(lang, 'nav.changelog'), href: href(lang, '/docs/changelog/') },
      { label: t(lang, 'nav.source'), href: REPO, external: true },
    ],
  },
];

export const contactHref = (lang: Lang): string => href(lang, '/contact/');
