const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { getSiteBuildConfig } = require('../src/utils/siteConfig.cjs');

const root = path.resolve(__dirname, '..');
const { siteUrl, basePath } = getSiteBuildConfig(process.env);
process.env.NEXT_PUBLIC_SITE_URL = siteUrl;
process.env.NEXT_PUBLIC_BASE_PATH = basePath;

function loadTypeScriptModule(relativePath, dependencies = {}) {
  const sourcePath = path.join(root, relativePath);
  const source = fs.readFileSync(sourcePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: sourcePath,
  });
  const module = { exports: {} };
  const localRequire = (specifier) => {
    if (Object.prototype.hasOwnProperty.call(dependencies, specifier)) {
      return dependencies[specifier];
    }
    return require(specifier);
  };

  new Function('require', 'module', 'exports', compiled.outputText)(
    localRequire,
    module,
    module.exports,
  );
  return module.exports;
}

const portfolioData = loadTypeScriptModule('src/data/portfolioData.ts');
const searchIndex = loadTypeScriptModule('src/data/searchIndex.ts', {
  './portfolioData': portfolioData,
});
const siteUrls = loadTypeScriptModule('src/utils/siteUrl.ts');
const projects = searchIndex.getSearchableProjects();

if (projects.length === 0) {
  throw new Error('Cannot generate search files without any published projects.');
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const urls = [
  { url: siteUrls.absoluteSiteUrl('/'), images: [] },
  { url: siteUrls.absoluteSiteUrl('/work/'), images: [] },
  ...projects.map((project) => ({
    url: siteUrls.absoluteSiteUrl(`/work/${project.slug}/`),
    images: searchIndex.getProjectImages(project),
  })),
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ...urls.map(({ url, images }) => {
    const imageEntries = images.map(({ src, alt }) =>
      `\n    <image:image><image:loc>${escapeXml(siteUrls.absoluteSiteUrl(src))}</image:loc><image:caption>${escapeXml(alt)}</image:caption></image:image>`,
    ).join('');
    return `  <url>\n    <loc>${escapeXml(url)}</loc>${imageEntries}\n  </url>`;
  }),
  '</urlset>',
  '',
].join('\n');

const robots = [
  '# Public portfolio pages are available for search and citation.',
  'User-agent: *',
  'Allow: /',
  '',
  '# OpenAI search crawler. GPTBot has a separate purpose and policy.',
  'User-agent: OAI-SearchBot',
  'Allow: /',
  '',
  `Sitemap: ${siteUrls.absoluteSiteUrl('/sitemap.xml')}`,
  '',
].join('\n');

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'public', 'robots.txt'), robots, 'utf8');
console.log(`Generated robots.txt and sitemap.xml for ${projects.length} projects.`);
