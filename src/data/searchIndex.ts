import { PROJECTS, type ProjectItem } from './portfolioData';

/**
 * Public search pages, project routes, metadata, and sitemap entries all use
 * PROJECTS as their source of truth. Keep this validation here so an incomplete
 * or duplicate slug fails the static export instead of silently disappearing
 * from search.
 */
export function getSearchableProjects(): ProjectItem[] {
  const seenSlugs = new Set<string>();
  const seenIds = new Set<string>();

  for (const project of PROJECTS) {
    if (!project.id?.trim() || seenIds.has(project.id)) {
      throw new Error(`Missing or duplicate portfolio project id "${project.id}".`);
    }
    seenIds.add(project.id);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
      throw new Error(`Invalid portfolio project slug "${project.slug}" (${project.id}).`);
    }

    if (seenSlugs.has(project.slug)) {
      throw new Error(`Duplicate portfolio project slug "${project.slug}".`);
    }
    seenSlugs.add(project.slug);

    const requiredText: Array<[string, string]> = [
      ['title', project.title],
      ['shortDescription', project.shortDescription],
      ['fullOverview', project.fullOverview],
      ['role', project.role],
      ['year', project.year],
      ['coverImage', project.coverImage],
    ];

    for (const [field, value] of requiredText) {
      if (!value?.trim()) {
        throw new Error(`Project "${project.id}" is missing required searchable content: ${field}.`);
      }
    }
  }

  return PROJECTS;
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getSearchableProjects().find((project) => project.slug === slug);
}

/** Return unique public images with data-backed captions where available. */
export function getProjectImages(project: ProjectItem): Array<{ src: string; alt: string }> {
  const candidates = [
    {
      src: project.coverImage,
      alt: `${project.title}${project.client ? ` for ${project.client}` : ''}`,
    },
    ...project.galleryImages.map((src, index) => {
      const still = project.stills?.find((item) => item.imageUrl === src);
      const view = project.views?.find((item) => item.imageUrl === src);
      return {
        src,
        alt: still?.description || still?.title || view?.description || view?.name || `${project.title} — project image ${index + 1}`,
      };
    }),
    ...(project.stills || []).map((still) => ({
      src: still.imageUrl,
      alt: still.description || still.title,
    })),
    ...(project.views || []).map((view) => ({
      src: view.imageUrl,
      alt: view.description || `${project.title} — ${view.name}`,
    })),
  ];

  const seen = new Set<string>();
  return candidates.filter(({ src }) => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}
