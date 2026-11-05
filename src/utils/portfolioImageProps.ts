import type { ImgHTMLAttributes } from 'react';
import { assetPath } from './assetPath';

/** Build browser-native responsive image hints for generated portfolio assets. */
export function portfolioImageProps(
  src: string | null | undefined,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
): Pick<ImgHTMLAttributes<HTMLImageElement>, 'srcSet' | 'sizes'> {
  if (!src || !src.startsWith('/images/portfolio/')) return {};
  if (src.includes('/high-res/') || src.includes('/highres/')) return {};

  const match = src.match(/^(.*)\.(webp|jpe?g)$/i);
  if (!match) return {};

  const [, stem, extension] = match;
  // The optimizer always emits these exact widths for regular portfolio images.
  // Keeping this deterministic avoids bundling a large image manifest in the
  // client-side portfolio components.
  return {
    srcSet: [480, 960]
      .map((width) => `${assetPath(`${stem}-${width}w.${extension}`)} ${width}w`)
      .concat(`${assetPath(src)} 1400w`)
      .join(', '),
    sizes,
  };
}
