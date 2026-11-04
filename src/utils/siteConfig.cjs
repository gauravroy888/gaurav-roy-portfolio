const REPOSITORY_NAME = 'gaurav-roy-portfolio';

function getSiteBuildConfig(env = process.env) {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://gauravroy.dev';
  const hostname = new URL(siteUrl).hostname;
  const isGitHubProjectPages = hostname.endsWith('.github.io');
  const basePath = env.GITHUB_ACTIONS && isGitHubProjectPages
    ? `/${REPOSITORY_NAME}`
    : '';

  return { siteUrl, basePath };
}

module.exports = { getSiteBuildConfig };
