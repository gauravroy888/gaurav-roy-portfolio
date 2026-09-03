import type { Metadata } from 'next';
import { Inter, Bebas_Neue, Cinzel } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Gaurav Roy — Creative Technologist & Senior 3D Designer',
  description: 'I design elegant, high-performing 3D spatial experiences, generative AI pipelines, and modern web applications.',
  keywords: [
    'Gaurav Roy',
    'Digital Designer',
    'Creative Technologist',
    '3D Generalist',
    'Unreal Engine 5',
    'ComfyUI Workflows',
    'Next.js Developer',
    'Kohler',
    'Panasonic',
    'TATA'
  ],
  authors: [{ name: 'Gaurav Roy', url: 'https://gauravroy.dev' }],
  openGraph: {
    title: 'Gaurav Roy — Creative Technologist & Senior 3D Designer',
    description: 'I design elegant, high-performing 3D spatial experiences, generative AI pipelines, and modern web applications.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gaurav Roy',
  jobTitle: 'Creative Technologist & Senior 3D Designer',
  url: 'https://gauravroy.dev',
  email: 'gauravroy476@gmail.com',
  telephone: '+91 9069558564',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressCountry: 'India',
  },
  sameAs: [
    'https://www.linkedin.com',
    'https://github.com',
  ],
  knowsAbout: [
    '3D Spatial Computing',
    'Unreal Engine 5',
    'ComfyUI Generative AI',
    'Next.js Full-Stack WebXR',
    'CGI Architectural Visualisation',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
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
