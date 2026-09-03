# Gaurav Roy — Creative Technologist & Senior 3D Designer Portfolio

> A cutting-edge, high-performance portfolio website built with **Next.js 14**, **Three.js**, **Tailwind CSS**, and **Canvas 2D Procedural Kinematics**. Features an abyssal dark aesthetic, procedural skeletal bioluminescence, 3-tier glassmorphic project architecture, and framerate-independent physics.

---

## 📑 Table of Contents

1. [Visual & Design Perspective](#-visual--design-perspective)
   - [Design Philosophy & Color System](#design-philosophy--color-system)
   - [Hero & Abyssal Atmosphere](#hero--abyssal-atmosphere)
   - [Procedural Skeletal Creature (Kinematics & Rainbow Luminescence)](#procedural-skeletal-creature)
   - [Floating Marine Snow & Plankton](#floating-marine-snow--plankton)
   - [3-Tier Glassmorphic Project Architecture](#3-tier-glassmorphic-project-architecture)
   - [3D Procedural WebGL Sculpture](#3d-procedural-webgl-sculpture)
   - [Specialty Cards with Perimeter Lighting](#specialty-cards-with-perimeter-lighting)
   - [Command Menu, Resume & Cinema Modals](#command-menu-resume--cinema-modals)
2. [Developer Perspective](#-developer-perspective)
   - [Tech Stack & Dependencies](#tech-stack--dependencies)
   - [Architecture & Directory Structure](#architecture--directory-structure)
   - [Key Technical Implementations](#key-technical-implementations)
     - [Framerate-Independent Delta-Time Physics (dt)](#1-framerate-independent-delta-time-physics-dt)
     - [Mobile Performance Engineering](#2-mobile-performance-engineering)
     - [Hardware-Accelerated Subpixel Alpha Masking](#3-hardware-accelerated-subpixel-alpha-masking)
     - [Scroll Memory & Restoration](#4-scroll-memory--restoration)
   - [Local Development & Build Instructions](#local-development--build-instructions)
   - [CI/CD & GitHub Pages Deployment](#cicd--github-pages-deployment)
   - [Content Extensibility Guide](#content-extensibility-guide)

---

## 🎨 Visual & Design Perspective

### Design Philosophy & Color System
The visual language merges **Luxury Abyssal Cybernetics** with high-end spatial computing aesthetics:
- **Base Background**: Deep abyssal black-blue (`#060810`, `#081525`, `#04060A`).
- **Accent Primary**: Electric Bioluminescent Cyan (`#00F5FF`, `#06B6D4`).
- **Accent Secondary**: Deep Ultraviolet / Orchid Purple (`#C084FC`, `#8B5CF6`).
- **Chromatic Wave**: Full-spectrum travelling rainbow gradient applied during high-energy interaction states.
- **Glassmorphism**: Multilayered frosted backdrops (`bg-[#0E111D]/60`, `backdrop-blur-2xl`, subtle white borders `border-white/[0.08]`).

---

### Hero & Abyssal Atmosphere
- **Portrait Presentation**: Anchored circular spatial ring surrounding Gaurav's cutout portrait, masked smoothly using dynamic base-path SVG masks.
- **Bathymetric HUD Telemetry**: Fine monospace nautical telemetry tags (`// DEPTH: 4,820M • ABYSSAL ZONE`, `// SALINITY: 34.8 PSU`) and procedural bathymetric trench contours.
- **Top-Anchored Semicircle Dome**: Soft ambient gradient dome providing subtle volumetric illumination behind typography without high-contrast glare.

---

### Procedural Skeletal Creature
A custom Canvas 2D organism (`src/components/SkeletalWorm.tsx`) that brings the page to life:
- **Kinematic Structure**: 42 segments on desktop (18 segments on mobile) connected via forward and inverse kinematics.
- **Dual Behavior Modes**:
  1. **Portrait Orbit Mode**: When viewing the Hero section, the creature gracefully encircles the glowing circular frame behind the portrait.
  2. **Free-Roam Abyssal Exploration**: When scrolling through other sections, the creature autonomously patrols the viewport.
  3. **Mouse / Finger Tracking**: Swims fluidly toward cursor coordinates with sine-wave undulations, decelerating smoothly into an arrival deadzone.
- **Interactive Energy Ecosystem**:
  - Small glowing energy orbs spawn in designated screen zones.
  - The creature hunts orbs, creating a sparkle burst particle explosion, triggering energy surges, and floating `+1` score indicators.
- **Chromatic Rainbow Luminescence**:
  - **Head-Only Activation**: Surrounded by an invisible 38px trigger halo (26px on mobile) centered exclusively on its skull.
  - When the creature swims up to your mouse pointer, entering this halo ignites a traveling chromatic rainbow spectrum across its spine, ribs, nodules, and mandibles.
  - Brushing against body or tail segments does not trigger the effect, preventing accidental activation.
  - Viewport edge guards prevent activation when the cursor hovers near browser tabs or window borders.

---

### Floating Marine Snow & Plankton
- Floating bioluminescent particles in `src/components/DeepSeaAtmosphere.tsx` drift gently upward with independent breathing pulse phases, creating continuous ocean depth.

---

### 3-Tier Glassmorphic Project Architecture
The project section (`src/components/PortfolioSection.tsx`) implements a deep progressive disclosure model:

1. **Tier 1 — Discipline Feed**:
   - Filterable pill navigation: *All Disciplines, 3D Design, AI, WebXR, Branding*.
   - Minimalist 4-card pagination with left/right carousel arrows to prevent vertical clutter.
   - Clean 2-line layout per card: **Heading** + **1-line explanation**.
   - Hardware alpha-masking eliminates image edge lines across Windows 125%/135% display scaling.

2. **Tier 2 — Category Collage Page (`CategoryCollagePage.tsx`)**:
   - Clicking a discipline opens an immersive sub-category collage (e.g., *3D Design* → *Bathroom Design, Product Close-ups, 3D Renders, 3D Motion Graphics*).
   - Glassmorphic asymmetrical tiles displaying aspect-ratio-fitted imagery and key highlights.
   - Preserves previous scroll position and seamlessly returns users back to the `#work` section.

3. **Tier 3 — Design Thinking & Case Study Modal (`DesignThinkingModal.tsx`)**:
   - Clicking any collage tile launches the full project breakdown.
   - Includes interactive **Before/After Image Comparison Slider**, **Color Palette swatches**, **Material Choices**, **Lighting Setups**, and **Design Thinking Process** steps.

---

### 3D Procedural WebGL Sculpture
- Component: `src/components/ThreeCanvas.tsx`
- Procedural `TorusKnotGeometry` rendered using Three.js `MeshPhysicalMaterial` with realistic metallic sheen, clearcoat, roughness, and dynamic 4-point directional studio lighting.
- Responds organically to cursor movement with smooth rotational damping.

---

### Specialty Cards with Perimeter Lighting
- Component: `src/components/GlowBorderCard.tsx`
- Cards calculate the exact perimeter arc-length geometry and animate a constant-velocity (220px/sec) subtle purple accent beam tracing the card's rounded borders upon hover.

---

### Command Menu, Resume & Cinema Modals
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Instant fuzzy search across sections, contact links, and downloadable assets.
- **Resume Modal**: In-app PDF/profile viewer with download capabilities.
- **Cinema Video Player**: Overlay modal for high-definition 3D reel and animation playback.

---

## 💻 Developer Perspective

### Tech Stack & Dependencies

| Layer | Technologies / Libraries |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Static Export `output: 'export'`) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS 3, PostCSS, Autoprefixer |
| **3D Rendering** | [Three.js](https://threejs.org/) (`three@0.185.1`, `@types/three`) |
| **Animation / UI** | HTML5 Canvas 2D, Framer Motion, Lucide React Icons |
| **Build & Deploy** | GitHub Actions CI/CD → GitHub Pages |

---

### Architecture & Directory Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD pipeline
├── public/
│   └── images/                     # Project imagery, portraits, masks, icons
├── src/
│   ├── app/
│   │   ├── globals.css             # Tailwind base, typography & utility tokens
│   │   ├── layout.tsx              # Root HTML wrapper, metadata & font imports
│   │   └── page.tsx                # Main single-page application orchestrator
│   ├── components/
│   │   ├── CapabilitiesSection.tsx # Technical skill grid & competencies
│   │   ├── CategoryCollagePage.tsx # Tier 2 category collage view
│   │   ├── ClientMarquee.tsx       # Infinite client logo marquee
│   │   ├── CommandMenuModal.tsx    # Cmd+K quick navigation palette
│   │   ├── CompanyLogosSection.tsx # Partner brand display
│   │   ├── ContactFooter.tsx       # Terminal-style contact footer
│   │   ├── DeepSeaAtmosphere.tsx   # Canvas 2D floating marine snow & plankton
│   │   ├── DesignProcess.tsx       # 4-stage creative methodology
│   │   ├── DesignThinkingModal.tsx # Tier 3 deep case study & design specs modal
│   │   ├── ExperienceTimeline.tsx  # Career journey & milestones
│   │   ├── FeaturedWorkSection.tsx # Featured highlight with Three.js canvas
│   │   ├── GlowBorderCard.tsx      # Constant-speed perimeter beam card wrapper
│   │   ├── HeroSection.tsx         # Hero banner, portrait halo, metrics & CTAs
│   │   ├── ImageCompareSlider.tsx  # Interactive before/after split slider
│   │   ├── InteractiveBackground.tsx# Constellation particle backdrop
│   │   ├── LuxuryBackground.tsx    # Ambient dark blue backdrop composite
│   │   ├── MetricsBar.tsx          # Numerical career achievements bar
│   │   ├── Navbar.tsx              # Glassmorphic top navigation bar
│   │   ├── PortfolioSection.tsx    # Tier 1 filterable & paginated work feed
│   │   ├── ProductDetailModal.tsx  # Detailed product inspection view
│   │   ├── ResumeModal.tsx         # Downloadable CV modal viewer
│   │   ├── RussianDollExplorer.tsx # Nested discipline explorer
│   │   ├── SkeletalWorm.tsx        # Canvas 2D procedural kinematics creature
│   │   ├── SpecialtiesSection.tsx  # Core creative specialties
│   │   ├── ThreeCanvas.tsx         # Three.js WebGL metallic torus sculpture
│   │   └── YouTubePlayerModal.tsx  # Video modal player
│   ├── data/
│   │   └── portfolioData.ts        # Centralized project & category data schema
│   └── utils/
│       └── cn.ts                   # Tailwind class merge utility (clsx + twMerge)
├── next.config.mjs                 # Static export & dynamic basePath configuration
├── tailwind.config.js              # Theme extensions, animations, gradients
└── tsconfig.json                   # TypeScript compiler options
```

---

### Key Technical Implementations

#### 1. Framerate-Independent Delta-Time Physics (`dt`)
To prevent animations from speeding up on high-refresh monitors (120Hz ProMotion on phones/MacBooks, 144Hz–240Hz on gaming displays), all `requestAnimationFrame` loops compute elapsed delta time normalized to a standard 60 FPS baseline (16.667ms):

```ts
const now = performance.now();
const rawDelta = (now - lastTime) / 1000;
lastTime = now;

// Clamp delta to prevent physics explosions on background tab switch
const delta = Math.min(Math.max(rawDelta, 0.001), 0.1);

// Normalized multiplier: 1.0 at 60Hz, 0.5 at 120Hz, 0.416 at 144Hz, 0.25 at 240Hz
const dt = delta * 60;

// All positions and timers scale with dt
time += 0.035 * dt;
headX += (Math.cos(headAngle) * speed + wave) * dt;
particle.life += dt;
particle.x += particle.vx * dt;
```

#### 2. Mobile Performance Engineering
Mobile devices have limited GPU memory bandwidth and tile-based deferral architectures. The following optimizations ensure rock-solid 60–120 FPS on iOS and Android:
1. **Canvas `shadowBlur` Bypass**: `ctx.shadowBlur` executes a multi-pass separable Gaussian blur kernel per element. On mobile (`width < 768`), all `ctx.shadowBlur` operations are bypassed (`ctx.shadowBlur = isMobile ? 0 : blur`). Frame draw times dropped from ~30ms to < 1.5ms.
2. **Three.js Viewport Culling**: `ThreeCanvas.tsx` attaches an `IntersectionObserver`. When scrolled out of the viewport, the WebGL render loop pauses completely, consuming **0% GPU** and **0% CPU**.
3. **Backdrop Blur Elimination**: Giant CSS blur divs (`blur-[150px]`) are hidden on mobile screens via `hidden md:block`, replaced with lightweight linear gradients to prevent GPU fill-rate throttling.
4. **Adaptive Density**: Creature segments scale down to 18 on mobile (vs 42 on desktop), marine snow particles reduce to 12 (vs 42), and particle bursts are capped.

#### 3. Hardware-Accelerated Subpixel Alpha Masking
To permanently resolve the Chromium Skia subpixel GPU compositor seam (a faint hairline showing at the bottom of image cards on 125%/135% Windows display scaling):
```css
/* Direct GPU alpha mask on the <img> element eliminates subpixel border bleeds */
mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 97%);
-webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 97%);
```

#### 4. Scroll Memory & Restoration
When navigating from the main page into a Tier 2 Category Collage and returning:
```ts
// Save current scroll offset before opening category view
setSavedWorkScrollY(window.scrollY);

// Upon closing, restore viewport directly back to the #work section
setTimeout(() => {
  const el = document.getElementById('work');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}, 50);
```

---

### Local Development & Build Instructions

#### Prerequisites
- **Node.js**: v18.17+ or v20+
- **npm**: v9+

#### Commands
```bash
# 1. Install dependencies
npm install

# 2. Start local development server (runs on http://localhost:3000)
npm run dev

# 3. Build optimized static production bundle (outputs to /out)
npm run build
```

---

### CI/CD & GitHub Pages Deployment

The repository is configured for automated static deployment via GitHub Actions:
- **Repository**: https://github.com/gauravroy888/gaurav-roy-portfolio
- **Live URL**: https://gauravroy888.github.io/gaurav-roy-portfolio/
- **Workflow**: `.github/workflows/deploy.yml`
- **Base Path Detection**: Handled dynamically in `next.config.mjs`:
  ```js
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const basePath = isGitHubActions ? '/gaurav-roy-portfolio' : '';
  ```

> [!NOTE]
> Per project directives, automatic git pushes are held unless explicitly requested by the user.

---

### Content Extensibility Guide

To add or update portfolio works, modify `src/data/portfolioData.ts`:

```ts
// Example: Adding a new project item
{
  id: 'luxury-product-01',
  title: 'Minimalist Perfume Vessel',
  category: '3d-design',
  subCategory: 'product-closeups',
  client: 'Maison Luxe Paris',
  role: 'Lead 3D & Spatial Designer',
  year: '2025',
  thumbnail: '/images/portfolio/perfume.png',
  description: 'Photorealistic glass refraction and tactile fluid dynamics study.',
  designThinking: {
    concept: 'Highlight pure geometry through caustic dispersion.',
    colorPalette: ['#E0F2FE', '#0369A1', '#0F172A'],
    materials: ['Borosilicate Optical Glass', 'Brushed Champagne Brass'],
    renderEngine: 'Octane / Cinema 4D',
  },
}
```

---

*Designed & Developed for Gaurav Roy.*
