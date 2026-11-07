import { readFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const klara = join(root, 'src/assets/characters/klara.png');
const publicDir = join(root, 'public');
await mkdir(publicDir, { recursive: true });

const klaraBuf = await readFile(klara);

async function onCanvas(width, height, klaraHeight, file) {
  const character = await sharp(klaraBuf).resize({ height: klaraHeight }).png().toBuffer();
  const meta = await sharp(character).metadata();
  const left = Math.round(width - (meta.width ?? 0) - width * 0.08);
  const top = height - (meta.height ?? 0);
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 255, g: 241, b: 214, alpha: 1 },
    },
  })
    .composite([{ input: character, left: Math.max(0, left), top: Math.max(0, top) }])
    .png()
    .toFile(join(publicDir, file));
}

await onCanvas(1200, 630, 560, 'og-default.png');
await onCanvas(512, 512, 480, 'logo-512.png');

await sharp({
  create: { width: 180, height: 180, channels: 4, background: { r: 255, g: 138, b: 0, alpha: 1 } },
})
  .composite([
    {
      input: await sharp(klaraBuf).resize({ height: 168 }).png().toBuffer(),
      gravity: 'south',
    },
  ])
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));

await sharp(join(publicDir, 'apple-touch-icon.png')).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'));

console.log('Иконки и og-default готовы');
