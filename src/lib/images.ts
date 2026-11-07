import type { ImageMetadata } from 'astro';

const characterFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/characters/*.png', { eager: true });
const screenFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/screens/*.png', { eager: true });

function byName(files: Record<string, { default: ImageMetadata }>) {
  return Object.fromEntries(
    Object.entries(files).map(([path, module]) => [path.split('/').pop()!.replace('.png', ''), module.default]),
  ) as Record<string, ImageMetadata>;
}

export const characterImages = byName(characterFiles);
export const screenImages = byName(screenFiles);

export function character(name: string): ImageMetadata {
  return characterImages[name] ?? characterImages.klara;
}

export function screen(name: string): ImageMetadata {
  const image = screenImages[name];
  if (!image) throw new Error(`Нет снимка экрана ${name}`);
  return image;
}
