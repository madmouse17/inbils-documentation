import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { t, type Lang } from './i18n';
import { withBase } from './site';

// Adds the social card to every docs page: one image per language (public/og/), 1200 x 630.
export const onRequest = defineRouteMiddleware((context) => {
  const { head, lang } = context.locals.starlightRoute;
  const code: Lang = lang === 'id' ? 'id' : 'en';
  const image = new URL(withBase(`/og/inbils-${code}.png`), context.site).href;
  head.push(
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: t(code, 'og.alt') } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  );
});
