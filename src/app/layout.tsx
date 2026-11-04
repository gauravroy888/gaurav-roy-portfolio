import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { absoluteSiteUrl, SITE_NAME, SITE_URL } from '../utils/siteUrl';
import { SOCIAL_PROFILES } from '../data/socialProfiles';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E0F14',
};

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

const bebasNeue = localFont({
  src: './fonts/bebas-neue-latin.woff2',
  variable: '--font-bebas',
  display: 'swap',
  weight: '400',
});

const cinzel = localFont({
  src: './fonts/cinzel-latin.woff2',
  variable: '--font-cinzel',
  display: 'swap',
  weight: '600 800',
});

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  alternates: { canonical: absoluteSiteUrl('/') },
  title: 'Gaurav Roy — Creative Technologist — 3D, Generative AI & Spatial Web',
  description: 'Portfolio of Gaurav Roy, Creative Technologist bridging 3D/CGI & Unreal Engine, ComfyUI generative AI workflows, motion design, and spatial web engineering.',
  keywords: [
    'Gaurav Roy',
    'Creative Technologist',
    '3D CGI',
    'Unreal Engine 5',
    'ComfyUI Workflows',
    'Generative AI',
    'Spatial Web',
    'Spatial UX',
    'Creative Prototyping',
    'Motion Graphics',
    'Video Editing',
    'Next.js Developer',
    'Kohler',
    'Panasonic',
    'TATA'
  ],
  authors: [{ name: 'Gaurav Roy', url: 'https://gauravroy.dev' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
  },
  openGraph: {
    title: 'Gaurav Roy — Creative Technologist — 3D, Generative AI & Spatial Web',
    description: 'Portfolio of Gaurav Roy, Creative Technologist bridging 3D/CGI & Unreal Engine, ComfyUI generative AI workflows, motion design, and spatial web engineering.',
    url: absoluteSiteUrl('/'),
    siteName: SITE_NAME,
    type: 'website',
    images: [
      {
        url: absoluteSiteUrl('/images/gaurav_portrait.png'),
        width: 1200,
        height: 630,
        alt: 'Gaurav Roy — Creative Technologist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaurav Roy — Creative Technologist — 3D, Generative AI & Spatial Web',
    description: 'Portfolio of Gaurav Roy, Creative Technologist bridging 3D/CGI & Unreal Engine, ComfyUI generative AI workflows, motion design, and spatial web engineering.',
    images: [absoluteSiteUrl('/images/gaurav_portrait.png')],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gaurav Roy',
  jobTitle: 'Creative Technologist — 3D, Generative AI & Spatial Web',
  url: 'https://gauravroy.dev',
  email: 'gauravroy476@gmail.com',
  telephone: '+91 9069558564',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressCountry: 'India',
  },
  knowsAbout: [
    '3D Spatial Computing',
    'Unreal Engine 5',
    'ComfyUI Generative AI',
    'Next.js Full-Stack WebXR',
    'CGI Architectural Visualisation',
  ],
  ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES.map((profile) => profile.url) } : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${bebasNeue.variable} ${cinzel.variable} font-sans bg-[#0E0F14] text-[#E4E7EE] antialiased selection:bg-white selection:text-black min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
