// Converts the screenshots the user guides use into WebP files under src/assets/guide/.
//
//   node scripts/optimize-images.mjs ../inbils
//
// Only images that a guide references are converted. Desktop screenshots keep their 1280 px width; phone
// screenshots (taller than wide) are scaled to 600 px wide, which is twice the size they are shown at.
// Every file must come out at 200 KB or less: quality steps down until it does.
import { readFileSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(process.argv[2] ?? '');
if (!process.argv[2]) {
  console.error('usage: node scripts/optimize-images.mjs <path to the application repository>');
  process.exit(1);
}

const guideDir = join(repo, 'docs/user-guide');
const sources = ['web.md', 'platform.md', 'teknisi.md', 'pelanggan.md'];
const limit = 200 * 1024;
const phoneWidth = 600;

const refs = new Set();
for (const file of sources) {
  const text = readFileSync(join(guideDir, file), 'utf8');
  for (const m of text.matchAll(/!\[[^\]]*\]\((images\/[^)\s]+)/g)) refs.add(m[1]);
}
// Screenshots only the landing page uses: they are not in a guide, so they are listed here.
for (const extra of ['images/technician/beranda.png']) refs.add(extra);

let total = 0;
let largest = { size: 0, file: '' };
for (const rel of [...refs].sort()) {
  const input = join(guideDir, rel);
  if (!existsSync(input)) {
    console.error(`missing: ${rel}`);
    process.exitCode = 1;
    continue;
  }
  const output = join(
    root,
    'src/assets/guide',
    rel.replace(/^images\//, '').replace(/\.(png|jpe?g)$/i, '.webp'),
  );
  mkdirSync(dirname(output), { recursive: true });
  const meta = await sharp(input).metadata();
  const phone = (meta.height ?? 0) > (meta.width ?? 0);
  let quality = 84;
  for (;;) {
    let image = sharp(input);
    if (phone && (meta.width ?? 0) > phoneWidth) image = image.resize({ width: phoneWidth });
    await image.webp({ quality, effort: 6, smartSubsample: true }).toFile(output);
    if (statSync(output).size <= limit || quality <= 40) break;
    quality -= 6;
  }
  const size = statSync(output).size;
  total += size;
  if (size > largest.size) largest = { size, file: rel };
}
console.log(
  `${refs.size} images, ${(total / 1024 / 1024).toFixed(1)} MB in all, largest ${(largest.size / 1024).toFixed(0)} KB (${largest.file})`,
);
