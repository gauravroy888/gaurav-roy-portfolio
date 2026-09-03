const repoName = 'gaurav-roy-portfolio';
const isGitHubActions = process.env.GITHUB_ACTIONS || false;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGitHubActions ? `/${repoName}` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubActions ? `/${repoName}` : '',
  },
  reactStrictMode: true,
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
