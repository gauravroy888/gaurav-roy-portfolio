import siteConfig from './src/utils/siteConfig.cjs';

const { getSiteBuildConfig } = siteConfig;
const { siteUrl, basePath } = getSiteBuildConfig(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Emit route directories with index.html so static hosts resolve every
  // generated case-study URL without relying on server-side rewrites.
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      }
    ],
  },
};

export default nextConfig;
