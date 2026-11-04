const REPOSITORY_NAME = 'gaurav-roy-portfolio';

function getSiteBuildConfig(env = process.env) {
  const isGitHubActions = Boolean(env.GITHUB_ACTIONS);
  const customSiteUrl = env.NEXT_PUBLIC_SITE_URL;
  
  // Use root basePath only if an explicit custom domain (non-github.io) is provided
  const isCustomDomain = Boolean(customSiteUrl && !new URL(customSiteUrl).hostname.endsWith('.github.io'));
  const basePath = isGitHubActions && !isCustomDomain ? `/${REPOSITORY_NAME}` : '';
  
  const siteUrl = customSiteUrl || (isGitHubActions ? `https://gauravroy888.github.io/${REPOSITORY_NAME}` : 'https://gauravroy.dev');

  return { siteUrl, basePath };
}

module.exports = { getSiteBuildConfig };
