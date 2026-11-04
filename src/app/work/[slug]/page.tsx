import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COLLECTIONS } from '../../../data/portfolioData';
import { getProjectBySlug, getProjectImages, getSearchableProjects } from '../../../data/searchIndex';
import { assetPath } from '../../../utils/assetPath';
import { absoluteSiteUrl, SITE_NAME } from '../../../utils/siteUrl';

type ProjectPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getSearchableProjects().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project not found' };

  const pageUrl = absoluteSiteUrl(`/work/${project.slug}/`);
  const imageUrl = absoluteSiteUrl(project.coverImage);

  return {
    title: `${project.title} | Gaurav Roy`,
    description: project.shortDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${project.title} | Gaurav Roy`,
      description: project.shortDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      type: 'article',
      images: [{ url: imageUrl, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Gaurav Roy`,
      description: project.shortDescription,
      images: [imageUrl],
    },
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const collection = COLLECTIONS.find((item) => item.id === project.collectionId);
  const projectImages = getProjectImages(project);
  const pageUrl = absoluteSiteUrl(`/work/${project.slug}/`);
  const imageUrl = absoluteSiteUrl(project.coverImage);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.fullOverview,
    url: pageUrl,
    image: projectImages.slice(0, 10).map(({ src }) => absoluteSiteUrl(src)),
    creator: {
      '@type': 'Person',
      name: 'Gaurav Roy',
      url: absoluteSiteUrl('/'),
    },
    ...(collection ? { genre: collection.title } : {}),
    keywords: [collection?.title, project.badge, ...project.specs.software]
      .filter(Boolean)
      .join(', '),
  };

  return (
    <main className="min-h-screen bg-[#090A0E] text-[#E4E7EE]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-9 text-sm text-gray-400">
          <Link className="transition-colors hover:text-white" href="/">Home</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link className="transition-colors hover:text-white" href="/work/">Work</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-white">{project.title}</span>
        </nav>

        <header className="mb-9 max-w-4xl">
          <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
            {collection?.title || project.badge} · {project.year}
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-200 sm:text-xl">
            {project.shortDescription}
          </p>
        </header>

        <figure className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-black">
          <img
            src={assetPath(project.coverImage)}
                    alt={projectImages[0]?.alt || project.title}
            fetchPriority="high"
            decoding="async"
            className="max-h-[72vh] w-full object-contain"
          />
          <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-gray-400 sm:px-6">
            {project.title}{project.client ? ` · ${project.client}` : ''}
          </figcaption>
        </figure>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-10">
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="mb-4 font-display text-3xl uppercase text-white">
                Project overview
              </h2>
              <p className="whitespace-pre-line text-base leading-8 text-gray-300">
                {project.fullOverview}
              </p>
            </section>

            {project.technicalDecisions.length > 0 && (
              <section aria-labelledby="approach-heading">
                <h2 id="approach-heading" className="mb-4 font-display text-3xl uppercase text-white">
                  Approach
                </h2>
                <ul className="space-y-3 pl-5 text-base leading-relaxed text-gray-300 marker:text-cyan-300">
                  {project.technicalDecisions.map((decision) => <li key={decision}>{decision}</li>)}
                </ul>
              </section>
            )}

            {projectImages.length > 1 && (
              <section aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="mb-4 font-display text-3xl uppercase text-white">
                  Project gallery
                </h2>
                <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
                  {projectImages.slice(1).map(({ src, alt }) => (
                    <li key={src} className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                      <img
                        src={assetPath(src)}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <h2 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Project details
            </h2>
            <dl className="space-y-4 text-sm">
              {[
                ['Client', project.client],
                ['Role', project.role],
                ['Year', project.year],
                ['Discipline', collection?.title || project.badge],
              ].filter((entry): entry is [string, string] => Boolean(entry[1])).map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-gray-500">{label}</dt>
                  <dd className="mt-1 leading-relaxed text-gray-200">{value}</dd>
                </div>
              ))}
            </dl>

            {project.specs.software.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500">Tools</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.specs.software.map((tool) => (
                    <li key={tool} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-200">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.metrics.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500">Results</h3>
                <dl className="mt-3 space-y-3">
                  {project.metrics.map((metric) => (
                    <div key={`${metric.label}-${metric.value}`}>
                      <dt className="text-xs text-gray-400">{metric.label}</dt>
                      <dd className="mt-0.5 text-lg font-semibold text-white">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </aside>
        </div>

        <footer className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
          <Link className="text-gray-300 transition-colors hover:text-white" href="/work/">
            Browse all case studies
          </Link>
          <Link className="text-gray-300 transition-colors hover:text-white" href="/#contact">
            Contact Gaurav
          </Link>
        </footer>
      </article>
    </main>
  );
}
