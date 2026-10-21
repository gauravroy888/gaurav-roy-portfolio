# Gaurav Roy Portfolio — Agent Operating Rules

This document outlines mandatory rules and instructions that the AI assistant (Antigravity) must strictly follow when working on this repository.

---

## 1. Git & Deployment Policy (CRITICAL)
- **NEVER push to GitHub (`git push`)** unless the user explicitly requests or commands you to do so (e.g. "push to github", "deploy to github", "make it live").
- All local edits, commits, and builds should remain local so the user can review and experiment with rapid changes without unintended live deployments.
- When committing changes locally, write clear, descriptive commit messages.

---

## 2. Mobile View & Visual Presentation Rules
- **No Overlapping Badges on Mobile**: Never render verbose floating badges, camera HUD pills, or scale tags directly over primary images or videos on mobile viewports (`hidden sm:block` or `hidden sm:flex`).
- **Tab Layouts**: Never allow tabs (media tabs, category filters, camera filmstrips) to stack awkwardly into multi-line wrapped blocks. Always use clean, horizontally scrollable containers (`overflow-x-auto no-scrollbar`) with compact labels.
- **No Empty Voids**: Avoid fixed `min-h-[...]` on responsive containers that exceed mobile aspect ratios and create tall black gaps under media.
- **Spider Companion**:
  - Keep creature voice enabled by default on mobile devices (`soundEnabled = true`).
  - Keep the spider speech/thought bubble text tab hidden on mobile (`hidden md:block`).

---

## 3. Lightbox & Full View Rules
- **Pure Cinema Black Canvas**: Full-view lightboxes must always render on a solid black canvas (`bg-black`) without translucent blur effects (`backdrop-blur`) to eliminate background bleed-through, ghostly text artifacts, or GPU color banding.
- **Unobstructed View**: Never place floating bottom tabs, HUD bars, or "raw file" buttons over renders in full view. Renders must be 100% visible from top to bottom.
- **Event Isolation**: Full-view lightboxes must be DOM siblings of any parent modals (wrapped in React fragments `<> ... </>`) with explicit `e.stopPropagation()` and `onPointerDown={(e) => e.stopPropagation()}` on close buttons and backdrops. Closing the full view must **only** close the image, never the underlying modal.

---

## 4. Animation & Scroll Reveal Rules
- Scroll animations must be lightweight and GPU-accelerated using `transform` and `opacity`.
- Tabs and content cards should reveal smoothly with fade-in and subtle float-up effects when entering the viewport.

---

## 5. Verification & Code Quality
- After making code changes, always verify type safety with `npx tsc --noEmit`.
- Verify that `npm run build` succeeds with zero errors.
- Preserve existing comments, docstrings, and established architectural patterns.
