const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gauravroy.dev';

export const SITE_URL = new URL(configuredSiteUrl).origin;
export const SITE_NAME = 'Gaurav Roy Portfolio';
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');

/** Build canonical public URLs using the same base path as the static export. */
export function absoluteSiteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(`${BASE_PATH}${normalizedPath}`, `${SITE_URL}/`).toString();
}
