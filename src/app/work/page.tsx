import type { Metadata } from 'next';
import Link from 'next/link';
import { getSearchableProjects } from '../../data/searchIndex';
import { assetPath } from '../../utils/assetPath';
import { absoluteSiteUrl, SITE_NAME } from '../../utils/siteUrl';
import { portfolioImageProps } from '../../utils/portfolioImageProps';

export const metadata: Metadata = {
  title: 'Selected Work | Gaurav Roy — Creative Technologist',
  description:
    'Browse Gaurav Roy’s project case studies in product CGI, spatial design, commercial motion, generative AI, and interactive web experiences.',
  alternates: { canonical: absoluteSiteUrl('/work/') },
  openGraph: {
    title: 'Selected Work | Gaurav Roy',
    description:
      'Project case studies in product CGI, spatial design, commercial motion, generative AI, and interactive web experiences.',
    url: absoluteSiteUrl('/work/'),
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function WorkIndexPage() {
  const projects = getSearchableProjects();

  return (
    <main className="min-h-screen bg-[#090A0E] text-[#E4E7EE]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-400">
          <Link className="transition-colors hover:text-white" href="/">Home</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-white">Work</span>
        </nav>

        <header className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
            Portfolio Archive
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-white sm:text-7xl">
            Selected Work
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Explore project case studies across 3D and spatial design, product visualization,
            commercial motion, generative AI workflows, and interactive experiences.
          </p>
        </header>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/work/${project.slug}/`}
                className="group block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-cyan-400/50 hover:bg-white/[0.06]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={assetPath(project.coverImage)}
                    {...portfolioImageProps(project.coverImage, '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw')}
                    alt={`${project.title}${project.client ? ` for ${project.client}` : ''}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-3 text-xs font-mono text-gray-400">
                    <span>{project.client || project.badge}</span>
                    <span>{project.year}</span>
                  </div>
                  <h2 className="font-display text-2xl uppercase leading-tight text-white transition-colors group-hover:text-cyan-300">
                    {project.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-300">
                    {project.shortDescription}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-14 border-t border-white/10 pt-6 text-sm text-gray-400">
          <Link className="transition-colors hover:text-white" href="/#work">
            Return to the interactive portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
