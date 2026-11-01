// Content authors write links to other pages of the site as `/docs/...` (and `/contact/`), with no language
// prefix and no base. This plugin adds the Astro base and, for pages under src/content/docs/id/, the `/id`
// prefix, so the same text works in both languages and under any Pages address.

const walk = (node, visit) => {
  visit(node);
  if (node.children) for (const child of node.children) walk(child, visit);
};

/** @param {{ base: string }} options */
export default function rehypeSiteLinks({ base }) {
  const root = base.replace(/\/+$/, '');
  return (tree, file) => {
    const source = String(file.path ?? '').replaceAll('\\', '/');
    const prefix = root + (source.includes('/src/content/docs/id/') ? '/id' : '');
    walk(tree, (node) => {
      if (node.type !== 'element' || node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
        node.properties.href = prefix + href;
      }
    });
  };
}
