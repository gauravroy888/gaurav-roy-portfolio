export interface ColorSwatch {
  name: string;
  hex: string;
  textColor?: string;
  description?: string;
}

export interface MaterialSpec {
  name: string;
  category: string;
  sampleColor: string;
  textureGradient?: string;
  finish: string;
}

export interface KeyFeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface CoreAttributeItem {
  icon: string;
  label: string;
}

export interface DesignThinkingData {
  conceptTitle: string;
  tagline: string;
  philosophyQuote?: string;
  colorPalette: ColorSwatch[];
  materials: MaterialSpec[];
  keyFeatures: KeyFeatureItem[];
  coreAttributes: CoreAttributeItem[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  domainId: '3d-spatial' | 'brand-motion' | 'gen-ai' | 'full-stack';
  collectionId: string;
  client?: string;
  year: string;
  role: string;
  coverImage: string;
  clayImage?: string;
  finalImage?: string;
  youtubeId?: string;
  videoPreviewUrl?: string;
  badge: string;
  featured: boolean;
  shortDescription: string;
  fullOverview: string;
  aspectRatio?: 'wide' | 'tall' | 'square' | 'standard';
  designThinking?: DesignThinkingData;
  technicalDecisions: string[];
  specs: {
    software: string[];
    polyCount?: string;
    renderEngine?: string;
    lightingSetup?: string;
    deliveryFormat?: string;
    aiWorkflow?: string;
    framework?: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  galleryImages: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

export interface CollectionItem {
  id: string;
  domainId: '3d-spatial' | 'brand-motion' | 'gen-ai' | 'full-stack';
  title: string;
  subtitle?: string;
  folderName: string;
  description: string;
  itemCount: number;
  thumbnail: string;
  badge?: string;
}

export interface DomainItem {
  id: '3d-spatial' | 'brand-motion' | 'gen-ai' | 'full-stack';
  name: string;
  shortLabel: string;
  tagline: string;
  iconName: string;
  color: string;
}

export const DOMAINS: DomainItem[] = [
  {
    id: '3d-spatial',
    name: '3D & Spatial Computing',
    shortLabel: '3D Spatial',
    tagline: 'High-poly modeling, photorealistic lighting, luxury architectural suites & Unreal Engine 5',
    iconName: 'Box',
    color: '#06B6D4', // cyan
  },
  {
    id: 'brand-motion',
    name: 'Commercial Motion & Video',
    shortLabel: 'Brand Motion',
    tagline: 'Broadcast video reels, TV commercials, and device tutorials for global enterprise brands',
    iconName: 'PlaySquare',
    color: '#8B5CF6', // purple
  },
  {
    id: 'gen-ai',
    name: 'Generative AI & ComfyUI',
    shortLabel: 'Gen AI & Nodes',
    tagline: 'Custom ComfyUI node workflows, Flux/SDXL model tuning, LoRAs & automated asset generation',
    iconName: 'Sparkles',
    color: '#EC4899', // pink
  },
  {
    id: 'full-stack',
    name: 'Full-Stack Web & WebXR',
    shortLabel: 'Code & Apps',
    tagline: 'Next.js, TypeScript, Three.js spatial web experiences, and Antigravity AI-driven engineering',
    iconName: 'Code2',
    color: '#6366F1', // indigo
  },
];

export const SOFT_BRUTALISM_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'SOFT BRUTALISM INTERIOR',
  tagline: 'RAW. MINIMAL. WARM. TIMELESS.',
  philosophyQuote: 'Art is not just in the walls, but in the way a space makes you feel.',
  colorPalette: [
    { name: 'Warm Ivory', hex: '#EAE3D2', description: 'Soft radiant base wall wash' },
    { name: 'Sand Beige', hex: '#D5BA98', description: 'Warm plaster undertones' },
    { name: 'Taupe', hex: '#8F8073', description: 'Sculptural upholstery grounding' },
    { name: 'Warm Gray', hex: '#8C8B87', description: 'Honed limestone neutral' },
    { name: 'Travertine', hex: '#D8CBB5', description: 'Porous Italian stone texture' },
    { name: 'Natural Oak', hex: '#8B5A2B', description: 'Organic timber accents' },
    { name: 'Matte Black', hex: '#1C1B1A', description: 'Precision metal fixtures' },
  ],
  materials: [
    { name: 'Stone', category: 'Natural Stone', sampleColor: '#C4BCAC', textureGradient: 'linear-gradient(135deg, #DFD7C7 0%, #AFA694 100%)', finish: 'Honed Matte' },
    { name: 'Boucle Fabric', category: 'Textiles', sampleColor: '#E6E0D2', textureGradient: 'radial-gradient(circle, #F0EAE0 20%, #DDD5C7 80%)', finish: 'Woven Nubby' },
    { name: 'Wood', category: 'Timber', sampleColor: '#5C381E', textureGradient: 'linear-gradient(180deg, #6B4226 0%, #442410 100%)', finish: 'Satin Grain' },
    { name: 'Travertine', category: 'Porous Stone', sampleColor: '#D2C4AE', textureGradient: 'linear-gradient(45deg, #DFD4C0 0%, #BAAB94 100%)', finish: 'Vein-Cut Honed' },
    { name: 'Fluted Glass', category: 'Architectural Glass', sampleColor: '#B8C6C8', textureGradient: 'repeating-linear-gradient(90deg, #AAB8BA, #C6D4D6 6px, #8A9A9C 12px)', finish: 'Diffused Fluted' },
    { name: 'Matte Stone', category: 'Natural Stone', sampleColor: '#2B2B2C', textureGradient: 'linear-gradient(135deg, #3A3A3C 0%, #1E1E20 100%)', finish: 'Brushed Slate' },
    { name: 'Textured Plaster', category: 'Wall Surfaces', sampleColor: '#D9D0C1', textureGradient: 'radial-gradient(circle, #E4DCD0 30%, #C4B9A7 100%)', finish: 'Hand-Troweled' },
    { name: 'Leather', category: 'Upholstery', sampleColor: '#582E1A', textureGradient: 'linear-gradient(135deg, #6B3A22 0%, #3D1E0E 100%)', finish: 'Full Grain Cognac' },
    { name: 'Brass', category: 'Metals', sampleColor: '#BF984A', textureGradient: 'linear-gradient(135deg, #E2B961 0%, #8E6A26 100%)', finish: 'Brushed Champagne' },
    { name: 'Concrete', category: 'Cast Elements', sampleColor: '#969696', textureGradient: 'linear-gradient(135deg, #A8A8A8 0%, #757575 100%)', finish: 'Architectural Smooth' },
    { name: 'Linen', category: 'Textiles', sampleColor: '#DCD4C4', textureGradient: 'radial-gradient(circle, #E8E2D6 40%, #CCC3B2 100%)', finish: 'Natural Loomed' },
    { name: 'Oak Wood', category: 'Timber', sampleColor: '#9E7448', textureGradient: 'linear-gradient(180deg, #B58857 0%, #875E33 100%)', finish: 'Natural Matte' },
  ],
  keyFeatures: [
    { icon: 'Layers', title: 'Raw, Minimal Materials', description: 'Stone, wood, concrete, and earthy textures that age gracefully.' },
    { icon: 'Sparkles', title: 'Natural & Organic', description: 'Soft curves, clean spatial lines, and monolithic organic shapes.' },
    { icon: 'Sun', title: 'Warm Ambient Lighting', description: 'Soft, layered IES cove lighting calibrated to 2700K–3200K for a cozy atmosphere.' },
    { icon: 'Palette', title: 'Earthy Color Palette', description: 'Neutral tones with warm, natural depth inspired by Mediterranean brutalism.' },
    { icon: 'Armchair', title: 'Timeless & Versatile', description: 'A calm, serene environment engineered for luxury hospitality living.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Focus on Texture' },
    { icon: 'Feather', label: 'Keep it Minimal' },
    { icon: 'Sun', label: 'Natural Light' },
    { icon: 'Shapes', label: 'Sculptural Decor' },
    { icon: 'Heart', label: 'Warm & Cozy' },
  ],
};

export const PRECISION_HARDWARE_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'PRECISION INDUSTRIAL SURFACING',
  tagline: 'MICRON ACCURACY. ANODIZED TONES. MECHANICAL PURITY.',
  philosophyQuote: 'Perfection is reached not when there is nothing more to add, but when there is nothing left to take away.',
  colorPalette: [
    { name: 'Obsidian Space Black', hex: '#0B0D13', description: 'Anodized chassis finish' },
    { name: 'Titanium Gray', hex: '#585C66', description: 'Aerospace structural grade' },
    { name: 'Cyan Highlight', hex: '#06B6D4', description: 'Precision laser calibration' },
    { name: 'Specular Chrome', hex: '#D1D5DB', description: 'High-polish bevel reflectivity' },
    { name: 'Electric Violet', hex: '#8B5CF6', description: 'Subtle sensor illuminations' },
  ],
  materials: [
    { name: 'Anodized Aluminum', category: 'Aerospace Metal', sampleColor: '#374151', textureGradient: 'linear-gradient(135deg, #4B5563 0%, #1F2937 100%)', finish: 'Satin Bead-Blasted' },
    { name: 'Sapphire Crystal', category: 'Optical Glass', sampleColor: '#93C5FD', textureGradient: 'linear-gradient(135deg, #BFDBFE 0%, #60A5FA 100%)', finish: 'Anti-Reflective 9H' },
    { name: 'Brushed Titanium', category: 'Grade 5 Alloy', sampleColor: '#6B7280', textureGradient: 'linear-gradient(90deg, #9CA3AF 0%, #4B5563 100%)', finish: 'Directional Micro-Hairline' },
    { name: 'Matte Ceramic', category: 'High-Tech Sintered', sampleColor: '#1F2937', textureGradient: 'linear-gradient(135deg, #374151 0%, #111827 100%)', finish: 'Zero-Porosity Matte' },
  ],
  keyFeatures: [
    { icon: 'Shield', title: 'Sub-Millimeter Bevels', description: 'Curvature-mapped edge rounding eliminating sharp artificial CG facets.' },
    { icon: 'Zap', title: 'Physically Calibrated IOR', description: 'Complex Fresnel reflection curves accurate to real-world refractive index.' },
    { icon: 'Cpu', title: 'Micro-Roughness Anisotropy', description: 'Procedural scratch and brush maps for natural light stretching.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Micron Precision' },
    { icon: 'Sparkles', label: 'PBR Optical' },
    { icon: 'Layers', label: 'Multi-Layer Shading' },
  ],
};

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'bathroom-hospitality',
    domainId: '3d-spatial',
    title: 'Bathroom & Luxury Hospitality Suites',
    subtitle: 'Photorealistic Sanitaryware & Master Suites',
    folderName: 'Bathroom renders',
    description: 'High-end architectural renders, custom sanitaryware layouts, and luxury hotel suites.',
    itemCount: 7,
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Kohler & Hindware Flagship',
  },
  {
    id: 'product-closeups',
    domainId: '3d-spatial',
    title: '3D Product Closeups & Precision Hardware',
    folderName: '3d Closeups & Product Renders',
    description: 'Micro-detail industrial CAD surfacing, brushed metals, optical glass, and fixtures.',
    itemCount: 6,
    thumbnail: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'unreal-engine-realtime',
    domainId: '3d-spatial',
    title: 'Unreal Engine 5 Real-Time Sets',
    folderName: 'unreal',
    description: 'Lumen dynamic illumination, Nanite mesh density, Blueprints, and 60fps virtual production.',
    itemCount: 4,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kitchen-architectural',
    domainId: '3d-spatial',
    title: 'Kitchen & Interior Architecture',
    folderName: 'Kitch renders',
    description: 'Modular kitchen spaces, marble surfaces, ambient natural lighting, and luxury fittings.',
    itemCount: 5,
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'commercial-campaigns',
    domainId: 'brand-motion',
    title: 'Commercial Broadcast & Brand Reels',
    subtitle: 'Television Commercials & 3D Brand Motion',
    folderName: 'Commercials (Kohler / Hindware / JBL)',
    description: 'Official promotional videos, fluid particle simulations, and high-impact broadcast cuts.',
    itemCount: 4,
    thumbnail: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    badge: 'Broadcast Masters',
  },
  {
    id: 'panasonic-miraie',
    domainId: 'brand-motion',
    title: 'Panasonic Miraie Smart Home Series',
    folderName: 'Panasonic IoT Series',
    description: 'Exploded 3D views, IoT app integration motion, and step-by-step setup walkthroughs.',
    itemCount: 3,
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'comfyui-pipelines',
    domainId: 'gen-ai',
    title: 'ComfyUI Node Workflows & LoRA Models',
    folderName: 'AI Workflows & Nodes',
    description: 'Complex multi-pass ControlNet pipelines, custom Python nodes, and style LoRA fine-tuning.',
    itemCount: 4,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'antigravity-web-apps',
    domainId: 'full-stack',
    title: 'Antigravity AI Full-Stack & Spatial Web',
    folderName: 'Web & WebXR Code',
    description: 'Interactive Next.js 14 web applications, Three.js 3D configurators, and modern UI systems.',
    itemCount: 3,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-combo-25',
    slug: 'combo-25-luxury-suite',
    title: 'Combo 25 Luxury Suite',
    subtitle: 'Photorealistic Interior Architecture & Master Sanitaryware Design',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Artist / Art Director',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    clayImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    finalImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Kohler',
    featured: true,
    aspectRatio: 'wide',
    designThinking: SOFT_BRUTALISM_DESIGN_THINKING,
    shortDescription: 'Ultra-detailed 3D hospitality environment featuring dual vanity, backlit Italian Calacatta marble, and custom matte brass fixtures.',
    fullOverview: 'Developed as part of a flagship hospitality interior showcase. The space synthesizes soft brutalist monolithic geometry with tactile materials: hand-troweled textured plaster, honed travertine tables, and warm 3000K recessed LED cove illumination.',
    technicalDecisions: [
      'Subsurface Scattering (SSS) calibrated for translucent onyx and matte ceramic basins.',
      'Physically accurate IES light profiles with custom Kelvin temperature zoning (3200K warm wash with 5000K daylight spill).',
      'High-poly beveling and edge micro-imperfections to eliminate CG artificiality.',
      'Interactive Russian-doll breakdown with Clay vs. Lit render inspection slider.'
    ],
    specs: {
      software: ['Autodesk Maya', 'Cinema 4D', 'Redshift / V-Ray', 'Photoshop', 'Marvelous Designer'],
      polyCount: '4.8M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Redshift GPU Photorealistic GI',
      lightingSetup: 'Multi-layer IES Portal & Custom HDRI Rig',
      deliveryFormat: '8K Master Stills & 60FPS Camera Flythroughs'
    },
    metrics: [
      { label: 'Render Resolution', value: '8K UHD' },
      { label: 'Client Approval', value: '1st Round Signoff' },
      { label: 'Material Accuracy', value: '100% PBR Calibrated' },
      { label: 'Geometry', value: '4.8M Quads' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'proj-soft-brutalism-bedroom',
    slug: 'soft-brutalism-bedroom-suite',
    title: 'Soft Brutalism Master Bedroom Suite',
    subtitle: 'Arched Headboard Alcove, Natural Linen & Pendant Illumination',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Kohler Hospitality',
    year: '2024',
    role: 'Lead 3D Visualizer',
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    clayImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    finalImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    badge: 'Master Suite',
    featured: true,
    aspectRatio: 'tall',
    designThinking: SOFT_BRUTALISM_DESIGN_THINKING,
    shortDescription: 'Monolithic arched alcove master bedroom featuring suspended hand-spun ceramics and layered organic linen textiles.',
    fullOverview: 'An exploration of serene architectural resting spaces. Features custom-modeled Marvelous Designer bed linens, brushed oak bedside cantilever plinths, and warm 2700K ambient cove light.',
    technicalDecisions: [
      'Micro-fiber cloth fuzz simulation using Redshift hair/strand shader for real fabric tactile quality.',
      'Physically modeled ambient lighting balance between window daylight and warm internal bedside lamps.',
      'Adaptive displacement on textured plaster walls for authentic depth at grazing angles.'
    ],
    specs: {
      software: ['Cinema 4D', 'Marvelous Designer', 'Redshift', 'Photoshop'],
      polyCount: '3.6M Polygons',
      renderEngine: 'Redshift GPU Photorealistic GI',
      lightingSetup: '2700K Warm IES & Directional Sun'
    },
    metrics: [
      { label: 'Cloth Resolution', value: '4K Textures' },
      { label: 'Lighting Kelvin', value: '2700K Ambient' },
      { label: 'Noise Threshold', value: '0.005 Clean' },
      { label: 'Format', value: 'Master 8K' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'proj-soft-brutalism-dining',
    slug: 'sculptural-dining-alcove',
    title: 'Sculptural Dining Nook',
    subtitle: 'Monolithic Travertine Table & Matte Black Overhead Light',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Kohler Living',
    year: '2024',
    role: 'Spatial Designer & 3D Artist',
    coverImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    clayImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    finalImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    badge: 'Dining Nook',
    featured: false,
    aspectRatio: 'standard',
    designThinking: SOFT_BRUTALISM_DESIGN_THINKING,
    shortDescription: 'Intimate dining space centered on a cylindrical monolithic stone pedestal table with organic textured boucle armchairs.',
    fullOverview: 'Crafted to highlight geometric harmony between cylindrical stone pedestals, circular seating contours, and dramatic downward directional lighting.',
    technicalDecisions: [
      'Real-world stone absorption density calculation for stone translucency at thin edges.',
      'Calibrated matte black metal shader with subtle micro-fingerprint gloss maps for realism.'
    ],
    specs: {
      software: ['Cinema 4D', 'Redshift', 'Photoshop'],
      polyCount: '2.4M Polygons',
      renderEngine: 'Redshift GPU GI'
    },
    metrics: [
      { label: 'PBR Shaders', value: '100% Calibrated' },
      { label: 'Samples', value: '2048 Samples/px' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'
    ],
  },
  {
    id: 'proj-soft-brutalism-vanity',
    slug: 'monolithic-stone-vanity-bath',
    title: 'Monolithic Stone Vanity & Backlit Mirror',
    subtitle: 'Carved Stone Basin, Backlit Arch & Matte Nero Fixtures',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Kohler Sanitaryware',
    year: '2024',
    role: 'Lead 3D Visualizer',
    coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    clayImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    finalImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Vanity Suite',
    featured: true,
    aspectRatio: 'standard',
    designThinking: SOFT_BRUTALISM_DESIGN_THINKING,
    shortDescription: 'Architectural vanity focal point featuring a floating cast-concrete counter, raw carved stone vessel basin, and glowing arch backlight.',
    fullOverview: 'Designed for Kohler premium hospitality line. Emphasizes water caustics, soft specular reflections across the mirror surface, and velvety wall-mounted matte nero faucets.',
    technicalDecisions: [
      'Multi-bounce specular transmission through mirror and glass vanity shelving.',
      'IES diffused perimeter halo lighting behind the custom arched mirror.'
    ],
    specs: {
      software: ['Autodesk Maya', 'Cinema 4D', 'Redshift', 'V-Ray'],
      polyCount: '3.1M Polygons',
      renderEngine: 'Redshift GPU Photorealistic GI'
    },
    metrics: [
      { label: 'Glass Accuracy', value: '1.517 IOR' },
      { label: 'Backlight Halo', value: '3000K Soft' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
  },
  {
    id: 'proj-kohler-fluted-shower',
    slug: 'kohler-fluted-shower-suite',
    title: 'Kohler Minimalist Fluted Glass Rain Shower',
    subtitle: 'Architectural Glazing & Concealed Drain Engineering',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Visualizer',
    coverImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    clayImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    finalImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    badge: 'Glazing Master',
    featured: false,
    aspectRatio: 'standard',
    designThinking: SOFT_BRUTALISM_DESIGN_THINKING,
    shortDescription: 'Frameless fluted privacy glass shower cabin featuring overhead flush rain shower with volumetric light ray dispersion.',
    fullOverview: 'Developed to demonstrate physical refractive caustics through corrugated fluted glass ribs, creating privacy while permitting gentle daylight spill.',
    technicalDecisions: [
      'Complex procedural fluted normal and refraction maps to simulate optical distortions without heavy mesh density.',
      'Micro-droplet dispersion simulation on glass surfaces using hair instancing.'
    ],
    specs: {
      software: ['Cinema 4D', 'Redshift', 'Substance Designer'],
      polyCount: '2.8M Polygons',
      renderEngine: 'Redshift Photorealistic GI'
    },
    metrics: [
      { label: 'Glass Rib Pitch', value: '12mm Accurate' },
      { label: 'Caustics Pass', value: 'Full Path Traced' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80'
    ],
  },
  {
    id: 'proj-luxury-materials-macro',
    slug: 'tactile-pbr-material-specifications',
    title: 'Tactile PBR Materials & Architectural Palette',
    subtitle: '12-Material Physical Swatch Study for Interior Spaces',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Studio Research',
    year: '2024',
    role: 'Material & Texture Director',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    clayImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    finalImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Materials Study',
    featured: false,
    aspectRatio: 'square',
    designThinking: SOFT_BRUTALISM_DESIGN_THINKING,
    shortDescription: 'Macro study of stone, bouclé, travertine, fluted glass, brushed champagne brass, and hand-troweled plaster.',
    fullOverview: 'A master laboratory dataset testing how natural Mediterranean brutalist materials react under varied lighting scenarios (direct sunlight, warm cove glow, and diffuse overcast daylight).',
    technicalDecisions: [
      'Albedo, Roughness, Normal, and 16-bit Height maps captured and processed in Substance Designer.',
      'ACEScg linear workflow ensuring 100% color fidelity across all display color profiles.'
    ],
    specs: {
      software: ['Substance Designer', 'Cinema 4D', 'Redshift'],
      polyCount: '1.2M Polygons',
      renderEngine: 'Redshift GPU GI'
    },
    metrics: [
      { label: 'Texture Depth', value: '16-bit RAW' },
      { label: 'Materials Tested', value: '12 Spec Calibrated' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
  },
  {
    id: 'proj-kohler-matte-black',
    slug: 'kohler-matte-black-series',
    title: 'Kohler Matte Black Series Commercial',
    subtitle: 'High-End Product Motion & Fluid Simulation Video Reel',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'Kohler',
    year: '2023 - 2024',
    role: 'Senior 3D Artist & Motion Lead (Pixel2Pixel)',
    coverImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    badge: 'Kohler',
    featured: true,
    shortDescription: 'Cinematic commercial launch reel highlighting the anodized finish, water atomization physics, and architectural geometry of Kohler luxury showerheads.',
    fullOverview: 'Produced under Pixel2Pixel for Kohler brand marketing. The brief demanded photorealistic macro closeups of flowing liquid, velvety matte black finishes that avoid looking flat, and dynamic lighting sweeps synchronized with sound design.',
    technicalDecisions: [
      'Engineered custom anisotropic roughness maps to capture microscopic brush strokes on matte black metal.',
      'RealFlow particle simulations for micro-droplet water atomization and spray dynamics.',
      'Cinematic 32-bit ACES color pipeline for broadcast TV and digital billboard delivery.',
      'Direction and mentorship of junior 3D artists for model cleanup and UV layout.'
    ],
    specs: {
      software: ['Cinema 4D', 'Autodesk Maya', 'After Effects', 'RealFlow', 'Octane Render'],
      renderEngine: 'Octane Spectral Engine (ACEScg)',
      deliveryFormat: '4K DCI Commercial Master & Social Cuts',
      lightingSetup: 'Studio Softbox Rigs with Motorized Light Sweeps'
    },
    metrics: [
      { label: 'Client Campaign', value: 'Kohler' },
      { label: 'Deliverables', value: '4 Commercial Cuts' },
      { label: 'Fluid Sim Particles', value: '12M+ Voxels' },
      { label: 'Team Size Led', value: '4 Artists' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'proj-panasonic-miraie',
    slug: 'panasonic-miraie-smart-iot',
    title: 'Panasonic Miraie IoT Smart Living Ecosystem',
    subtitle: '3D Product Visualization & Interactive IoT Setup Walkthrough',
    domainId: 'brand-motion',
    collectionId: 'panasonic-miraie',
    client: 'Panasonic',
    year: '2023',
    role: 'Lead 3D Animator & Visualizer',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    badge: 'Panasonic',
    featured: true,
    shortDescription: 'Exploded-view 3D animation and customer onboarding video explaining the Panasonic Miraie connected home platform.',
    fullOverview: 'Designed to bridge physical product engineering and consumer app interfaces. Features seamless transitions between real-world home appliance 3D models and connected IoT wireless signal overlays.',
    technicalDecisions: [
      'Modular CAD import pipeline optimized for zero artifacting on thin-walled injection-molded plastics.',
      'Motion graphics overlays in After Effects synchronized to 3D camera trajectory.',
      'Simplified instructional visual hierarchy reducing user onboarding friction.'
    ],
    specs: {
      software: ['Cinema 4D', 'After Effects', 'Illustrator', 'Redshift'],
      renderEngine: 'Redshift Motion Blur Pipeline',
      deliveryFormat: '1080p 60FPS Video Series + Mobile In-App Guides'
    },
    metrics: [
      { label: 'Customer Views', value: '500K+ Engagements' },
      { label: 'Brand', value: 'Panasonic' },
      { label: 'Assets Modeled', value: '14 IoT Devices' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: 'proj-unreal-virtual-set',
    slug: 'unreal-engine-5-virtual-production',
    title: 'UE5 Real-Time Virtual Production Set',
    subtitle: 'Lumen Dynamic GI & Nanite Virtual Architecture at 60 FPS',
    domainId: '3d-spatial',
    collectionId: 'unreal-engine-realtime',
    year: '2024 - 2025',
    role: 'Unreal Engine Technical Artist',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    badge: 'Real-Time UE5',
    featured: true,
    shortDescription: 'Interactive real-time architectural environment running in Unreal Engine 5.4 with dynamic sun positions, Lumen reflections, and Nanite geometry.',
    fullOverview: 'Built to demonstrate the future of virtual production and real-time client presentations. Eliminates multi-hour offline render queues by leveraging Unreal Engine 5 Lumen hardware raytracing and custom HLSL shader networks.',
    technicalDecisions: [
      'Configured Nanite virtualization allowing over 80 million raw polygons with zero LOD pop-in.',
      'Custom Blueprint system for real-time material swapping (wood, stone, metal) via UI control widget.',
      'Post-processing volume with filmic tone mapping and chromatic aberration for cinematic realism.'
    ],
    specs: {
      software: ['Unreal Engine 5.4', 'Blender', 'Substance Painter', 'Blueprints'],
      renderEngine: 'UE5 Lumen Real-Time Hardware Raytracing',
      polyCount: '85M Nanite Triangles',
      deliveryFormat: 'Real-time 4K 60FPS Executable & Virtual Cam'
    },
    metrics: [
      { label: 'Real-Time Framerate', value: '60+ FPS (4K)' },
      { label: 'Polygon Budget', value: '85M+ Triangles' },
      { label: 'Iteration Speed', value: 'Instant (0 Render Lag)' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: 'proj-comfyui-pipeline',
    slug: 'comfyui-generative-product-pipeline',
    title: 'ComfyUI Generative Asset & Inpainting Pipeline',
    subtitle: 'Automated Node Workflows, Flux / SDXL, and ControlNet Guidance',
    domainId: 'gen-ai',
    collectionId: 'comfyui-pipelines',
    year: '2024 - 2025',
    role: 'AI Workflow Architect',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    badge: 'Gen-AI Workflow',
    featured: true,
    shortDescription: 'Proprietary node graph in ComfyUI that converts low-poly 3D blockouts into photorealistic concept renders in seconds using ControlNet Depth & Flux.1.',
    fullOverview: 'Architected to supercharge 3D pre-visualization and production velocity. The pipeline ingests 3D depth passes, applies multi-stage latent denoising, and runs facial/product inpainting with custom-trained LoRAs.',
    technicalDecisions: [
      'Custom node integration combining Depth, Canny, and OpenPose ControlNets for absolute geometry retention.',
      'Iterative Latent Upscaling with Ultimate SD Upscale and tile-based detail injection.',
      'Automated batch generation for rapid client mood boards and variation exploration.'
    ],
    specs: {
      software: ['ComfyUI', 'Flux.1 Dev', 'SDXL', 'ControlNet', 'Python', 'PyTorch'],
      aiWorkflow: 'Multi-Pass Latent Inpainting & LoRA Switching',
      deliveryFormat: 'Production Ready 4K AI Composites'
    },
    metrics: [
      { label: 'Concept Velocity', value: '10x Faster Iteration' },
      { label: 'Custom Node Nodes', value: '45+ Connected Nodes' },
      { label: 'Resolution Output', value: 'Up to 8192x8192' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: 'proj-antigravity-fullstack',
    slug: 'antigravity-spatial-web-platform',
    title: 'Antigravity Full-Stack 3D & AI Web Portal',
    subtitle: 'Next.js 14, TypeScript, Tailwind, Three.js & Agentic AI Workflows',
    domainId: 'full-stack',
    collectionId: 'antigravity-web-apps',
    year: '2025 - 2026',
    role: 'Full-Stack Creative Technologist',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/gauravroy-portfolio',
    liveDemoUrl: 'https://gauravroy.dev',
    badge: 'Full-Stack Code',
    featured: true,
    shortDescription: 'High-performance interactive web application built with Next.js, Framer Motion, and WebGL rendering, engineered using AI agent workflows.',
    fullOverview: 'Demonstrates end-to-end full-stack capabilities, bridging high-end 3D graphics with modern software engineering practices: TypeScript strict mode, responsive fluid layouts, fast CDN deployment, and recruiter-focused UX.',
    technicalDecisions: [
      'Russian Doll multi-level navigation system for frictionless project drill-down.',
      'Zero layout shift, 100/100 Lighthouse performance, and keyboard-accessible command shortcuts.',
      'Integrated interactive image comparison slider and custom 4K YouTube player modal.'
    ],
    specs: {
      software: ['Next.js 14 (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      framework: 'React 18 + Next.js Server & Client Components',
      deliveryFormat: 'Vercel / Netlify Edge CDN Deployment'
    },
    metrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Page Load', value: '< 0.8s' },
      { label: 'Codebase', value: '100% Strict TypeScript' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: 'proj-tata-industrial',
    slug: 'tata-mobility-industrial-cgi',
    title: 'TATA Mobility & Aerospace 3D Visualization',
    subtitle: 'High-Fidelity Vehicle CGI, CAD Surface Modeling & Product Stills',
    domainId: '3d-spatial',
    collectionId: 'commercial-campaigns',
    client: 'TATA',
    year: '2023 - 2024',
    role: 'Senior 3D Artist (Pixel2Pixel)',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    badge: 'Enterprise • TATA',
    featured: true,
    shortDescription: 'Precision CAD automotive surfacing and photorealistic studio lighting for TATA enterprise vehicles.',
    fullOverview: 'Engineered complex CAD conversion workflows for TATA industrial vehicle models, applying micro-flake automotive paint shaders, studio cyclorama lighting, and high-resolution print marketing assets.',
    technicalDecisions: [
      'Converted raw Class-A CAD NURBS into optimized quad meshes with zero surface pinching.',
      'Multi-coat metallic car paint shader with customized Fresnel and clearcoat roughness.',
      'Delivered 12K master stills for outdoor billboards and print catalogs.'
    ],
    specs: {
      software: ['Autodesk Maya', 'Cinema 4D', 'V-Ray', 'Photoshop'],
      renderEngine: 'V-Ray GPU Production Engine',
      deliveryFormat: '12K Print Masters & Web Marketing Assets'
    },
    metrics: [
      { label: 'Client', value: 'TATA Motors' },
      { label: 'Mesh Precision', value: 'Class-A CAD' },
      { label: 'Render Detail', value: '12K Master' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: 'proj-jbl-acoustics',
    slug: 'jbl-acoustic-wave-commercial',
    title: 'JBL Audio Spatial Sound Commercial',
    subtitle: 'Dynamic Acoustic Wave Particle Simulations & Sound Motion Graphics',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'JBL',
    year: '2023',
    role: 'Motion Graphics Lead',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    badge: 'Enterprise • JBL',
    featured: true,
    shortDescription: 'Kinetic 3D commercial featuring exploded audio driver geometry and fluid acoustic particle waves.',
    fullOverview: 'Created for JBL commercial launch campaigns to illustrate spatial audio dispersion. Combined macro 3D headphone teardown modeling with 8 million particle acoustic sound waves synchronized to a high-energy soundtrack.',
    technicalDecisions: [
      'Particle soundwave simulations driven by audio waveform frequency baking in After Effects and Cinema 4D.',
      'Subsurface acoustic mesh shaders showing transparent diaphragm vibration.',
      'Color-graded for digital campaigns across YouTube, Instagram, and retail displays.'
    ],
    specs: {
      software: ['Cinema 4D', 'After Effects', 'Octane Render', 'X-Particles'],
      renderEngine: 'Octane Spectral Renderer',
      deliveryFormat: '4K Commercial Master'
    },
    metrics: [
      { label: 'Client', value: 'JBL Audio' },
      { label: 'Particle Count', value: '8M Particles' },
      { label: 'Framerate', value: '60 FPS 4K' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    ]
  },
  {
    id: 'proj-hindware-ceramics',
    slug: 'hindware-italian-collection',
    title: 'Hindware Italian Luxury Sanitaryware Series',
    subtitle: 'Photorealistic Interior Environments & Ceramic Glaze PBR Shaders',
    domainId: '3d-spatial',
    collectionId: 'bathroom-hospitality',
    client: 'Hindware',
    year: '2022 - 2023',
    role: 'Lead 3D Visualizer',
    coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    badge: 'Enterprise • Hindware',
    featured: true,
    shortDescription: 'Architectural interior bathroom suites showcasing high-end Italian ceramic basins and luxury fittings.',
    fullOverview: 'Developed for Hindware brand catalogs and digital showrooms. Involved creating realistic glaze dispersion shaders, polished terrazzo floors, and natural sunbeam lighting simulations.',
    technicalDecisions: [
      'Fine-tuned ceramic specular rolloff and high-gloss glaze reflection curves.',
      'IES lighting balanced with warm architectural interior spotlights.',
      'Color matching to exact factory porcelain samples.'
    ],
    specs: {
      software: ['Cinema 4D', 'V-Ray', 'Photoshop'],
      renderEngine: 'V-Ray GPU',
      deliveryFormat: '8K Architectural Stills'
    },
    metrics: [
      { label: 'Client', value: 'Hindware' },
      { label: 'Catalog Assets', value: '18 Suites' },
      { label: 'Approval', value: '100% First Pass' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    ]
  }
];

export const CLIENTS = [
  { name: 'Kohler', category: 'Luxury Sanitaryware & Living', logoText: 'KOHLER' },
  { name: 'Panasonic', category: 'Smart Home & Electronics', logoText: 'Panasonic' },
  { name: 'TATA', category: 'Enterprise Industrial & Mobility', logoText: 'TATA' },
  { name: 'JBL', category: 'Acoustics & Audio Engineering', logoText: 'JBL' },
  { name: 'Hindware', category: 'Ceramics & Interior Tech', logoText: 'hindware' },
  { name: 'Biocon', category: 'Biotechnology & Health Visuals', logoText: 'Biocon' },
  { name: 'GITAM', category: 'Research & Spatial Technology', logoText: 'GITAM' },
  { name: 'Pixel2Pixel', category: 'Design Studio & 3D Agency', logoText: 'PIXEL2PIXEL' },
];

export const CAPABILITIES = [
  {
    icon: 'Layers',
    title: '3D Modeling & Spatial Design',
    category: 'Spatial Engineering',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/30',
    description: 'Expertise in high-poly organic and hard-surface CAD modeling, clean topology, UV layout, and physical PBR texturing.',
    tools: ['Autodesk Maya', 'Cinema 4D', 'Marvelous Designer', 'Blender', 'Substance Painter'],
  },
  {
    icon: 'Cpu',
    title: 'Generative AI & ComfyUI',
    category: 'AI Pipeline Engineering',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    description: 'Custom node workflows, multi-stage ControlNet integration, Flux & SDXL model fine-tuning, LoRA creation, and automated asset gen.',
    tools: ['ComfyUI', 'Flux.1', 'SDXL', 'LoRA Training', 'ControlNet', 'Python Workflows'],
  },
  {
    icon: 'Gamepad2',
    title: 'Unreal Engine 5 & WebXR',
    category: 'Real-Time Graphics',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    description: 'Next-gen real-time environments, Lumen dynamic global illumination, Nanite geometry streaming, Blueprints, and WebGL/WebXR.',
    tools: ['Unreal Engine 5.4', 'Lumen & Nanite', 'Blueprints', 'WebXR', 'Three.js'],
  },
  {
    icon: 'Video',
    title: 'Commercial Motion & VFX',
    category: 'Visual Storytelling',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    description: 'Cinematic camera movement, lighting sweeps, fluid/cloth simulations, broadcast color grading, and TV commercial editing.',
    tools: ['After Effects', 'Octane Render', 'Redshift', 'Premiere Pro', 'RealFlow'],
  },
  {
    icon: 'Code',
    title: 'Full-Stack Web Engineering',
    category: 'Interactive Platforms',
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-500/30',
    description: 'Production-ready web development with modern React/Next.js frameworks, TypeScript, Tailwind styling, and Antigravity AI agent coding.',
    tools: ['Next.js 14/15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Antigravity'],
  },
  {
    icon: 'Users',
    title: 'Creative Direction & Team Leadership',
    category: 'Enterprise Delivery',
    color: 'from-rose-500/20 to-red-500/20',
    borderColor: 'border-rose-500/30',
    description: '5 years leading 3D artists, directing enterprise commercial projects, mentoring talent, and managing tight client deadlines.',
    tools: ['Project Management', 'Client Relations', 'Pipeline Optimization', 'Art Direction'],
  },
];

export const WORK_EXPERIENCE = [
  {
    period: 'Jan 2020 – Jan 2025 (5 Years)',
    role: 'Senior 3D Artist & Team Lead',
    company: 'Pixel2Pixel',
    location: 'Delhi, India / Hybrid',
    badge: 'Senior Leadership',
    description: 'Led a multidisciplinary team of 3D artists, motion designers, and visualizers delivering commercial CGI, product commercials, and WebXR experiences for multinational enterprise brands.',
    achievements: [
      'Spearheaded 3D production pipelines for tier-1 enterprise clients: Kohler, Panasonic, Hindware, TATA, JBL, Biocon, and GITAM.',
      'Supervised modeling, photorealistic rendering, interior architecture suites, motion graphics, and WebXR/GameDev workflows.',
      'Assigned tasks based on individual artist strengths, implemented QA review standards, and accelerated studio delivery times by 35%.',
      'Provided hands-on creative direction, technical mentorship, and developed internal standard operating procedures for lighting and asset optimization.'
    ],
    tools: ['Cinema 4D', 'Autodesk Maya', 'After Effects', 'Unreal Engine', 'Marvelous Designer', 'Photoshop', 'WebXR']
  },
  {
    period: '2019 – Present',
    role: 'Freelance Creative Technologist & AI Specialist',
    company: 'Independent Practice',
    location: 'Remote / Global',
    badge: 'Multi-Disciplinary',
    description: 'Consulting for global product brands, design agencies, and innovative startups on custom 3D visualizations, ComfyUI generative AI pipelines, and full-stack interactive web tools.',
    achievements: [
      'Engineered automated ComfyUI node workflows for commercial clients, slashing concept pre-visualization turnaround from days to hours.',
      'Constructed interactive 3D WebGL configurators and modern Next.js web applications with smooth motion physics.',
      'Designed luxury spatial renders and marketing visuals for architectural firms and consumer hardware companies.'
    ],
    tools: ['ComfyUI', 'Unreal Engine 5', 'Next.js', 'TypeScript', 'Blender', 'Flux.1', 'Antigravity']
  }
];

export const EDUCATION = [
  {
    period: 'Sep 2019 – Sep 2020',
    degree: 'Diploma in 3D Design & Computer Graphics',
    institution: 'Arena Animation',
    status: 'Completed',
    notes: 'Intensive specialization in hard-surface modeling, spatial layout, animation principles, lighting, and rendering pipelines.'
  },
  {
    period: 'Foundational Studies',
    degree: 'Aeronautical Engineering & Computer Applications Foundation',
    institution: 'Kurukshetra University & IGNOU',
    status: 'Academic Background',
    notes: 'Strong theoretical grounding in structural physics, spatial reasoning, mathematics, and computer software & hardware architectures.'
  }
];
