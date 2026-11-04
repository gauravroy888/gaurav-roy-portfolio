# Gaurav Roy portfolio

A static portfolio built with Next.js 14, React 18, TypeScript, and Tailwind CSS. The home page presents Gaurav's work and capabilities; each project also has a crawlable case-study page at `/work/{slug}/`.

## Run locally

Requirements: Node.js 20 and npm.

```bash
npm ci
npm run dev
```

The development site runs at <http://localhost:3001>. To create the production static export in `out/`:

```bash
npm run build
```

`prebuild` validates the project search data and regenerates `public/robots.txt` and `public/sitemap.xml` before Next.js exports the site. GitHub Actions deploys `out/` to GitHub Pages when changes reach `main`.

## Where things live

- `src/app/page.tsx` and `src/components/` — the home page and interactive sections/modals.
- `src/app/work/page.tsx` — the searchable, linked project archive.
- `src/app/work/[slug]/page.tsx` — statically generated project case studies and metadata.
- `src/data/portfolioData.ts` — project and collection content.
- `src/data/searchIndex.ts` — validates projects and supplies the public work archive, case studies, and sitemap.
- `src/data/socialProfiles.ts` — optional social profile links.
- `scripts/generate-seo-files.cjs` — creates the sitemap and crawler rules from published project data.
- `public/images/` — images served by the site. Portfolio PNG source images are kept under `archive/portfolio-original-png/` and are not included in deployment.

## Add or update a project

Edit a project in `src/data/portfolioData.ts`. Give it a unique lowercase kebab-case `slug`, a descriptive title and subtitle, a useful `shortDescription` and `fullOverview`, a role and year, an existing cover image, and meaningful alt text for gallery images. Keep the main case-study explanation in these data fields so it is available in the static HTML without opening a modal.

The build creates a `/work/{slug}/` page and adds it to the sitemap automatically. Use optimized WebP images in `public/images/portfolio/`; avoid putting original PNG exports in `public/` because every public asset is copied into the deployment.

## Site URL and social profiles

The production domain defaults to `https://gauravroy.dev`. Set `NEXT_PUBLIC_SITE_URL` at build time when building for a different domain. GitHub Pages project deployments derive their base path from the Pages URL; a custom domain uses the root path.

Set any real profile URLs you want shown in the footer and Person metadata:

```text
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/your-profile/
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your-profile/
NEXT_PUBLIC_GITHUB_URL=https://github.com/your-username
```

Blank values and generic social network homepages are omitted. `OAI-SearchBot` and general crawlers are allowed by the generated `robots.txt`; the sitemap lists the home page, work archive, and project pages.

## Scripts

- `npm run dev` — start the Next.js development server.
- `npm run build` — generate crawler files and build the static export.
- `npm run lint` — run Next.js linting.
- `npm run export:sheet`, `npm run sync:sheet`, `npm run sync:drive` — portfolio content/asset workflows in `scripts/`.
