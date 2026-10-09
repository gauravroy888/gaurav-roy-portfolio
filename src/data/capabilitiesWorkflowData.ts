export interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  highlight?: boolean;
}

export interface SplitBranch {
  edgeLabel: string;
  node: WorkflowNode;
  downEdgeLabel?: string;
  subNode?: WorkflowNode;
}

export interface CapabilityWorkflow {
  id: string;
  title: string;
  shortTitle: string;
  categoryBadge: string;
  accentColor: string; // Tailwind color class for borders/glows
  accentBorder: string;
  accentText: string;
  accentBg: string;
  description: string;
  primaryTools: string[];
  metrics: { label: string; value: string }[];
  
  // Architecture Flowchart Structure
  flowchart: {
    rootInput: WorkflowNode;
    decisionDiamond: {
      condition: string;
      leftBranch: SplitBranch;
      rightBranch: SplitBranch;
    };
    convergenceNode: WorkflowNode;
    sequentialNodes: WorkflowNode[];
    outputSplit: {
      leftBranch: SplitBranch;
      rightBranch: SplitBranch;
    };
    finalTerminalNode?: WorkflowNode;
  };
}

export const capabilitiesWorkflows: Record<string, CapabilityWorkflow> = {
  '3d-unreal': {
    id: '3d-unreal',
    title: '3D/CGI & Unreal Engine',
    shortTitle: '3D & Unreal',
    categoryBadge: 'REAL-TIME 3D & CGI PIPELINE',
    accentColor: 'cyan',
    accentBorder: 'border-cyan-500/40',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    description: 'Enterprise real-time virtual production, Nanite virtualized geometry, Lumen global illumination, and interactive 60+ FPS Unreal Engine runtime pipelines.',
    primaryTools: ['Unreal Engine 5.5', 'Blender', 'Cinema 4D', 'Lumen GI', 'Nanite', 'Substance 3D', 'Blueprints'],
    metrics: [
      { label: 'Runtime Target', value: '60+ FPS Real-Time' },
      { label: 'Color Space', value: 'ACEScg Wide Gamut' },
      { label: 'Geometry Virtualization', value: 'Nanite Infinite LOD' },
      { label: 'Audio Spatialization', value: 'MetaSounds 3D' },
    ],
    flowchart: {
      rootInput: {
        id: 'ue-input',
        title: 'Creative Brief, CAD/Scan Data & Scene Storyboard',
        subtitle: 'Product specs, industrial CAD models, and architectural art direction',
        badge: 'Client Ingestion',
      },
      decisionDiamond: {
        condition: 'Asset Topology & Modeling Strategy',
        leftBranch: {
          edgeLabel: 'Hard-Surface / Real-Time PBR',
          node: {
            id: 'blender-prep',
            title: 'Blender: Topology Retopology & UV Unwrap',
            subtitle: 'Clean quad mesh retopology, weighted normals & UDIM texture unwrapping',
            badge: 'Modeling Suite',
          },
          downEdgeLabel: 'Optimized FBX / USD Meshes',
        },
        rightBranch: {
          edgeLabel: 'Procedural / Dynamic MoGraph',
          node: {
            id: 'c4d-prep',
            title: 'Cinema 4D: MoGraph Cloners & Procedural Deformers',
            subtitle: 'Spline dynamics, procedural geometry cloners & Alembic cache baking',
            badge: 'Motion Engine',
          },
          downEdgeLabel: 'Alembic Point Caches',
        },
      },
      convergenceNode: {
        id: 'substance-pbr',
        title: 'Substance 3D: 4K PBR Texturing (ACEScg Color Pipeline)',
        subtitle: 'Packed ORM textures (Occlusion, Roughness, Metallic) with sub-surface scatter maps',
        badge: 'Surfacing & PBR',
      },
      sequentialNodes: [
        {
          id: 'nanite-import',
          title: 'Unreal Engine 5: Nanite Virtualized Geometry Import',
          subtitle: 'Multi-million polygon mesh streaming with zero manual LOD creation',
          badge: 'Engine Core',
        },
        {
          id: 'lumen-lighting',
          title: 'Lumen Real-Time Dynamic Global Illumination + Volumetric Sky',
          subtitle: 'Infinite diffuse light bounces, raymarched volumetric fog & emissive mesh lighting',
          badge: 'Lighting & GI',
        },
        {
          id: 'blueprints-logic',
          title: 'Blueprints Event Graph: Interactive State Machine & Triggers',
          subtitle: 'Event-driven spatial interaction logic, camera switching rigs & real-time telemetry',
          badge: 'Interaction Systems',
        },
      ],
      outputSplit: {
        leftBranch: {
          edgeLabel: 'Real-Time Runtime (60+ FPS)',
          node: {
            id: 'niagara-audio',
            title: 'Niagara GPU Particles + MetaSounds 3D Audio',
            subtitle: 'Physically-simulated GPU particle emitters and HRTF spatial acoustic soundscapes',
            badge: 'Real-Time FX',
          },
          subNode: {
            id: 'ue-webgpu',
            title: 'Interactive WebGPU Pixel Streaming / Standalone App',
            subtitle: 'Sub-16ms interactive runtime delivered via browser streaming or native PC executable',
            badge: 'Interactive Deploy',
            highlight: true,
          },
        },
        rightBranch: {
          edgeLabel: 'Offline Cine Pass (32-bit EXR)',
          node: {
            id: 'movie-render-queue',
            title: 'Movie Render Queue: Path Tracing Multi-Pass',
            subtitle: 'Cryptomattes, depth passes, motion vectors & optical temporal anti-aliasing (TSR)',
            badge: 'Render Queue',
          },
          subNode: {
            id: 'photoreal-cgi',
            title: 'Photorealistic Commercial CGI & Film Sequences',
            subtitle: 'Ultra-high fidelity broadcast imagery and cinematic brand launch reels',
            badge: 'Master Delivery',
            highlight: true,
          },
        },
      },
    },
  },

  'gen-ai': {
    id: 'gen-ai',
    title: 'Generative AI & ComfyUI',
    shortTitle: 'Generative AI',
    categoryBadge: 'AGENTIC GENERATIVE AI PIPELINE',
    accentColor: 'purple',
    accentBorder: 'border-purple-500/40',
    accentText: 'text-purple-400',
    accentBg: 'bg-purple-500/10',
    description: 'Custom ComfyUI node graph orchestration, LTX 2.5 video generation, Qwen agentic reasoning, Whisper speech-to-text, and automated Remotion rendering pipelines.',
    primaryTools: ['ComfyUI', 'LTX 2.5', 'Qwen 2.5-VL', 'Whisper Large-v3', 'Claude Code CLI', 'Remotion', 'ControlNet'],
    metrics: [
      { label: 'Video Diffusion Model', value: 'LTX 2.5 (High Coherence)' },
      { label: 'Reasoning Engine', value: 'Qwen 2.5-VL Multimodal' },
      { label: 'Audio Ingestion', value: 'Whisper Word-Level Timestamps' },
      { label: 'Code Video Assembly', value: 'Remotion React Engine' },
    ],
    flowchart: {
      rootInput: {
        id: 'ai-input',
        title: 'Multi-Modal Director Prompt (Audio Voice Note or Text Brief)',
        subtitle: 'Natural human speech voice note or structured creative brief input',
        badge: 'User Ingestion',
      },
      decisionDiamond: {
        condition: 'Input Modality Detection',
        leftBranch: {
          edgeLabel: 'Microphone / Voice Audio',
          node: {
            id: 'whisper-stt',
            title: 'Whisper Large-v3: Instant Audio Transcription',
            subtitle: 'Word-level timestamp extraction, voice tone parsing & multilingual speech recognition',
            badge: 'Speech Ingestion',
          },
          downEdgeLabel: 'Transcript Stream with Timestamps',
        },
        rightBranch: {
          edgeLabel: 'Direct Text Typed Brief',
          node: {
            id: 'text-tokenizer',
            title: 'Semantic Text Tokenizer & Entity Parser',
            subtitle: 'Extracting key subject anchors, aesthetic stylizations, and lighting requirements',
            badge: 'Text Parser',
          },
          downEdgeLabel: 'Structured Text Payload',
        },
      },
      convergenceNode: {
        id: 'qwen-reasoning',
        title: 'Qwen Reasoning Model: Agentic Prompt Expansion & Negative Weights',
        subtitle: 'Generates structured JSON prompt payloads, camera direction, and safety filter weights',
        badge: 'Reasoning & LLM',
      },
      sequentialNodes: [
        {
          id: 'comfyui-api',
          title: 'POST /api/comfyui/prompt: Custom Modular Node Graph Dispatch',
          subtitle: 'Direct socket execution into custom headless ComfyUI workflow queues with GPU load balancing',
          badge: 'Node Graph Engine',
        },
        {
          id: 'controlnet-guidance',
          title: 'CLIP Text/Vision Encode + Multi-ControlNet Guidance',
          subtitle: 'Depth map spatial anchoring, OpenPose skeletal conditioning & Canny edge structural control',
          badge: 'Latent Conditioning',
        },
      ],
      outputSplit: {
        leftBranch: {
          edgeLabel: 'Temporal Video Generation',
          node: {
            id: 'ltx-video',
            title: 'LTX 2.5 Video Diffusion Checkpoint (DiT Architecture)',
            subtitle: 'Temporal cross-attention latents generating 24 FPS physics-consistent motion sequences',
            badge: 'Video Diffusion',
          },
          subNode: {
            id: 'remotion-post',
            title: 'Remotion Code-To-Video: Beat-Sync Assembly',
            subtitle: 'Automated React timeline compilation, dynamic captions & synchronized voiceover audio',
            badge: 'Automated Post',
            highlight: true,
          },
        },
        rightBranch: {
          edgeLabel: 'High-Res Latents & Textures',
          node: {
            id: 'lora-synthesis',
            title: 'Custom LoRA Fine-Tuned Checkpoints (SDXL / Flux)',
            subtitle: 'Brand identity adaptation, custom product LoRAs, and photoreal texture latent synthesis',
            badge: 'Visual Checkpoint',
          },
          subNode: {
            id: 'upscale-decode',
            title: 'Latent Spatial Upscaler -> VAE Decode to 4K Master Assets',
            subtitle: 'Tiled spatial upscaling with noise suppression into uncompressed RGBA frames',
            badge: 'Final Deliverable',
            highlight: true,
          },
        },
      },
    },
  },

  'spatial-ux': {
    id: 'spatial-ux',
    title: 'Motion, Interaction & Spatial UX',
    shortTitle: 'Spatial UX',
    categoryBadge: 'SPATIAL INTERACTION & WEBXR ARCHITECTURE',
    accentColor: 'indigo',
    accentBorder: 'border-indigo-500/40',
    accentText: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    description: 'Intuitive spatial interfaces, WebXR navigation models, micro-interactions, Rapier.js physics, and fluid physics-driven responsive spaces.',
    primaryTools: ['Spline 3D', 'Three.js', 'WebXR Device API', 'Rapier Physics', 'GSAP', 'Figma Spatial', 'React Three Fiber'],
    metrics: [
      { label: 'Viewport Refresh', value: '60 - 120 Hz Spatial Frame' },
      { label: 'Input Latency', value: '<8ms Pointer/Pinch Tracking' },
      { label: 'Physics Loop', value: 'Rapier Rigid Body Dynamics' },
      { label: 'Cross-Device', value: 'WebXR / Mobile / Desktop' },
    ],
    flowchart: {
      rootInput: {
        id: 'input-signal',
        title: 'User Interaction Event (Cursor, Touch, Gyroscope or 6DoF XR Hands)',
        subtitle: 'Continuous hardware input event stream across flat displays or spatial computing devices',
        badge: 'Hardware Sensor',
      },
      decisionDiamond: {
        condition: 'Client Hardware & Runtime Environment',
        leftBranch: {
          edgeLabel: 'Flat Screen (Web / Mobile)',
          node: {
            id: 'touch-pointer',
            title: 'Pointer & Touch Event Handlers with Damped Spring Physics',
            subtitle: 'Fluid momentum tracking, touch velocity curves & magnetic hover hitboxes',
            badge: '2D/3D Raycaster',
          },
          downEdgeLabel: 'Normalized Viewport Screen Coordinates',
        },
        rightBranch: {
          edgeLabel: 'Spatial XR Headset (Vision Pro / Quest)',
          node: {
            id: 'webxr-api',
            title: 'WebXR Device API: 6DoF Spatial Pose & Joint Hand Tracking',
            subtitle: 'Sub-millimeter finger pinch tracking, gaze targeting & spatial anchor mesh synchronization',
            badge: 'Spatial Tracking',
          },
          downEdgeLabel: 'Spatial 3D Vector & Gesture State',
        },
      },
      convergenceNode: {
        id: 'scene-graph-coord',
        title: 'Spline 3D Scene / Three.js Core Scene Graph Integration',
        subtitle: 'Hierarchical object matrix transforms, bone animation states and camera projection rigs',
        badge: 'Spatial Scene Core',
      },
      sequentialNodes: [
        {
          id: 'physics-sim',
          title: 'Rapier.js Physics Simulation + Collision Matrix',
          subtitle: 'Rigid body dynamics, spring constraints & zero-latency spatial raycasting physics',
          badge: 'Physics Engine',
        },
        {
          id: 'gsap-choreography',
          title: 'GSAP / Framer Motion 3D Timeline Choreography',
          subtitle: 'Custom cubic-bezier easing, spatial state transitions & micro-interaction orchestrator',
          badge: 'Motion Choreography',
        },
      ],
      outputSplit: {
        leftBranch: {
          edgeLabel: 'Visual Spatial Frame (60-120 FPS)',
          node: {
            id: 'post-fx-pass',
            title: 'Post-Processing Pipeline: Dynamic Depth-of-Field & Bloom',
            subtitle: 'Adaptive eye focus simulation, chromatic aberration & tone mapping passes',
            badge: 'Visual Post-Pass',
          },
          subNode: {
            id: 'viewport-render',
            title: 'Fluid 60-120Hz Spatial Web Viewport Rendering',
            subtitle: 'Glitch-free, responsive spatial UI adapting seamlessly to all screen sizes and headsets',
            badge: 'Visual Output',
            highlight: true,
          },
        },
        rightBranch: {
          edgeLabel: 'Tactile Sensory Feedback',
          node: {
            id: 'spatial-audio',
            title: 'Web Audio Spatial Panning + Device Haptic Pulse Engine',
            subtitle: 'HRTF 3D directional soundscape + dual-motor haptic frequency vibration feedback',
            badge: 'Haptics & Audio',
          },
          subNode: {
            id: 'multisensory-delivery',
            title: 'Tactile Multi-Sensory Feedback Loop',
            subtitle: 'Immersive physical satisfaction on every touch, click, hover, and spatial pinch gesture',
            badge: 'Tactile Delivery',
            highlight: true,
          },
        },
      },
    },
  },

  'creative-prototyping': {
    id: 'creative-prototyping',
    title: 'Creative Prototyping',
    shortTitle: 'Prototyping',
    categoryBadge: 'CREATIVE ENGINEERING & PROTOTYPING PIPELINE',
    accentColor: 'emerald',
    accentBorder: 'border-emerald-500/40',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    description: 'Bridging artistic imagination with functional code execution, rapid architecture spikes using Claude Code CLI, Stitch AI, and Next.js 14 sandboxes.',
    primaryTools: ['Claude Code CLI', 'Google Anti-Gravity', 'Stitch AI', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Figma'],
    metrics: [
      { label: 'Turnaround Speed', value: '<24 Hours Concept-to-Code' },
      { label: 'Architecture Safety', value: '100% Strict TypeScript' },
      { label: 'Performance Audit', value: '100/100 Lighthouse Benchmark' },
      { label: 'State Isolation', value: 'Modular Sandboxed Components' },
    ],
    flowchart: {
      rootInput: {
        id: 'proto-brief',
        title: 'Creative Brief, Product Vision & Technical Hypotheses',
        subtitle: 'High-level design intent, user stories, creative constraints & exploratory goals',
        badge: 'Discovery Phase',
      },
      decisionDiamond: {
        condition: 'Prototyping Track Focus',
        leftBranch: {
          edgeLabel: 'Visual UI/UX Exploration',
          node: {
            id: 'stitch-ai',
            title: 'Stitch AI: Generative UI Wireframe & Layout Synthesis',
            subtitle: 'Instant generative design tokens, layout exploration & responsive visual variants',
            badge: 'Generative UI',
          },
          downEdgeLabel: 'Design Tokens & UI Layout Tree',
        },
        rightBranch: {
          edgeLabel: 'Technical Feasibility Spike',
          node: {
            id: 'claude-cli',
            title: 'Claude Code CLI / Anti-Gravity: Agentic Architecture Spike',
            subtitle: 'Automated codebase scaffolding, API contract mocking & dependency audit execution',
            badge: 'Agentic Engineering',
          },
          downEdgeLabel: 'Scaffolded Types & State Schemas',
        },
      },
      convergenceNode: {
        id: 'nextjs-scaffold',
        title: 'Next.js 14 App Router + Tailwind CSS + TypeScript Contract',
        subtitle: 'Unified type-safe component scaffold with atomic design hierarchy and zero runtime bloat',
        badge: 'Component Scaffold',
      },
      sequentialNodes: [
        {
          id: 'sandbox-play',
          title: 'Isolated Component Sandbox with Mock Data Fixtures',
          subtitle: 'Rapid interactive state mutation without database or external backend bottlenecks',
          badge: 'Interactive Sandbox',
        },
        {
          id: 'design-code-loop',
          title: 'Multi-Disciplinary Iteration Loop: Design Review & Code Refactor',
          subtitle: 'Tight feedback loop refining animation curves, accessibility & edge cases in real-time',
          badge: 'Iteration Loop',
        },
      ],
      outputSplit: {
        leftBranch: {
          edgeLabel: 'UX Heuristics Review',
          node: {
            id: 'usability-test',
            title: 'Interactive Usability Walkthrough & Click Heatmaps',
            subtitle: 'User task completion benchmarking, friction point elimination & micro-copy tuning',
            badge: 'User Validation',
          },
          subNode: {
            id: 'stakeholder-demo',
            title: 'Stakeholder Interactive Playbook & Design Sign-Off',
            subtitle: 'Interactive live prototype demonstrating value proposition and validated interaction feel',
            badge: 'Client Validation',
            highlight: true,
          },
        },
        rightBranch: {
          edgeLabel: 'System Diagnostics & Quality',
          node: {
            id: 'audit-diagnostics',
            title: 'Lighthouse 100 Performance Audit & Strict Type Safety',
            subtitle: 'Bundle size analyzer, zero layout shift (CLS: 0) & Web Vitals verification',
            badge: 'Quality Gate',
          },
          subNode: {
            id: 'production-handoff',
            title: 'Deployed Production-Grade Prototype (Vercel / Edge CDN)',
            subtitle: 'Living, testable software prototype ready for immediate engineering deployment',
            badge: 'Production Ready',
            highlight: true,
          },
        },
      },
    },
  },

  'motion-editing': {
    id: 'motion-editing',
    title: 'Motion Graphics & Video Editing',
    shortTitle: 'Motion & Video',
    categoryBadge: 'COMMERCIAL MOTION & EDITORIAL PIPELINE',
    accentColor: 'amber',
    accentBorder: 'border-amber-500/40',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/10',
    description: 'Kinetic commercial product reels, product ads, After Effects motion choreography, Premiere Pro editorial post-production, and Remotion code-to-video automation.',
    primaryTools: ['After Effects', 'Premiere Pro', 'Remotion', 'Photoshop', 'Illustrator', 'Whisper', 'ACEScg'],
    metrics: [
      { label: 'Master Delivery', value: 'ProRes 4444 Master 4K' },
      { label: 'Social Multi-Format', value: '9:16 Vertical / 1:1 Social' },
      { label: 'Motion Timing', value: 'Beat-Synced Keyframe Easing' },
      { label: 'Automation Engine', value: 'Remotion React Video' },
    ],
    flowchart: {
      rootInput: {
        id: 'motion-brief',
        title: 'Brand Guidelines, 3D Render Passes & Editorial Script',
        subtitle: 'Product messaging, audio voiceover script, and raw visual 3D asset plates',
        badge: 'Creative Assets',
      },
      decisionDiamond: {
        condition: 'Production Methodology Selection',
        leftBranch: {
          edgeLabel: 'Programmatic / Code-Driven',
          node: {
            id: 'remotion-comp',
            title: 'Remotion React Video: Parametric Typography & Dynamic Ads',
            subtitle: 'Code-driven kinetic captions, algorithmic layouts & automated multi-variant ad batches',
            badge: 'Code-To-Video',
          },
          downEdgeLabel: 'Programmatic Video Composition',
        },
        rightBranch: {
          edgeLabel: 'Cinematic Editorial VFX',
          node: {
            id: 'ae-vfx',
            title: 'After Effects: Speed Graph Keyframing & Product Ads VFX',
            subtitle: 'Custom exponential motion easing, 3D camera tracking & optical glow passes',
            badge: 'Motion Graphics',
          },
          downEdgeLabel: 'Multi-Layer VFX Comp Plates',
        },
      },
      convergenceNode: {
        id: 'premiere-assembly',
        title: 'Premiere Pro: Multi-Track Timeline Conformance & Beat-Sync Cut',
        subtitle: 'Pacing orchestration, rhythm-locked cuts to BGM and seamless scene transitions',
        badge: 'Editorial Suite',
      },
      sequentialNodes: [
        {
          id: 'audio-mix',
          title: 'Audio Sweetening: Whisper Clean-Up + Sound Effects Bed + Auto-Ducking',
          subtitle: 'Dialogue spectral de-noise, impact whooshes, risers and sidechain compression',
          badge: 'Sound Design',
        },
        {
          id: 'color-grade',
          title: 'Color Grading & ACEScg High Dynamic Range Conformance',
          subtitle: 'Consistent brand palette mapping, shadow lift, highlight roll-off and final contrast balance',
          badge: 'Color Grading',
        },
      ],
      outputSplit: {
        leftBranch: {
          edgeLabel: 'Broadcast Master (ProRes)',
          node: {
            id: 'prores-export',
            title: 'ProRes 4444 Master / Rec.709 & High Dynamic Range',
            subtitle: 'Pristine uncompressed color fidelity for TV, web campaigns and enterprise clients',
            badge: 'Master Archive',
          },
          subNode: {
            id: 'commercial-deploy',
            title: 'Flagship Commercial Product Launch Ads',
            subtitle: 'Cinema-grade visual fidelity delivering maximum brand prestige and customer conversion',
            badge: 'Commercial Master',
            highlight: true,
          },
        },
        rightBranch: {
          edgeLabel: 'Social Campaign (9:16 Vertical)',
          node: {
            id: 'social-vertical',
            title: 'Automated Multi-Format Export: Reels, Shorts & TikTok',
            subtitle: 'High-conversion dynamic framing, burnt-in kinetic captions & mobile audio boost',
            badge: 'Multi-Platform',
          },
          subNode: {
            id: 'campaign-viral',
            title: 'Omnichannel Social Video Campaign Delivery',
            subtitle: 'Optimized high-retention vertical reels published across digital acquisition channels',
            badge: 'Social Delivery',
            highlight: true,
          },
        },
      },
    },
  },

  'spatial-web': {
    id: 'spatial-web',
    title: 'Development and Full Stack Systems',
    shortTitle: 'Development',
    categoryBadge: 'HIGH-PERFORMANCE DEVELOPMENT & FULL-STACK SYSTEMS',
    accentColor: 'blue',
    accentBorder: 'border-blue-500/40',
    accentText: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    description: 'Engineering scalable platforms that ensure zero latency, 60 FPS performance, and enterprise reliability using Next.js 14, Three.js WebGL, and Edge CDN stacks.',
    primaryTools: ['Next.js 14', 'Three.js / WebGL', 'TypeScript', 'GLSL Shaders', 'DRACO Compression', 'Cloudflare Edge CDN', 'Tailwind CSS'],
    metrics: [
      { label: 'Render Budget', value: '16.6ms / 60 FPS Constant' },
      { label: 'Time to First Byte', value: '<50ms Edge Network' },
      { label: 'Asset Compression', value: 'DRACO 3D + KTX2 (90% Smaller)' },
      { label: 'Uptime Reliability', value: '99.99% Edge Availability' },
    ],
    flowchart: {
      rootInput: {
        id: 'client-http',
        title: 'Client HTTP / WebSocket Handshake Request to Edge CDN',
        subtitle: 'Incoming user connection routed to nearest global edge point of presence',
        badge: 'Edge Ingress',
      },
      decisionDiamond: {
        condition: 'Client GPU & WebGL2 Capability Check',
        leftBranch: {
          edgeLabel: 'High-Tier GPU WebGL2 Hardware',
          node: {
            id: 'threejs-core',
            title: 'Three.js Core: Instanced Meshes, Custom GLSL Shaders & SSAO',
            subtitle: 'Single-draw-call geometry instancing, custom raymarching and screen-space shadows',
            badge: 'WebGL Pipeline',
          },
          downEdgeLabel: 'Full Dynamic 3D Scene Buffer',
        },
        rightBranch: {
          edgeLabel: 'Mobile / Battery Saver Tier',
          node: {
            id: 'lowpoly-fallback',
            title: 'Optimized Low-Poly Geometry + Pre-Baked Ambient Lighting',
            subtitle: 'Adaptive resolution scaling, lowered shadow cascades and battery preservation',
            badge: 'Graceful Fallback',
          },
          downEdgeLabel: 'Lightweight Static Scene Buffer',
        },
      },
      convergenceNode: {
        id: 'draco-streaming',
        title: 'DRACO 3D Compression & KTX2 Supercompressed Textures on Edge',
        subtitle: 'Direct GPU VRAM texture streaming, asset pre-fetching and binary buffer hydration',
        badge: 'Asset Pipeline',
      },
      sequentialNodes: [
        {
          id: 'raf-loop',
          title: 'Zero-Allocation requestAnimationFrame Loop with Frustum Culling',
          subtitle: 'Object pooling, zero garbage collector stutter and off-screen object occlusion',
          badge: 'Render Cadence',
        },
        {
          id: 'nextjs-hydration',
          title: 'Hydrated Next.js 14 App State + Sub-5ms Edge API Route Handshake',
          subtitle: 'Server Components streaming HTML concurrently while 3D WebGL scene hydrates in parallel',
          badge: 'Hydration Bridge',
        },
      ],
      outputSplit: {
        leftBranch: {
          edgeLabel: 'Client GPU Engine Performance',
          node: {
            id: 'fps-guarantee',
            title: 'Rock-Solid 60 FPS Render Loop (Sub-16.6ms Frame Budget)',
            subtitle: 'Zero stutter, predictable frame cadence and smooth interaction physics',
            badge: 'Performance Lock',
          },
          subNode: {
            id: 'interactive-fidelity',
            title: 'Zero-Stutter Interactive Spatial Canvas',
            subtitle: 'Ultra-fluid 3D web experience delivering cinema-grade interactions in the browser',
            badge: 'Client Excellence',
            highlight: true,
          },
        },
        rightBranch: {
          edgeLabel: 'Global Edge Reliability',
          node: {
            id: 'edge-cdn',
            title: 'Global Anycast CDN + Dynamic Brotli Stream (<50ms TTFB)',
            subtitle: '99.99% uptime, zero cold starts, and enterprise-grade reliability worldwide',
            badge: 'Edge Network',
          },
          subNode: {
            id: 'zero-latency-platform',
            title: 'High-Availability Zero-Latency Enterprise Platform',
            subtitle: 'Scalable full-stack infrastructure architected for instant loading worldwide',
            badge: 'Production Uptime',
            highlight: true,
          },
        },
      },
    },
  },
};
