# Inbils documentation

The public documentation site of [Inbils](https://github.com/madmouse17/isp_inbils), multi-tenant ISP management software: customers and subscriptions, RADIUS and MikroTik, IPAM and ODN, work orders (SPK) for technicians, inventory, billing with Midtrans, ticketing with SLA, reports, an operator panel and two Android apps.

Live at <https://madmouse17.github.io/inbils-documentation/>, in English (default) and Indonesian (`/id/`).

| Path                                    | What it is                                                                                                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`, `/contact/`                        | The landing page and the contact page. Every contact link points to the author's GitHub profile.                                                                |
| `/docs/getting-started/`                | Prerequisites, first-time setup with Laravel Sail, the two Docker stacks, local `*.test` domains, per-company integrations, running the tests, troubleshooting. |
| `/docs/guides/`                         | The four user guides: web app (63 pages), operator panel (13), technician app (8) and customer app (9), with screenshots of the real interface.                 |
| `/docs/modules/`, `/docs/architecture/` | What each of the nine modules does, and how the system is built: layers, multi-tenancy, permissions, data model.                                                |
| `/docs/api/`, `/docs/api/reference/`    | The mobile API: authentication, conventions, errors and idempotency, plus a reference generated from `mobile-v1.openapi.json`.                                  |
| `/docs/operations/`, `/docs/changelog/` | Deploying a release, health checks, backups, queues and the scheduler; the latest changelog entries.                                                            |

Astro, Starlight and Tailwind CSS 4, on the pattern of the owner's [rajutara-documentation](https://github.com/madmouse17/rajutara-documentation). Light is the default theme and dark is one click away. Geist and Geist Mono are self-hosted.

## Work on it

Needs Node 22.12 or newer.

```sh
npm ci
npm run dev          # http://localhost:4321/inbils-documentation/
npm run build        # dist/ (also builds the search index and the sitemap)
npm run check        # astro check
npm run preview      # serve dist/ the way Pages will
npm run format       # Prettier
```

`site` and `base` are set in `astro.config.mjs` for GitHub Pages under `/inbils-documentation`. Components build links with `withBase()` from `src/lib/site.ts`. In Markdown content, link to another page as `/docs/modules/billing/` (root-relative, trailing slash): `src/lib/rehype-site-links.mjs` adds the base and, for Indonesian pages, the `/id` prefix.

## Where things come from

Nothing on the site is a stand-in. The text and the screenshots come from the application repository (`isp_inbils`, checked out next to this one as `../inbils`).

| On the site                                                      | Source                                                                                                                                    | Refreshed by                                             |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| User guides (Indonesian pages)                                   | `docs/user-guide/*.md`                                                                                                                    | `python3 scripts/import-guides.py ../inbils`             |
| Guide screenshots (WebP, ≤ 200 KB)                               | `docs/user-guide/images/`, only the files a guide references                                                                              | `node scripts/optimize-images.mjs ../inbils`             |
| User guides (English pages)                                      | translations of the Indonesian pages, line for line                                                                                       | by hand, then `python3 scripts/check-translations.py`    |
| Changelog                                                        | the newest entries of `CHANGELOG.md`                                                                                                      | `python3 scripts/import-changelog.py ../inbils`          |
| Mobile API reference                                             | `docs/api/mobile-v1.openapi.json`, copied to `src/data/`                                                                                  | `cp ../inbils/docs/api/mobile-v1.openapi.json src/data/` |
| Getting started, modules, architecture, operations, API overview | written from `README.md`, `PROJECT_GUIDE.md`, `docs/architecture/`, `docs/business/`, `docs/operations/`, `docs/SECURITY.md` and the code | by hand                                                  |
| Social cards (`public/og/`)                                      | the Inbils logo, drawn with Pillow                                                                                                        | `python3 scripts/make-og.py`                             |

The guides are written in Indonesian, so the Indonesian pages are the source and the English pages follow them. `scripts/check-translations.py` compares each pair line by line (heading levels, list markers, table columns, image paths, link targets, dashes, untranslated sentences, front matter) and fails when they drift. The English pages keep every on-screen label in Indonesian, because the interface is Indonesian, and add the English gloss the first time a label appears on a page; `scripts/i18n/glossary.tsv` fixes the wording of the common ones.

When a guide changes in the application repository: run the import script, then update the English page of every Indonesian page that changed (`git diff` shows which), then run the checker.

## Search and SEO

- Every page has a `title` and a `description` in front matter; Starlight turns them into the `<title>`, the meta description, the canonical URL, Open Graph and Twitter tags, and the `hreflang` alternates (`en`, `id`, `x-default`).
- `dist/sitemap-index.xml` is built by `@astrojs/sitemap`, which Starlight enables when `site` is set. `robots.txt` allows everything and points at it.
- The landing page carries JSON-LD for `SoftwareApplication` and `Organization`.

GitHub Pages serves a project site below `/inbils-documentation/`, and crawlers only read `robots.txt` at the root of the host, so submit `sitemap-index.xml` in Search Console instead of relying on `robots.txt`.

## Deploy

`.github/workflows/pages.yml` runs `astro check` and the build on every push to `main` and publishes `dist/` to GitHub Pages. Pages is enabled once with:

```sh
gh api -X POST repos/madmouse17/inbils-documentation/pages -f build_type=workflow
```

## Rights

Inbils is proprietary software (all rights reserved, see the application repository), and so are these pages: no licence is granted by publishing them. The Inbils logo is the owner's artwork.
