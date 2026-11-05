# Website architecture and image workflow

This guide is for anyone maintaining the portfolio with Codex, Antigravity, Claude Code, another coding agent, or by hand. It describes the current architecture and the required image workflow so new content does not silently increase download sizes or break search pages.

## Quick rules for every coding agent

1. Treat `archive/portfolio-image-sources/` as the original portfolio artwork library. Add new full-quality source images there, keeping the project folder structure.
2. Do not add full-resolution masters to `public/`. The contents of `public/` are copied into the static site deployment.
3. Reference generated display-image paths (usually `/images/portfolio/<project>/<image>.webp`) from `src/data/portfolioData.ts`.
4. After adding, replacing, or removing portfolio source images, run `npm run optimize:images`. Commit the updated generated files in `public/images/portfolio/` with the content change.
5. Use `portfolioImageProps()` for portfolio `<img>` elements. It adds browser-native `srcSet` and `sizes` hints for the generated variants. Keep lazy loading for offscreen images; only the case-study hero should be high priority.
6. Run `npm run build` before publishing. The build validates project data and regenerates `robots.txt` and `sitemap.xml`.

## Image compression and responsive variants

### Source and generated files

- **Source of truth:** `archive/portfolio-image-sources/`
- **Public display images:** `public/images/portfolio/`
- **Optimizer:** `scripts/optimize_portfolio_images.py`
- **Python dependency:** `requirements-image-optimization.txt` (Pillow)
- **Command:** `npm run optimize:images`

The optimizer reads originals from the archive and regenerates the public image directory. Regular display images are resized to 1,400 px wide and use quality 82; files inside a `high-res` folder are capped at a 2,200 px long edge and use quality 84. Each regular image gets compressed base, 480 px, and 960 px files. The responsive names are deterministic, so browser image hints do not need a large manifest in the JavaScript bundle. High-resolution lightbox files get only a compressed 2,200 px maximum base file, so the deployment does not carry responsive copies of images that are only loaded on demand. JPEG sources stay JPEG; WebP and PNG sources are emitted as WebP. EXIF orientation is applied during processing. The original artwork remains in the archive.

`src/utils/portfolioImageProps.ts` derives the 480 px and 960 px variant names from the base image URL and produces `srcSet` and `sizes` attributes. This avoids shipping a large image manifest to the browser and lets it select a size based on the rendered slot and device pixel ratio.

### One-time migration for an older checkout

If `archive/portfolio-image-sources/` is empty and the current images are still in `public/images/portfolio/`, run:

```bash
python -m pip install -r requirements-image-optimization.txt
python scripts/optimize_portfolio_images.py --seed-from-public
```

The first command copies the current public artwork into the archive, then generates the optimized public files. The migration flag refuses to overwrite an archive that already contains files. Do not use this flag during normal updates.

### Add a project image

1. Make a folder for the project under the tracked source archive `archive/portfolio-image-sources/`, for example:

   ```text
   archive/portfolio-image-sources/product-renders/new-faucet/
   ```

2. Put the best available source render there. Use clear names such as `hero.webp`, `angle-01.webp`, `viewport-proof.webp`, or `moodboard.webp`. Keep the original dimensions and quality; the optimizer creates the web copies.
3. Add or update the project in `src/data/portfolioData.ts`. Set `coverImage`, `galleryImages`, `views[].imageUrl`, `views[].highResUrl`, `stills[]`, or other image fields to the **generated public path**, not the archive path. Example:

   ```ts
   coverImage: '/images/portfolio/product-renders/new-faucet/hero.webp',
   galleryImages: [
     '/images/portfolio/product-renders/new-faucet/angle-01.webp',
   ],
   ```

4. Run `npm run optimize:images` from the repository root. It regenerates public image files and responsive variants from the entire archive.
5. Check that every image URL in the project data exists under `public/` and that its alt text/caption describes the image.
6. Keep titles, descriptions, project role, year, process, and outcomes in the project data. The static case-study page and sitemap are generated from that content.

For a project that needs a visible close-up, put its large source in a `high-res/` subfolder and reference that generated path only as the high-resolution/lightbox source. Do not use the high-resolution file as the card cover. A manually-created `-thumb.webp` is not required; responsive variants are generated automatically.

### Image sizing guidance

- Portfolio/category card: use the regular cover or thumbnail path, `loading="lazy"`, and a `sizes` value matching the card grid.
- Case-study hero: use the regular cover path, `fetchPriority="high"`, and a viewport-aware `sizes` value.
- Case-study gallery and modal previews: use regular paths, `loading="lazy"`, and a grid-aware `sizes` value.
- Lightbox: use the corresponding generated high-resolution path only after the visitor opens the image.
- Do not load high-resolution images in a hidden tab, gallery thumbnail, or card.
- Do not remove a source image until you have confirmed the project data no longer references it and the public derivatives were regenerated.

## Architecture overview

### Stack and rendering model

- Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS.
- `next.config.mjs` sets `output: 'export'`; deployment is a static export rather than a running Node server.
- Routes are emitted with trailing slashes so static hosts can serve route directories directly.
- GitHub Actions runs `npm ci`, `npm run build`, then publishes the `out/` directory to GitHub Pages.
- `src/utils/assetPath.ts` applies the GitHub Pages repository base path to local assets and links at build time.

### Public routes

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Main portfolio landing page and interactive portfolio experience. |
| `/work/` | `src/app/work/page.tsx` | Standard linked archive of published projects. |
| `/work/{slug}/` | `src/app/work/[slug]/page.tsx` | Static, shareable, crawlable project case study with its own metadata and structured data. |

The project route exports `generateStaticParams()`, so each project slug is rendered at build time. Keep slugs unique, lowercase, and hyphen-separated.

### Content and search-file data flow

```text
src/data/portfolioData.ts
        │
        ├── Home portfolio cards and interactive project modals
        ├── /work/ project archive
        ├── /work/{slug}/ static case studies + per-project metadata/schema
        └── src/data/searchIndex.ts validation and image captions
                     │
                     └── npm prebuild → scripts/generate-seo-files.cjs
                                      ├── public/robots.txt
                                      └── public/sitemap.xml
```

`getSearchableProjects()` checks required text, IDs, and unique valid slugs. The SEO generator derives the sitemap entries from the same project data used by the site, which reduces the chance that a new project is omitted from discovery. Keep the configured production URL correct for the deployment target; canonical URLs and sitemap URLs are absolute.

### Interactive landing page

The landing page is currently a client-side orchestrator for modal state and user interactions. Its section components live under `src/components/`. The main page dynamically loads several modal components so those modal bundles can be deferred. Project data remains in `src/data/portfolioData.ts`; the modal is an interactive presentation layer, while `/work/{slug}/` is the public URL intended for sharing, direct navigation, and crawling.

When adding a static informational section, avoid adding browser state or event handlers unless it needs them. Keep keyboard-accessible semantics: use anchors for navigation, buttons for actions, meaningful image alt text, and the existing dialog focus utility for modal dialogs.

### AI/search discoverability

The site does not need vector conversion for public crawling. Its main discovery path is ordinary HTML with descriptive page content, unique metadata, stable project URLs, structured data, `robots.txt`, and a sitemap. Keep each project's useful explanation in its data fields so it appears in the generated HTML without requiring a visitor or crawler to open a modal. A vector database would only be useful for a separate semantic-search feature or a private retrieval system.

## Project data checklist

Before publishing a project, confirm it has:

- A unique ID and lowercase kebab-case `slug`.
- A clear title, client (when permitted), year, role, and category/collection.
- A concise `shortDescription` and useful `fullOverview` that explain the work in text.
- Accurate process/technical decisions, software/tools, and measurable outcomes where available.
- A valid generated cover image path and descriptive image alt text/captions.
- Gallery or detail images that add context rather than repeating the same render.
- No unsupported claims, placeholder prose, broken external URLs, or private information.

## Useful maintenance commands

```bash
npm run optimize:images # regenerate compressed portfolio images and responsive variants
npm run build           # generate robots/sitemap and static export
npm run dev             # local development server on port 3001
```

The image optimizer needs Python and Pillow on the machine where new image sources are processed. Source artwork is tracked under `archive/portfolio-image-sources/`, while optimized public image files are committed separately. The GitHub Pages build does not need to install Pillow unless the workflow is changed to run the optimizer itself.
