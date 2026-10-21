/**
 * Asset path utility for GitHub Pages subpath compatibility.
 *
 * When deployed to GitHub Pages (e.g. gauravroy888.github.io/gaurav-roy-portfolio/),
 * all root-relative asset paths like `/images/...` must be prefixed with the repo
 * subpath `/gaurav-roy-portfolio`. This utility handles that automatically.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set at build time in next.config.mjs when
 * `GITHUB_ACTIONS=true`, so it is safe to read here as a compile-time constant.
 */

export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prepend the GitHub Pages basePath to any root-relative asset URL.
 * External URLs (http/https/data:) and empty strings are returned unchanged.
 * If the path is already prefixed with BASE_PATH, it is returned without duplicate prefix.
 */
export const assetPath = (path: string | undefined | null): string => {
  if (!path) return '';
  // Leave external URLs and data URIs untouched
  if (path.startsWith('http') || path.startsWith('//') || path.startsWith('data:')) {
    return path;
  }
  // If path is already prefixed with BASE_PATH, do not duplicate it
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
};
