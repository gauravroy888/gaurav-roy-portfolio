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
  views?: ProjectViewAngle[];
  plans?: ProjectPlanItem[];
  liveDemoUrl?: string;
  githubUrl?: string;
  storyboardUrl?: string;
  proofYoutubeId?: string;
  proofVideoTitle?: string;
  stills?: ProjectStillItem[];
}

export interface ProjectStillItem {
  id: string;
  title: string;
  imageUrl: string;
  highResUrl?: string;
  tag?: string;
  description?: string;
}

export interface ProjectViewAngle {
  id: string;
  name: string;
  camNumber: string;
  imageUrl: string;
  highResUrl?: string;
  tag?: string;
  description?: string;
}

export interface ProjectPlanItem {
  title: string;
  type: string;
  image: string;
  description?: string;
  scale?: string;
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
  youtubeId?: string;
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

export const TEAKBERRY_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'TEAKBERRY LUXURY BATH SUITE',
  tagline: 'WARM EARTH. QUIET LUXURY. TIMELESS CHARACTER.',
  philosophyQuote: 'Wisps of wise browns intertwine with greens, enriched by subtle undertones of purple, creating a captivating symphony of surreal and enchanting tones.',
  colorPalette: [
    { name: 'Teakberry Gloss', hex: '#634444', description: 'Purple-brown signature ceramic glaze' },
    { name: 'Lush Honed', hex: '#3E473E', description: 'Deep forest green honed finish' },
    { name: 'Fluted Walnut', hex: '#5C381E', description: 'Warm architectural acoustic timber' },
    { name: 'Calacatta Gold', hex: '#EAE5DB', description: 'Vein-cut Italian marble slab' },
    { name: 'Matte Black', hex: '#1C1B1A', description: 'Powder-coated metal armature' },
  ],
  materials: [
    { name: 'Teakberry Gloss Ceramic', category: 'Products Finish', sampleColor: '#634444', textureGradient: 'linear-gradient(135deg, #7A5555 0%, #463030 100%)', finish: 'High-Gloss Ceramic Glaze' },
    { name: 'Lush Honed Ceramic', category: 'Products Finish', sampleColor: '#3E473E', textureGradient: 'linear-gradient(135deg, #4F5A4F 0%, #2D342D 100%)', finish: 'Velvet Honed Matte' },
    { name: 'Fluted Walnut Woodwork', category: 'Architectural Finish', sampleColor: '#5C381E', textureGradient: 'repeating-linear-gradient(90deg, #6B4226, #442410 8px, #361C0C 16px)', finish: 'Satin Architectural Grooved' },
    { name: 'Calacatta Gold Marble', category: 'Materials & Surfaces', sampleColor: '#EAE5DB', textureGradient: 'linear-gradient(135deg, #F5F2EB 0%, #DFD7C7 100%)', finish: 'Vein-Cut Polished Marble' },
    { name: 'Matte Black Brassware', category: 'Products Finish', sampleColor: '#1C1B1A', textureGradient: 'linear-gradient(135deg, #2B2A29 0%, #0F0E0E 100%)', finish: 'Powder-Coated Electroplated' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Teakberry & Lush Glaze SSS', description: 'Custom multi-layer PBR subsurface scattering and specular roughness for Kohler ceramic glazes.' },
    { icon: 'Layers', title: 'Fluted Walnut & Marble', description: 'Vertical acoustic fluted paneling contrasted against vein-cut Calacatta Gold marble.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'C4D & Redshift' },
    { icon: 'Palette', label: 'Teakberry & Lush' },
  ],
};

export const KOHLER_LAYOUT_1_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'VILLA MASTER COURTYARD ZEN SUITE',
  tagline: 'INDOOR-OUTDOOR HARMONY • JAPANESE ATRIUM',
  philosophyQuote: 'Luxury bathroom architecture is the seamless orchestration of tactile natural materials, calibrated light, and sculptural plumbing ergonomics.',
  colorPalette: [
    { name: 'Honed Travertine', hex: '#D5C4A1', description: 'Warm porous limestone floor & wall' },
    { name: 'Brushed Bronze (BV)', hex: '#8C6D46', description: 'Kohler directional brushed PVD brassware' },
    { name: 'Vitreous China White', hex: '#F5F5F3', description: 'High-gloss sanitary ceramic glaze' },
    { name: 'Courtyard Glass', hex: '#A5C3C8', description: 'Ultra-clear low-iron architectural glazing' },
    { name: 'Antiqued Bronze', hex: '#4E3D2A', description: 'Satin dark metal architectural accents' },
  ],
  materials: [
    { name: 'Honed Travertine Limestone', category: 'Architectural Finish', sampleColor: '#D5C4A1', textureGradient: 'linear-gradient(45deg, #E2D3B3 0%, #BFAD89 100%)', finish: 'Honed Matte Micro-Porous' },
    { name: 'Kohler Brushed Bronze (BV)', category: 'Products Finish', sampleColor: '#8C6D46', textureGradient: 'linear-gradient(135deg, #A88659 0%, #6E5331 100%)', finish: 'Directional Brushed PVD' },
    { name: 'White Vitreous China', category: 'Products Finish', sampleColor: '#F5F5F3', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E8E8E6 100%)', finish: 'High-Gloss Ceramic Glaze' },
    { name: 'Courtyard Panorama Glazing', category: 'Architectural Finish', sampleColor: '#A5C3C8', textureGradient: 'linear-gradient(135deg, #B8D8DD 0%, #8FAFB4 100%)', finish: 'Ultra-Clear Low-Iron Glass' },
    { name: 'Antiqued Architectural Bronze', category: 'Materials & Surfaces', sampleColor: '#4E3D2A', textureGradient: 'linear-gradient(135deg, #5E4B35 0%, #3B2D1E 100%)', finish: 'Satin Dark Metal Accents' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Corona Photorealistic GI', description: 'Physically calculated caustics and daylight bounce through courtyard glass atrium.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_LAYOUT_2_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'JAPANDI FLUTED OAK & BONSAI SUITE',
  tagline: 'SCANDINAVIAN WARMTH • JAPANESE MINIMALISM',
  philosophyQuote: 'A serene synthesis of organic timber warmth and precision chrome minimalism.',
  colorPalette: [
    { name: 'Fluted White Oak', hex: '#A8835A', description: 'Vertical acoustic ribbed timber' },
    { name: 'Polished Chrome (CP)', hex: '#D6DDE4', description: 'Mirror specular chrome fixtures' },
    { name: 'Ribbed Glass', hex: '#C8D6D8', description: 'Refractive corrugated privacy glass' },
    { name: 'Honed Limestone', hex: '#E5DECF', description: 'Matte ivory stone floor tiles' },
    { name: 'Chalice White', hex: '#FAFAFA', description: 'Vitreous china vessel basin glaze' },
  ],
  materials: [
    { name: 'Vertical Fluted White Oak', category: 'Architectural Finish', sampleColor: '#A8835A', textureGradient: 'repeating-linear-gradient(90deg, #BA9469, #916E45 8px, #755533 16px)', finish: 'Satin Acoustic Ribbed Slats' },
    { name: 'Kohler Polished Chrome (CP)', category: 'Products Finish', sampleColor: '#D6DDE4', textureGradient: 'linear-gradient(135deg, #F0F4F8 0%, #B8C2CC 100%)', finish: 'Mirror Specular Chrome' },
    { name: 'Ribbed Privacy Glass', category: 'Materials & Surfaces', sampleColor: '#C8D6D8', textureGradient: 'repeating-linear-gradient(90deg, #BAC8CA, #DCEAEB 6px, #9EAEB0 12px)', finish: 'Refractive Corrugated Ribs' },
    { name: 'Honed Ivory Limestone', category: 'Architectural Finish', sampleColor: '#E5DECF', textureGradient: 'linear-gradient(135deg, #EDE7DB 0%, #D8CFC0 100%)', finish: 'Matte Seamless Floor Tile' },
    { name: 'Chalice White Porcelain', category: 'Products Finish', sampleColor: '#FAFAFA', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #EAEAEA 100%)', finish: 'High-Gloss Vitreous China' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Organic Timber Anisotropy', description: 'Calibrated wood grain roughness and light stretching across acoustic oak slats.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_LAYOUT_3_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'MOODY CHARCOAL MARBLE & FLUTED SLATE SUITE',
  tagline: 'GRAPHITE MONOLITH • HIGH CONTRAST LUXURY',
  philosophyQuote: 'Deep graphite tones and perimeter illumination sculpt an atmosphere of dramatic calm.',
  colorPalette: [
    { name: 'Graphite Marble', hex: '#2B2D31', description: 'Bookmatched dark stone slabs' },
    { name: 'Matte Black Slats', hex: '#18191C', description: 'Zero-gloss vertical architectural ribs' },
    { name: 'Polished Chrome (CP)', hex: '#D6DDE4', description: 'Mirror chrome contrast faucets' },
    { name: 'Forefront White', hex: '#FFFFFF', description: 'High-gloss vitreous vessel ceramic' },
    { name: 'Halo Glow 2800K', hex: '#FFE8C2', description: 'Warm perimeter LED mirror halo' },
  ],
  materials: [
    { name: 'Bookmatched Graphite Marble', category: 'Architectural Finish', sampleColor: '#2B2D31', textureGradient: 'linear-gradient(135deg, #3A3D42 0%, #1D1E21 100%)', finish: 'Polished High-Gloss Slabs' },
    { name: 'Matte Black Fluted Slats', category: 'Architectural Finish', sampleColor: '#18191C', textureGradient: 'repeating-linear-gradient(90deg, #25262B, #141517 8px, #0F1012 16px)', finish: 'Zero-Gloss Textured Ribs' },
    { name: 'Kohler Polished Chrome (CP)', category: 'Products Finish', sampleColor: '#D6DDE4', textureGradient: 'linear-gradient(135deg, #F0F4F8 0%, #B8C2CC 100%)', finish: 'Specular Mirror Chrome' },
    { name: 'Forefront White Ceramic', category: 'Products Finish', sampleColor: '#FFFFFF', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #EDEDED 100%)', finish: 'High-Gloss Vitreous China' },
    { name: 'Perimeter Halo LED Glow', category: 'Materials & Surfaces', sampleColor: '#FFE8C2', textureGradient: 'radial-gradient(circle, #FFF2D9 30%, #FFD699 100%)', finish: '2800K Warm Edge Illumination' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Multi-Bounce Mirror Specularity', description: 'Accurate Fresnel reflection mapping on high-gloss charcoal marble.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_LAYOUT_4_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'HIGH-RISE PENTHOUSE MASTER BATH SUITE',
  tagline: 'ROOFTOP HORIZON • SKY POOL SANCTUARY',
  philosophyQuote: 'Panoramic sky meets warm Roman travertine and reflective water surfaces.',
  colorPalette: [
    { name: 'Roman Travertine', hex: '#D8CBB5', description: 'Vein-cut honed limestone walls' },
    { name: 'Brushed Bronze (BV)', hex: '#8C6D46', description: 'Kohler Composed bath deck valves' },
    { name: 'Sanitary Acrylic White', hex: '#F7F7F8', description: 'Reach drop-in bathtub glaze' },
    { name: 'Horizon Water', hex: '#4FA8C4', description: 'Refractive pool water volume' },
    { name: 'Calacatta Deck', hex: '#ECE7DE', description: 'Vein-cut polished marble surround' },
  ],
  materials: [
    { name: 'Warm Roman Travertine', category: 'Architectural Finish', sampleColor: '#D8CBB5', textureGradient: 'linear-gradient(45deg, #E5D9C4 0%, #C4B59D 100%)', finish: 'Vein-Cut Honed Limestone' },
    { name: 'Kohler Brushed Bronze (BV)', category: 'Products Finish', sampleColor: '#8C6D46', textureGradient: 'linear-gradient(135deg, #A88659 0%, #6E5331 100%)', finish: 'Directional Brushed PVD' },
    { name: 'Reach Drop-In Acrylic Bath', category: 'Products Finish', sampleColor: '#F7F7F8', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E8E8EA 100%)', finish: 'High-Gloss Sanitary Acrylic' },
    { name: 'Horizon Infinity Water', category: 'Materials & Surfaces', sampleColor: '#4FA8C4', textureGradient: 'linear-gradient(135deg, #6DC2DC 0%, #3488A3 100%)', finish: 'Refractive Liquid Horizon' },
    { name: 'Calacatta Marble Tub Deck', category: 'Architectural Finish', sampleColor: '#ECE7DE', textureGradient: 'linear-gradient(135deg, #F6F3ED 0%, #DFD9CE 100%)', finish: 'Polished Bath Surround' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Water Volume & Caustic Shader', description: 'Simulated water absorption and caustics through floor-to-ceiling sky portals.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_LAYOUT_5_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: '4BHK POWDER LUXURY ROOM',
  tagline: 'JEWEL-BOX INTERIOR • DRAMATIC WINE & ROSE GOLD',
  philosophyQuote: 'A jewel-box powder sanctuary pairing deep Rosso Levanto marble with Vibrant Rose Gold.',
  colorPalette: [
    { name: 'Rosso Levanto', hex: '#4A1D24', description: 'Deep burgundy plum marble slab' },
    { name: 'Rose Gold (RGD)', hex: '#B76E79', description: 'Kohler Vibrant Rose Gold PVD' },
    { name: 'Curved Walnut', hex: '#5C3A24', description: 'Fluted architectural vanity wood' },
    { name: 'Opaline Milk Glass', hex: '#EFECE6', description: 'Diffused suspended globe pendants' },
    { name: 'ModernLife White', hex: '#F9F9F9', description: 'Fine-edge vitreous vessel china' },
  ],
  materials: [
    { name: 'Rosso Levanto Burgundy Marble', category: 'Architectural Finish', sampleColor: '#4A1D24', textureGradient: 'linear-gradient(135deg, #5C252D 0%, #331318 100%)', finish: 'Polished Deep Plum Slabs' },
    { name: 'Kohler Vibrant Rose Gold (RGD)', category: 'Products Finish', sampleColor: '#B76E79', textureGradient: 'linear-gradient(135deg, #D48C97 0%, #9C5560 100%)', finish: 'Electroplated PVD Rose Gold' },
    { name: 'Curved Fluted Walnut', category: 'Architectural Finish', sampleColor: '#5C3A24', textureGradient: 'repeating-linear-gradient(90deg, #6E462C, #4B2E1C 8px, #361E10 16px)', finish: 'Architectural Ribbed Wood' },
    { name: 'Opaline Frosted Milk Glass', category: 'Materials & Surfaces', sampleColor: '#EFECE6', textureGradient: 'radial-gradient(circle, #FAF8F5 40%, #DFDAD0 100%)', finish: 'Diffused Translucent Globes' },
    { name: 'ModernLife Edge White China', category: 'Products Finish', sampleColor: '#F9F9F9', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #EBEBEB 100%)', finish: 'Fine-Edge Vitreous China' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'PVD Metallic Accuracy', description: 'Calibrated PVD metallic shader reflecting authentic Kohler Vibrant Rose Gold.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_LAYOUT_6_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'MEDITERRANEAN BIOPHILIC SPA & WHIRLPOOL SUITE',
  tagline: 'EARTHEN WELLNESS • HYDROTHERAPY ENGINEERING',
  philosophyQuote: 'Biophilic textures meet cutting-edge Anthem thermostatic hydrotherapy engineering.',
  colorPalette: [
    { name: 'Terracotta Honeycomb', hex: '#9E593A', description: 'Earthy matte geometric floor tiles' },
    { name: 'Rustic Timber Beams', hex: '#63442A', description: 'Aged natural hewn ceiling beams' },
    { name: 'Brushed Bronze (BV)', hex: '#8C6D46', description: 'Anthem 3-outlet knurled valves' },
    { name: 'Hourglass Acrylic', hex: '#F4F4F4', description: 'Reinforced drop-in whirlpool tub' },
    { name: 'Textured Lime Plaster', hex: '#DDD4C5', description: 'Troweled warm Mediterranean plaster' },
  ],
  materials: [
    { name: 'Terracotta Honeycomb Tiles', category: 'Architectural Finish', sampleColor: '#9E593A', textureGradient: 'linear-gradient(135deg, #B26847 0%, #85482D 100%)', finish: 'Unglazed Earthy Matte' },
    { name: 'Exposed Rustic Timber Beams', category: 'Architectural Finish', sampleColor: '#63442A', textureGradient: 'linear-gradient(90deg, #755234 0%, #4D331D 100%)', finish: 'Natural Hewn Aged Timber' },
    { name: 'Kohler Brushed Bronze (BV)', category: 'Products Finish', sampleColor: '#8C6D46', textureGradient: 'linear-gradient(135deg, #A88659 0%, #6E5331 100%)', finish: 'Knurled & Brushed PVD' },
    { name: 'Hourglass Hydrotherapy Acrylic', category: 'Products Finish', sampleColor: '#F4F4F4', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E3E3E3 100%)', finish: 'Gloss Reinforced Acrylic' },
    { name: 'Textured Mediterranean Plaster', category: 'Materials & Surfaces', sampleColor: '#DDD4C5', textureGradient: 'radial-gradient(circle, #EAE3D6 30%, #C8BCAC 100%)', finish: 'Troweled Lime Plaster' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Anthem Knurled Mechanical Dials', description: 'Micro-detail displacement on Anthem thermostatic valves and Vichy nozzles.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_LAYOUT_7_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'LAURENT GOLD ULTRA-LUXURY MASTER SUITE',
  tagline: 'GOLD CALCITE VEINING • PRESIDENTIAL SUITE',
  philosophyQuote: 'Bold architectural drama anchored by deep Nero Marquina gold-veined marble.',
  colorPalette: [
    { name: 'Nero Marquina Gold', hex: '#1C1B1A', description: 'Deep dark marble with gold veining' },
    { name: 'Brushed Bronze (BV)', hex: '#8C6D46', description: 'Kohler Fluence tall lavatory brassware' },
    { name: 'Sveda Lite White', hex: '#FBFBFB', description: 'Ultra-slim vitreous vessel ceramic' },
    { name: 'Champagne Brass', hex: '#C7A870', description: 'Brushed metal chandelier rings' },
    { name: 'Curtain Wall Glazing', hex: '#B0C6CD', description: 'Full-height acoustic glass facade' },
  ],
  materials: [
    { name: 'Nero Marquina Gold Marble', category: 'Architectural Finish', sampleColor: '#1C1B1A', textureGradient: 'linear-gradient(135deg, #2B2A29 0%, #111010 100%)', finish: 'High-Gloss Gold-Veined Marble' },
    { name: 'Kohler Brushed Bronze (BV)', category: 'Products Finish', sampleColor: '#8C6D46', textureGradient: 'linear-gradient(135deg, #A88659 0%, #6E5331 100%)', finish: 'Directional Brushed PVD' },
    { name: 'Sveda Lite White China', category: 'Products Finish', sampleColor: '#FBFBFB', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #EBEBEB 100%)', finish: 'Ultra-Slim Vitreous Glaze' },
    { name: 'Brushed Satin Champagne Brass', category: 'Materials & Surfaces', sampleColor: '#C7A870', textureGradient: 'linear-gradient(135deg, #DBBE86 0%, #AC8C53 100%)', finish: 'Chandelier Ring Accents' },
    { name: 'Panorama Curtain Wall Glazing', category: 'Architectural Finish', sampleColor: '#B0C6CD', textureGradient: 'linear-gradient(135deg, #C2D5DB 0%, #99B2B9 100%)', finish: 'Low-E Acoustic Glass' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Anisotropic Marble Reflections', description: 'Surface micro-roughness calibrated for Nero Marquina marble floor and wall slabs.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KOHLER_VERTICAL_LAYOUTS_DESIGN_THINKING: DesignThinkingData = KOHLER_LAYOUT_1_DESIGN_THINKING;

export const KITCHEN_LAYOUT_1_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'VILLA 1: KOHLER MASTER WORKSTATION KITCHEN',
  tagline: 'NEOLITH CALACATTA • KOI MATTE BLACK • TASK NEOROC',
  philosophyQuote: 'A sophisticated culinary sanctuary harmonizing monolithic Neolith sintered marble, warm fluted walnut, and Kohler professional-grade workstation architecture.',
  colorPalette: [
    { name: 'Neolith Calacatta', hex: '#EBE5D8', description: 'Vein-cut sintered stone island slab' },
    { name: 'Fluted Walnut', hex: '#5C381E', description: 'Vertical acoustic ribbed woodwork' },
    { name: 'Matte Black (BL)', hex: '#1C1B1A', description: 'Kohler zero-gloss electroplated PVD' },
    { name: 'Neoroc Matte Black', hex: '#222325', description: 'Kohler composite stone sink basin' },
    { name: 'Warm LED 2700K', hex: '#FFE0A3', description: 'Integrated under-cabinet ambient wash' },
  ],
  materials: [
    { name: 'Kohler KOI Pulldown Faucet (BL)', category: 'Products Finish', sampleColor: '#1C1B1A', textureGradient: 'linear-gradient(135deg, #2B2A29 0%, #0F0E0E 100%)', finish: 'Matte Black w/ Glass Rinser (34861IN-4A-BL)' },
    { name: 'Kohler Task™ Neoroc® Offset Sink', category: 'Products Finish', sampleColor: '#222325', textureGradient: 'linear-gradient(135deg, #303236 0%, #17181A 100%)', finish: 'Neoroc® 34×18 Dbl Offset (32015IN-HNN-UM1)' },
    { name: 'Kohler Cuff RO Filtered Faucet', category: 'Products Finish', sampleColor: '#282726', textureGradient: 'linear-gradient(135deg, #383736 0%, #1A1918 100%)', finish: 'Matte Black Purifier FCT (45406IN-LA-BL)' },
    { name: 'Neolith Calacatta Roma Marble', category: 'Materials & Surfaces', sampleColor: '#EBE5D8', textureGradient: 'linear-gradient(135deg, #F5F1E8 0%, #DCD4C2 100%)', finish: 'Vein-Cut Sintered Island Stone' },
    { name: 'Fluted Natural Walnut Millwork', category: 'Architectural Finish', sampleColor: '#5C381E', textureGradient: 'repeating-linear-gradient(90deg, #6B4226, #442410 8px, #361C0C 16px)', finish: 'Acoustic Ribbed Woodwork' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Corona Photorealistic GI', description: 'Physically calculated global illumination, natural daylit kitchen windows, and warm ambient LED bounce.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KITCHEN_LAYOUT_2_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'VILLA 2: KOHLER CONTEMPORARY PLUM & QUARTZ KITCHEN',
  tagline: 'MALLECO TOUCHLESS • TASK NEOROC • CALACATTA WATERFALL',
  philosophyQuote: 'Striking contrast between deep plum cabinetry, seamless Calacatta waterfall island, and Kohler touchless mirror-chrome culinary tapware.',
  colorPalette: [
    { name: 'Calacatta Quartz', hex: '#ECE7DD', description: 'Honed waterfall island counter' },
    { name: 'Plum Satin Lacquer', hex: '#4A2A38', description: 'Velvet anti-fingerprint cabinetry' },
    { name: 'Polished Chrome (CP)', hex: '#D8DEE4', description: 'Mirror specular chrome fixtures' },
    { name: 'Neoroc Matte Black', hex: '#222325', description: 'Kohler composite stone sink basin' },
    { name: 'Shadowline LED 3000K', hex: '#FFF0D0', description: 'Diffused recessed channel lighting' },
  ],
  materials: [
    { name: 'Kohler Malleco Touchless Faucet (CP)', category: 'Products Finish', sampleColor: '#D8DEE4', textureGradient: 'linear-gradient(135deg, #F0F4F8 0%, #BAC5D0 100%)', finish: 'Mirror Specular Chrome (77748IN-4-CP)' },
    { name: 'Kohler Task™ Neoroc® Single Sink', category: 'Products Finish', sampleColor: '#222325', textureGradient: 'linear-gradient(135deg, #303236 0%, #17181A 100%)', finish: 'Neoroc® 30×18 Single Bowl (32018IN-HNN-UM1)' },
    { name: 'Kohler Angle Valve (CP)', category: 'Products Finish', sampleColor: '#C4CCD4', textureGradient: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)', finish: 'Polished Chrome PVD (80158IN-9AV-CP)' },
    { name: 'Calacatta Waterfall Quartz Island', category: 'Materials & Surfaces', sampleColor: '#ECE7DD', textureGradient: 'linear-gradient(135deg, #F8F6F2 0%, #DFD8CB 100%)', finish: 'Honed Seamless Sintered Slab' },
    { name: 'Matte Plum Velvet Lacquer', category: 'Architectural Finish', sampleColor: '#4A2A38', textureGradient: 'linear-gradient(135deg, #5B3446 0%, #361E29 100%)', finish: 'Anti-Fingerprint Satin Finish' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Corona Specular Reflections', description: 'Accurate Fresnel reflection curves on high-gloss stone island, chrome tapware, and velvety anti-glare lacquer.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
  ],
};

export const KITCHEN_BEAM_FAUCET_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'SOFT STONE · SCULPTED LIGHT KITCHEN',
  tagline: 'COOK · GATHER · UNWIND',
  philosophyQuote: 'A contemporary kitchen design that blends warm stone, refined textures and sculptural lighting to create a sophisticated and inviting space. Calm, functional and timeless.',
  colorPalette: [
    { name: 'Ivory White', hex: '#EFEFEA', description: 'Soft architectural perimeter wash' },
    { name: 'Limestone Beige', hex: '#D7C4A7', description: 'Honed limestone backsplash undertone' },
    { name: 'Champagne Cream', hex: '#D1BCA0', description: 'Warm ambient shelf and cove lighting' },
    { name: 'Mushroom Taupe', hex: '#9E8779', description: 'Velvet matte cabinetry lacquer finish' },
    { name: 'Walnut Brown', hex: '#563B23', description: 'Architectural fluted island woodwork' },
    { name: 'Polished Chrome', hex: '#C8C8C8', description: 'Kohler Beam precision tapware' },
    { name: 'Deep Brown Stone', hex: '#47372E', description: 'Veined natural stone island worktop' },
  ],
  materials: [
    { name: 'Horizontal Stone Backsplash', category: 'Materials & Surfaces', sampleColor: '#D7C4A7', textureGradient: 'linear-gradient(90deg, #E2D3BE 0%, #C9B596 100%)', finish: 'Honed Travertine Slab' },
    { name: 'Veined Stone Countertop', category: 'Materials & Surfaces', sampleColor: '#DFD5C4', textureGradient: 'linear-gradient(135deg, #EFE8DC 0%, #C8BAA3 100%)', finish: 'Natural Calacatta Marble' },
    { name: 'Taupe Cabinet Finish', category: 'Architectural Finish', sampleColor: '#9E8779', textureGradient: 'linear-gradient(135deg, #B29B8C 0%, #836E61 100%)', finish: 'Velvet Matte Lacquer' },
    { name: 'Fluted Wood Detail', category: 'Architectural Finish', sampleColor: '#563B23', textureGradient: 'repeating-linear-gradient(90deg, #6B492C, #432E1B 8px, #352314 16px)', finish: 'Satin Fluted Walnut' },
    { name: 'Natural Stone Island Surface', category: 'Materials & Surfaces', sampleColor: '#47372E', textureGradient: 'linear-gradient(135deg, #5A473C 0%, #352820 100%)', finish: 'Veined Monolithic Quartzite' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Sculptural Zigzag Luminaire', description: 'Custom architectural angular LED pendant delivering calibrated 3000K balanced illumination across the island.' },
    { icon: 'Layers', title: 'Honed Stone & Walnut Fluting', description: 'Horizontal layered stone wall claddings contrasted against dark brown marble waterfall edge and fluted acoustic timber.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Warm Sculpted Light' },
    { icon: 'Layers', label: 'Honed Stone & Walnut' },
  ],
};

export const KITCHEN_CP_FAUCET_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'MODERN · REFINED · FUNCTIONAL KITCHEN',
  tagline: 'PREPARE · COOK · CONNECT',
  philosophyQuote: 'A perfect balance of clean design, natural textures and timeless finishes for a sophisticated everyday kitchen.',
  colorPalette: [
    { name: 'Warm White', hex: '#F2EDE4', description: 'Luminous perimeter base cabinetry' },
    { name: 'Stone Beige', hex: '#C9BCAB', description: 'Honed limestone countertop undertone' },
    { name: 'Sage Grey', hex: '#8B9485', description: 'Soft muted botanical grey accent' },
    { name: 'Taupe', hex: '#9B897B', description: 'Warm architectural neutral finish' },
    { name: 'Charcoal', hex: '#3C3C3A', description: 'Dark stone fluted backsplash' },
    { name: 'Wood Oak', hex: '#A67C52', description: 'Natural timber prep cutting board' },
    { name: 'Stainless Steel', hex: '#C4C6C8', description: 'High-grade undermount workstation basin' },
  ],
  materials: [
    { name: 'Marble Effect Countertop', category: 'Materials & Surfaces', sampleColor: '#EBE5D8', textureGradient: 'linear-gradient(135deg, #F6F2EC 0%, #DDD5C6 100%)', finish: 'Veined Honed Marble Sintered Slab' },
    { name: 'Dark Stone Backsplash', category: 'Materials & Surfaces', sampleColor: '#3C3C3A', textureGradient: 'linear-gradient(135deg, #4A4A48 0%, #292928 100%)', finish: 'Honed Charcoal Slate' },
    { name: 'Fluted Panel Detail', category: 'Architectural Finish', sampleColor: '#B5A593', textureGradient: 'repeating-linear-gradient(90deg, #C2B3A2, #9E8E7D 6px, #8A7A6A 12px)', finish: 'Vertical Fluted Millwork' },
    { name: 'Matte Cabinet Finish', category: 'Architectural Finish', sampleColor: '#9B897B', textureGradient: 'linear-gradient(135deg, #AE9C8E 0%, #827265 100%)', finish: 'Anti-Fingerprint Velvet Matte' },
    { name: 'Natural Wood Accents', category: 'Materials & Surfaces', sampleColor: '#A67C52', textureGradient: 'linear-gradient(180deg, #BA8D5F 0%, #87623B 100%)', finish: 'Solid Oak Prep Board' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Fluted Graphite Backsplash Contrast', description: 'Striking dark vertical ribbed stone backsplash contrasting crisp white veined marble counters.' },
    { icon: 'Layers', title: 'Workstation Basin & Accessories', description: 'Integrated multi-tier stainless steel sink with sliding accessories, dish rack, and high-arch CP pull-down faucet.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Feather', label: 'Modern & Minimal' },
    { icon: 'Layers', label: 'Fluted Stone Texture' },
  ],
};

export const KITCHEN_WALNUT_WARMTH_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'WALNUT WARMTH · NATURAL LIGHT KITCHEN',
  tagline: 'COOK · GATHER · CREATE · BELONG',
  philosophyQuote: 'A modern kitchen that brings together rich walnut textures, refined detailing and abundant natural light — creating a warm, functional and inviting space for everyday living.',
  colorPalette: [
    { name: 'Walnut Brown', hex: '#7B4B27', description: 'Rich deep-grain solid walnut worktop' },
    { name: 'Charcoal Grey', hex: '#3E4244', description: 'Modern classic paneled base cabinetry' },
    { name: 'Warm Beige', hex: '#D7C5B2', description: 'Soft radiant natural plaster wall wash' },
    { name: 'Taupe', hex: '#957E70', description: 'Warm transitional earthen shadow tone' },
    { name: 'Off White', hex: '#F4F1EA', description: 'Calacatta marble flooring base accent' },
    { name: 'Brushed Steel', hex: '#C3C5C7', description: 'Kohler 301810 single workstation basin' },
  ],
  materials: [
    { name: 'Walnut Wood Worktop', category: 'Materials & Surfaces', sampleColor: '#7B4B27', textureGradient: 'linear-gradient(180deg, #8E582F 0%, #5F3719 100%)', finish: 'Solid Edge-Grain Natural Walnut' },
    { name: 'Paneled Cabinetry Texture', category: 'Architectural Finish', sampleColor: '#3E4244', textureGradient: 'linear-gradient(135deg, #4F5456 0%, #292B2D 100%)', finish: 'Charcoal Shaker Profile Lacquer' },
    { name: 'Marble Flooring Accent', category: 'Materials & Surfaces', sampleColor: '#EBE7DF', textureGradient: 'linear-gradient(135deg, #F8F5EF 0%, #D8D2C6 100%)', finish: 'Veined Honed Calacatta Marble' },
    { name: 'Stainless Steel Finish', category: 'Products Finish', sampleColor: '#C3C5C7', textureGradient: 'linear-gradient(135deg, #DCE0E3 0%, #9DA1A4 100%)', finish: '16-Gauge Satin Stainless (301810)' },
    { name: 'Natural Light Glazing', category: 'Architectural Finish', sampleColor: '#B0C2D0', textureGradient: 'linear-gradient(135deg, #D4E4F0 0%, #8BA4B8 100%)', finish: 'Low-E Acoustic Casement Window' },
  ],
  keyFeatures: [
    { icon: 'Sun', title: 'Abundant Natural Daylighting', description: 'Expansive casement bay window casting realistic directional sunbeams across warm walnut wood grain.' },
    { icon: 'Layers', title: 'Kohler 301810 Workstation Sink', description: 'Spacious undermount single bowl stainless sink paired with dual-mount pull-down faucet and prep accessories.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Natural Sunlight' },
    { icon: 'Heart', label: 'Walnut Warmth' },
  ],
};

export const KITCHEN_IVORY_STONE_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'IVORY STONE · NATURAL CALM KITCHEN',
  tagline: 'BRIGHT · AIRY · INVITING',
  philosophyQuote: 'A refined kitchen design that brings together natural textures, clean lines and timeless elegance. Bright, airy and inviting — crafted for everyday living.',
  colorPalette: [
    { name: 'Ivory White', hex: '#F7F5F0', description: 'Continuous veined marble waterfall slab' },
    { name: 'Stone Beige', hex: '#D9CEBE', description: 'Warm architectural limestone floor' },
    { name: 'Warm Greige', hex: '#BAAEA0', description: 'Soft pale grey-taupe cabinetry finish' },
    { name: 'Taupe Grey', hex: '#8E847C', description: 'Refined neutral shadowline profile' },
    { name: 'Natural Oak', hex: '#B89369', description: 'Wide-plank Scandinavian timber flooring' },
    { name: 'Sage Green', hex: '#7D8877', description: 'Fresh culinary botanical accent' },
  ],
  materials: [
    { name: 'Veined Stone Countertop', category: 'Materials & Surfaces', sampleColor: '#EDE7DC', textureGradient: 'linear-gradient(135deg, #F9F7F2 0%, #D8CFC1 100%)', finish: 'Seamless Veined Waterfall Marble' },
    { name: 'Brushed Stainless Steel', category: 'Products Finish', sampleColor: '#C5C9CD', textureGradient: 'linear-gradient(135deg, #DCE1E5 0%, #9FA5AA 100%)', finish: 'Kohler 241810 SilentShield Damped' },
    { name: 'Natural Oak Flooring', category: 'Materials & Surfaces', sampleColor: '#B89369', textureGradient: 'linear-gradient(180deg, #CAAA80 0%, #9E7951 100%)', finish: 'Wide-Plank European White Oak' },
    { name: 'Pale Grey Cabinetry', category: 'Architectural Finish', sampleColor: '#BAAEA0', textureGradient: 'linear-gradient(135deg, #CCC2B6 0%, #9F9386 100%)', finish: 'Ultra-Smooth Satin Enamel' },
    { name: 'Fluted Panel Detail', category: 'Architectural Finish', sampleColor: '#E2DDD4', textureGradient: 'repeating-linear-gradient(90deg, #EFECE6, #D4CCC0 6px, #BEB5A7 12px)', finish: 'Vertical Fluted Island Wrap' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'SilentShield™ Acoustic Damping', description: 'Sound-absorption technology engineered into the Kohler 241810 stainless workstation sink to reduce disposal vibration and water clang.' },
    { icon: 'Sun', title: 'Luminous Daylight & Fluted Marble', description: 'Soft directional sunlight highlighting continuous marble waterfall grain and vertical fluted island paneling.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Bright & Airy' },
    { icon: 'Layers', label: 'SilentShield 241810' },
  ],
};

export const KITCHEN_LAYOUT_5_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'NATURE IN EVERYDAY LIVING KITCHEN',
  tagline: 'NATURAL TONES • CLEAN LINES • TACTILE SURFACES',
  philosophyQuote: 'A contemporary kitchen design that blends natural tones, clean lines and tactile surfaces to create a warm, functional and timeless space.',
  colorPalette: [
    { name: 'Olive Green', hex: '#737C4A', description: 'Soft muted earthy cabinet finish' },
    { name: 'Warm White', hex: '#EDEAE3', description: 'Crisp plaster perimeter wall wash' },
    { name: 'Soft Greige', hex: '#9B8F82', description: 'Warm neutral transition tone' },
    { name: 'Stainless Steel', hex: '#B8BCBE', description: 'Kohler 362010 double bowl workstation basin' },
    { name: 'Natural Wood', hex: '#C59F74', description: 'Solid oak culinary prep cutting board' },
    { name: 'Charcoal', hex: '#323334', description: 'Dark vertical fluted backsplash' },
  ],
  materials: [
    { name: 'Terrazzo Effect Countertop', category: 'Materials & Surfaces', sampleColor: '#D6D3CC', textureGradient: 'linear-gradient(135deg, #E6E3DC 0%, #C4BEB5 100%)', finish: 'Honed Terrazzo Composite Slab' },
    { name: 'Olive Green Cabinet Finish', category: 'Architectural Finish', sampleColor: '#737C4A', textureGradient: 'linear-gradient(135deg, #858E58 0%, #5D6539 100%)', finish: 'Velvet Matte Anti-Fingerprint' },
    { name: 'Fluted Backsplash', category: 'Architectural Finish', sampleColor: '#323334', textureGradient: 'repeating-linear-gradient(90deg, #3E4042, #242526 8px, #18191A 16px)', finish: 'Vertical Fluted Charcoal Profile' },
    { name: 'Brushed Stainless Finish', category: 'Products Finish', sampleColor: '#B8BCBE', textureGradient: 'linear-gradient(135deg, #D4D8DB 0%, #9DA1A4 100%)', finish: '16-Gauge Satin Stainless (362010)' },
    { name: 'Natural Wood Accents', category: 'Materials & Surfaces', sampleColor: '#C59F74', textureGradient: 'linear-gradient(180deg, #D4AF85 0%, #A68058 100%)', finish: 'Solid Oak Culinary Board' },
  ],
  keyFeatures: [
    { icon: 'Layers', title: 'Task™ 362010 Double Workstation', description: 'Spacious dual-bowl 36×20 undermount sink with integrated sliding colander, dish rack, and custom bamboo prep accessories.' },
    { icon: 'Sparkles', title: 'SilentShield™ Sound Dampening', description: 'Engineered multi-layer absorption pads eliminating water impact noise and garbage disposal vibrations.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Nature in Everyday Living' },
    { icon: 'Layers', label: 'Task™ 362010 Double' },
  ],
};

export const KITCHEN_LAYOUT_6_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'MIDNIGHT STONE · GOLDEN ACCENTS KITCHEN',
  tagline: 'ENTERTAIN · CONNECT · UNWIND',
  philosophyQuote: 'A sophisticated entertaining space that combines dramatic dark tones, luxurious stone surfaces and refined golden details. Designed for modern living, where functionality meets understated elegance.',
  colorPalette: [
    { name: 'Matte Black', hex: '#141518', description: 'Zero-gloss seamless cabinetry lacquer' },
    { name: 'Midnight Navy', hex: '#222D3E', description: 'Deep architectural hospitality hue' },
    { name: 'Marble White', hex: '#E8E4DD', description: 'Dramatic vein-cut marble floor' },
    { name: 'Antique Gold', hex: '#C39E65', description: 'Precision brushed metal handles & trim' },
    { name: 'Smoky Grey', hex: '#6B6B6D', description: 'Sculptural fluted lounge textiles' },
  ],
  materials: [
    { name: 'Matte Black Cabinet Finish', category: 'Architectural Finish', sampleColor: '#141518', textureGradient: 'linear-gradient(135deg, #222326 0%, #0D0E0F 100%)', finish: 'Zero-Gloss Velvet Lacquer' },
    { name: 'Gold Accent Wall Detail', category: 'Architectural Finish', sampleColor: '#C39E65', textureGradient: 'radial-gradient(circle, #D8B77E 20%, #A68045 80%)', finish: 'Polished Brass Micro-Perforations' },
    { name: 'Dramatic Marble Floor', category: 'Materials & Surfaces', sampleColor: '#E8E4DD', textureGradient: 'linear-gradient(135deg, #F5F2EB 0%, #C9C4B9 100%)', finish: 'Bookmatched Polished Marble' },
    { name: 'Stone Countertop', category: 'Materials & Surfaces', sampleColor: '#2A2B2D', textureGradient: 'linear-gradient(135deg, #3A3B3E 0%, #1A1B1D 100%)', finish: 'Honed Black Granite Slab' },
    { name: 'Brushed Metal Detail', category: 'Products Finish', sampleColor: '#C39E65', textureGradient: 'linear-gradient(90deg, #D4AF74 0%, #A88145 100%)', finish: 'Directional Brushed Champagne Brass' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Hospitality Bar & Wine Presentation', description: 'Integrated wine stemware display, recessed LED task glow, and dramatic black granite bar prep surfaces.' },
    { icon: 'Box', title: 'Authentic C4D Wireframe Proof', description: 'Native Cinema 4D viewport capture confirming clean quad subdivision and physically accurate lighting rig.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Midnight Luxury' },
    { icon: 'Sparkles', label: 'Hospitality Bar Suite' },
  ],
};

export const KITCHEN_LAYOUT_7_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'NATURE INSPIRED LIVING KITCHEN',
  tagline: 'EARTHY TONES • NATURAL STONE • TIMELESS CALM',
  philosophyQuote: 'A modern kitchen design that brings together natural textures, earthy tones and refined materials to create a warm, functional and timeless space. Clean lines, thoughtful details and a calming palette inspired by nature.',
  colorPalette: [
    { name: 'Olive Green', hex: '#6D7246', description: 'Soft earthy perimeter cabinetry' },
    { name: 'Ivory White', hex: '#EBE7DE', description: 'Honed marble backsplash tone' },
    { name: 'Warm Beige', hex: '#C3B39C', description: 'Natural limestone undertones' },
    { name: 'Greige Taupe', hex: '#8E8171', description: 'Muted shadow transition neutral' },
    { name: 'Natural Oak', hex: '#A57E52', description: 'Wide herringbone parquet timber floor' },
    { name: 'Charcoal Black', hex: '#373735', description: 'Integrated undermount sink basin' },
  ],
  materials: [
    { name: 'Terrazzo Stone Countertop', category: 'Materials & Surfaces', sampleColor: '#D7D3CA', textureGradient: 'linear-gradient(135deg, #E6E2D9 0%, #C8C3B8 100%)', finish: 'Cast Terrazzo Waterfall Island' },
    { name: 'White Veined Marble', category: 'Materials & Surfaces', sampleColor: '#EBE7DE', textureGradient: 'linear-gradient(135deg, #F7F4EC 0%, #D8D2C4 100%)', finish: 'Honed Calacatta Marble Backsplash' },
    { name: 'Olive Green Cabinet Finish', category: 'Architectural Finish', sampleColor: '#6D7246', textureGradient: 'linear-gradient(135deg, #7F8553 0%, #575B37 100%)', finish: 'Satin Earthy Enamel' },
    { name: 'Natural Oak Wood', category: 'Materials & Surfaces', sampleColor: '#A57E52', textureGradient: 'linear-gradient(180deg, #B88F61 0%, #876239 100%)', finish: 'Herringbone Architectural Parquet' },
    { name: 'Fluted Texture Panel', category: 'Architectural Finish', sampleColor: '#E0DBD1', textureGradient: 'repeating-linear-gradient(90deg, #ECE8DF, #D2CCC1 6px, #BEB7AB 12px)', finish: 'Vertical Fluted Island Wrap' },
  ],
  keyFeatures: [
    { icon: 'Sun', title: 'Biophilic Natural Daylighting', description: 'Direct sunlight streaming through floor-to-ceiling garden glazing illuminating cast terrazzo textures.' },
    { icon: 'Layers', title: 'Monolithic Terrazzo Waterfall', description: 'Continuous cast stone island waterfall with integrated architectural fluted wood wrap.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Nature Inspired' },
    { icon: 'Layers', label: 'Terrazzo Waterfall' },
  ],
};

export const KITCHEN_LAYOUT_8_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'SMOKED OAK · CHARCOAL CONTRAST KITCHEN',
  tagline: 'COOK · GATHER · UNWIND',
  philosophyQuote: 'A refined kitchen aesthetic that blends natural wood, charcoal tones and warm lighting to create a sophisticated yet inviting space. Clean lines, rich textures and timeless materials for modern living.',
  colorPalette: [
    { name: 'Smoked Oak', hex: '#A9865B', description: 'Rich vertical grain architectural timber' },
    { name: 'Charcoal Black', hex: '#313133', description: 'Ultra-deep stone countertops and basin' },
    { name: 'Warm Greige', hex: '#9E9180', description: 'Refined earthen architectural finish' },
    { name: 'Soft Ivory', hex: '#EDE9DF', description: 'Natural ambient stone wash' },
    { name: 'Graphite Stone', hex: '#4B4C50', description: 'Veined dark granite island slab' },
    { name: 'Brushed Steel', hex: '#C2C5C8', description: 'Minimalist Kohler pull-down tapware' },
  ],
  materials: [
    { name: 'Natural Oak Wood Grain', category: 'Materials & Surfaces', sampleColor: '#A9865B', textureGradient: 'linear-gradient(180deg, #BC9768 0%, #8C6C44 100%)', finish: 'Smoked Rift-Cut Oak Veneer' },
    { name: 'Charcoal Matte Cabinet Finish', category: 'Architectural Finish', sampleColor: '#313133', textureGradient: 'linear-gradient(135deg, #3E3E41 0%, #202022 100%)', finish: 'Anti-Fingerprint Velvet Matte' },
    { name: 'Dark Stone Countertop', category: 'Materials & Surfaces', sampleColor: '#4B4C50', textureGradient: 'linear-gradient(135deg, #5A5B60 0%, #353638 100%)', finish: 'Fine-Veined Graphite Quartzite' },
    { name: 'Vertical Wood Fluting Detail', category: 'Architectural Finish', sampleColor: '#A9865B', textureGradient: 'repeating-linear-gradient(90deg, #BD996B, #8F6F47 6px, #7A5C38 12px)', finish: 'Acoustic Fluted Wall Slatting' },
    { name: 'Brushed Metal Accents', category: 'Products Finish', sampleColor: '#C2C5C8', textureGradient: 'linear-gradient(135deg, #DCE0E3 0%, #9CA0A4 100%)', finish: 'Precision Electroplated Nickel' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Smoked Oak & Charcoal Contrast', description: 'Bold material duality pairing smoked oak millwork with matte charcoal stone and concealed 2700K LED wash.' },
    { icon: 'Box', title: 'Authentic C4D Wireframe Proof', description: 'Cinema 4D viewport wireframe verifying native quad geometry, camera focal length, and lighting setup.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sun', label: 'Smoked Oak' },
    { icon: 'Layers', label: 'Charcoal Contrast' },
  ],
};

export const BLACK_DECKER_WASHER_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'BLACK+DECKER INDUSTRIAL ENGINEERING',
  tagline: 'PRECISION DRUM • DIRECT DRIVE • INTUITIVE TOUCH',
  philosophyQuote: 'True engineering beauty lies beneath the surface—where mechanical precision powers everyday effortless living.',
  colorPalette: [
    { name: 'Gunmetal Gray', hex: '#3B3E45', description: 'Powder-coated anodized chassis' },
    { name: 'Obsidian Tint Glass', hex: '#16181D', description: 'Smoked tempered inspection door' },
    { name: 'Brushed Stainless', hex: '#C4C8D0', description: 'Micro-perforated drum steel' },
    { name: 'Electric Cyan LED', hex: '#06B6D4', description: 'Digital UI mode indicators' },
    { name: 'Copper Motor Winding', hex: '#B87333', description: 'Direct-drive stator coils' },
  ],
  materials: [
    { name: 'Anodized Steel Body', category: 'Chassis Finish', sampleColor: '#3B3E45', textureGradient: 'linear-gradient(135deg, #4B4F58 0%, #292B30 100%)', finish: 'Satin Powder Coat' },
    { name: 'Tempered Smoked Glass', category: 'Door Assembly', sampleColor: '#16181D', textureGradient: 'linear-gradient(135deg, #242830 0%, #0D0E11 100%)', finish: 'Anti-Reflective Optical Glass' },
    { name: 'Micro-Perforated Stainless', category: 'Drum Cavity', sampleColor: '#C4C8D0', textureGradient: 'radial-gradient(circle, #D8DCE4 30%, #A2A6AE 100%)', finish: 'Diamond-Embossed Steel' },
    { name: 'Direct-Drive Induction Core', category: 'Internal Mechanics', sampleColor: '#B87333', textureGradient: 'linear-gradient(90deg, #D48943 0%, #8E521E 100%)', finish: 'Precision Wound Copper Stator' },
  ],
  keyFeatures: [
    { icon: 'Cpu', title: 'Exploded Mechanical Cutaway', description: 'Sub-millimeter 3D internal visualization revealing shock dampers, outer tub, direct-drive stator, and counterweights.' },
    { icon: 'Sliders', title: 'Intuitive Haptic Dial', description: 'Micro-chamfered aluminum rotary dial with integrated capacitive LED display and brushed texture finish.' },
    { icon: 'Box', title: 'Cinema 4D Viewport Proof', description: 'Full native DCC viewport screen capture verifying complex quad topology, camera rig, and procedural shaders (Not AI).' },
  ],
  coreAttributes: [
    { icon: 'Cpu', label: 'Mechanical Cutaway' },
    { icon: 'Box', label: 'Cinema 4D Viewport' },
    { icon: 'Sparkles', label: 'Direct Drive Inverter' },
    { icon: 'Layers', label: 'Corona Photoreal GI' },
  ],
};

export const KOHLER_FORE_FAUCET_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'KOHLER FORE™ MONOLITHIC TAPWARE',
  tagline: 'PURITY OF FORM • AERODYNAMIC PRECISION',
  philosophyQuote: 'Monolithic volumes and aerodynamic arcs converge to redefine the modern bathroom centerpiece.',
  colorPalette: [
    { name: 'Specular Chrome', hex: '#E2E6EA', description: 'High-reflectivity polished chrome finish' },
    { name: 'Pure White Ceramic', hex: '#F8F9FA', description: 'Vitreous china vessel basin backdrop' },
    { name: 'Deep Reflection Shadow', hex: '#1A1C20', description: 'Accented Fresnel contrast falloff' },
    { name: 'Polished Brass Core', hex: '#D4AF37', description: 'Forged solid brass internal body' },
  ],
  materials: [
    { name: 'Kohler Polished Chrome (CP)', category: 'Products Finish', sampleColor: '#E2E6EA', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #C8CDD2 50%, #9DA3AA 100%)', finish: 'Electroplated Mirror Chrome' },
    { name: 'Solid Forged Brass Core', category: 'Internal Casting', sampleColor: '#D4AF37', textureGradient: 'linear-gradient(135deg, #F0CA50 0%, #A8831A 100%)', finish: 'Dezincification-Resistant Brass' },
    { name: 'Ceramic Disc Cartridge', category: 'Precision Mechanics', sampleColor: '#ECEFF1', textureGradient: 'linear-gradient(135deg, #F5F7F8 0%, #CFD8DC 100%)', finish: 'Diamond-Hard Ceramic Surface' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Monolithic Neo-Modern Profile', description: 'Seamless single-piece body eliminating visible parting lines and maximizing metallic specular reflections.' },
    { icon: 'Layers', title: 'Integrated Concealed Aerator', description: 'Flush-mounted laminar flow regulator producing an ultra-clear, splash-free water column.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sparkles', label: 'Polished Chrome CP' },
    { icon: 'Layers', label: 'NURBS to SubD Mesh' },
  ],
};

export const KOHLER_MLE_FAUCET_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'KOHLER MODERNLIFE EDGE™ (MLE)',
  tagline: 'FLOATING HANDLE • SLENDER SPOUT • ZERO EXCESS',
  philosophyQuote: 'By repositioning the control lever to the rear, the slender spout floats weightlessly above the countertop.',
  colorPalette: [
    { name: 'High-Luster Chrome', hex: '#E6E9ED', description: 'Mirror chrome PVD surface' },
    { name: 'Graphite Shadow', hex: '#2C3038', description: 'Studio cyclorama contrast baseline' },
    { name: 'Neutral Studio Gray', hex: '#7E8694', description: '3-point softbox grazing fill' },
  ],
  materials: [
    { name: 'Polished Chrome PVD', category: 'Products Finish', sampleColor: '#E6E9ED', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #CCD1D9 50%, #AAB2BD 100%)', finish: 'Corrosion-Resistant PVD' },
    { name: 'Micro-Bevel Edge Detailing', category: 'Hard-Surface Geometry', sampleColor: '#CCD1D9', textureGradient: 'linear-gradient(90deg, #E6E9ED 0%, #99A2AD 100%)', finish: 'Sub-Millimeter Edge Radius' },
  ],
  keyFeatures: [
    { icon: 'Sliders', title: 'Rear-Mounted Floating Lever', description: 'Innovative architectural lever geometry engineered for effortless tactile operation and easy basin cleaning.' },
    { icon: 'Box', title: 'Multi-Angle Turntable Study', description: 'Precision 360-degree rotation angles capturing reflection gradients across slender edges.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D' },
    { icon: 'Sparkles', label: 'Corona Renderer' },
    { icon: 'Layers', label: 'Turntable Series' },
  ],
};

export const KOHLER_MLE_DECO_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'UNTAMED NATURE · ART DECO LUXURY',
  tagline: 'BOTANICAL FLOW • LASER DISPLACEMENT • TIMELESS GRACE',
  philosophyQuote: 'Interweaving organic botanical vines into sharp architectural chrome turns an everyday fixture into an art piece.',
  colorPalette: [
    { name: 'Mirrored Chrome', hex: '#EAECEF', description: 'High-specular chrome base' },
    { name: 'Laser-Etched Anthracite', hex: '#34373E', description: 'Recessed floral botanical pattern' },
    { name: 'Calacatta White Vein', hex: '#F3F4F6', description: 'Veined marble countertop setting' },
    { name: 'Warm Greige Stone', hex: '#C2B8A8', description: 'Soft ambient vanity wash' },
  ],
  materials: [
    { name: 'Etched Polished Chrome', category: 'Products Finish', sampleColor: '#EAECEF', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #C4C8D0 50%, #8A909A 100%)', finish: 'Sub-Surface Laser Engraved' },
    { name: 'Laser Displacement Map', category: 'Surface Shaders', sampleColor: '#34373E', textureGradient: 'repeating-linear-gradient(45deg, #4A4E58, #2A2C32 4px, #3A3D46 8px)', finish: 'Micro-Relief Floral Detail' },
    { name: 'Calacatta Gold Quartzite', category: 'Architectural Context', sampleColor: '#F3F4F6', textureGradient: 'linear-gradient(135deg, #FAF8F5 0%, #E6E2D8 100%)', finish: 'Honed Matte Slab' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Laser-Etched Botanical Motifs', description: 'High-fidelity normal and displacement texture mapping capturing the delicate botanical filigree of Untamed Nature.' },
    { icon: 'Layers', title: 'Luxury Architectural Setting', description: 'Staged against vein-matched Calacatta marble and warm acoustic slatting for high-end hospitality catalogs.' },
  ],
  coreAttributes: [
    { icon: 'Sparkles', label: 'Laser-Etched Deco' },
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Layers', label: 'Hospitality Stills' },
  ],
};

export const KOHLER_MIRRORS_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'LIGHT, SHAPED BY DESIGN · MIRRORS',
  tagline: 'DIFFUSED ILLUMINATION • PURE GEOMETRY • AMBIENT GLOW',
  philosophyQuote: 'A mirror should not simply reflect a room; it should sculpt and illuminate the architecture around it.',
  colorPalette: [
    { name: 'Ultra-Clear Silver Glass', hex: '#ECEFF2', description: 'Optically pure silvered mirror surface' },
    { name: '3000K Halo Warmth', hex: '#FDE68A', description: 'Perimeter diffused LED luminescence' },
    { name: 'Matte Black Anodized', hex: '#23252A', description: 'Ultra-thin perimeter silhouette frame' },
    { name: 'Slate Gray Wall Plaster', hex: '#4A4E57', description: 'Textured backdrop capturing gradient light falloff' },
  ],
  materials: [
    { name: 'Optically Pure Silver Mirror', category: 'Optical Surfaces', sampleColor: '#ECEFF2', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #D8DDE3 100%)', finish: 'High-Clarity Silver Backing' },
    { name: 'Edge-Lit Silicone Diffuser', category: 'Illumination', sampleColor: '#FDE68A', textureGradient: 'radial-gradient(circle, #FFFBEB 20%, #FCD34D 100%)', finish: 'Seamless 90+ CRI LED Strip' },
    { name: 'Slim Anodized Aluminum Rim', category: 'Frame Material', sampleColor: '#23252A', textureGradient: 'linear-gradient(135deg, #32353C 0%, #17181B 100%)', finish: 'Micro-Bead Matte Black' },
  ],
  keyFeatures: [
    { icon: 'Sun', title: 'Three Architectural Silhouettes', description: 'Arched, Pill, and Rectangular forms designed to integrate with varied luxury vanity heights and spatial widths.' },
    { icon: 'Sparkles', title: 'Calibrated LightMix Glow', description: 'Physically accurate volumetric light falloff across textured plaster walls calibrated to 3000K daylight-balanced warmth.' },
  ],
  coreAttributes: [
    { icon: 'Sun', label: 'Edge-Lit LED' },
    { icon: 'Box', label: 'Corona LightMix' },
    { icon: 'Layers', label: '3 Silhouettes' },
  ],
};

export const KOHLER_SCULPTED_CHROME_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'SCULPTED CHROME TOUCHLESS ARCHITECTURE',
  tagline: 'FLUID ARCHITECTURE • TOUCHLESS INTELLIGENCE • PURE POLISH',
  philosophyQuote: 'Fluid transitions eliminate harsh seamlines, turning an electronic commercial faucet into an organic sculpture.',
  colorPalette: [
    { name: 'Mirror Polished Chrome', hex: '#E4E7EB', description: 'Seamless fluid chrome casing' },
    { name: 'Deep Studio Shadow', hex: '#1C1F26', description: 'Controlled cyclorama reflection gradients' },
    { name: 'Infrared Sensor Obsidian', hex: '#111215', description: 'Insight™ adaptive optical sensor window' },
  ],
  materials: [
    { name: 'Vandal-Resistant Brass Shell', category: 'Products Finish', sampleColor: '#E4E7EB', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #CBD0D6 50%, #9CA2AB 100%)', finish: 'Heavy-Duty Commercial Chrome' },
    { name: 'Insight™ Infrared Optical Sensor', category: 'Electronics & Sensing', sampleColor: '#111215', textureGradient: 'linear-gradient(135deg, #1F2128 0%, #0A0A0C 100%)', finish: 'IR-Transparent Polycarbonate' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Seamless Organic Curvature', description: 'Subdivision-modeled fluid spout and body designed to channel water cleanly while resisting commercial wear.' },
    { icon: 'Cpu', title: 'Integrated Insight™ Sensor', description: 'Adaptive infrared sensor integration positioned unobtrusively under the spout for touchless hygienic activation.' },
  ],
  coreAttributes: [
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Sparkles', label: 'Polished Chrome' },
    { icon: 'Cpu', label: 'Touchless Tech' },
  ],
};

export const QUEO_BASIN_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'QUEO EUROPEAN LUXURY CERAMIC BASIN',
  tagline: 'EUROPEAN FINESSE • ORGANIC CONTOURS • RADIANT GLAZE',
  philosophyQuote: 'Crafted with European restraint, where subtle ceramic curvature elevates water from a utility to a sensory ritual.',
  colorPalette: [
    { name: 'Alpine High-Gloss White', hex: '#F9FAFB', description: 'Super-smooth stain-resistant ceramic glaze' },
    { name: 'Veined Marble Taupe', hex: '#B8A898', description: 'Warm vanity slab undertones' },
    { name: 'Brushed Brass Accent', hex: '#D4AF37', description: 'Complementary designer tapware' },
    { name: 'Ambient Slate Shadow', hex: '#2D3139', description: 'Controlled studio environment occlusion' },
  ],
  materials: [
    { name: 'Fine Vitreous Ceramic China', category: 'Ceramic Body', sampleColor: '#F9FAFB', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E8EBEE 100%)', finish: 'Dense Structural Vitreous China' },
    { name: 'Super-Smooth Hydro-Glaze', category: 'Surface Finish', sampleColor: '#FFFFFF', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F2F5 100%)', finish: 'Ultra-Gloss Anti-Microbial Glaze' },
    { name: 'Honed Natural Stone Vanity', category: 'Architectural Context', sampleColor: '#B8A898', textureGradient: 'linear-gradient(135deg, #CBBDB0 0%, #A39382 100%)', finish: 'Vein-Cut Travertine' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Sculpted Organic Vessel Contour', description: 'Smooth, flowing outline with delicate rim tapering designed for luxury hospitality and presidential suites.' },
    { icon: 'Layers', title: 'High-Gloss Physical SSS Shader', description: 'Custom subsurface scattering material setup in Corona simulating deep light absorption of authentic European glaze.' },
  ],
  coreAttributes: [
    { icon: 'Sparkles', label: 'QUEO Ceramic' },
    { icon: 'Box', label: 'Corona Physical SSS' },
    { icon: 'Layers', label: 'Luxury Vanity' },
  ],
};

export const LUXURY_WC_SUITE_DESIGN_THINKING: DesignThinkingData = {
  conceptTitle: 'MINIMALIST RIMLESS WALL-HUNG WC',
  tagline: 'FLOATING VOLUME • RIMLESS HYGIENE • SEAMLESS CONTOURS',
  philosophyQuote: 'Ergonomic comfort concealed within an unblemished, floating monolithic silhouette.',
  colorPalette: [
    { name: 'Gloss White Porcelain', hex: '#FAFAFB', description: 'High-density glazed ceramic' },
    { name: 'Slate Gray Wall Tile', hex: '#4B515C', description: 'Textured architectural backplate' },
    { name: 'Brushed Actuator Steel', hex: '#B4B9C2', description: 'Concealed cistern dual-flush plate' },
    { name: 'Deep Floor Shadow', hex: '#1E2025', description: 'Floating cantilever ambient occlusion' },
  ],
  materials: [
    { name: 'Vitreous China EWC Bowl', category: 'Sanitary Ceramic', sampleColor: '#FAFAFB', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E9ECF0 100%)', finish: 'Antibacterial Ceramic Glaze' },
    { name: 'Duroplast Slim Seat & Cover', category: 'Ergonomic Hardware', sampleColor: '#F4F5F7', textureGradient: 'linear-gradient(135deg, #FFFFFF 0%, #E0E3E8 100%)', finish: 'Soft-Close Quick-Release' },
    { name: 'Brushed Stainless Flush Plate', category: 'Actuator Finish', sampleColor: '#B4B9C2', textureGradient: 'linear-gradient(135deg, #CBD0D8 0%, #989EA8 100%)', finish: 'Fingerprint-Resistant Steel' },
  ],
  keyFeatures: [
    { icon: 'Sparkles', title: 'Rimless Hygiene Flushing Geometry', description: 'Precision internal water vortex channel modeled to ensure 100% surface wash with zero concealed rim crevices.' },
    { icon: 'Box', title: 'Cantilever Wall-Mounted Silhouette', description: 'Engineered for seamless concealed carrier frame installation, creating an elegant floating appearance.' },
  ],
  coreAttributes: [
    { icon: 'Sparkles', label: 'Rimless Hygiene' },
    { icon: 'Box', label: 'Cinema 4D + Corona' },
    { icon: 'Layers', label: 'Floating Cantilever' },
  ],
};

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'interior-design',
    domainId: '3d-spatial',
    title: 'Luxury Bathrooms',
    subtitle: 'Photorealistic Architectural & Luxury Hospitality Suites',
    folderName: 'Luxury Bathrooms',
    description: 'High-end architectural renders, custom sanitaryware suites, and ambient spatial lighting.',
    itemCount: 8,
    thumbnail: '/images/portfolio/teakberry/master.webp',
    badge: 'Architectural CGI',
  },
  {
    id: 'premium-kitchen-interiors',
    domainId: '3d-spatial',
    title: 'Premium Kitchen Interiors',
    subtitle: 'High-End Culinary Architecture & Modular Workstation Islands',
    folderName: 'Kitchen Interiors',
    description: 'Bespoke marble island counters, integrated workstation sinks, fluted architectural millwork, and photorealistic ambient lighting.',
    itemCount: 10,
    thumbnail: '/images/portfolio/kitchen/villa-1-final.webp',
    badge: 'Architectural CGI',
  },
  {
    id: 'product-renders',
    domainId: '3d-spatial',
    title: 'Product Renders',
    subtitle: 'Industrial CAD Surfacing, Precision Tapware & Luxury Hardware',
    folderName: 'Product Renders',
    description: 'Micro-detail industrial engineering cutaways, brushed PVD metals, sculpted chrome tapware, and European luxury sanitaryware.',
    itemCount: 8,
    thumbnail: '/images/portfolio/product-renders/black-decker-washing-machine/master.webp',
    badge: 'Industrial CGI',
  },
  {
    id: 'commercial-campaigns',
    domainId: 'brand-motion',
    title: 'Commercial Broadcast & Brand Campaigns',
    subtitle: 'Television Commercials, 3D Product Motion & VFX Reels',
    folderName: 'Commercials (Kohler / Hindware / Translumina)',
    description: 'Official television commercials, fluid particle simulations, and high-impact broadcast campaigns with interactive storyboards.',
    itemCount: 5,
    thumbnail: '/images/portfolio/commercials/wild-at-heart/cover.webp',
    youtubeId: 'PLmtktlqqSw',
    badge: '5 Commercial Campaigns',
  },
  {
    id: 'motion-graphics',
    domainId: 'brand-motion',
    title: 'Motion Graphics & 3D Product Animations',
    subtitle: 'Feature Walkthroughs, Mobile App Demos & Explainer Reels',
    folderName: 'Motion graphics',
    description: 'High-impact 3D product motion graphics, digital app tutorials, interactive configurator films, and technical feature explainers with complete interactive storyboards.',
    itemCount: 9,
    thumbnail: '/images/portfolio/motion-graphics/kohler-vive-faucet/cover.webp',
    youtubeId: 'xgO7yzUxUZo',
    badge: '9 Motion Graphics Reels',
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
    id: 'webxr-unreal',
    domainId: 'full-stack',
    title: 'WebXR & Unreal Engine 5 Real-Time Sets',
    subtitle: 'Lumen Illumination, Nanite Geometry & Spatial WebXR',
    folderName: 'unreal-webxr',
    description: 'Lumen dynamic illumination, Nanite geometry streaming, Blueprints, and WebXR virtual production.',
    itemCount: 3,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    badge: 'Real-Time UE5 & WebXR',
    youtubeId: 'H9XmsDbvflM',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-kohler-teakberry-layout-1',
    slug: 'kohler-teakberry-layout-1-luxury-bath',
    title: 'Layout 1: Teakberry Luxury Bath Suite',
    subtitle: 'Kohler x India Design 2025 • Warm Earth & Quiet Luxury Concept',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler x India Design 2025',
    year: '2025',
    role: 'Lead 3D Interior & Sanitaryware CGI Artist',
    coverImage: '/images/portfolio/teakberry/master.webp',
    clayImage: '/images/portfolio/teakberry/c4d-viewport.webp',
    finalImage: '/images/portfolio/teakberry/master.webp',
    badge: 'Kohler x ID 2025',
    featured: true,
    aspectRatio: 'wide',
    designThinking: TEAKBERRY_DESIGN_THINKING,
    shortDescription: 'Earthy warmth meets timeless elegance — featuring custom Kohler Teakberry gloss sanitaryware, fluted walnut walls, Calacatta marble vanity, and an illuminated oval mirror.',
    fullOverview: 'Developed for the Kohler x India Design 2025 initiative (An Ogaan Media Initiative). This luxury bathroom layout synthesizes the new Teakberry gloss and Lush honed finishes with warm earthy textures, fluted walnut woodwork, and backlit Calacatta marble surfaces to create a calm, spa-like sanctuary. Rendered with Redshift GPU photorealistic global illumination, physically calibrated PBR glaze absorption, and 2700K warm IES ambient light zoning.',
    technicalDecisions: [
      'Multi-layer PBR ceramic glaze shader for Teakberry (gloss purple-brown) and Lush (honed forest green) with calibrated subsurface absorption.',
      'Physically modeled IES warm cove and backlight profiles (2700K) balanced with soft natural fill.',
      'Procedural fluted walnut timber displacement and vein-cut Calacatta Gold marble micro-roughness.',
      'High-resolution master output with simultaneous multi-camera layout sheets and mood board concept integration.'
    ],
    specs: {
      software: ['Autodesk Maya', 'Cinema 4D', 'Redshift GPU', 'Photoshop', 'Marvelous Designer'],
      polyCount: '5.2M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Redshift GPU Photorealistic GI',
      lightingSetup: 'Multi-layer 2700K IES Portal, Halo Backlit Mirror & Soft Daylight Fill',
      deliveryFormat: 'Master Stills & Multi-Camera Architectural Layouts'
    },
    metrics: [
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Exhibition', value: 'India Design 2025' },
      { label: 'Material Accuracy', value: '100% PBR Ceramic' },
      { label: 'Client / Initiative', value: 'Kohler x ID 2025' }
    ],
    galleryImages: [
      '/images/portfolio/teakberry/master.webp',
      '/images/portfolio/teakberry/angle-1.webp',
      '/images/portfolio/teakberry/angle-2.webp',
      '/images/portfolio/teakberry/angle-3.webp',
      '/images/portfolio/teakberry/moodboard.webp',
    ],
    views: [
      {
        id: 'teakberry-v1',
        camNumber: 'CAM 01',
        name: 'Master Bath Suite Perspective',
        tag: 'Master Full View',
        imageUrl: '/images/portfolio/teakberry/master.webp',
        highResUrl: '/images/portfolio/teakberry/high-res/master-original.webp',
        description: 'Full architectural perspective showing the Teakberry vessel basin vanity, backlit oval mirror, floating wall-hung toilet, herringbone wood floor, and freestanding bathtub wet zone.'
      },
      {
        id: 'teakberry-v2',
        camNumber: 'CAM 02',
        name: 'Vanity Suite & Recessed Niches',
        tag: 'Vanity & Storage Flow',
        imageUrl: '/images/portfolio/teakberry/angle-1.webp',
        highResUrl: '/images/portfolio/teakberry/high-res/angle-1-original.webp',
        description: 'Front-oblique perspective focusing on the cantilevered vanity counter, backlit circular mirror, Teakberry wall-hung toilet, and recessed wooden storage niches.'
      },
      {
        id: 'teakberry-v3',
        camNumber: 'CAM 03',
        name: 'Teakberry Basin Macro & Faucet Detail',
        tag: 'Overhead Macro PBR',
        imageUrl: '/images/portfolio/teakberry/angle-2.webp',
        highResUrl: '/images/portfolio/teakberry/high-res/angle-2-original.webp',
        description: 'High-angle macro study showing the Teakberry vessel basin gloss reflections, Calacatta marble grain, matte black wall-mounted faucet, and natural eucalyptus accent.'
      },
      {
        id: 'teakberry-v4',
        camNumber: 'CAM 04',
        name: 'Countertop Perspective & Halo Mirror',
        tag: 'Eye-level Basin Focus',
        imageUrl: '/images/portfolio/teakberry/angle-3.webp',
        highResUrl: '/images/portfolio/teakberry/high-res/angle-3-original.webp',
        description: 'Eye-level oblique close-up highlighting the dense purple-brown Teakberry glaze sheen, LED mirror halo glow, and fluted textured wall paneling.'
      },
      {
        id: 'teakberry-v0',
        camNumber: 'CAM 05',
        name: 'Concept Mood Board // Warm Earth & Quiet Luxury',
        tag: 'Design Concept & Palette',
        imageUrl: '/images/portfolio/teakberry/moodboard.webp',
        highResUrl: '/images/portfolio/teakberry/high-res/moodboard-original.webp',
        description: 'Interior Design Concept Mood Board — "Warm Earth, Quiet Luxury". Blends natural textures, warm earthy tones, Teakberry sanitaryware, and Calacatta marble into a calm, spa-like sanctuary.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-1',
    slug: 'kohler-vertical-layout-1-courtyard-zen-suite',
    title: 'Layout 1: Villa Master Courtyard Zen Suite',
    subtitle: 'Private Glass Zen Garden Atrium, Freestanding Soak Tub & Brushed Bronze Fixtures',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • Villa Master Ultra Luxury',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-01-courtyard-zen-suite.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-01-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-01-courtyard-zen-suite.webp',
    badge: 'Kohler • Villa Suite',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_1_DESIGN_THINKING,
    shortDescription: 'High-end villa master suite framing an enclosed outdoor Japanese zen garden, featuring an oval freestanding bath, double vanity plinth, and Kohler Brushed Bronze (BV) fixtures.',
    fullOverview: 'A flagship villa master bathroom visualization developed for the Kohler Project Collection. The layout dissolves boundaries between interior sanctuary and nature through full-height architectural glazing overlooking an illuminated private zen courtyard with bonsai pine and stone boulders. Created in Cinema 4D and rendered with Corona Render Engine, featuring unbiased physical global illumination, secondary caustics across water and glass, and balanced Corona LightMix. Final color grading and tone mapping executed in Adobe Photoshop.',
    technicalDecisions: [
      'Calibrated Corona Physical Materials for honed travertine slabs, fluted glass, and Kohler Brushed Bronze (BV) PVD brassware.',
      'Corona LightMix setup balancing natural daylight through the open courtyard with warm 2800K recessed ceiling fixtures and under-vanity LEDs.',
      'Complex glass reflection and refraction caustics calculated across the multi-pane courtyard divider without noise artifacts.',
      'Photoshop 32-bit linear EXR color grading, selective highlight compression, and architectural perspective calibration.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.2M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona Sun & Sky with Portals, IES Spot Profiles & 2800K LED Light Emitters',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Finish', value: 'Brushed Bronze (BV)' },
      { label: 'Client', value: 'Kohler Collection' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-01-courtyard-zen-suite.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-01-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-01-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-1-v1',
        camNumber: 'CAM 01',
        name: 'Villa Courtyard Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-01-courtyard-zen-suite.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-01-courtyard-zen-suite-original.webp',
        description: 'Vertical master portrait perspective showing the freestanding tub wet zone, courtyard garden backdrop, and double floating vanity with Brushed Bronze fittings.'
      },
      {
        id: 'vertical-layout-1-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 1: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-01-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-01-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-1-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 1: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-01-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-01-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Villa Master Courtyard Zen Suite". Curated palette featuring honed travertine limestone, Kohler Brushed Bronze (BV) PVD brassware, courtyard atrium glass, and white vitreous china.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-2',
    slug: 'kohler-vertical-layout-2-japandi-fluted-oak',
    title: 'Layout 2: Japandi Fluted Oak & Bonsai Suite',
    subtitle: 'Natural Timber Slats, Chalice Round Vessel & Polished Chrome CP Fixtures',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • 4BHK Kids Premium (Combo 14)',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-02-japandi-fluted-oak.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-02-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-02-japandi-fluted-oak.webp',
    badge: 'Kohler • Combo 14',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_2_DESIGN_THINKING,
    shortDescription: 'Scandinavian Japandi elegance featuring acoustic fluted oak slats, Kohler Chalice round vessel, Fore Arc chrome fixtures, and ribbed privacy glass.',
    fullOverview: 'Designed as an architectural showcase for Kohler Combo 14 (4BHK Kids Premium). Fuses Scandinavian warmth with Japanese minimalism through vertical fluted oak paneling, honed limestone floor tiles, and a miniature bonsai focal accent. Visualized using Cinema 4D and Corona Render Engine to capture organic wood grain anisotropic highlights, fluted glass distortion refraction, and soft morning daylight filtration. Post-edited in Adobe Photoshop for subtle film tonal curves.',
    technicalDecisions: [
      'Procedural displacement and micro-roughness mapping for vertical oak timber acoustic slats.',
      'Corona refractive dispersion applied to vertical ribbed fluted shower screen for optical light refraction.',
      'Subsurface Scattering (SSS) calibrated for the Kohler Chalice round porcelain vessel basin.',
      '32-bit Photoshop post-edit tone mapping for high-dynamic-range shadow recovery and specular blooming.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '3.8M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona Physical Sun with Window Portal & 3000K Architectural Backlight',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Hardware', value: 'Polished Chrome (CP)' },
      { label: 'Collection', value: 'Combo 14 Premium' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-02-japandi-fluted-oak.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-02-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-02-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-2-v1',
        camNumber: 'CAM 01',
        name: 'Japandi Fluted Oak Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-02-japandi-fluted-oak.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-02-japandi-fluted-oak-original.webp',
        description: 'Vertical layout composition showcasing the fluted oak wall, floating vanity with Chalice round vessel, Fore Arc faucet, and backlit frameless mirror.'
      },
      {
        id: 'vertical-layout-2-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 2: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-02-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-02-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-2-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 2: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-02-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-02-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Japandi Fluted Oak & Bonsai Suite". Curated palette showcasing natural fluted white oak timber, Kohler Polished Chrome (CP) tapware, ribbed privacy glass, and Chalice vessel porcelain.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-3',
    slug: 'kohler-vertical-layout-3-moody-charcoal-marble',
    title: 'Layout 3: Moody Charcoal Marble & Fluted Slate Suite',
    subtitle: 'Bookmatched Graphite Marble, Forefront Basin & Polished Chrome CP Fixtures',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • 4BHK Kids Luxury (Combo 11)',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-03-moody-charcoal-marble.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-03-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-03-moody-charcoal-marble.webp',
    badge: 'Kohler • Combo 11',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_3_DESIGN_THINKING,
    shortDescription: 'Contemporary dark luxury suite with bookmatched dark charcoal marble slabs, vertical matte black slats, illuminated pill LED mirror, and Kohler Forefront basin.',
    fullOverview: 'A bold, atmospheric bathroom concept representing Kohler Combo 11 (4BHK Kids Luxury). Juxtaposes polished dark graphite marble with vertical matte black fluted slats, illuminated by a perimeter-lit elongated pill LED mirror. Rendered in Cinema 4D with Corona Render Engine to faithfully simulate mirror surface multi-bounce reflections, polished porcelain glaze, and specular highlights on Polished Chrome (CP) Hone series fixtures. Post-processed in Photoshop for contrast sculpting and color fidelity.',
    technicalDecisions: [
      'Multi-layer specular Fresnel mapping on high-gloss charcoal marble to replicate depth and natural veining.',
      'Corona LightMix balancing the soft glow of the perimeter-lit pill mirror against overhead recessed spotlights.',
      'Physical chrome PBR shader modeling with microscopic surface anisotropy on Hone tall lav faucet and shower trims.',
      'Photoshop 32-bit color timing emphasizing deep blacks without crushing shadow texture details.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '3.5M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona LightMix with LED Pill Mirror Emitter & Recessed Spot Profiles',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Finish', value: 'Polished Chrome (CP)' },
      { label: 'Combo Code', value: 'Combo 11 Luxury' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-03-moody-charcoal-marble.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-03-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-03-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-3-v1',
        camNumber: 'CAM 01',
        name: 'Moody Charcoal Marble Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-03-moody-charcoal-marble.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-03-moody-charcoal-marble-original.webp',
        description: 'Vertical layout capturing the charcoal marble wall, floating basin counter with Forefront basin, illuminated pill mirror, and glass walk-in shower zone.'
      },
      {
        id: 'vertical-layout-3-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 3: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-03-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-03-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-3-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 3: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-03-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-03-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Moody Charcoal Marble & Fluted Slate Suite". Curated palette featuring bookmatched graphite marble, vertical matte black slats, perimeter LED pill mirror glow, and Polished Chrome fittings.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-4',
    slug: 'kohler-vertical-layout-4-highrise-penthouse-master',
    title: 'Layout 4: High-Rise Penthouse Master Bath Suite',
    subtitle: 'Infinity Pool Horizon View, Reach Drop-In Bath & Parallel Brushed Bronze BV',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • 4BHK Master Luxury (Combo 1)',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-04-highrise-penthouse-master.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-04-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-04-highrise-penthouse-master.webp',
    badge: 'Kohler • Combo 1',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_4_DESIGN_THINKING,
    shortDescription: 'High-rise penthouse master bath with panoramic glazing overlooking a rooftop infinity pool, featuring marble drop-in tub and Kohler Brushed Bronze (BV) fixtures.',
    fullOverview: 'Crafted for Kohler Combo 1 (4BHK Master Luxury). This penthouse master suite commands an open horizon through floor-to-ceiling glass that reveals an exterior cantilevered swimming pool. The interior boasts large-format beige travertine walls, a marble-encased Reach acrylic bath with Composed 3-hole bath filler in Brushed Bronze, and a ModernLife Edge vessel vanity with Vitality Column Lite mirror. Rendered with Cinema 4D and Corona Render Engine using accurate physical sun angles and daylight portals, followed by fine post-production in Adobe Photoshop.',
    technicalDecisions: [
      'Realistic water volume shader with physical absorption, chromatic dispersion, and surface wind ripple normal maps.',
      'Corona Sun and physical sky calibrated for high-altitude daylight matching the exterior sky horizon.',
      'Accurate tessellation and chamfering on Kohler Reach bath drop-in rim and Composed deck-mount valves.',
      'Tone curve grading in Photoshop to harmonize bright exterior pool sunlight with intimate indoor shadow transitions.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.5M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona Daylight System with Exterior Pool Water Caustic Portals',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Finish', value: 'Brushed Bronze (BV)' },
      { label: 'Catalogue', value: 'Combo 1 Master' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-04-highrise-penthouse-master.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-04-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-04-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-4-v1',
        camNumber: 'CAM 01',
        name: 'Penthouse Sky Bath Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-04-highrise-penthouse-master.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-04-highrise-penthouse-master-original.webp',
        description: 'Vertical layout composition looking across the marble drop-in bathtub toward the exterior rooftop pool and sunlit sky.'
      },
      {
        id: 'vertical-layout-4-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 4: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-04-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-04-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-4-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 4: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-04-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-04-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "High-Rise Penthouse Master Bath Suite". Curated palette showcasing warm Roman travertine, Kohler Brushed Bronze (BV) Composed valves, Reach drop-in acrylic bath, and horizon pool reflections.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-5',
    slug: 'kohler-vertical-layout-5-powder-rose-gold-luxury',
    title: 'Layout 5: 4BHK Powder Luxury Room',
    subtitle: 'Burgundy Marble, ModernLife Edge & Vibrant Rose Gold RGD Fixtures',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • 4BHK Powder Luxury (Combo 5)',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-05-powder-rose-gold-luxury.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-05-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-05-powder-rose-gold-luxury.webp',
    badge: 'Kohler • Combo 5',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_5_DESIGN_THINKING,
    shortDescription: 'Intimate boutique powder room featuring Rosso Levanto burgundy marble, curved fluted timber vanity, organic pebble LED mirror, and Kohler Vibrant Rose Gold (RGD) brassware.',
    fullOverview: 'A jewel-box powder room designed for Kohler Combo 5 (4BHK Powder Luxury). Rich, dramatic Rosso Levanto marble slabs provide a tactile, opulent backdrop for the ModernLife Edge 600 vessel basin and ModernLife Edge tall lavatory faucet in Vibrant Rose Gold (RGD). Features an organic asymmetrical Pebble Light illuminated mirror, suspended milk-glass globe pendant lamps, and a Vive wall-hung bowl with PureWash seat. Modeled in Cinema 4D, rendered in Corona Render Engine, and color-graded in Adobe Photoshop for velvety warmth.',
    technicalDecisions: [
      'Custom procedural subsurface scattering and gloss reflection maps for deep burgundy Rosso Levanto marble.',
      'Calibrated PVD metallic shader reflecting the authentic hue and micro-roughness of Kohler Vibrant Rose Gold.',
      'Corona LightMix managing multi-source illumination: frosted globe pendants, LED pebble mirror halo, and toe-kick cove lighting.',
      'Photoshop 32-bit color grading accentuating the romantic contrast between wine tones and warm golden highlights.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '3.2M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona LightMix with Frosted Glass Emitters & 2700K Pebble LED Halo',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Finish', value: 'Vibrant Rose Gold (RGD)' },
      { label: 'Catalogue', value: 'Combo 5 Powder' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-05-powder-rose-gold-luxury.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-05-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-05-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-5-v1',
        camNumber: 'CAM 01',
        name: 'Powder Room Elevation Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-05-powder-rose-gold-luxury.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-05-powder-rose-gold-luxury-original.webp',
        description: 'Vertical layout framing the curved fluted vanity, ModernLife Edge vessel in Rose Gold, suspended globe pendants, and illuminated pebble mirror.'
      },
      {
        id: 'vertical-layout-5-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 5: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-05-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-05-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-5-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 5: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-05-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-05-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "4BHK Powder Luxury Room". Curated palette pairing deep Rosso Levanto burgundy marble, curved fluted walnut millwork, ModernLife Edge vessel, and Kohler Vibrant Rose Gold (RGD) PVD brassware.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-6',
    slug: 'kohler-vertical-layout-6-mediterranean-biophilic-spa',
    title: 'Layout 6: Mediterranean Biophilic Spa & Whirlpool Suite',
    subtitle: 'Anthem 3-Outlet Thermostatic Valves, Statement Vichy Sprays & Hourglass Whirlpool',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • Villas Master Ultra Luxury (Combo 2)',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-06-mediterranean-biophilic-spa.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-06-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-06-mediterranean-biophilic-spa.webp',
    badge: 'Kohler • Combo 2',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_6_DESIGN_THINKING,
    shortDescription: 'Biophilic Mediterranean spa bathroom featuring timber ceiling beams, terracotta honeycomb tile, Hourglass whirlpool, and Anthem thermostatic hydrotherapy system.',
    fullOverview: 'A premier wellness retreat suite visualizing Kohler Combo 2 (Villas Master Ultra Luxury). Synthesizes natural Mediterranean architecture—exposed rustic timber beams, rough-hewn stone masonry, and honeycomb terracotta flooring—with state-of-the-art hydrotherapy engineering. Highlights the Anthem recessed mechanical 3-outlet thermostatic valve, Statement oblong Vichy body sprays, Statement 3-function handshower with WaterMind technology, and Hourglass drop-in whirlpool tub. Built in Cinema 4D, rendered in Corona Render Engine, and finished in Adobe Photoshop.',
    technicalDecisions: [
      'High-poly displacement modeling on rustic ceiling beams, mortar joints, and textured plaster walls.',
      'Corona volumetric light scattering simulating afternoon Mediterranean sunlight streams through side fenestration.',
      'Micro-detail surfacing on Anthem mechanical knurled dials and Statement Vichy body spray nozzles.',
      'Photoshop post-production balancing organic biophilic earth tones with crisp sanitaryware porcelain.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '5.1M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona Sun with Atmospheric Volumetric Fog & IES Downlights',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Technology', value: 'Anthem + WaterMind' },
      { label: 'Catalogue', value: 'Combo 2 Ultra Luxury' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-06-mediterranean-biophilic-spa.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-06-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-06-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-6-v1',
        camNumber: 'CAM 01',
        name: 'Mediterranean Spa Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-06-mediterranean-biophilic-spa.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-06-mediterranean-biophilic-spa-original.webp',
        description: 'Vertical layout composition showing the timber beam ceiling, Hourglass whirlpool bath, Anthem hydrotherapy shower enclosure, and Forefront double vanity.'
      },
      {
        id: 'vertical-layout-6-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 6: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-06-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-06-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-6-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 6: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-06-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-06-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Mediterranean Biophilic Spa & Whirlpool Suite". Curated palette featuring terracotta honeycomb flooring, exposed rustic timber beams, Hourglass whirlpool tub, and Anthem Brushed Bronze hydrotherapy dials.'
      }
    ]
  },
  {
    id: 'proj-kohler-vertical-layout-7',
    slug: 'kohler-vertical-layout-7-laurent-gold-ultra-luxury',
    title: 'Layout 7: Laurent Gold Ultra-Luxury Master Suite',
    subtitle: 'Nero Marquina Gold Marble, Sveda Lite Basin & Fluence Brushed Bronze BV',
    domainId: '3d-spatial',
    collectionId: 'interior-design',
    client: 'Kohler • Villas Master Luxury (Combo 3)',
    year: '2024',
    role: 'Lead 3D Visualizer & Spatial Artist',
    coverImage: '/images/portfolio/kohler-vertical-layouts/layout-07-laurent-gold-ultra-luxury.webp',
    clayImage: '/images/portfolio/kohler-vertical-layouts/layout-07-viewport.webp',
    finalImage: '/images/portfolio/kohler-vertical-layouts/layout-07-laurent-gold-ultra-luxury.webp',
    badge: 'Kohler • Combo 3',
    featured: true,
    aspectRatio: 'tall',
    designThinking: KOHLER_LAYOUT_7_DESIGN_THINKING,
    shortDescription: 'Ultra-luxury presidential suite pairing Nero Marquina gold-veined marble with freestanding soaking bath, cascade chandeliers, and Kohler Fluence Brushed Bronze (BV) fixtures.',
    fullOverview: 'A high-drama presidential bathroom suite created for Kohler Combo 3 (Villas Master Luxury). Anchored by deep Nero Marquina marble with vibrant gold calcite veins, a freestanding architectural soaking tub positioned before panoramic corner windows, and cascading cluster pendant chandeliers. Featuring Kohler Sveda Lite vessel with Vive hidden drain, Fluence tall lavatory faucet, and Radiance shoulder shower in Brushed Bronze (BV). Modeled in Cinema 4D, rendered via Corona Render Engine with physical caustics, and color-calibrated in Adobe Photoshop.',
    technicalDecisions: [
      'Photorealistic anisotropic reflections on polished Nero Marquina gold marble floor and wall slabs.',
      'Corona LightMix calibration managing chandelier cluster illumination, floor washes, and evening exterior sky.',
      'Complex refraction caustics through water in the freestanding soaking tub onto surrounding dark marble.',
      'Photoshop post-production enhancing gold calcite vein luminance and specular highlights on Brushed Bronze fixtures.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.6M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI & Physical SSS)',
      lightingSetup: 'Corona LightMix with Chandelier Emitters & Soft Ambient Sky Fill',
      deliveryFormat: 'Master Vertical Catalogue Render (2550 x 3450 px)'
    },
    metrics: [
      { label: 'Render Engine', value: 'Corona GI' },
      { label: 'Resolution', value: '2550 x 3450 px' },
      { label: 'Finish', value: 'Brushed Bronze (BV)' },
      { label: 'Catalogue', value: 'Combo 3 Master' }
    ],
    galleryImages: [
      '/images/portfolio/kohler-vertical-layouts/layout-07-laurent-gold-ultra-luxury.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-07-viewport.webp',
      '/images/portfolio/kohler-vertical-layouts/layout-07-moodboard.webp',
    ],
    views: [
      {
        id: 'vertical-layout-7-v1',
        camNumber: 'CAM 01',
        name: 'Laurent Gold Presidential Perspective',
        tag: 'Master Vertical Layout',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-07-laurent-gold-ultra-luxury.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-07-laurent-gold-ultra-luxury-original.webp',
        description: 'Vertical layout capturing the gold-veined dark marble, freestanding soak tub framed against the window wall, cluster chandeliers, and Sveda Lite vanity.'
      },
      {
        id: 'vertical-layout-7-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 7: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-07-viewport.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-07-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native quad geometry, camera frustum, lights, and materials hierarchy proof (Not AI).'
      },
      {
        id: 'vertical-layout-7-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Layout 7: Bathroom Concept Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kohler-vertical-layouts/layout-07-moodboard.webp',
        highResUrl: '/images/portfolio/kohler-vertical-layouts/high-res/layout-07-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Laurent Gold Ultra-Luxury Master Suite". Curated palette highlighting Nero Marquina gold-veined marble, freestanding architectural soaking tub, cluster chandeliers, and Kohler Fluence Brushed Bronze fixtures.'
      }
    ]
  },
  {
    id: 'proj-kitchen-walnut-warmth-301810',
    slug: 'walnut-warmth-natural-light-kitchen-301810',
    title: 'Layout 1: Walnut Warmth & Natural Light Kitchen',
    subtitle: 'Kohler Kitchen Suite • Task™ 301810 Single Bowl, Rich Walnut Worktop & Fluted Millwork',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-layout1-accessories.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-layout1-viewport.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-layout1-accessories.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_WALNUT_WARMTH_DESIGN_THINKING,
    shortDescription: 'Warm modern kitchen celebrating rich walnut timber worktops, the Kohler Task™ 301810 single bowl workstation sink, charcoal cabinetry, and sunlit window bay reflections.',
    fullOverview: 'Developed for Kohler. This inviting kitchen layout brings together rich natural walnut timber worktops with dark charcoal paneled cabinetry and sun-drenched casement window daylighting. Anchored by the spacious Kohler Task™ 301810 single bowl stainless steel workstation sink with custom culinary prep accessories and cutting boards.',
    technicalDecisions: [
      'Procedural organic wood grain flow along curved edge radius of solid walnut worktop.',
      'Physically accurate light transmission through double-hung glass window panes.',
      'High-precision CAD modeling of Kohler 301810 single basin with acoustic sound damping pads.',
      'Photorealistic optical depth of field and bokeh blur rendering in Chaos Corona.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.5M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Direct Sunlight through Casement Bay with Ambient Fill',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-layout1-accessories.webp',
      '/images/portfolio/kitchen/kitchen-layout1-workstation.webp',
      '/images/portfolio/kitchen/kitchen-layout1-sink-detail.webp',
      '/images/portfolio/kitchen/kitchen-layout1-depth.webp',
      '/images/portfolio/kitchen/kitchen-layout1-viewport.webp',
      '/images/portfolio/kitchen/kitchen-layout1-moodboard.webp'
    ],
    views: [
      {
        id: 'layout1-view-accessories',
        camNumber: 'CAM 01',
        name: 'Master Culinary Workstation with Accessories',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout1-accessories.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout1-accessories.webp',
        description: 'Primary master perspective highlighting the full walnut worktop, fresh culinary prep board, Kohler Task™ 301810 workstation sink, and sunlit window bay.'
      },
      {
        id: 'layout1-view-workstation',
        camNumber: 'CAM 02',
        name: '301810 Workstation Basin Perspective',
        tag: 'Workstation Angle',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout1-workstation.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout1-workstation.webp',
        description: 'Clean architectural camera angle showcasing the Kohler 301810 single bowl stainless basin, precision drain, and rich curved walnut worktop edge.'
      },
      {
        id: 'layout1-view-sink-detail',
        camNumber: 'CAM 03',
        name: 'Precision Basin Rim & Drain Detail',
        tag: 'Macro Detail View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout1-sink-detail.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout1-sink-detail.webp',
        description: 'Close inspection view displaying the flush drop-in stainless rim, micro-radius bowl corners, and brushed surface reflectivity.'
      },
      {
        id: 'layout1-view-depth',
        camNumber: 'CAM 04',
        name: 'Cinematic Depth of Field Perspective',
        tag: 'Cinematic Bokeh',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout1-depth.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout1-depth.webp',
        description: 'Atmospheric shallow depth-of-field perspective focusing on the natural walnut wood grain, window blinds, and soft outdoor daylight falloff.'
      },
      {
        id: 'layout1-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 1: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout1-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout1-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'layout1-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Walnut Warmth Kitchen Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout1-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout1-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Walnut Warmth · Natural Light" (Cook • Gather • Create • Belong). Curated palette: Walnut Brown, Charcoal Grey, Warm Beige, Taupe, Off White, and Brushed Steel.'
      }
    ]
  },
  {
    id: 'proj-kitchen-ivory-stone-241810',
    slug: 'ivory-stone-natural-calm-kitchen-241810',
    title: 'Layout 2: Ivory Stone & Natural Calm Kitchen',
    subtitle: 'Kohler Kitchen Suite • Task™ 241810 Compact Workstation, SilentShield & Veined Marble',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-layout2-workstation.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-layout2-viewport.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-layout2-workstation.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_IVORY_STONE_DESIGN_THINKING,
    shortDescription: 'Bright and serene kitchen featuring a veined marble waterfall island, the compact Kohler Task™ 241810 sink with SilentShield™ sound absorption, and pale greige cabinetry.',
    fullOverview: 'Developed for Kohler. This bright, airy kitchen exemplifies refined Scandinavian-modern aesthetics. Centered around a veined marble waterfall island with fluted timber base detailing, the suite incorporates the Kohler Task™ 241810 single bowl workstation sink equipped with SilentShield™ sound-absorption damping technology.',
    technicalDecisions: [
      'Continuous vein mapping across top counter and vertical waterfall island mitre.',
      'Engineered sound dampening pad representation and SilentShield™ multi-layer PBR shader.',
      'Physically realistic caustics and glass refraction on floral water decanter props.',
      'Subtle directional morning daylighting with balanced 3000K interior warm fill.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.3M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Morning Sunlight Stream with 3000K Ambient Fill',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-layout2-workstation.webp',
      '/images/portfolio/kitchen/kitchen-layout2-sink-detail.webp',
      '/images/portfolio/kitchen/kitchen-layout2-silentshield.webp',
      '/images/portfolio/kitchen/kitchen-layout2-depth.webp',
      '/images/portfolio/kitchen/kitchen-layout2-viewport.webp',
      '/images/portfolio/kitchen/kitchen-layout2-moodboard.webp'
    ],
    views: [
      {
        id: 'layout2-view-workstation',
        camNumber: 'CAM 01',
        name: 'Master Island & Workstation Perspective',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout2-workstation.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout2-workstation.webp',
        description: 'Primary architectural perspective capturing the full veined marble waterfall island, Kohler 241810 compact workstation sink, fluted stool, and natural oak floor.'
      },
      {
        id: 'layout2-view-sink-detail',
        camNumber: 'CAM 02',
        name: '241810 Workstation Basin Closeup',
        tag: 'Macro Detail View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout2-sink-detail.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout2-sink-detail.webp',
        description: 'High-detail closeup highlighting the compact 241810 single basin geometry, integrated strainer basket, and precision chrome pull-down tapware.'
      },
      {
        id: 'layout2-view-silentshield',
        camNumber: 'CAM 03',
        name: 'SilentShield™ Acoustic Damping Angle',
        tag: 'Feature Angle',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout2-silentshield.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout2-silentshield.webp',
        description: 'Close perspective illustrating the SilentShield™ sound absorption structure designed to significantly reduce disposal and water clanging noise.'
      },
      {
        id: 'layout2-view-depth',
        camNumber: 'CAM 04',
        name: 'Cinematic Shallow Depth-of-Field',
        tag: 'Cinematic Bokeh',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout2-depth.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout2-depth.webp',
        description: 'Atmospheric depth of field render highlighting the fresh citrus fruits on solid oak cutting board and delicate white floral arrangement in glass vase.'
      },
      {
        id: 'layout2-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 2: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout2-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout2-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'layout2-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Ivory Stone Kitchen Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout2-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout2-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Ivory Stone · Natural Calm" (Bright • Airy • Inviting). Curated palette: Ivory White, Stone Beige, Warm Greige, Taupe Grey, Natural Oak, and Sage Green.'
      }
    ]
  },
  {
    id: 'proj-kitchen-modern-refined-cp',
    slug: 'modern-refined-functional-kitchen-cp-faucet',
    title: 'Layout 3: Modern Refined & Functional Kitchen',
    subtitle: 'Kohler Kitchen Suite • Fluted Graphite Backsplash & Polished Chrome Pull-Down Faucet',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-cp-wide.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-cp-viewport.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-cp-wide.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_CP_FAUCET_DESIGN_THINKING,
    shortDescription: 'Refined contemporary Kohler kitchen pairing an undermount stainless workstation sink, high-arc polished chrome pull-down tap, dark fluted stone backsplash, and warm white cabinetry.',
    fullOverview: 'Developed for Kohler. This modern culinary suite emphasizes clean geometry, tactile material contrasts, and functional everyday ergonomics. Anchored by an undermount stainless steel workstation basin with multi-tier accessories, framed against a dark graphite fluted backsplash and illuminated with calibrated soft daylight.',
    technicalDecisions: [
      'Micro-bevel edge topology on stainless workstation rim and wire rack grid.',
      'Directional brushed metal anisotropic reflections on basin bowl walls.',
      'Vertical fluted panel displacement and normal mapping with sharp shadow delineation.',
      'Multi-pass beauty rendering in Chaos Corona with physical aperture depth-of-field.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.1M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Diffused Daylight Fill with 3200K Task Accents',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-cp-wide.webp',
      '/images/portfolio/kitchen/kitchen-cp-closeup-1.webp',
      '/images/portfolio/kitchen/kitchen-cp-closeup-2.webp',
      '/images/portfolio/kitchen/kitchen-cp-viewport.webp',
      '/images/portfolio/kitchen/kitchen-cp-moodboard.webp'
    ],
    views: [
      {
        id: 'cp-view-wide',
        camNumber: 'CAM 01',
        name: 'Wide Kitchen Perspective (Master View)',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-cp-wide.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-cp-wide.webp',
        description: 'Master wide perspective capturing the full culinary preparation counter, polished chrome pull-down tapware, veined marble surface, and dark graphite fluted backdrop.'
      },
      {
        id: 'cp-view-closeup-1',
        camNumber: 'CAM 02',
        name: 'Workstation Basin & CP Faucet Detail',
        tag: 'Macro Detail View',
        imageUrl: '/images/portfolio/kitchen/kitchen-cp-closeup-1.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-cp-closeup-1.webp',
        description: 'Intimate close perspective highlighting the mirror chrome reflections, precision wire drainage grid, undermount counter silicone seal, and culinary knife accessories.'
      },
      {
        id: 'cp-view-closeup-2',
        camNumber: 'CAM 03',
        name: 'Fluted Panel & Joinery Closeup',
        tag: 'Joinery Perspective',
        imageUrl: '/images/portfolio/kitchen/kitchen-cp-closeup-2.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-cp-closeup-2.webp',
        description: 'Detailed camera angle focusing on the vertical fluted base paneling, recessed handle channel, stone countertop chamfer, and botanical accents.'
      },
      {
        id: 'cp-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 3: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/kitchen-cp-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-cp-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'cp-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Modern Refined Kitchen Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-cp-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-cp-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Modern · Refined · Functional" (Prepare • Cook • Connect). Curated palette: Warm White, Stone Beige, Sage Grey, Taupe, Charcoal, Wood Oak, and Stainless Steel.'
      }
    ]
  },
  {
    id: 'proj-kitchen-soft-stone-beam',
    slug: 'soft-stone-sculpted-light-kitchen-beam-faucet',
    title: 'Layout 4: Soft Stone & Sculpted Light Kitchen',
    subtitle: 'Kohler Kitchen Suite • Horizontal Travertine, Taupe Millwork & Sculptural Linear Light',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-beam-full.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-beam-full.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_BEAM_FAUCET_DESIGN_THINKING,
    shortDescription: 'Contemporary Kohler kitchen blending warm horizontal travertine stone, taupe lacquer cabinetry, fluted walnut island accents, and custom zigzag linear sculptural illumination.',
    fullOverview: 'Developed for Kohler. This contemporary culinary space harmonizes natural stone textures with warm architectural illumination. Featuring a continuous horizontal travertine backsplash, veined marble prep surfaces, and a monolithic dark stone island enveloped in vertical walnut fluting. Anchored by the Kohler Beam precision faucet and crowned with a bespoke zigzag sculptural LED chandelier.',
    technicalDecisions: [
      'Cinema 4D architectural spatial modeling with precise millwork profiling and shadow gap joinery.',
      'Physically calibrated Chaos Corona materials: honed porous travertine, satin-finished walnut slats, and brushed chrome.',
      'Balanced multi-source lighting: calibrated 3000K sculptural zigzag luminaire and under-shelf LED cove wash.',
      'High-precision 32-bit linear EXR compositing in Photoshop for subtle highlight roll-off and realistic exposure.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.6M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Custom Zigzag LED Luminaire & 2700K Shelf Cove Wash',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-beam-full.webp',
      '/images/portfolio/kitchen/kitchen-beam-front.webp',
      '/images/portfolio/kitchen/kitchen-beam-left.webp',
      '/images/portfolio/kitchen/kitchen-beam-right.webp',
      '/images/portfolio/kitchen/kitchen-beam-moodboard.webp'
    ],
    views: [
      {
        id: 'beam-view-full',
        camNumber: 'CAM 01',
        name: 'Full Kitchen View (Master Perspective)',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-beam-full.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-beam-full.webp',
        description: 'Primary wide-angle architectural perspective capturing the full kitchen composition, monolithic dark stone island with fluted walnut, travertine backsplash, and sculptural zigzag luminaire.'
      },
      {
        id: 'beam-view-front',
        camNumber: 'CAM 02',
        name: 'Front Elevation & Island Perspective',
        tag: 'Elevation Perspective',
        imageUrl: '/images/portfolio/kitchen/kitchen-beam-front.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-beam-front.webp',
        description: 'Direct front camera perspective highlighting the linear alignment of the floating travertine shelves, under-shelf LED wash, taupe base cabinetry, and Kohler Beam tapware.'
      },
      {
        id: 'beam-view-left',
        camNumber: 'CAM 03',
        name: 'Left Island & Fluted Walnut View',
        tag: 'Angle Perspective',
        imageUrl: '/images/portfolio/kitchen/kitchen-beam-left.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-beam-left.webp',
        description: 'Left perspective showcasing the curved waterfall dark stone edge, vertical fluted walnut island facade, luxury seating, and tall appliance cabinetry.'
      },
      {
        id: 'beam-view-right',
        camNumber: 'CAM 04',
        name: 'Right Culinary Prep & Shelf Lighting View',
        tag: 'Prep Perspective',
        imageUrl: '/images/portfolio/kitchen/kitchen-beam-right.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-beam-right.webp',
        description: 'Right camera angle emphasizing the warm glow of integrated shelf lighting across horizontal travertine claddings and countertop prep zones.'
      },
      {
        id: 'beam-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Soft Stone · Sculpted Light Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-beam-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-beam-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Soft Stone · Sculpted Light" (Cook • Gather • Unwind). Curated palette: Ivory White, Limestone Beige, Champagne Cream, Mushroom Taupe, Walnut Brown, Polished Chrome, and Deep Brown Stone.'
      }
    ]
  },
  {
    id: 'proj-kitchen-layout-5-nature',
    slug: 'nature-in-everyday-living-kitchen-362010',
    title: 'Layout 5: Nature in Everyday Living Kitchen',
    subtitle: 'Kohler Kitchen Suite • Task™ 362010 Double Bowl Workstation Sink & Terrazzo Island',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-layout5-accessories.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-layout5-silentshield.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-layout5-accessories.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_LAYOUT_5_DESIGN_THINKING,
    shortDescription: 'Modern biophilic kitchen featuring the spacious Kohler Task™ 362010 double bowl workstation sink, custom wood cutting board, colander, and honed terrazzo prep island.',
    fullOverview: 'Developed for Kohler. This contemporary culinary kitchen embraces natural textures and functional everyday ergonomics. Centered around a honed terrazzo prep island with olive green cabinetry and dark vertical fluted backsplash, it integrates the Kohler Task™ 362010 double bowl stainless steel workstation sink with SilentShield™ sound absorption and modular culinary prep accessories.',
    technicalDecisions: [
      'Sub-millimeter CAD modeling of the 362010 double bowl stainless steel sink and multi-tier accessories.',
      'Engineered multi-layer SilentShield™ acoustic dampening shader with physical micro-roughness.',
      'Photorealistic procedural terrazzo texture mapping with calibrated displacement and specular response.',
      'Corona Physical GI rendering with warm 3000K under-cabinet illumination and soft daylight fill.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.7M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Diffused Daylight Fill with 3000K Under-Cabinet Accents',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-layout5-accessories.webp',
      '/images/portfolio/kitchen/kitchen-layout5-workstation.webp',
      '/images/portfolio/kitchen/kitchen-layout5-silentshield.webp',
      '/images/portfolio/kitchen/kitchen-layout5-depth.webp',
      '/images/portfolio/kitchen/kitchen-layout5-moodboard.webp',
    ],
    views: [
      {
        id: 'layout5-view-accessories',
        camNumber: 'CAM 01',
        name: 'Master Culinary Workstation with Accessories',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout5-accessories.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout5-accessories.webp',
        description: 'Primary architectural perspective capturing the 362010 double bowl sink equipped with sliding colander, dish drying rack, bamboo cutting board, and honed terrazzo island.'
      },
      {
        id: 'layout5-view-workstation',
        camNumber: 'CAM 02',
        name: '362010 Double Bowl Workstation Basin',
        tag: 'Workstation Angle',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout5-workstation.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout5-workstation.webp',
        description: 'Direct architectural camera angle highlighting the dual basin division, precision undermount rim, and pull-down polished chrome tapware.'
      },
      {
        id: 'layout5-view-silentshield',
        camNumber: 'CAM 03',
        name: 'SilentShield™ Sound Dampening Underside',
        tag: 'Feature Angle',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout5-silentshield.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout5-silentshield.webp',
        description: 'Technical detail angle showing the sound-deadening pads engineered to minimize water impact clatter and garbage disposal vibration.'
      },
      {
        id: 'layout5-view-depth',
        camNumber: 'CAM 04',
        name: 'Cinematic Depth of Field Perspective',
        tag: 'Cinematic Bokeh',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout5-depth.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout5-depth.webp',
        description: 'Atmospheric shallow focus render highlighting fresh culinary produce on the prep board against soft olive cabinetry bokeh.'
      },
      {
        id: 'layout5-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Nature in Everyday Living Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout5-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout5-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Nature in Everyday Living" (Cook • Gather • Unwind). Curated palette: Terrazzo Stone, Olive Green, Natural Wood, Charcoal, and Brushed Stainless Steel.'
      }
    ]
  },
  {
    id: 'proj-kitchen-layout-6-midnight',
    slug: 'midnight-stone-golden-accents-hospitality-bar',
    title: 'Layout 6: Midnight Stone & Golden Accents Kitchen',
    subtitle: 'Kohler Kitchen Suite • Hospitality Bar, Wine Presentation & Brushed Champagne Brass',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-layout6-bar.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-layout6-viewport.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-layout6-bar.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_LAYOUT_6_DESIGN_THINKING,
    shortDescription: 'Sophisticated entertaining bar kitchen combining matte black velvet cabinetry, backlit champagne gold accents, dramatic marble floor, and curated wine stemware storage.',
    fullOverview: 'Developed for Kohler. This hospitality kitchen suite combines dramatic dark tones, luxurious stone surfaces, and refined golden accents. Features an illuminated hospitality bar with integrated wine stemware display, midnight stone preparation countertops, and brushed champagne gold detailing for high-end residential entertaining.',
    technicalDecisions: [
      'Cinema 4D architectural spatial composition balancing dark matte lacquer cabinetry with specular brass trim.',
      'Complex glass refraction and caustics modeling across backlit wine bottles and stemware racks.',
      'Corona LightMix balancing warm 2700K recessed display LED strips with soft ambient spatial fill.',
      'Authentic quad-mesh Cinema 4D wireframe viewport documentation verifying uncompressed 3D geometry.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.8M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Concealed 2700K Stemware Display LEDs & Ambient Mood Fill',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-layout6-bar.webp',
      '/images/portfolio/kitchen/kitchen-layout6-viewport.webp',
      '/images/portfolio/kitchen/kitchen-layout6-moodboard.webp',
    ],
    views: [
      {
        id: 'layout6-view-bar',
        camNumber: 'CAM 01',
        name: 'Master Hospitality Bar & Wine Presentation',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout6-bar.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout6-bar.webp',
        description: 'Primary architectural perspective capturing the full hospitality bar composition, backlit stemware display, matte black cabinetry, and brushed gold accent wall.'
      },
      {
        id: 'layout6-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 6: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout6-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout6-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'layout6-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Midnight Stone · Golden Accents Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout6-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout6-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Midnight Stone · Golden Accents" (Entertain • Connect • Unwind). Curated palette: Matte Black, Midnight Navy, Marble White, Antique Gold, and Smoky Grey.'
      }
    ]
  },
  {
    id: 'proj-kitchen-layout-7-nature-island',
    slug: 'nature-inspired-living-terrazzo-island-kitchen',
    title: 'Layout 7: Nature Inspired Living Kitchen',
    subtitle: 'Kohler Kitchen Suite • Terrazzo Waterfall Island, Olive Green Millwork & Fluted Slats',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-layout7-nature.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-layout7-viewport.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-layout7-nature.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_LAYOUT_7_DESIGN_THINKING,
    shortDescription: 'Calming biophilic culinary space celebrating a cast terrazzo waterfall island, olive green perimeter cabinetry, fluted architectural wood slatting, and herringbone parquet.',
    fullOverview: 'Developed for Kohler. This modern culinary design unites natural textures, earthy tones, and refined materials to create a calm, timeless kitchen sanctuary. Highlights include a monolithic cast terrazzo waterfall island with vertical fluted slat detailing, olive green satin cabinetry, honed Calacatta marble backsplash, and natural oak herringbone parquet flooring bathed in morning daylight.',
    technicalDecisions: [
      'Continuous cast terrazzo texture mapping across horizontal prep island and vertical waterfall mitre.',
      'Natural oak parquet displacement and specular roughness variations simulating authentic timber finish.',
      'Chaos Corona sun & sky system calibrated for early morning solar angle and soft window shadow falloff.',
      'Authentic Cinema 4D wireframe viewport capture providing irrefutable non-AI CGI production proof.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.9M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Direct Morning Sun & Sky with Diffused Interior Fill',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-layout7-nature.webp',
      '/images/portfolio/kitchen/kitchen-layout7-viewport.webp',
      '/images/portfolio/kitchen/kitchen-layout7-moodboard.webp',
    ],
    views: [
      {
        id: 'layout7-view-nature',
        camNumber: 'CAM 01',
        name: 'Master Terrazzo Waterfall Island & Garden Light',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout7-nature.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout7-nature.webp',
        description: 'Primary architectural perspective showcasing the terrazzo waterfall island, fluted wood paneling, olive green cabinetry, and sun-drenched oak herringbone floor.'
      },
      {
        id: 'layout7-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 7: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout7-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout7-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'layout7-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Nature Inspired Living Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout7-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout7-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Nature Inspired Living" (Earthy Tones • Natural Stone • Timeless Calm). Curated palette: Olive Green, Ivory White, Warm Beige, Greige Taupe, Natural Oak, and Charcoal Black.'
      }
    ]
  },
  {
    id: 'proj-kitchen-layout-8-smoked-oak',
    slug: 'smoked-oak-charcoal-contrast-kitchen',
    title: 'Layout 8: Smoked Oak & Charcoal Contrast Kitchen',
    subtitle: 'Kohler Kitchen Suite • Smoked Oak Millwork, Graphite Stone Island & Minimalist Tapware',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/kitchen-layout8-smoked-oak.webp',
    clayImage: '/images/portfolio/kitchen/kitchen-layout8-viewport.webp',
    finalImage: '/images/portfolio/kitchen/kitchen-layout8-smoked-oak.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_LAYOUT_8_DESIGN_THINKING,
    shortDescription: 'Dramatic high-contrast kitchen pairing smoked oak cabinetry with fine-veined graphite stone countertops, concealed 2700K task lighting, and brushed steel tapware.',
    fullOverview: 'Developed for Kohler. This refined culinary suite balances rich natural wood and deep charcoal tones to create a sophisticated, masculine aesthetic. Features smoked rift-cut oak millwork, fine-veined dark graphite quartzite waterfall island, minimalist Kohler pull-down faucet, and warm architectural under-shelf illumination.',
    technicalDecisions: [
      'Procedural smoked oak wood grain flow with subtle specular micro-variations.',
      'Fine-veined dark quartzite PBR material with calibrated anisotropic reflections.',
      'Concealed 2700K LED task wash modeling with realistic shadow falloff on vertical fluting.',
      'Authentic Cinema 4D wireframe viewport proof validating native 3D quad topology.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.6M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Concealed 2700K LED Task Wash & Soft Ambient Daylight',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/kitchen-layout8-smoked-oak.webp',
      '/images/portfolio/kitchen/kitchen-layout8-viewport.webp',
      '/images/portfolio/kitchen/kitchen-layout8-moodboard.webp',
    ],
    views: [
      {
        id: 'layout8-view-smoked-oak',
        camNumber: 'CAM 01',
        name: 'Master Smoked Oak & Charcoal Contrast Island',
        tag: 'Primary Master View',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout8-smoked-oak.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout8-smoked-oak.webp',
        description: 'Primary architectural perspective highlighting the smoked oak millwork, graphite stone island with prep basin, fluted acoustic slats, and warm under-shelf glow.'
      },
      {
        id: 'layout8-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Layout 8: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout8-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout8-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'layout8-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Smoked Oak · Charcoal Contrast Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/kitchen-layout8-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/kitchen-layout8-moodboard.webp',
        description: 'Official Kohler Kitchen Mood Board — "Smoked Oak · Charcoal Contrast" (Cook • Gather • Unwind). Curated palette: Smoked Oak, Charcoal Black, Warm Greige, Soft Ivory, Graphite Stone, and Brushed Steel.'
      }
    ]
  },
  {
    id: 'proj-kitchen-villa-1',
    slug: 'villa-master-luxury-workstation-kitchen',
    title: 'Villa 1: Master Luxury Workstation Island',
    subtitle: 'Kohler Kitchen Suite • Neolith Calacatta, KOI Tap & Task Neoroc',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/villa-1-final.webp',
    clayImage: '/images/portfolio/kitchen/villa-1-viewport.webp',
    finalImage: '/images/portfolio/kitchen/villa-1-final.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_LAYOUT_1_DESIGN_THINKING,
    shortDescription: 'Bespoke Kohler luxury workstation kitchen featuring the Task™ Neoroc® double offset sink, KOI Matte Black pull-down faucet with glass rinser, Cuff RO purifier faucet, and fluted walnut woodwork.',
    fullOverview: 'Developed for Kohler. This luxury culinary workstation suite is anchored by the Kohler Task™ Neoroc® 34×18 composite double sink, paired with the KOI deck-mount pull-down faucet in Matte Black with integrated glass rinser and the Cuff RO drinking water faucet. Modeled in Cinema 4D and rendered in Chaos Corona with physical sky daylighting and 2700K warm under-cabinet LED wash.',
    technicalDecisions: [
      'Cinema 4D precision CAD modeling of Kohler Task Neoroc sink, colander, bamboo cutting board, and KOI faucet.',
      'Chaos Corona physical sky and sun daylighting balanced with warm 2700K interior LED cove profiles.',
      'Procedural Neolith Calacatta marble vein mapping and micro-roughness anisotropy on satin bronze trims.',
      '32-bit linear EXR workflow in Adobe Photoshop for photorealistic tone mapping and lens bloom.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.8M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Corona Sun & Sky with 2700K IES Under-Cabinet Wash',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/villa-1-final.webp',
      '/images/portfolio/kitchen/villa-1-variant-1.webp',
      '/images/portfolio/kitchen/villa-1-variant-2.webp',
      '/images/portfolio/kitchen/villa-1-viewport.webp',
      '/images/portfolio/kitchen/villa-1-moodboard.webp',
    ],
    views: [
      {
        id: 'villa-1-view-final',
        camNumber: 'FINAL',
        name: 'Villa 1: Master Final Render',
        tag: 'Final Approved',
        imageUrl: '/images/portfolio/kitchen/villa-1-final.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-1-final.webp',
        description: 'Final approved architectural perspective showing the Neolith Calacatta marble island, Kohler Task™ Neoroc® workstation sink with cutting board, KOI Matte Black faucet, and fluted walnut millwork.'
      },
      {
        id: 'villa-1-view-var1',
        camNumber: 'VAR 01',
        name: 'Villa 1: Variant 1 (Warm Cream Marble)',
        tag: 'Variant 01',
        imageUrl: '/images/portfolio/kitchen/villa-1-variant-1.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-1-variant-1.webp',
        description: 'Color study exploring warm cream marble veining, calibrated 2700K under-cabinet illumination, and brushed champagne trim.'
      },
      {
        id: 'villa-1-view-var2',
        camNumber: 'VAR 02',
        name: 'Villa 1: Variant 2 (Dark Luxury Contrast)',
        tag: 'Variant 02',
        imageUrl: '/images/portfolio/kitchen/villa-1-variant-2.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-1-variant-2.webp',
        description: 'Dramatic contrast variant with dark graphite cabinetry, highlighted under-island fluted slats, and specular stone reflection.'
      },
      {
        id: 'villa-1-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Villa 1: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/villa-1-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-1-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'villa-1-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Villa 1, Kitchen Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/villa-1-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-1-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Warm Stone, Sculpted Function" (Gather • Prepare • Enjoy). Curated palette featuring Neolith Calacatta Roma, Kohler Task™ Neoroc® double offset sink, KOI Matte Black faucet, Cuff RO purifier, and fluted walnut millwork.'
      }
    ]
  },
  {
    id: 'proj-kitchen-villa-2',
    slug: 'villa-contemporary-plum-quartz-kitchen',
    title: 'Villa 2: Contemporary Plum & Quartz Minimalist Suite',
    subtitle: 'Kohler Kitchen Suite • Calacatta Waterfall & Malleco Touchless',
    domainId: '3d-spatial',
    collectionId: 'premium-kitchen-interiors',
    client: 'Kohler',
    year: '2026',
    role: 'Lead 3D Interior & Architectural CGI Artist',
    coverImage: '/images/portfolio/kitchen/villa-2-final.webp',
    clayImage: '/images/portfolio/kitchen/villa-2-viewport.webp',
    finalImage: '/images/portfolio/kitchen/villa-2-final.webp',
    badge: 'Kohler Kitchen',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KITCHEN_LAYOUT_2_DESIGN_THINKING,
    shortDescription: 'Contemporary Kohler kitchen featuring the Task™ Neoroc® single bowl sink, Malleco touchless pull-down faucet in polished chrome, seamless Calacatta waterfall island, and velvety plum cabinetry.',
    fullOverview: 'Developed for Kohler. This contemporary suite showcases European minimalism with deep anti-fingerprint plum cabinetry, a continuous-vein Calacatta quartz waterfall island, and the Kohler Malleco touchless pull-down faucet paired with the Task™ Neoroc® 30×18 single bowl workstation sink. Rendered with Cinema 4D and Chaos Corona render engine.',
    technicalDecisions: [
      'Seamless waterfall edge mitering on Calacatta quartz island with continuous vein alignment.',
      'Physically calibrated velvety matte lacquer shader with zero-specular micro-scatter.',
      'Accurate Fresnel chrome reflections on Kohler Malleco touchless pull-down faucet.',
      'Multi-pass Corona beauty passes composited in Photoshop for cinematic contrast.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.2M Polygons (Clean Subdivision Quads)',
      renderEngine: 'Chaos Corona Physical GI',
      lightingSetup: 'Natural Overcast Sky Fill with 3000K Shadowline LEDs',
      deliveryFormat: 'Master Ultra HD Still Renders'
    },
    metrics: [
      { label: 'Client / Brand', value: 'Kohler' },
      { label: 'Render Quality', value: 'Master Ultra HD' },
      { label: 'Software Stack', value: 'C4D + Corona' },
      { label: 'Color Space', value: '32-Bit Linear EXR' }
    ],
    galleryImages: [
      '/images/portfolio/kitchen/villa-2-final.webp',
      '/images/portfolio/kitchen/villa-2-variant-1.webp',
      '/images/portfolio/kitchen/villa-2-variant-2.webp',
      '/images/portfolio/kitchen/villa-2-viewport.webp',
      '/images/portfolio/kitchen/villa-2-moodboard.webp',
    ],
    views: [
      {
        id: 'villa-2-view-final',
        camNumber: 'FINAL',
        name: 'Villa 2: Contemporary Final Render',
        tag: 'Final Approved',
        imageUrl: '/images/portfolio/kitchen/villa-2-final.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-2-final.webp',
        description: 'Final approved perspective highlighting the Calacatta quartz waterfall island, Kohler Task™ Neoroc® single bowl sink, Malleco touchless chrome faucet, and matte plum cabinetry.'
      },
      {
        id: 'villa-2-view-var1',
        camNumber: 'VAR 01',
        name: 'Villa 2: Variant 1 (Warm Plum & Natural Light)',
        tag: 'Variant 01',
        imageUrl: '/images/portfolio/kitchen/villa-2-variant-1.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-2-variant-1.webp',
        description: 'Material variant exploring daylight penetration across plum cabinetry, soft under-cabinet fill, and Calacatta vein distribution.'
      },
      {
        id: 'villa-2-view-var2',
        camNumber: 'VAR 02',
        name: 'Villa 2: Variant 2 (Minimalist White Island)',
        tag: 'Variant 02',
        imageUrl: '/images/portfolio/kitchen/villa-2-variant-2.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-2-variant-2.webp',
        description: 'Alternative architectural study featuring refined edge mitering, recessed shadowline LED channel glow, and high-contrast styling props.'
      },
      {
        id: 'villa-2-view-viewport',
        camNumber: 'VIEWPORT',
        name: 'Villa 2: Cinema 4D Viewport Proof',
        tag: 'C4D Wireframe Proof',
        imageUrl: '/images/portfolio/kitchen/villa-2-viewport.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-2-viewport.webp',
        description: 'Authentic Cinema 4D viewport workspace capture displaying native subdivision geometry, camera frustum, and lighting hierarchy proof (Not AI).'
      },
      {
        id: 'villa-2-view-moodboard',
        camNumber: 'MOOD BOARD',
        name: 'Villa 2, Kitchen Mood Board',
        tag: 'Concept & Finishes Palette',
        imageUrl: '/images/portfolio/kitchen/villa-2-moodboard.webp',
        highResUrl: '/images/portfolio/kitchen/high-res/villa-2-moodboard.webp',
        description: 'Interior Design Concept Mood Board — "Modern Warm Luxury" (Cook • Gather • Live). Curated palette featuring Calacatta waterfall quartz, Kohler Task™ Neoroc® single bowl sink, Malleco touchless chrome faucet, and matte plum velvet lacquer cabinetry.'
      }
    ]
  },
  {
    id: 'proj-ad-kohler-wild-at-heart',
    slug: 'kohler-wild-at-heart-collection',
    title: 'Kohler Wild at Heart Collection',
    subtitle: 'From Nature to Form • Botanical Artistry & Ceramic Craftsmanship',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'Kohler',
    year: '2024',
    role: 'Senior 3D Visualizer & Motion Director',
    coverImage: '/images/portfolio/commercials/wild-at-heart/cover.webp',
    youtubeId: 'PLmtktlqqSw',
    storyboardUrl: '/storyboards/kohler-wild-at-heart/index.html',
    badge: 'Kohler • Commercial',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'From nature to form: botanical artistry translated into luxury sanitaryware, fluid simulations, and cinematic architectural bathroom spaces.',
    fullOverview: 'Produced for Kohler brand commercial campaigns. The film tracks the creative arc from raw nature to finished product form, moving from botanical reference studies to hand-drawn decorative art, liquid gold leaf surface detailing, and the completed ceramic vessel in a luxury bath environment.',
    technicalDecisions: [
      'Organic fluid and particle simulation pipeline for natural environment water transitions.',
      'Subsurface scattering ceramic glaze and metallic gold leaf shader development.',
      'Choreographed camera moves transitioning seamlessly from macro nature inserts to architectural suites.',
      '3D viewport geometry and shading verification for high-poly ceramic craftsmanship.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'Photoshop'],
      renderEngine: 'Corona Physical Photometric Renderer',
      lightingSetup: 'Atmospheric Environmental Sunlight & Studio Accent Lights',
      deliveryFormat: '4K Broadcast Commercial Master'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Category', value: 'Artisan Sanitaryware' },
      { label: 'Format', value: '4K DCI Master' },
      { label: 'Storyboard', value: 'Interactive Web' }
    ],
    galleryImages: [
      '/images/portfolio/commercials/wild-at-heart/viewport-1.webp',
      '/images/portfolio/commercials/wild-at-heart/viewport-2.webp'
    ],
    clayImage: '/images/portfolio/commercials/wild-at-heart/viewport-1.webp',
    views: [
      {
        id: 'v-wild-1',
        name: '3D Viewport Geometry & Wireframe Structure',
        camNumber: 'PROOF 01',
        imageUrl: '/images/portfolio/commercials/wild-at-heart/viewport-1.webp',
        highResUrl: '/images/portfolio/commercials/wild-at-heart/viewport-1.webp',
        tag: 'Viewport Wireframe',
        description: 'Orthographic and perspective viewport modeling breakdown showing the sanitaryware geometry and studio lighting layout in 3ds Max.'
      },
      {
        id: 'v-wild-2',
        name: '3D Viewport Shading & Mesh Topology',
        camNumber: 'PROOF 02',
        imageUrl: '/images/portfolio/commercials/wild-at-heart/viewport-2.webp',
        highResUrl: '/images/portfolio/commercials/wild-at-heart/viewport-2.webp',
        tag: 'Shading Topology',
        description: 'High-density polygon topology and shader node network for the botanical surface relief and ceramic base.'
      }
    ],
    stills: [
      {
        id: 'wild-still-1',
        title: 'Master Architectural Render — Angle @2',
        imageUrl: '/images/portfolio/commercials/wild-at-heart/cover-thumb.webp',
        highResUrl: '/images/portfolio/commercials/wild-at-heart/cover.webp',
        tag: 'Final Lit Render',
        description: 'Final 4K photorealistic architectural render showcasing the botanical relief, liquid gold leaf, and honed marble vanity.'
      },
      {
        id: 'wild-still-2',
        title: 'Wireframe & Viewport Topology Pass',
        imageUrl: '/images/portfolio/commercials/wild-at-heart/viewport-1.webp',
        highResUrl: '/images/portfolio/commercials/wild-at-heart/viewport-1.webp',
        tag: 'Mesh Proof',
        description: 'Orthographic wireframe structure proving high-poly surface curvature and edge flow.'
      },
      {
        id: 'wild-still-3',
        title: 'Material Shading & Specular Response',
        imageUrl: '/images/portfolio/commercials/wild-at-heart/viewport-2.webp',
        highResUrl: '/images/portfolio/commercials/wild-at-heart/viewport-2.webp',
        tag: 'Shader Pass',
        description: 'Subsurface glaze scattering, brushed brass PVD fixtures, and micro-relief normal maps.'
      },
      {
        id: 'wild-still-4',
        title: 'Macro Botanical Glaze Close-Up',
        imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=2400&q=90',
        tag: 'Macro Still',
        description: 'Macro camera focal depth capturing hand-crafted ceramic artistry and tactile textures.'
      }
    ]
  },
  {
    id: 'proj-ad-hindware-shower-enclosure',
    slug: 'hindware-shower-enclosures',
    title: 'Hindware Italian Collection — Shower Enclosures',
    subtitle: 'Tactile Glass Clarity, Fluid Dynamics & Everyday Luxury',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'Hindware Italian Collection',
    year: '2024',
    role: 'Lead 3D Animator & Commercial Motion Lead',
    coverImage: '/images/portfolio/commercials/hindware/cover.webp',
    youtubeId: 'SwvCiJKayqs',
    storyboardUrl: '/storyboards/hindware-shower-enclosure/index.html',
    badge: 'Hindware • Commercial',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Tactile broadcast commercial exploring optical glass clarity, water droplet micro-dynamics, and engineered durability tested for 500,000 cycles.',
    fullOverview: 'Broadcast commercial film for the Hindware Italian Collection shower enclosure lineup. Translates technical durability claims—including the 5 lakh open/close cycle endurance test—into a sensory, elegant narrative focused on pristine tempered glass clarity, hydrophobic water shedding, and modern residential luxury.',
    technicalDecisions: [
      'Physically-accurate dispersion and internal reflection on 10mm tempered safety glass.',
      'High-resolution water droplet and spray simulation along glass seals and roller channels.',
      'Balanced color grading preserving ceramic whites and warm natural skin tones.',
      'Visual pacing alternating between macro mechanical details and wide architectural bathroom layouts.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'RealFlow'],
      renderEngine: 'Corona Physical Photometric Renderer',
      lightingSetup: 'Multi-Angle Studio Rim Lighting & Soft Diffused Glass Flags',
      deliveryFormat: 'Broadcast TV & Digital 4K Master'
    },
    metrics: [
      { label: 'Client', value: 'Hindware Italian Collection' },
      { label: 'Durability Claim', value: '5 Lakh Cycles' },
      { label: 'Glass Gauge', value: '10mm Tempered' },
      { label: 'Runtime', value: '79.85 Seconds' }
    ],
    galleryImages: [
      '/images/portfolio/commercials/hindware/cover.webp'
    ],
    stills: [
      {
        id: 'hindware-still-1',
        title: 'Brand Title Slate & Enclosure Header',
        imageUrl: '/images/portfolio/commercials/hindware/cover-thumb.webp',
        highResUrl: '/images/portfolio/commercials/hindware/cover.webp',
        tag: 'Title Slate',
        description: 'Textured brushed basalt background with Italian Collection embossed gold leaf typography.'
      },
      {
        id: 'hindware-still-2',
        title: 'Tempered Glass Clarity & Roller Track Macro',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2400&q=90',
        tag: 'Optics Pass',
        description: 'Physical dispersion and internal refraction on 10mm safety glass edge profile.'
      },
      {
        id: 'hindware-still-3',
        title: 'Hydrophobic Water Droplet Micro-Dynamics',
        imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=2400&q=90',
        tag: 'Fluid Sim',
        description: 'Surface tension droplet shedding along hydrophobic seal channels.'
      },
      {
        id: 'hindware-still-4',
        title: 'Architectural Master Enclosure Suite',
        imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=2400&q=90',
        tag: 'Interior Still',
        description: 'Wide architectural perspective highlighting ambient bathroom rim illumination.'
      }
    ]
  },
  {
    id: 'proj-ad-kohler-matte-black',
    slug: 'kohler-matte-black-series',
    title: 'Kohler Matte Black Series — Power in Purest Form',
    subtitle: 'High-End Architectural Fixture Motion & Fluid Simulation Video Reel',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Artist & Motion Designer',
    coverImage: '/images/portfolio/commercials/matte-black/cover.webp',
    youtubeId: 'sKHEahRL0C4',
    storyboardUrl: '/storyboards/kohler-matte-black/index.html',
    badge: 'Kohler • Matte Black',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Cinematic commercial contrasting elemental terrain with the velvety, non-reflective geometry of Kohler matte black luxury showerheads.',
    fullOverview: 'Power in its purest form: contrasting raw kinetic landscapes, cracked earth, and storm atmospheric lighting with the razor-sharp, engineered geometry of Kohler matte black showerheads and thermostatic valves. Highlights the velvety, non-reflective surface finish that avoids specular glare while maintaining tactile depth.',
    technicalDecisions: [
      'Custom anisotropic micro-roughness shader maps replicating tactile matte anodization.',
      'High-velocity water atomization and spray droplet simulation with dynamic lighting sweeps.',
      'Dramatic chiaroscuro studio lighting rigs revealing dark-on-dark fixture silhouettes.',
      'Motion pacing timed to athletic, elemental soundscapes and atmospheric builds.'
    ],
    specs: {
      software: ['3ds Max / C4D', 'Octane / Corona', 'After Effects', 'RealFlow'],
      renderEngine: 'Spectral Path Tracing Engine (ACEScg)',
      lightingSetup: 'Dramatic Motorized Strip Softboxes & Razor Rim Lights',
      deliveryFormat: '4K Commercial Master & Social Cuts'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Finish', value: 'Matte Black Anodized' },
      { label: 'Resolution', value: '4K UHD 60FPS' },
      { label: 'Storyboard', value: 'Interactive Web' }
    ],
    galleryImages: [
      '/images/portfolio/commercials/matte-black/cover.webp'
    ],
    stills: [
      {
        id: 'matte-still-1',
        title: 'Spotlight Silhouette & Ballerina Key Art',
        imageUrl: '/images/portfolio/commercials/matte-black/cover-thumb.webp',
        highResUrl: '/images/portfolio/commercials/matte-black/cover.webp',
        tag: 'Hero Key Art',
        description: 'Chiaroscuro studio lighting capturing athletic grace and non-reflective fixture depth.'
      },
      {
        id: 'matte-still-2',
        title: 'Matte Black Rainhead Showerhead Detailing',
        imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=90',
        tag: 'Macro Pass',
        description: 'Micro-anodized surface finish avoiding specular glare with razor rim lights.'
      },
      {
        id: 'matte-still-3',
        title: 'High-Velocity Atomization & Water Jets',
        imageUrl: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=2400&q=90',
        tag: 'Fluid Sim',
        description: 'High-speed particle spray illuminated by motorized strip softboxes.'
      },
      {
        id: 'matte-still-4',
        title: 'Architectural Shower Suite Ambience',
        imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=2400&q=90',
        tag: 'Suite Render',
        description: 'Dark architectural bathroom layout contrasting warm cedar slats with matte black fittings.'
      }
    ]
  },
  {
    id: 'proj-ad-kohler-mle-faucet',
    slug: 'kohler-modernlife-edge-faucet',
    title: 'Kohler ModernLife Edge (MLE) Faucet',
    subtitle: 'Sculptural Geometry, Faceted Edges & Precision Flow Dynamic',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'Kohler',
    year: '2024',
    role: 'Senior 3D Artist & Lighting Specialist',
    coverImage: 'https://img.youtube.com/vi/LQ0pBppj0bI/hqdefault.jpg',
    youtubeId: 'LQ0pBppj0bI',
    storyboardUrl: '/storyboards/kohler-mle-faucet/index.html',
    badge: 'Kohler • ModernLife Edge',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Monochrome architectural product commercial positioning faucet bevels and surfaces as sculptural art with precision water flow dynamics.',
    fullOverview: 'A monochrome product film that translates geometric precision into architectural art: cosmic scale, balanced proportions, faceted edges, and engineered endurance of the Kohler ModernLife Edge tapware series. Positions the faucet as a precision sculpted object where chamfered edges and flawless chrome reflections merge with laminar water streams.',
    technicalDecisions: [
      'High-curvature reflection controls preventing distorted horizon artifacts on polished chrome.',
      'Precision bevel and chamfer modeling preserving ultra-crisp specular highlights.',
      'Sculptural monochrome studio environment emphasizing pure form and negative space.',
      'Laminar water flow simulation integrated into the tap aerator nozzle.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'Photoshop'],
      renderEngine: 'Corona Physical Photometric Renderer',
      lightingSetup: 'Studio Softbox Rigs & Gradient Specular Reflectors',
      deliveryFormat: '1080p / 4K Broadcast Commercial'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Product Line', value: 'ModernLife Edge (MLE)' },
      { label: 'Style', value: 'Sculptural Monochrome' },
      { label: 'Storyboard', value: 'Interactive Web' }
    ],
    galleryImages: [
      'https://img.youtube.com/vi/LQ0pBppj0bI/hqdefault.jpg'
    ],
    stills: [
      {
        id: 'mle-still-1',
        title: 'Sculptural Faceted Edge Tapware Profile',
        imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=2400&q=90',
        tag: 'Macro Still',
        description: 'Razor-thin faceted spouts and ergonomic lever chamfers under high-contrast rim lighting.'
      },
      {
        id: 'mle-still-2',
        title: 'Polished Chrome Mirror Reflection Pass',
        imageUrl: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&w=2400&q=90',
        tag: 'Optics Pass',
        description: 'Multi-layer PVD chrome reflection map with zero distortion on curved geometries.'
      },
      {
        id: 'mle-still-3',
        title: 'Laminar Water Jet & Aerator Dispersion',
        imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2400&q=90',
        tag: 'Fluid Sim',
        description: 'Precision laminar flow dynamics avoiding micro-splatter across polished stone basin.'
      },
      {
        id: 'mle-still-4',
        title: 'Minimalist Architectural Vanity Suite',
        imageUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=2400&q=90',
        tag: 'Suite Render',
        description: 'Modern luxury bathroom installation with backlit mirror and textured limestone vanity.'
      }
    ]
  },
  {
    id: 'proj-ad-translumina',
    slug: 'translumina-protege-drug-eluting-balloon',
    title: 'Translumina Protégé — Drug Eluting Balloon (DEB)',
    subtitle: 'Vascular Medical Animation & 3D Mechanism of Action (MOA)',
    domainId: 'brand-motion',
    collectionId: 'commercial-campaigns',
    client: 'Translumina Therapeutics',
    year: '2024',
    role: 'Lead 3D Biomedical Animator & Technical Director',
    coverImage: '/images/portfolio/commercials/translumina/cover.webp',
    youtubeId: 'UZDywQ_mjkc',
    proofYoutubeId: '1k0HARdIhCI',
    proofVideoTitle: 'Translumina 3D Production Proof & Viewport Breakdown',
    storyboardUrl: '/storyboards/translumina/index.html',
    badge: 'Translumina • Medical MOA',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Advanced vascular biomedical animation illustrating the Protégé drug-eluting balloon catheter delivery, arterial expansion, and targeted drug transfer.',
    fullOverview: 'Produced for Translumina Therapeutics. Scientific visualization tracking the Protégé coronary drug-eluting balloon catheter through endovascular navigation, semi-compliant balloon inflation, vessel lumen apposition, and targeted antiproliferative drug delivery without leaving a permanent metallic stent. Accompanied by full 3D production proof reel demonstrating authenticity.',
    technicalDecisions: [
      'Accurate biomedical modeling of vascular endothelial layers, calcified plaque, and balloon pleating.',
      'Dynamic procedural inflation and deformation rig for the semi-compliant polymer balloon membrane.',
      'Particulate drug crystallization and cellular uptake simulation in After Effects and 3D DCC.',
      'Companion 3D production proof video validating wireframe topology, camera paths, and rendering passes.'
    ],
    specs: {
      software: ['3ds Max / Maya', 'Corona / V-Ray', 'After Effects', 'Cinema 4D'],
      renderEngine: 'Biomedical Subsurface Scattering & GI Engine',
      lightingSetup: 'Internal Endovascular Micro-Fiberoptic & Studio Glow Lighting',
      deliveryFormat: '4K Scientific Commercial & Medical Conference Presentation'
    },
    metrics: [
      { label: 'Client', value: 'Translumina Therapeutics' },
      { label: 'Medical Device', value: 'Drug Eluting Balloon (DEB)' },
      { label: 'Verification', value: '3D Production Proof Included' },
      { label: 'Storyboard', value: 'Interactive Web' }
    ],
    galleryImages: [
      '/images/portfolio/commercials/translumina/cover.webp',
      'https://img.youtube.com/vi/1k0HARdIhCI/hqdefault.jpg'
    ],
    stills: [
      {
        id: 'translumina-still-1',
        title: 'Arterial Balloon Inflation & Drug Transfer',
        imageUrl: '/images/portfolio/commercials/translumina/cover-thumb.webp',
        highResUrl: '/images/portfolio/commercials/translumina/cover.webp',
        tag: 'Final Render',
        description: 'Vascular lumen apposition showing semi-compliant polymer membrane expansion and drug coating release.'
      },
      {
        id: 'translumina-still-2',
        title: 'Micro-Vascular Cellular Endothelium',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2400&q=90',
        tag: 'MOA Still',
        description: 'Subsurface scattering on vascular cell walls with particulate drug uptake visualization.'
      },
      {
        id: 'translumina-still-3',
        title: 'Catheter Navigation & Fiberoptic Lighting Pass',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2400&q=90',
        tag: 'Lighting Pass',
        description: 'Internal micro-endoscopic rim glow tracing guidewire delivery through coronary anatomy.'
      },
      {
        id: 'translumina-still-4',
        title: 'Antiproliferative Formulation Uptake Matrix',
        imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1600&q=80',
        highResUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=2400&q=90',
        tag: 'Scientific CGI',
        description: 'Molecular simulation demonstrating uniform paclitaxel absorption into targeted arterial tissue.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-vive-faucet',
    slug: 'kohler-vive-faucet',
    title: 'Kohler Vive Faucet Motion Reel',
    subtitle: 'Sculptural Fluid Geometry, Ergonomic Flow & Precision PVD Chrome Finish',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Animator & Motion Designer',
    coverImage: '/images/portfolio/motion-graphics/kohler-vive-faucet/cover.webp',
    youtubeId: 'xgO7yzUxUZo',
    storyboardUrl: '/storyboards/kohler-vive-faucet/index.html',
    badge: 'Kohler • Vive Faucet',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Dynamic 3D motion design showcasing the sculpted fluid geometry, ergonomic handle actuation, and laminar water stream of the Kohler Vive faucet.',
    fullOverview: 'Commercial motion reel highlighting the fluid contours, mirror-polished PVD chrome reflections, and precision-engineered aerator performance of Kohler\'s Vive tapware. Combines macro camera choreographies, physics-based water stream dynamics, and studio lighting passes.',
    technicalDecisions: [
      'High-curvature specular reflection tracking on polished chrome geometries without facet distortion.',
      'Dynamic laminar water stream simulation with micro-bubble displacement and turbulent splash dissipation.',
      'Choreographed macro camera sweeps emphasizing tactile ergonomic transitions and chamfered edges.',
      'Multi-pass studio softbox lighting setup with custom anisotropic highlights.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'Cinema 4D'],
      renderEngine: 'Corona Physical Photometric Renderer',
      lightingSetup: 'Studio Softbox Rig & Gradient Specular Reflectors',
      deliveryFormat: '4K Motion Graphic Video & Master Commercial Reel'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Discipline', value: '3D Motion Graphics' },
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Render', value: 'Corona PBR' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-vive-faucet/cover.webp',
      '/images/portfolio/motion-graphics/kohler-vive-faucet/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-vive-faucet/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-vive-faucet/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-vive-faucet/still-4.webp'
    ],
    stills: [
      {
        id: 'vive-faucet-still-1',
        title: 'Sculpted Profile & PVD Reflection',
        imageUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-1.webp',
        tag: 'PBR Chrome',
        description: 'Macro side profile illustrating chamfered ergonomic transitions and clean reflection gradients.'
      },
      {
        id: 'vive-faucet-still-2',
        title: 'Laminar Aerator Water Flow',
        imageUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-2.webp',
        tag: 'Fluid Sim',
        description: 'Physical fluid stream simulation exiting the concealed aerator nozzle.'
      },
      {
        id: 'vive-faucet-still-3',
        title: 'Tactile Lever Actuation Angle',
        imageUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-3.webp',
        tag: 'Ergonomics',
        description: 'Smooth mechanical motion and pivot clearance for effortless water temperature modulation.'
      },
      {
        id: 'vive-faucet-still-4',
        title: 'Studio Lighting Pass & Environment',
        imageUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-vive-faucet/still-4.webp',
        tag: 'Lighting Pass',
        description: 'Studio rim light setup isolating the silhouette against high-contrast dark tones.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-purewash',
    slug: 'kohler-purewash',
    title: 'Kohler PureWash Bidet Seat Explainer',
    subtitle: 'Intelligent Hygiene Engineering, Self-Cleaning Wand & Ergonomic Contours',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: '3D Motion Designer & Technical Visualizer',
    coverImage: '/images/portfolio/motion-graphics/kohler-purewash/cover.webp',
    youtubeId: 'Hr1_2_W1fbM',
    storyboardUrl: '/storyboards/kohler-purewash/index.html',
    badge: 'Kohler • PureWash',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: '3D feature explainer detailing the dual-spray hygiene mechanism, self-cleaning UV sterilization wand, and slim profile ergonomics of the Kohler PureWash bidet seat.',
    fullOverview: 'An animated 3D product motion explainer communicating the advanced hygiene technology of Kohler PureWash. The animation walks through the dual-wand cleansing system, adjustable water temperature and pressure controls, UV sanitization cycle, and whisper-quiet soft-close hinge mechanism.',
    technicalDecisions: [
      'Internal mechanical cutaways revealing telescopic stainless-steel spray wand mechanics.',
      'Micro-droplet spray physics simulation with pulsing pressure aeration.',
      'Ceramic and antimicrobial polypropylene PBR shader setup with subsurface scattering.',
      'Smooth technical callouts and animated UI HUD overlay integration.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'Illustrator'],
      renderEngine: 'Corona Physical Renderer',
      lightingSetup: 'Clean Minimalist Bathroom Studio Environment',
      deliveryFormat: 'Full HD / 4K Digital Explainer Video'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Discipline', value: 'Product Explainer' },
      { label: 'Feature', value: 'Hygiene Tech' },
      { label: 'Format', value: 'Commercial Reel' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-purewash/cover.webp',
      '/images/portfolio/motion-graphics/kohler-purewash/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-purewash/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-purewash/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-purewash/still-4.webp'
    ],
    stills: [
      {
        id: 'purewash-still-1',
        title: 'Slim Contoured Ergonomic Profile',
        imageUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-1.webp',
        tag: 'Ergonomics',
        description: 'Low-profile form factor designed to blend seamlessly with contemporary toilet suites.'
      },
      {
        id: 'purewash-still-2',
        title: 'Precision Dual Spray Wand Mechanism',
        imageUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-2.webp',
        tag: 'Mechanism',
        description: 'Self-cleaning telescopic stainless-steel wand with targeted front and rear spray aeration.'
      },
      {
        id: 'purewash-still-3',
        title: 'Soft-Close Hinge & Quick-Release Lock',
        imageUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-3.webp',
        tag: 'Hardware',
        description: 'Precision damper hinge motion preventing slam impacts and facilitating swift removal.'
      },
      {
        id: 'purewash-still-4',
        title: 'UV Sanitization & Self-Cleansing Cycle',
        imageUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-purewash/still-4.webp',
        tag: 'Sanitization',
        description: 'Electrolyzed water pre-rinse and UV light sterilization cycle breakdown.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-nural-app',
    slug: 'kohler-nural-app',
    title: 'Kohler Nural App Ecosystem Demo',
    subtitle: 'Smart Bathroom IoT Control, Personalized Presets & Connected Living',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: '3D UI/UX Motion Animator & Visualizer',
    coverImage: '/images/portfolio/motion-graphics/kohler-nural-app/cover.webp',
    youtubeId: 'zZh4wD4GPVA',
    storyboardUrl: '/storyboards/kohler-nural-app/index.html',
    badge: 'Kohler • Nural App',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Connected 3D motion presentation illustrating seamless mobile app synchronization with intelligent sanitaryware fixtures and smart showering ecosystems.',
    fullOverview: 'Demonstration film merging photorealistic 3D product renders with high-fidelity digital UI choreography for the Kohler Nural smart bathroom app. Illustrates device pairing, customized temperature and flow profiles, automated ambient lighting moods, and energy/water usage analytics.',
    technicalDecisions: [
      '3D smartphone hardware modeling and screen space projection mapping.',
      'Micro-motion interface animation synchronized to 3D spatial device responses.',
      'Fluid transition between dark mode mobile UI screens and bright luxury bathroom environments.',
      'Dynamic data visualization graphics displaying real-time water savings metrics.'
    ],
    specs: {
      software: ['After Effects', 'Cinema 4D', 'Redshift / Corona', 'Figma'],
      renderEngine: 'Redshift GPU / Corona Physical',
      lightingSetup: 'High-Key Tech Studio with Ambient Neon Emissive Elements',
      deliveryFormat: '4K Digital App Walkthrough & Social Promo'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Type', value: 'App & Hardware Motion' },
      { label: 'Platform', value: 'iOS & Android IoT' },
      { label: 'Resolution', value: '4K Ultra HD' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-nural-app/cover.webp',
      '/images/portfolio/motion-graphics/kohler-nural-app/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-nural-app/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-nural-app/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-nural-app/still-4.webp'
    ],
    stills: [
      {
        id: 'nural-still-1',
        title: 'Mobile Control Interface & Device Pairing',
        imageUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-1.webp',
        tag: 'Mobile UI',
        description: 'Sleek smartphone interface demonstrating Bluetooth discovery and immediate device handshakes.'
      },
      {
        id: 'nural-still-2',
        title: 'Personalized Water Temperature & Preset Tuning',
        imageUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-2.webp',
        tag: 'Presets',
        description: 'Individual family profile settings for spray intensity, ambient warm glow, and duration.'
      },
      {
        id: 'nural-still-3',
        title: 'Dynamic Real-Time Consumption Dashboard',
        imageUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-3.webp',
        tag: 'Analytics',
        description: 'Data analytics visualization highlighting resource conservation and efficiency metrics.'
      },
      {
        id: 'nural-still-4',
        title: 'Synchronized Smart Bathroom Environment',
        imageUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-nural-app/still-4.webp',
        tag: 'Ecosystem',
        description: 'Integrated lighting, mirror defogging, and sanitaryware responding in concert.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-plug-and-play',
    slug: 'kohler-plug-and-play',
    title: 'Plug and Play Experience',
    subtitle: 'Tool-Free Modular Installation, Fast-Mount Hardware & Frictionless Setup',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Animator & Motion Designer',
    coverImage: '/images/portfolio/motion-graphics/kohler-plug-and-play/cover.webp',
    youtubeId: 'gqPXRGnJKtQ',
    storyboardUrl: '/storyboards/kohler-plug-and-play/index.html',
    badge: 'Kohler • Plug & Play',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Exploded mechanical assembly and kinetic motion showcase visualizing effortless modular installation and quick-connect plumbing innovations.',
    fullOverview: 'A kinetic 3D instructional motion video created for Kohler, highlighting the revolutionary Plug and Play installation mechanism. Uses exploded isometric views, transparent structural cross-sections, and tactile sound design cues to demonstrate how technicians and homeowners can install and lock components in under 60 seconds without complex tools.',
    technicalDecisions: [
      'High-precision CAD part deconstruction with smooth multi-axis assembly tracking.',
      'Semi-transparent ghosted housings to reveal internal locking o-rings and bayonet connectors.',
      'Spring tension physics and magnetic snap engagement animations.',
      'Clear graphic color-coding (amber/cyan) for alignment markers and latch points.'
    ],
    specs: {
      software: ['3ds Max', 'Cinema 4D', 'Corona Renderer', 'After Effects'],
      renderEngine: 'Corona Physical Renderer',
      lightingSetup: 'Studio High-Contrast Key & Fill with Rim Accents',
      deliveryFormat: '4K Broadcast Master & Technical Demo'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Category', value: 'Modular Engineering' },
      { label: 'Animation', value: 'Kinetic CAD Exploded' },
      { label: 'Resolution', value: '4K Master' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-plug-and-play/cover.webp',
      '/images/portfolio/motion-graphics/kohler-plug-and-play/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-plug-and-play/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-plug-and-play/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-plug-and-play/still-4.webp'
    ],
    stills: [
      {
        id: 'plug-play-still-1',
        title: 'Exploded Modular Component Stack',
        imageUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-1.webp',
        tag: 'CAD Exploded',
        description: 'Multi-tiered disassembly demonstrating modular components and gasket assemblies.'
      },
      {
        id: 'plug-play-still-2',
        title: 'Bayonet Lock & Audible Snap Engagement',
        imageUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-2.webp',
        tag: 'Lock Mechanism',
        description: 'Quarter-turn locking collar with tactile resistance and internal o-ring compression.'
      },
      {
        id: 'plug-play-still-3',
        title: 'Internal Pressure-Tested Seal Anatomy',
        imageUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-3.webp',
        tag: 'Internal Cutaway',
        description: 'Cross-sectional cutaway illustrating hydro-tight sealing tolerances.'
      },
      {
        id: 'plug-play-still-4',
        title: 'Final Installed Fixture in Spatial Suite',
        imageUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-plug-and-play/still-4.webp',
        tag: 'Installed Suite',
        description: 'Completed fixture locked into place against premium architectural wall tile.'
      }
    ]
  },
  {
    id: 'proj-motion-panasonic-miraie',
    slug: 'panasonic-miraie',
    title: 'Panasonic MirAIe Setup Tutorial',
    subtitle: 'Smart Home Appliance Onboarding, Wi-Fi Provisioning & Mobile Pairing Flow',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Panasonic',
    year: '2024',
    role: 'Motion Graphics Specialist & Technical Director',
    coverImage: '/images/portfolio/motion-graphics/panasonic-miraie/cover.webp',
    youtubeId: '4Z_oXntqJvg',
    storyboardUrl: '/storyboards/panasonic-miraie/index.html',
    badge: 'Panasonic • MirAIe',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Clear step-by-step 3D motion onboarding tutorial guiding users through device pairing, QR scanning, and smart appliance network configuration.',
    fullOverview: 'Produced for Panasonic\'s MirAIe connected IoT ecosystem. A customer onboarding motion tutorial engineered to eliminate setup friction by providing clear, animated guidance on router proximity, BLE auto-detection, Wi-Fi 2.4GHz selection, and profile registration across smart ACs, switches, and home appliances.',
    technicalDecisions: [
      'Kinetic vector typography paired with 3D device interaction sequences.',
      'Realistic mobile app UI motion synchronized with physical appliance status LED pulses.',
      'Simplified step badges and visual countdown indicators for user-friendly pacing.',
      'Clean corporate Panasonic blue/white branding guidelines adherence.'
    ],
    specs: {
      software: ['After Effects', 'Illustrator', 'Cinema 4D', 'Premiere Pro'],
      renderEngine: 'After Effects Dynamic Motion & C4D Standard',
      lightingSetup: 'Clean Corporate Motion Graphic Setup',
      deliveryFormat: '1080p Customer Support Tutorial & Social Reels'
    },
    metrics: [
      { label: 'Client', value: 'Panasonic' },
      { label: 'Platform', value: 'MirAIe IoT Platform' },
      { label: 'Format', value: 'Onboarding Tutorial' },
      { label: 'Resolution', value: 'Full HD 1080p' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/panasonic-miraie/cover.webp',
      '/images/portfolio/motion-graphics/panasonic-miraie/still-1.webp',
      '/images/portfolio/motion-graphics/panasonic-miraie/still-2.webp',
      '/images/portfolio/motion-graphics/panasonic-miraie/still-3.webp',
      '/images/portfolio/motion-graphics/panasonic-miraie/still-4.webp'
    ],
    stills: [
      {
        id: 'miraie-still-1',
        title: 'App Installation & QR Scan Onboarding',
        imageUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-1.webp',
        tag: 'QR Pairing',
        description: 'First-time setup workflow scanning appliance barcode for automatic model identification.'
      },
      {
        id: 'miraie-still-2',
        title: 'Router Proximity & Dual-Band Verification',
        imageUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-2.webp',
        tag: 'Network Setup',
        description: 'Clear graphical guidance instructing users to select 2.4 GHz Wi-Fi channels.'
      },
      {
        id: 'miraie-still-3',
        title: 'Device LED Indicator Synchronization',
        imageUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-3.webp',
        tag: 'LED Feedback',
        description: 'Animated visual feedback showing flashing status LEDs confirming handshake success.'
      },
      {
        id: 'miraie-still-4',
        title: 'Appliance Room Assignment & Naming',
        imageUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/panasonic-miraie/still-4.webp',
        tag: 'Room Mapping',
        description: 'Assigning smart appliances to custom household rooms in the MirAIe dashboard.'
      }
    ]
  },
  {
    id: 'proj-motion-schneider-miluz-lara',
    slug: 'schneider-miluz-lara',
    title: 'Miluz Lara by Schneider Electric',
    subtitle: 'Contemporary Modular Switches, Tactile Rocker Action & Architectural Aesthetics',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Schneider Electric',
    year: '2024',
    role: 'Lead 3D Product Animator & Motion Designer',
    coverImage: '/images/portfolio/motion-graphics/schneider-miluz-lara/cover.webp',
    youtubeId: 'LRG-thUXZ0c',
    storyboardUrl: '/storyboards/schneider-miluz-lara/index.html',
    badge: 'Schneider • Miluz Lara',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Architectural motion reel celebrating the sleek curves, refined tactile feel, and modern matte textures of the Schneider Miluz Lara modular switch range.',
    fullOverview: 'Commercial launch reel for Schneider Electric\'s Miluz Lara modular switch and socket collection. Visualizes the ultra-slim faceplate profiles, velvety matte and gloss finishes, satisfying rocker switch mechanism, and effortless wall-plate mounting system in modern interior settings.',
    technicalDecisions: [
      'Ultra-precise micro-beveling on switch rocker edges to catch subtle specular glints.',
      'Tactile mechanical actuation animation with spring recoil and shadow contraction.',
      'Architectural wall integration showing harmonious fit against wood, stone, and plaster finishes.',
      'PVD metal and polycarbonate material response under shifting sunlight angles.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'Photoshop'],
      renderEngine: 'Corona Physical Renderer',
      lightingSetup: 'Architectural Natural Window Daylight & Studio Accents',
      deliveryFormat: '4K Product Launch Reel & Commercial Master'
    },
    metrics: [
      { label: 'Client', value: 'Schneider Electric' },
      { label: 'Category', value: 'Modular Electrical' },
      { label: 'Motion', value: 'Architectural Commercial' },
      { label: 'Resolution', value: '4K Ultra HD' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/schneider-miluz-lara/cover.webp',
      '/images/portfolio/motion-graphics/schneider-miluz-lara/still-1.webp',
      '/images/portfolio/motion-graphics/schneider-miluz-lara/still-2.webp',
      '/images/portfolio/motion-graphics/schneider-miluz-lara/still-3.webp',
      '/images/portfolio/motion-graphics/schneider-miluz-lara/still-4.webp'
    ],
    stills: [
      {
        id: 'miluz-lara-still-1',
        title: 'Sculpted Faceplate & Slim Wall Relief',
        imageUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-1.webp',
        tag: 'Product Form',
        description: 'Ultra-thin profile showing minimalist wall relief and flush architectural aesthetic.'
      },
      {
        id: 'miluz-lara-still-2',
        title: 'Tactile Rocker Switch Precision Motion',
        imageUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-2.webp',
        tag: 'Tactile Action',
        description: 'Smooth mechanical pivot angle and quiet click actuation captured in slow motion.'
      },
      {
        id: 'miluz-lara-still-3',
        title: 'Modular Grid Mounting & Multi-Gang Frame',
        imageUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-3.webp',
        tag: 'Modular Grid',
        description: 'Interchangeable module slots accommodating power sockets, USB ports, and data switches.'
      },
      {
        id: 'miluz-lara-still-4',
        title: 'Interior Architectural Harmony',
        imageUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/schneider-miluz-lara/still-4.webp',
        tag: 'Context Render',
        description: 'Harmonious placement against travertine wall cladding and warm architectural ambient lighting.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-towel-rack',
    slug: 'kohler-towel-rack',
    title: 'Kohler Heated Towel Rack',
    subtitle: 'Intelligent Thermal Distribution, Brushed Metallic Finishes & Bathroom Luxury',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Animator & Visualizer',
    coverImage: '/images/portfolio/motion-graphics/kohler-towel-rack/cover.webp',
    youtubeId: 'LolbK2trK7I',
    storyboardUrl: '/storyboards/kohler-towel-rack/index.html',
    badge: 'Kohler • Towel Rack',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Kinetic 3D feature showcase revealing internal dry-heating thermal coils, touch-capacitive controls, and brushed PVD stainless steel craftsmanship.',
    fullOverview: 'Commercial motion reel engineered for the Kohler heated towel warmer series. Illustrates the rapid heat conduction system via thermal gradient shader transitions, waterproof IP-rated capacitive touch button actuation, and wall-anchored architectural elegance in spa-inspired luxury bathroom interiors.',
    technicalDecisions: [
      'Animated false-color thermal heating gradient mapping across cylindrical rungs.',
      'Water droplet evaporation particle effect with rising atmospheric steam wisps.',
      'Brushed PVD titanium and matte black metallic anisotropic shader development.',
      'Subtle camera orbiting preserving clean architectural vertical lines.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'FumeFX'],
      renderEngine: 'Corona Physical Renderer',
      lightingSetup: 'Warm 3000K Spa Ambiance with Low-Key Studio Rim Lighting',
      deliveryFormat: '4K Motion Graphic Video'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Product', value: 'Luxury Sanitaryware' },
      { label: 'VFX', value: 'Thermal Heat Shader' },
      { label: 'Resolution', value: '4K Ultra HD' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-towel-rack/cover.webp',
      '/images/portfolio/motion-graphics/kohler-towel-rack/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-towel-rack/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-towel-rack/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-towel-rack/still-4.webp'
    ],
    stills: [
      {
        id: 'towel-rack-still-1',
        title: 'Thermal Core Conduction & Heat Mapping',
        imageUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-1.webp',
        tag: 'Thermal VFX',
        description: 'Vivid thermal gradient shader displaying rapid dry-heating distribution across horizontal rails.'
      },
      {
        id: 'towel-rack-still-2',
        title: 'Capacitive Touch Controls & Waterproof Sealing',
        imageUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-2.webp',
        tag: 'Touch Interface',
        description: 'Integrated touch button glow indicating temperature modes with IPX4 splash resistance.'
      },
      {
        id: 'towel-rack-still-3',
        title: 'Brushed PVD Titanium Surface Craft',
        imageUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-3.webp',
        tag: 'Material Shader',
        description: 'Directional anisotropic micro-brushing on aerospace-grade stainless steel tubes.'
      },
      {
        id: 'towel-rack-still-4',
        title: 'Architectural Spa Bathroom Atmosphere',
        imageUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-towel-rack/still-4.webp',
        tag: 'Environment',
        description: 'Elegantly wall-hung inside a luxury travertine and moody slate bathroom setting.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-simplify-app',
    slug: 'kohler-simplify-app',
    title: 'Kohler SE Simplify App',
    subtitle: 'Enterprise Sanitation Fleet Monitoring, Valve Telemetry & Facility Dashboard',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D UI Motion Designer & Technical Visualizer',
    coverImage: '/images/portfolio/motion-graphics/kohler-simplify-app/cover.webp',
    youtubeId: 'MzVRoxXWsAM',
    storyboardUrl: '/storyboards/kohler-simplify-app/index.html',
    badge: 'Kohler • Simplify App',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Comprehensive motion graphics breakdown of Kohler SE Simplify app interface for facility managers, real-time fixture diagnostics, and scheduled hygiene cycles.',
    fullOverview: 'An enterprise-grade motion explainer highlighting the Kohler SE Simplify digital platform for commercial properties, hotels, and luxury estates. Follows the operator workflow from multi-building facility mapping to automated flush scheduling, battery monitoring, leak detection alerts, and water conservation analytics.',
    technicalDecisions: [
      '3D isometric architectural floorplan visualization with animated signal pulses.',
      'High-density UI component animation showing responsive telemetry charts and switches.',
      'Hardware-to-software wireless sync motion graphics (Bluetooth mesh / cloud sync).',
      'Seamless transitions between macro hardware valves and dashboard analytics.'
    ],
    specs: {
      software: ['After Effects', 'Cinema 4D', 'Illustrator', 'Figma'],
      renderEngine: 'Hardware Accelerated Motion Engine',
      lightingSetup: 'Clean Enterprise Tech Studio with Sleek Dark Mode UI',
      deliveryFormat: '4K Enterprise Software Demo Reel'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Software', value: 'SE Simplify Platform' },
      { label: 'Audience', value: 'Commercial & Facility' },
      { label: 'Resolution', value: '4K Ultra HD' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-simplify-app/cover.webp',
      '/images/portfolio/motion-graphics/kohler-simplify-app/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-simplify-app/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-simplify-app/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-simplify-app/still-4.webp'
    ],
    stills: [
      {
        id: 'simplify-still-1',
        title: 'Commercial Facility Dashboard & Device Status',
        imageUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-1.webp',
        tag: 'Facility UI',
        description: 'Multi-zone dashboard tracking online status, battery reserve, and usage frequencies.'
      },
      {
        id: 'simplify-still-2',
        title: 'Sensor Flush Valve Diagnostic Telemetry',
        imageUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-2.webp',
        tag: 'Telemetry',
        description: 'Real-time solenoid actuation tracking and preventative maintenance notification logic.'
      },
      {
        id: 'simplify-still-3',
        title: 'Automated Hygiene Flush Scheduling',
        imageUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-3.webp',
        tag: 'Scheduler',
        description: 'Configurable stagnation-prevention purge cycles ensuring plumbing health in commercial towers.'
      },
      {
        id: 'simplify-still-4',
        title: 'Water Footprint & Flow Conservation Analytics',
        imageUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-simplify-app/still-4.webp',
        tag: 'Analytics',
        description: 'Dynamic reporting widgets visualizing total liters saved across enterprise campuses.'
      }
    ]
  },
  {
    id: 'proj-motion-kohler-av',
    slug: 'kohler-av',
    title: 'Kohler AV Audio-Visual Suite',
    subtitle: 'Immersive Sensory Bathing, Dynamic Sound Waves & Ambient Chroma Projection',
    domainId: 'brand-motion',
    collectionId: 'motion-graphics',
    client: 'Kohler',
    year: '2024',
    role: 'Lead 3D Artist & Motion Director',
    coverImage: '/images/portfolio/motion-graphics/kohler-av/cover.webp',
    youtubeId: 'KaQYVsjjHc8',
    storyboardUrl: '/storyboards/kohler-av/index.html',
    badge: 'Kohler • AV Suite',
    featured: true,
    aspectRatio: 'wide',
    shortDescription: 'Cinematic motion experience demonstrating synchronized acoustic sound waves, hydrotherapy transducers, and ambient lighting in luxury smart showers.',
    fullOverview: 'A sensory, cinematic commercial motion piece for the Kohler AV smart showering and acoustic bath experience. Visualizes invisible acoustic vibrations as physical water surface cymatics, fluid ripple dispersion, and responsive ambient color spectrum washes integrated into modern luxury wellness environments.',
    technicalDecisions: [
      'Cymatic water surface wave simulation driven by underlying audio waveform frequencies.',
      'Dynamic ambient chromatic lighting transitions synced to sound vibrations.',
      'Ultra-realistic water droplet refraction and caustics on dark slate bathroom finishes.',
      'Choreographed camera choreography weaving through water sprays and sound fields.'
    ],
    specs: {
      software: ['3ds Max', 'Corona Renderer', 'After Effects', 'RealFlow'],
      renderEngine: 'Corona Physical Renderer with Volumetric Light Scattering',
      lightingSetup: 'Dramatic Moody Ambiance with Dynamic RGBW Accent Rigs',
      deliveryFormat: '4K Cinematic Audio-Visual Master'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Innovation', value: 'Acoustic Hydrotherapy' },
      { label: 'VFX', value: 'Cymatics & Sound Waves' },
      { label: 'Resolution', value: '4K Cinema 24fps' }
    ],
    galleryImages: [
      '/images/portfolio/motion-graphics/kohler-av/cover.webp',
      '/images/portfolio/motion-graphics/kohler-av/still-1.webp',
      '/images/portfolio/motion-graphics/kohler-av/still-2.webp',
      '/images/portfolio/motion-graphics/kohler-av/still-3.webp',
      '/images/portfolio/motion-graphics/kohler-av/still-4.webp'
    ],
    stills: [
      {
        id: 'av-still-1',
        title: 'Cymatic Sound Wave Water Dispersion',
        imageUrl: '/images/portfolio/motion-graphics/kohler-av/still-1.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-av/still-1.webp',
        tag: 'Cymatics VFX',
        description: 'Physical fluid ripples generated by harmonic bass frequencies vibrating through the water bath.'
      },
      {
        id: 'av-still-2',
        title: 'Acoustic Transducer & Subsurface Resonance',
        imageUrl: '/images/portfolio/motion-graphics/kohler-av/still-2.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-av/still-2.webp',
        tag: 'Transducers',
        description: 'Concealed acoustic drivers delivering tactile sound through luxury acrylic and composite tubs.'
      },
      {
        id: 'av-still-3',
        title: 'Ambient Chromatherapy Light Spectrum',
        imageUrl: '/images/portfolio/motion-graphics/kohler-av/still-3.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-av/still-3.webp',
        tag: 'Chroma Light',
        description: 'Immersive soothing color transitions calibrated to match musical energy and relaxation tempos.'
      },
      {
        id: 'av-still-4',
        title: 'Moody Luxury Wellness Sanctuary Suite',
        imageUrl: '/images/portfolio/motion-graphics/kohler-av/still-4.webp',
        highResUrl: '/images/portfolio/motion-graphics/kohler-av/still-4.webp',
        tag: 'Master Suite',
        description: 'Atmospheric wide angle showcasing volumetric mist, dark slate surfaces, and pure serenity.'
      }
    ]
  },
  {
    id: 'proj-ue5-realtime-showcase-1',
    slug: 'biocon-25d-walkthrough-experience',
    title: 'Biocon 2.5D Walkthrough Experience',
    subtitle: 'Interactive Pharmaceutical & Laboratory Facility Spatial Tour',
    domainId: 'full-stack',
    collectionId: 'webxr-unreal',
    client: 'Biocon',
    year: '2024',
    role: 'Lead 3D Visualizer & Interactive Experience Developer',
    youtubeId: 'H9XmsDbvflM',
    badge: 'Biocon • 2.5D Tour',
    featured: true,
    coverImage: 'https://img.youtube.com/vi/H9XmsDbvflM/hqdefault.jpg',
    shortDescription: 'Interactive 2.5D walkthrough and virtual presentation suite developed for Biocon, showcasing cleanroom architecture, laboratory layouts, and pharmaceutical research facilities.',
    fullOverview: 'Created for Biocon enterprise communications and facility tours. Combines layered 3D spatial renders with interactive navigation triggers, smooth camera transitions, and informative UI callouts for visitors to explore Biocon research facilities directly inside the web browser.',
    technicalDecisions: [
      'Layered 2.5D parallax projection maps for responsive, zero-latency browser performance.',
      'Interactive hotspot overlays triggering detail cards for laboratory equipment and zoning.',
      'Lightweight texture compression optimized for mobile and corporate client networks.',
      'Color-calibrated to Biocon enterprise medical branding standards.'
    ],
    specs: {
      software: ['Unreal Engine / 3D DCC', 'After Effects', 'TypeScript / Web', 'Photoshop'],
      renderEngine: 'Real-Time Web Interactive Engine',
      deliveryFormat: 'Web Browser Interactive Walkthrough & 4K Master Video'
    },
    metrics: [
      { label: 'Client', value: 'Biocon' },
      { label: 'Platform', value: 'Web Interactive' },
      { label: 'Resolution', value: 'Full HD / 4K' },
      { label: 'Experience', value: '2.5D Spatial' }
    ],
    galleryImages: [
      'https://img.youtube.com/vi/H9XmsDbvflM/hqdefault.jpg',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    plans: [
      {
        title: 'Biocon Cleanroom Zoning & Spatial Flow',
        type: 'Facility Spatial Layout',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        description: 'Sterile corridor transitions, laboratory cleanroom zoning, and visitor camera flight paths.',
        scale: '1:100 Architectural'
      },
      {
        title: 'Interactive Hotspot & Parallax Depth Blueprint',
        type: '2.5D Interaction Schematic',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        description: 'Multi-depth parallax projection coordinates and interactive event nodes for facility navigation.',
        scale: 'Normalized Web Viewport'
      }
    ]
  },
  {
    id: 'proj-webxr-spatial-simulation-2',
    slug: 'hairdryer-3d-interactive-web-sim',
    title: 'Hairdryer 3D Interactive Web Simulator',
    subtitle: 'Real-Time 3D Product Configurator & Airflow Physics in Browser',
    domainId: 'full-stack',
    collectionId: 'webxr-unreal',
    client: 'Product Engineering & Web3D',
    year: '2024',
    role: '3D Interactive Artist & Technical Director',
    youtubeId: 'YQl51dy0HsY',
    badge: 'Web3D • Interactive Sim',
    featured: true,
    coverImage: 'https://img.youtube.com/vi/YQl51dy0HsY/hqdefault.jpg',
    shortDescription: 'Real-time interactive 3D product simulation of a modern consumer hairdryer, featuring full orbit controls, component breakdowns, and interactive physics directly in the browser.',
    fullOverview: 'Engineered to demonstrate next-generation e-commerce and interactive product exploration. Users can freely rotate the product in 360 degrees, inspect mechanical CAD ergonomics, toggle airflow velocity simulations, and test colorway variations with instantaneous real-time response.',
    technicalDecisions: [
      'PBR metallic and matte satin plastic shaders calibrated for realistic studio lighting reflection.',
      'Real-time particle airflow simulation demonstrating aerodynamic heat and velocity dispersion.',
      'Smooth orbit controls, pinch-to-zoom, and boundary collision damping.',
      'Ultra-low memory footprint running at 60 FPS across desktop and mobile browsers.'
    ],
    specs: {
      software: ['Three.js / WebXR', 'Blender / Cinema 4D', 'Substance 3D Painter', 'TypeScript'],
      polyCount: '180K Optimized Quads',
      renderEngine: 'WebGL / WebGPU PBR Real-Time Engine',
      deliveryFormat: 'Interactive Web Application & 60 FPS Video Demonstration'
    },
    metrics: [
      { label: 'Framerate', value: '60 FPS Smooth' },
      { label: 'Load Time', value: '< 1.2s WebGL' },
      { label: '3D Controls', value: '360° Orbit & Zoom' },
      { label: 'PBR Shaders', value: '100% Calibrated' }
    ],
    galleryImages: [
      'https://img.youtube.com/vi/YQl51dy0HsY/hqdefault.jpg',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80'
    ],
    plans: [
      {
        title: 'CAD Ergonomic Schematics & Dimension Tolerances',
        type: 'Mechanical CAD Blueprint',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
        description: 'Injection mold parting lines, heat coil chamber clearances, and handle curvature ergonometrics.',
        scale: '1:1 Millimeter Precision'
      },
      {
        title: 'Aerodynamic Velocity & Heat Dispersion Grid',
        type: 'Airflow Physics Schematic',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
        description: 'CFD aerodynamic vector paths and real-time particle emitter volume constraints.',
        scale: 'Fluid Dynamic Vector Grid'
      }
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
    id: 'proj-ue5-virtual-world-3',
    slug: 'interactive-archviz-unreal-engine-web',
    title: 'Interactive Archviz Unreal Engine ｜ Outdoor & Indoor on Web Browser',
    subtitle: 'Photorealistic Architectural Walkthrough Running in Browser via Pixel Streaming',
    domainId: 'full-stack',
    collectionId: 'webxr-unreal',
    client: 'Luxury Architecture & Real Estate',
    year: '2024 - 2025',
    role: 'Unreal Engine Technical Artist & ArchViz Lead',
    youtubeId: '185ThgS5plA',
    badge: 'UE5 • Web Pixel Streaming',
    featured: true,
    coverImage: 'https://img.youtube.com/vi/185ThgS5plA/hqdefault.jpg',
    shortDescription: 'Photorealistic architectural visualization powered by Unreal Engine 5, featuring seamless transitions between indoor luxury suites and outdoor natural landscapes, delivered directly on the web browser.',
    fullOverview: 'A state-of-the-art interactive architectural showcase. Built with Unreal Engine 5.4 Lumen global illumination, Nanite virtualized architectural geometry, and delivered directly to any web browser without requiring local high-end GPUs. Clients can explore day-to-night lighting shifts, inspect material swatches, and navigate expansive indoor-outdoor architectural environments.',
    technicalDecisions: [
      'Low-latency WebRTC pixel streaming pipeline bringing 60 FPS Unreal Engine 5.4 directly into web browsers.',
      'Lumen hardware raytraced GI handling soft sun spill and warm 2700K recessed interior cove lights.',
      'Dynamic outdoor foliage wind simulations paired with Nanite stone and timber masonry.',
      'Two-way UI communication between React / Next.js web controls and Unreal Engine Blueprints.'
    ],
    specs: {
      software: ['Unreal Engine 5.4', 'Lumen & Nanite', 'Pixel Streaming / WebRTC', 'Blueprints', 'Substance Designer'],
      renderEngine: 'UE5 Lumen Real-Time Hardware Raytracing',
      polyCount: '120M Nanite Triangles',
      deliveryFormat: 'Interactive Web Stream & 4K HDR Cinematic Masters'
    },
    metrics: [
      { label: 'Streaming FPS', value: '60 FPS 1080p/4K' },
      { label: 'Latency', value: '< 30ms WebRTC' },
      { label: 'Nanite Triangles', value: '120M Geometry' },
      { label: 'Lighting Pass', value: 'Lumen HW Raytracing' }
    ],
    galleryImages: [
      'https://img.youtube.com/vi/185ThgS5plA/hqdefault.jpg',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    plans: [
      {
        title: 'Indoor-to-Outdoor Architectural Master Plan',
        type: 'Architectural Floor & Landscape Plan',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        description: 'Interior living pavilion, exterior terrace reflection pools, and surrounding topography boundaries.',
        scale: '1:50 Architectural Metric'
      },
      {
        title: 'Lumen Dynamic Sun & Interior Lighting Schematic',
        type: 'Lighting Volumes & Lumen Rig',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        description: 'Directional sun trajectory, sky atmosphere density, and warm 2700K recessed interior cove lights.',
        scale: 'UE5 World Units'
      }
    ]
  },
  {
    id: 'proj-product-black-decker-washer',
    slug: 'black-decker-smart-inverter-washer',
    title: 'Black+Decker Smart Inverter Front-Load Washer',
    subtitle: 'Industrial Engineering Cutaway, Direct Drive Inverter & Intuitive Control Dial',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Black+Decker',
    year: '2024',
    role: 'Lead 3D Industrial & Surface Artist',
    coverImage: '/images/portfolio/product-renders/black-decker-washing-machine/master.webp',
    clayImage: '/images/portfolio/product-renders/black-decker-washing-machine/viewport.webp',
    badge: 'Industrial CGI • Black+Decker',
    featured: true,
    aspectRatio: 'wide',
    designThinking: BLACK_DECKER_WASHER_DESIGN_THINKING,
    shortDescription: 'Industrial engineering visualization of the Black+Decker front-load washing machine featuring internal mechanical cutaways, direct-drive stator coils, diamond drum, and Cinema 4D wireframe proof.',
    fullOverview: 'Developed for Black+Decker industrial marketing, this project visualizes both exterior industrial styling and complex internal mechanical assemblies. Features an exploded cutaway revealing the outer tub, copper induction motor, stainless shock dampers, and counterweights, alongside micro-macro studies of the knurled capacitive dial and diamond drum. Modeled with sub-millimeter precision in Cinema 4D, shaded with photorealistic physical materials in Corona Render Engine, and color-graded in Adobe Photoshop.',
    technicalDecisions: [
      'Engineered detailed internal mechanical CAD assembly with true-to-scale motor stator, suspension springs, and cast iron counterweights.',
      'Calibrated anisotropic brushed metal and diamond-embossed stainless steel shaders for the internal wash drum.',
      'Multi-layer optical glass shader with smoked tint absorption and anti-reflective Fresnel coating for the outer door.',
      'Native Cinema 4D viewport wireframe pass preserved as authentic proof of complex quad topology.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '4.6M Subdivided Quad Polygons',
      renderEngine: 'Corona Render Engine (Photorealistic Physical GI)',
      lightingSetup: 'Studio Cyclorama Lighting with Softbox Grazing Highlights',
      deliveryFormat: 'Master Product Renders & Exploded Engineering Stills'
    },
    metrics: [
      { label: 'Client', value: 'Black+Decker' },
      { label: 'SubD Mesh', value: '4.6M Polys' },
      { label: 'Engine', value: 'Corona GI' },
      { label: 'Proof', value: 'C4D Viewport' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/black-decker-washing-machine/master.webp',
      '/images/portfolio/product-renders/black-decker-washing-machine/cutaway.webp',
      '/images/portfolio/product-renders/black-decker-washing-machine/dial.webp',
      '/images/portfolio/product-renders/black-decker-washing-machine/drum.webp',
      '/images/portfolio/product-renders/black-decker-washing-machine/viewport.webp',
    ],
    views: [
      {
        id: 'washer-v1',
        camNumber: 'CAM 01',
        name: 'Smart Wash Master Perspective',
        tag: 'Master Product Hero',
        imageUrl: '/images/portfolio/product-renders/black-decker-washing-machine/master.webp',
        highResUrl: '/images/portfolio/product-renders/black-decker-washing-machine/master.webp',
        description: 'Flagship perspective showcasing the anodized gunmetal chassis, smoked glass door, and elegant laundry room styling.'
      },
      {
        id: 'washer-cutaway',
        camNumber: 'CAM 02',
        name: 'Engineered Within: Cutaway Anatomy',
        tag: 'Mechanical Cutaway',
        imageUrl: '/images/portfolio/product-renders/black-decker-washing-machine/cutaway.webp',
        highResUrl: '/images/portfolio/product-renders/black-decker-washing-machine/cutaway.webp',
        description: 'Internal cross-section cutaway revealing the outer tub, copper induction motor stator, suspension dampers, and counterweights.'
      },
      {
        id: 'washer-dial',
        camNumber: 'CAM 03',
        name: 'Intuitive UI Control Dial & Display',
        tag: 'Macro Interface Detail',
        imageUrl: '/images/portfolio/product-renders/black-decker-washing-machine/dial.webp',
        highResUrl: '/images/portfolio/product-renders/black-decker-washing-machine/dial.webp',
        description: 'Extreme macro closeup on the micro-chamfered rotary dial, capacitive touch controls, and crisp digital status display.'
      },
      {
        id: 'washer-drum',
        camNumber: 'CAM 04',
        name: 'Precision In Every Rotation Drum',
        tag: 'Stainless Drum Macro',
        imageUrl: '/images/portfolio/product-renders/black-decker-washing-machine/drum.webp',
        highResUrl: '/images/portfolio/product-renders/black-decker-washing-machine/drum.webp',
        description: 'Interior drum perspective showcasing procedural diamond embossing, micro-perforations, and curved stainless agitator fins.'
      },
      {
        id: 'washer-viewport',
        camNumber: 'VIEWPORT',
        name: 'Cinema 4D Viewport Modeling Proof',
        tag: 'C4D Native Wireframe Proof',
        imageUrl: '/images/portfolio/product-renders/black-decker-washing-machine/viewport.webp',
        highResUrl: '/images/portfolio/product-renders/black-decker-washing-machine/viewport.webp',
        description: 'Cinema 4D native workspace capture showing quad polygon flow, camera focal lengths, and scene hierarchy proof (Not AI).'
      }
    ]
  },
  {
    id: 'proj-product-kohler-fore-faucet',
    slug: 'kohler-fore-monolithic-faucet',
    title: 'Kohler Fore™ Monolithic Tapware Collection',
    subtitle: 'Neo-Modern Aerodynamic Faucet Architecture & Precision Ceramic Cartridge',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Kohler',
    year: '2023',
    role: 'Senior 3D Visualizer & Hard-Surface Modeler',
    coverImage: '/images/portfolio/product-renders/kohler-fore-faucet/master.webp',
    badge: 'Product CGI • Kohler',
    featured: true,
    aspectRatio: 'wide',
    designThinking: KOHLER_FORE_FAUCET_DESIGN_THINKING,
    shortDescription: 'High-precision 3D visualization of the Kohler Fore™ tapware line featuring aerodynamic curved geometry, mirror-polished chrome PVD, and architectural vanity staging.',
    fullOverview: 'Created for Kohler product marketing and catalog presentations. The Fore™ tapware line blends monolithic architectural volumes with aerodynamic fluid arcs. Modeled as high-density quad geometry from engineering blueprints, with physical Fresnel specular reflection maps capturing pristine chrome reflections without distortion. Staged in a sunlit architectural bathroom suite with textured stone and vessel ceramic.',
    technicalDecisions: [
      'NURBS-to-SubD polygon modeling ensuring continuous G2 curvature transitions along the tap body.',
      'Physical specular PVD chrome shader calibrated with measured optical IOR values.',
      'Rendered in Corona Render Engine with high-sample caustics and subtle grazing rim illumination.',
      'Master output delivered in 4K resolution (4096 x 2160 px) for global digital and print campaigns.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '1.8M Polygons (Subdivided Quad Geometry)',
      renderEngine: 'Corona Render Engine (Photorealistic GI)',
      lightingSetup: 'Studio Softbox Grazing Lights & Warm Natural Skylight',
      deliveryFormat: '4K Master Stills (4096 x 2160 px)'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Finish', value: 'Polished Chrome' },
      { label: 'Resolution', value: '4K Master' },
      { label: 'Design', value: 'Fore Neo-Modern' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/kohler-fore-faucet/master.webp',
      '/images/portfolio/product-renders/kohler-fore-faucet/angle-2.webp',
    ],
    views: [
      {
        id: 'fore-v1',
        camNumber: 'CAM 01',
        name: 'Fore Faucet Master Architectural Perspective',
        tag: 'Master Product Hero',
        imageUrl: '/images/portfolio/product-renders/kohler-fore-faucet/master.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-fore-faucet/master.webp',
        description: 'Flagship perspective showcasing the aerodynamic spout profile, mirror chrome reflections, and vessel basin pairing.'
      },
      {
        id: 'fore-v2',
        camNumber: 'CAM 02',
        name: 'Fore Faucet Secondary Vanity Environment',
        tag: 'Spatial Context View',
        imageUrl: '/images/portfolio/product-renders/kohler-fore-faucet/angle-2.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-fore-faucet/angle-2.webp',
        description: 'Secondary spatial angle contextualizing the faucet against natural marble, warm timber, and ambient daylight.'
      }
    ]
  },
  {
    id: 'proj-product-kohler-mle-faucets',
    slug: 'kohler-modernlife-edge-faucets',
    title: 'Kohler ModernLife Edge™ (MLE) Faucet Series',
    subtitle: 'Minimalist Floating Rear-Handle Architecture & Turntable Product Study',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Kohler',
    year: '2023',
    role: '3D Hard-Surface Modeler & Lighting Artist',
    coverImage: '/images/portfolio/product-renders/kohler-mle-faucets/angle-1.webp',
    badge: 'Product CGI • Kohler',
    featured: false,
    aspectRatio: 'square',
    designThinking: KOHLER_MLE_FAUCET_DESIGN_THINKING,
    shortDescription: 'Product turntable visualization of the Kohler ModernLife Edge™ faucet series, highlighting its innovative floating rear-mounted lever and slender rectangular spout.',
    fullOverview: 'The Kohler ModernLife Edge™ collection challenges conventional faucet design by relocating the operating lever to the rear of the body. This creates an uncluttered floating silhouette that prevents water pooling at the base and simplifies countertop cleaning. Staged as a studio turntable series against a neutral studio backdrop to emphasize edge micro-bevels and reflection continuity.',
    technicalDecisions: [
      'Sub-millimeter edge micro-bevels on all rectangular corners to eliminate CG sharpness and catch realistic specular highlights.',
      'Physically accurate PVD chrome and brushed finish shaders.',
      'Studio cyclorama 3-point lighting rig calibrated for clean metallic horizon gradients.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '1.4M Polygons',
      renderEngine: 'Corona Render Engine',
      lightingSetup: 'Studio Cyclorama 3-Point Light Rig',
      deliveryFormat: 'Turntable Animation Stills & Catalog Assets'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Collection', value: 'ModernLife Edge' },
      { label: 'Handle', value: 'Rear Float-Mount' },
      { label: 'Finish', value: 'Polished Chrome' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/kohler-mle-faucets/angle-1.webp',
      '/images/portfolio/product-renders/kohler-mle-faucets/angle-2.webp',
      '/images/portfolio/product-renders/kohler-mle-faucets/angle-3.webp',
    ],
    views: [
      {
        id: 'mle-v1',
        camNumber: 'CAM 01',
        name: 'ModernLife Edge Turntable Study: 45° Angle',
        tag: 'Studio Turntable',
        imageUrl: '/images/portfolio/product-renders/kohler-mle-faucets/angle-1.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mle-faucets/angle-1.webp',
        description: '45-degree angle showcasing the ultra-slender spout and elevated rear lever mechanism.'
      },
      {
        id: 'mle-v2',
        camNumber: 'CAM 02',
        name: 'ModernLife Edge Turntable Study: Front Profile',
        tag: 'Front Ortho-Perspective',
        imageUrl: '/images/portfolio/product-renders/kohler-mle-faucets/angle-2.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mle-faucets/angle-2.webp',
        description: 'Direct front perspective demonstrating the slender vertical profile and minimalist proportions.'
      },
      {
        id: 'mle-v3',
        camNumber: 'CAM 03',
        name: 'ModernLife Edge Turntable Study: Rear Lever Accent',
        tag: 'Rear Float Handle View',
        imageUrl: '/images/portfolio/product-renders/kohler-mle-faucets/angle-3.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mle-faucets/angle-3.webp',
        description: 'Rear angle highlighting the smooth ergonomic lever action and seamless base cylinder.'
      }
    ]
  },
  {
    id: 'proj-product-kohler-mle-deco',
    slug: 'kohler-mle-untamed-nature-deco',
    title: 'Kohler ModernLife Edge™ Deco: Untamed Nature',
    subtitle: 'Laser-Etched Botanical Art Deco Motifs on Polished Chrome & Luxury Vanity',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Kohler',
    year: '2023',
    role: 'Lead Texture & Shading Artist',
    coverImage: '/images/portfolio/product-renders/kohler-mle-deco/context.webp',
    badge: 'Art Deco CGI • Kohler',
    featured: true,
    aspectRatio: 'standard',
    designThinking: KOHLER_MLE_DECO_DESIGN_THINKING,
    shortDescription: 'Delicate laser-etched botanical Art Deco patterns integrated into Kohler ModernLife Edge™ tapware, staged in an opulent hospitality vanity environment.',
    fullOverview: 'The Untamed Nature decorative edition of Kohler ModernLife Edge™ incorporates intricate laser-etched botanical motifs onto mirror-polished chrome. This project required micro-displacement mapping to accurately capture the tactile depth of the laser etching, illuminated with warm grazing lighting against Calacatta gold quartzite and fluted architectural timber.',
    technicalDecisions: [
      'Created custom vector displacement and roughness maps derived from Kohler floral pattern specifications.',
      'Grazing IES spotlight placement accentuating the micro-etched relief on polished chrome.',
      'Full architectural spatial context with honed Calacatta quartzite and warm acoustic slats.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '2.1M Subdivided Polygons',
      renderEngine: 'Corona Render Engine (Micro-Displacement Laser Etch)',
      lightingSetup: 'Grazing IES Spotlights & Ambient Studio Softbox',
      deliveryFormat: 'Master Catalog Stills & Macro Closeups'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Edition', value: 'Untamed Nature Deco' },
      { label: 'Craft', value: 'Laser-Etched Chrome' },
      { label: 'Setting', value: 'Hospitality Vanity' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/kohler-mle-deco/context.webp',
      '/images/portfolio/product-renders/kohler-mle-deco/master.webp',
    ],
    views: [
      {
        id: 'mle-deco-v1',
        camNumber: 'CAM 01',
        name: 'Untamed Nature: Master Final Render',
        tag: 'Main & Final Render',
        imageUrl: '/images/portfolio/product-renders/kohler-mle-deco/context.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mle-deco/context.webp',
        description: 'Official master final render framing the decorative tapware against a lush waterfall, natural stone boulders, and ambient outdoor daylighting.'
      },
      {
        id: 'mle-deco-v2',
        camNumber: 'CAM 02',
        name: 'Untamed Nature: Laser-Etched Botanical Macro',
        tag: 'Macro Surface Etching',
        imageUrl: '/images/portfolio/product-renders/kohler-mle-deco/master.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mle-deco/master.webp',
        description: 'Close-up studio macro pass revealing the intricate botanical filigree, specular reflection falloff, and laser-etched relief.'
      }
    ]
  },
  {
    id: 'proj-product-kohler-mirrors',
    slug: 'kohler-sculpted-mirrors-silhouettes',
    title: 'Kohler Sculpted Mirrors: Three Architectural Silhouettes',
    subtitle: 'Edge-Lit Ambient Luminescence, Floating Geometry & High-CRI Vanity Backlighting',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Kohler',
    year: '2023',
    role: 'Lighting Specialist & 3D Environment Artist',
    coverImage: '/images/portfolio/product-renders/kohler-mirrors/master.webp',
    badge: 'Lighting CGI • Kohler',
    featured: false,
    aspectRatio: 'wide',
    designThinking: KOHLER_MIRRORS_DESIGN_THINKING,
    shortDescription: 'Spatial lighting visualization of Kohler backlit mirrors in arched, pill, and rectangular silhouettes with 3000K daylight-balanced edge glow.',
    fullOverview: 'Visualizing Kohler illuminated architectural mirrors across three core silhouettes: Arched, Capsule/Pill, and Rectangular. Utilized Corona LightMix to dial in the soft, diffused perimeter LED luminescence against micro-textured plaster walls, providing realistic daylight vanity illumination while maintaining crisp optical mirror clarity.',
    technicalDecisions: [
      'Engineered realistic optical mirror shaders with dual-surface glass reflection and zero double-image artifacts.',
      'Corona LightMix volumetric perimeter LED light emitters calibrated to 3000K warm-white with 90+ CRI simulation.',
      'Delivered triptych layout framing all three mirror silhouettes alongside a single ambient study.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '1.2M Polygons',
      renderEngine: 'Corona LightMix (Physical LED Emission)',
      lightingSetup: 'Perimeter Diffused LED Strip & Grazing Wall Illumination',
      deliveryFormat: 'Master Architectural Marketing Stills'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Category', value: 'Illuminated Mirrors' },
      { label: 'CRI Rating', value: '90+ Daylight Spectrum' },
      { label: 'Forms', value: 'Arch, Pill & Rectangle' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/kohler-mirrors/master.webp',
      '/images/portfolio/product-renders/kohler-mirrors/illumination.webp',
    ],
    views: [
      {
        id: 'mirrors-v1',
        camNumber: 'CAM 01',
        name: 'Three Mirror Silhouettes Triptych',
        tag: 'Master Product Hero',
        imageUrl: '/images/portfolio/product-renders/kohler-mirrors/master.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mirrors/master.webp',
        description: 'Triptych presentation of all three architectural mirror silhouettes floating against modern acoustic slatting.'
      },
      {
        id: 'mirrors-v2',
        camNumber: 'CAM 02',
        name: 'Light, Shaped by Design Luminescence Study',
        tag: 'Ambient Halo Lighting',
        imageUrl: '/images/portfolio/product-renders/kohler-mirrors/illumination.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-mirrors/illumination.webp',
        description: 'Atmospheric single-mirror lighting study highlighting the warm perimeter LED glow against textured architectural plaster.'
      }
    ]
  },
  {
    id: 'proj-product-kohler-sculpted-chrome',
    slug: 'kohler-sculpted-commercial-faucet',
    title: 'Kohler Sculpted™ Commercial Chrome Faucet',
    subtitle: 'Fluid Curvilinear Geometry, Insight™ Infrared Sensor & Vandal-Resistant Brass',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Kohler',
    year: '2023',
    role: '3D Hard-Surface Modeler & Surface Shading Artist',
    coverImage: '/images/portfolio/product-renders/kohler-sculpted-chrome/detail.webp',
    badge: 'Product CGI • Kohler',
    featured: false,
    aspectRatio: 'standard',
    designThinking: KOHLER_SCULPTED_CHROME_DESIGN_THINKING,
    shortDescription: 'Industrial CGI visualization of Kohler Sculpted™ electronic touchless faucet, featuring organic seamless brass curvature and Insight™ infrared sensor integration.',
    fullOverview: 'The Kohler Sculpted™ electronic faucet combines commercial-grade durability with an organic, flowing silhouette. Featuring an integrated Insight™ adaptive infrared sensor hidden under the spout, this CGI study focuses on fluid surface continuity without parting lines, finished in mirror-polished chrome.',
    technicalDecisions: [
      'Modeled using subdivision surfaces with strict tangency continuity across all curvilinear transitions.',
      'Integrated dark optical sensor window with authentic anti-reflective polycarbonate shader.',
      'Controlled studio softbox cyclorama reflections to define the sculpted spout curvature.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '1.6M Subdivided Quad Polygons',
      renderEngine: 'Corona Render Engine (Ultra-Smooth Specular Chrome)',
      lightingSetup: 'Studio Cyclorama Softbox Arrays',
      deliveryFormat: 'Master Product Catalog Stills'
    },
    metrics: [
      { label: 'Client', value: 'Kohler' },
      { label: 'Model', value: 'Sculpted™ Touchless' },
      { label: 'Technology', value: 'Insight™ Infrared' },
      { label: 'Finish', value: 'Polished Chrome (-CP)' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/kohler-sculpted-chrome/detail.webp',
      '/images/portfolio/product-renders/kohler-sculpted-chrome/master.webp',
    ],
    views: [
      {
        id: 'sculpted-v1',
        camNumber: 'CAM 01',
        name: 'Sculpted Chrome in Every Detail Master',
        tag: 'Master Product Hero',
        imageUrl: '/images/portfolio/product-renders/kohler-sculpted-chrome/detail.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-sculpted-chrome/detail.webp',
        description: 'Flagship elevation shot framing the fluid chrome body and reflective base against a dark cyclorama.'
      },
      {
        id: 'sculpted-v2',
        camNumber: 'CAM 02',
        name: 'Sculpted Chrome Curvature Macro',
        tag: 'Curvilinear Geometry',
        imageUrl: '/images/portfolio/product-renders/kohler-sculpted-chrome/master.webp',
        highResUrl: '/images/portfolio/product-renders/kohler-sculpted-chrome/master.webp',
        description: 'Macro pass on the organic neck curve and flush aerator assembly.'
      }
    ]
  },
  {
    id: 'proj-product-queo-basin',
    slug: 'queo-luxury-ceramic-basin',
    title: 'QUEO European Luxury Countertop Art Basin',
    subtitle: 'Sculpted Ceramic Flow, Super-Smooth High-Gloss Glaze & Minimalist Vanity',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'QUEO',
    year: '2021 - 2022',
    role: '3D Architectural & Ceramic Artist',
    coverImage: '/images/portfolio/product-renders/queo-basin/master.webp',
    badge: 'Ceramic CGI • QUEO',
    featured: false,
    aspectRatio: 'standard',
    designThinking: QUEO_BASIN_DESIGN_THINKING,
    shortDescription: 'Photorealistic 3D visualization of QUEO European luxury countertop vessel basin, featuring organic sculpted contours and radiant high-gloss vitreous glaze.',
    fullOverview: 'Created for QUEO Luxury Bathrooms European sanitaryware collections. The countertop art basin features flowing asymmetrical organic contours inspired by water movement. Rendered with physical subsurface scattering in Corona to reproduce the dense, radiant glow of premium European vitreous ceramic china.',
    technicalDecisions: [
      'Subdivision surface modeling with ultra-fine rim tapering and smooth drain curvature.',
      'Calibrated Corona Physical SSS material reproducing deep light penetration of ceramic china glaze.',
      'Natural morning skylight simulation combined with soft studio rim fill.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '1.9M Polygons',
      renderEngine: 'Corona Render Engine (Physical Ceramic SSS)',
      lightingSetup: 'Warm Natural Daylight & Studio Rim Fill',
      deliveryFormat: 'European Luxury Sanitaryware Stills'
    },
    metrics: [
      { label: 'Client', value: 'QUEO Luxury' },
      { label: 'Material', value: 'Vitreous Ceramic' },
      { label: 'Glaze', value: 'High-Gloss White' },
      { label: 'Type', value: 'Table-Mount Basin' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/queo-basin/master.webp',
      '/images/portfolio/product-renders/queo-basin/environment.webp',
    ],
    views: [
      {
        id: 'queo-v1',
        camNumber: 'CAM 01',
        name: 'QUEO Basin Studio Hero Elevation',
        tag: 'Master Ceramic Hero',
        imageUrl: '/images/portfolio/product-renders/queo-basin/master.webp',
        highResUrl: '/images/portfolio/product-renders/queo-basin/master.webp',
        description: 'Direct elevation shot highlighting the flowing ceramic profile and lustrous glaze reflections.'
      },
      {
        id: 'queo-v2',
        camNumber: 'CAM 02',
        name: 'QUEO Basin Atmospheric Bathroom Context',
        tag: 'Spatial Environment View',
        imageUrl: '/images/portfolio/product-renders/queo-basin/environment.webp',
        highResUrl: '/images/portfolio/product-renders/queo-basin/environment.webp',
        description: 'Warm natural bathroom context pairing the basin with brushed gold tapware and textured stone walls.'
      }
    ]
  },
  {
    id: 'proj-product-luxury-wc-suite',
    slug: 'minimalist-rimless-wall-hung-wc',
    title: 'Minimalist Rimless Luxury Wall-Hung WC Suite',
    subtitle: 'Concealed Cistern Engineering, Soft-Close Ergonomics & High-Gloss Ceramic Form',
    domainId: '3d-spatial',
    collectionId: 'product-renders',
    client: 'Sanitaryware Studio / Kohler',
    year: '2023',
    role: '3D Hard-Surface Modeler & Form Developer',
    coverImage: '/images/portfolio/product-renders/luxury-wc-suite/master.webp',
    badge: 'Sanitaryware CGI',
    featured: false,
    aspectRatio: 'standard',
    designThinking: LUXURY_WC_SUITE_DESIGN_THINKING,
    shortDescription: 'Industrial sanitaryware 3D form development of a wall-hung rimless luxury water closet with cantilever mounting and ergonomic soft-close seat.',
    fullOverview: 'Developed for high-end residential and hospitality sanitaryware catalogs. This rimless wall-hung toilet model focuses on cantilever floating geometry, smooth concealed fixing channels, and hygienic rimless flushing internal contours. Visualized in clean studio cyclorama lighting to emphasize form purity.',
    technicalDecisions: [
      'Quad-based topology modeling with precise wall-mounting bolt and waste pipe clearances.',
      'Duroplast slim seat and cover modeled with quick-release stainless hinge hardware.',
      'High-gloss ceramic porcelain shader with subtle ambient occlusion pass.'
    ],
    specs: {
      software: ['Cinema 4D', 'Corona Render Engine', 'Photoshop'],
      polyCount: '1.1M Polygons',
      renderEngine: 'Corona Render Engine (Porcelain Glaze GI)',
      lightingSetup: 'Neutral Studio Key & Ambient Occlusion Rig',
      deliveryFormat: 'Technical Sanitaryware Stills'
    },
    metrics: [
      { label: 'Type', value: 'Wall-Hung Rimless' },
      { label: 'Mounting', value: 'Concealed Carrier' },
      { label: 'Finish', value: 'High-Gloss White' },
      { label: 'Seat', value: 'Duroplast Slim' }
    ],
    galleryImages: [
      '/images/portfolio/product-renders/luxury-wc-suite/master.webp',
      '/images/portfolio/product-renders/luxury-wc-suite/profile.webp',
    ],
    views: [
      {
        id: 'wc-v1',
        camNumber: 'CAM 01',
        name: 'Rimless Wall-Hung WC Isometric Studio Angle',
        tag: 'Master Form Study',
        imageUrl: '/images/portfolio/product-renders/luxury-wc-suite/master.webp',
        highResUrl: '/images/portfolio/product-renders/luxury-wc-suite/master.webp',
        description: 'Isometric studio render emphasizing the clean rimless bowl contours and slim seat profile.'
      },
      {
        id: 'wc-v2',
        camNumber: 'CAM 02',
        name: 'Wall-Mounted Floating Side Profile',
        tag: 'Ergonomic Profile Angle',
        imageUrl: '/images/portfolio/product-renders/luxury-wc-suite/profile.webp',
        highResUrl: '/images/portfolio/product-renders/luxury-wc-suite/profile.webp',
        description: 'Clean side profile demonstrating cantilever elevation and concealed trapway styling.'
      }
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
