// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import rehypeSiteLinks from './src/lib/rehype-site-links.mjs';
import { sidebar } from './src/lib/sidebar.mjs';

// GitHub Pages serves this repository at https://madmouse17.github.io/inbils-documentation/. Every link and
// asset goes through the base: Astro and Starlight add it themselves, our components use withBase()
// (src/lib/site.ts) and Markdown content links to other pages as `/docs/...`, which rehypeSiteLinks turns into
// the right address for the page's language and the base.
const site = 'https://madmouse17.github.io';
const base = '/inbils-documentation';

const description =
  'Inbils is multi-tenant ISP management software: customers, subscriptions, RADIUS and MikroTik, work orders, inventory, Midtrans billing and ticketing with SLA.';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  compressHTML: true,
  devToolbar: { enabled: false },
  markdown: { processor: unified({ rehypePlugins: [[rehypeSiteLinks, { base }]] }) },
  integrations: [
    icon(),
    starlight({
      title: 'Inbils',
      description,
      logo: { src: './src/assets/logo/inbils-mark.png', alt: '' },
      favicon: '/favicon.png',
      social: [
        {
          icon: 'github',
          label: 'Inbils on GitHub',
          href: 'https://github.com/madmouse17/isp_inbils',
        },
      ],
      editLink: { baseUrl: 'https://github.com/madmouse17/inbils-documentation/edit/main/' },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        id: { label: 'Bahasa Indonesia', lang: 'id' },
      },
      customCss: [
        '@fontsource-variable/geist/wght.css',
        '@fontsource-variable/geist-mono/wght.css',
        './src/styles/tokens.css',
        './src/styles/docs.css',
      ],
      components: {
        ThemeProvider: './src/components/docs/ThemeProvider.astro',
        ThemeSelect: './src/components/docs/ThemeSelect.astro',
        SiteTitle: './src/components/docs/SiteTitle.astro',
        SocialIcons: './src/components/docs/SocialIcons.astro',
        Footer: './src/components/docs/Footer.astro',
      },
      routeMiddleware: './src/lib/route-middleware.ts',
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#06122b' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}/apple-touch-icon.png` } },
      ],
      sidebar: sidebar(),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
