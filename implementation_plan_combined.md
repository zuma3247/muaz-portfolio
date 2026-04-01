# Portfolio Audit — WebsterLEADS Compliance & General Review

## 1. Executive Summary

The portfolio is a visually impressive React + Vite + TailwindCSS website with a unique "Nexus Hub" navigation metaphor, strong animation work, and a good catalogue of leadership experiences, design work, and tech projects. **However, it is currently missing several pieces of content required by the WebsterLEADS Portfolio Review Guidelines**, and the NexusHub's "orbiting" effect is a flat 2D rotation that could be elevated to a true 3D experience.

This plan addresses both issues: upgrading the hub to real 3D and achieving full WebsterLEADS compliance.

---

## 2. 3D Hub Upgrade

### 2.1 What We're Replacing

The current [NexusHub.tsx](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/src/components/NexusHub.tsx) uses Framer Motion to rotate three `<div>` elements in a flat circle using `Math.cos/sin` at a fixed 200px radius. It looks like a 2D carousel, not a 3D orbit. The target is:

- **Depth**: Nodes moving toward and away from the viewer as they orbit
- **Perspective**: A camera-like viewpoint that makes closer objects larger
- **3D Particles**: A starfield/particle cloud floating in 3D space, not just flat dots
- **Lighting/Glow**: Real light emissions, not just CSS `box-shadow`
- **Central Element**: A 3D geometric polyhedron with the existing logo PNG floating in front of it

---

### 2.2 Option Comparison

| Dimension | **Three.js (via React Three Fiber)** | **GSAP + CSS 3D Transforms** | **Hybrid (R3F Scene + DOM Overlay)** |
|-----------|--------------------------------------|------------------------------|--------------------------------------|
| **3D Fidelity** | ★★★★★ True WebGL 3D. Real perspective camera, depth buffer, lighting, shadows, reflections. | ★★★☆☆ "Fake 3D" via CSS `perspective` and `rotateX/Y/Z`. Convincing for simple orbits but no real lighting or depth sorting. | ★★★★★ Full 3D scene for visuals; DOM elements positioned at 3D coordinates via drei's `<Html>`. |
| **Particles** | ★★★★★ Thousands of instanced particles on GPU. True 3D starfield. | ★★☆☆☆ DOM particles are CPU-bound. 30 is the current limit for a reason — hundreds would cause jank. | ★★★★★ Particles in R3F scene, labels/buttons in DOM. |
| **Interactive Elements** | ★★★☆☆ Clickable via raycasting, but text must be rendered as textures or via `<Html>`. Text as textures = blurry on zoom. | ★★★★★ Standard DOM elements — native click, hover, focus, screen readers, crisp text at any zoom. | ★★★★★ Interactive elements are real DOM via `<Html>` component. Crisp text, native events, accessible. |
| **Accessibility** | ★★☆☆☆ WebGL canvas is opaque to screen readers. Must layer ARIA-hidden canvas with a DOM fallback. | ★★★★★ Regular HTML. Full keyboard nav, screen reader support, focus management. | ★★★★☆ Canvas is decorative (`aria-hidden`); interactive elements are real DOM with full accessibility. |
| **Mobile Performance** | ★★★☆☆ WebGL on low-end Android can stutter. Needs `frameloop="demand"`, reduced particle count, and graceful degradation. | ★★★★★ CSS transforms are GPU-composited. Buttery smooth even on budget phones with 3-5 elements. | ★★★★☆ Scene complexity can be reduced for mobile (fewer particles, simpler geometry). Interactive elements are always fast. |
| **Bundle Size** | ★★☆☆☆ `three` (~150KB gz) + `@react-three/fiber` (~35KB) + `@react-three/drei` (~variable). Total ~200KB+ added. | ★★★★★ `gsap` (~30KB gz). Minimal footprint. | ★★★☆☆ Same as Three.js. ~200KB+ added. Can lazy-load. |
| **Development Effort** | ★★★☆☆ Requires learning R3F patterns, shader basics, 3D coordinate systems. Different mental model from DOM. | ★★★★★ Standard DOM + CSS. Timeline-based API is intuitive. Quick to prototype and iterate. | ★★★☆☆ Same R3F learning curve for the scene, but interactive parts remain familiar React/DOM. |
| **Visual Ceiling** | ★★★★★ Unlimited. Bloom, custom shaders, geometry morphing, PBR materials. Can look like a AAA game intro. | ★★★☆☆ Limited to what CSS can express. No real lighting, no volumetric effects, no custom shaders. | ★★★★★ Same ceiling as pure Three.js for visuals. |
| **Maintenance** | ★★★☆☆ Three.js has breaking changes periodically. R3F abstracts some but not all. More moving parts. | ★★★★★ GSAP is extremely stable. CSS 3D transforms are a browser standard. Very low maintenance. | ★★★☆☆ Same as Three.js. |

---

### 2.3 Verdict: Hybrid Approach (Approved)

> [!IMPORTANT]
> **Confirmed: Hybrid approach — React Three Fiber for the 3D scene + DOM overlay for interactive elements.**

**Why not pure GSAP?**
GSAP with CSS 3D transforms can create a convincing orbital motion, but it hits a ceiling quickly: no real depth-based particle fields, no glow/bloom effects, no dynamic lighting on the central element. The "nexus" concept deserves real 3D to sell the sci-fi aesthetic of the site. CSS 3D would feel like a half-measure.

**Why not pure Three.js?**
Rendering the clickable core buttons (Leadership, Design, Technology) as 3D meshes with raycasted click handlers means sacrificing text clarity, accessibility, and hover tooltips. Text rendered as Three.js textures looks blurry compared to DOM text. The labels, tooltips, and navigation buttons need to remain real DOM.

**Why Hybrid?**
- **R3F Canvas** (background layer): Renders the 3D starfield, the glowing central geometry, orbital path lines/rings, and ambient lighting. This is the "wow" layer.
- **drei `<Html>`** (positioned DOM elements): The three core buttons (Leadership, Design, Technology) are regular React components positioned at 3D coordinates via `<Html>`. They inherit the 3D position of their parent mesh, so they track the orbit perfectly. Text stays crisp, clicks are native, screen readers work.
- **Fallback**: On very low-end devices or if WebGL is unavailable, gracefully degrade to the existing 2D Framer Motion orbit.

---

### 2.4 Central Geometry: Polyhedron + Logo Composite

> [!IMPORTANT]
> **User Decision: Mix of options A (geometric polyhedron) and C (logo PNG) — polyhedron serves as the backdrop, logo floats in front.**

#### Design Concept

The center of the hub is a **layered composition**:

1. **Back Layer — Wireframe Icosahedron**: A slowly rotating wireframe (or semi-transparent faceted) icosahedron rendered in Three.js. It provides the sci-fi geometric feel and depth. Rendered with a subtle emissive material and bloom postprocessing for an ethereal glow.
2. **Front Layer — Logo PNG**: The existing white logo PNG ([b0989652989926fe92b786073197f74a529bda75.png](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/src/assets/b0989652989926fe92b786073197f74a529bda75.png)) rendered as a flat plane mesh in Three.js, positioned at `z = +1` (slightly in front of the polyhedron). This preserves personal branding while the polyhedron adds 3D depth behind it.
3. **Glow Effect**: A point light placed inside the icosahedron bleeds light through the wireframe edges, creating a warm inner glow. The logo gets a subtle `drop-shadow`-style bloom.

#### Implementation

```
┌── CentralComposite (Three.js Group) ──┐
│                                         │
│   z = -0.5  →  IcosahedronWireframe    │
│                 • Geometry: IcosahedronGeometry(1.5, 0)
│                 • Material: MeshBasicMaterial, wireframe: true
│                 • Color: burnt-orange with 0.3 opacity
│                 • Animation: slow Y-axis rotation (0.002 rad/frame)
│                 • Bloom: emissive edges glow subtly
│                                         │
│   z = 0     →  PointLight (inside)     │
│                 • Color: burnt-orange    │
│                 • Intensity: 1.5        │
│                 • Creates internal glow  │
│                                         │
│   z = +1    →  LogoPlane               │
│                 • Geometry: PlaneGeometry(2.5, 2.5)
│                 • Material: MeshBasicMaterial + alphaMap
│                 • Texture: existing logo PNG (transparent)
│                 • Animation: subtle float (drei <Float>)
│                 • Always faces camera (billboard)
│                                         │
└─────────────────────────────────────────┘
```

The icosahedron rotates slowly behind the logo, creating a living, breathing 3D backdrop. The logo stays sharp and readable because it's rendered as a textured plane with alpha transparency, facing the camera at all times.

---

### 2.5 Orbital Tilt: Tilted Plane with Usability Safeguards

> [!WARNING]
> **User concern**: On a tilted orbital plane, nodes could travel behind the polyhedron and become invisible/unreachable. This section describes three mitigations.

#### The Tilt

The three orbiting nodes move on an elliptical orbit tilted ~25° from the viewer's plane (like Saturn's rings seen at an angle). This creates a much more dynamic, "atom-like" feel compared to a flat circle.

#### Three Usability Mitigations

**Mitigation 1 — Clamped Z-Range (Depth Limiting)**

Rather than allowing nodes to orbit fully behind the central geometry, we **clamp the Z position** of each orbiting node so it never goes further back than `z = -0.3`. In practice:

- The front half of the orbit looks fully 3D with real depth perspective
- As a node approaches the "back" of the orbit, it flattens out — it moves laterally and vertically but stays at a minimum Z, preventing it from disappearing behind the polyhedron
- The visual effect is an orbit that "squishes" at the back rather than completing a full 360° in z-depth
- This keeps every node always visible and clickable

```
   Side view of orbit path (exaggerated):

   Front (toward viewer)
         ╭──────────╮      ← full depth here
        ╱            ╲
   ════╧══════════════╧════  ← clamped at z = -0.3
                                (nodes slide along this floor
                                 instead of going further back)
```

**Mitigation 2 — Dynamic Opacity & Scale (Depth Cueing)**

Even with z-clamping, nodes at the "back" of the orbit are at z ≈ -0.3. To reinforce the depth illusion while maintaining visibility:

- Nodes at the front (`z > 0`): full opacity (1.0), scale 1.0–1.1
- Nodes at the back (`z < 0`): minimum opacity 0.7 (never fully transparent), scale 0.85
- Labels/icons scale proportionally — smaller at the back but always readable (minimum font size enforced)
- Smooth interpolation using `THREE.MathUtils.mapLinear(z, -0.3, maxZ, 0.7, 1.0)`

**Mitigation 3 — Smart Label Repositioning**

Labels (e.g., "TECHNOLOGY", "LEADERSHIP", "DESIGN") attached to each orbiting node via `<Html>`:

- On the front half of the orbit: label appears to the right of the node
- On the back half of the orbit: label flips to appear above the node (so it doesn't overlap with the central geometry)
- The label always has a semi-transparent background pill (`bg-navy/90 border`) for readability against any background
- `<Html>` elements from drei have a built-in `distanceFactor` prop — we set it so labels stay readable at any depth
- We set `zIndexRange={[100, 0]}` on the `<Html>` component so front-orbit labels render above back-orbit labels

#### Summary

| Position | Z Range | Opacity | Scale | Label Position | Clickable? |
|----------|---------|---------|-------|---------------|------------|
| Front    | 0 to +maxZ | 1.0 | 1.0–1.1 | Right of node | ✅ Yes |
| Side     | ~0 | 0.85 | 0.92 | Right of node | ✅ Yes |
| Back     | 0 to -0.3 (clamped) | 0.7 | 0.85 | Above node | ✅ Yes |

All three nodes remain **fully visible, readable, and clickable** at every point in their orbit.

---

### 2.6 Color Scheme: Cohesive Tri-Color Palette

> [!IMPORTANT]
> **User Decision: Blue for Technology. Agent-selected colors for Design and Leadership. Must be cohesive.**

#### Design Philosophy

The existing brand uses **burnt-orange (#E36B3D)** as the dominant accent and **navy (#101C36)** as the background. We're introducing subtle per-core color differentiation while keeping burnt-orange as the unifying theme. The three core colors are chosen to:

1. Be **harmonious** — they sit at roughly equal intervals on the color wheel, creating a triadic-adjacent harmony
2. Be **muted/rich** — not garish primaries; more like jewel tones that feel premium against the dark navy background
3. **Not compete** with the dominant burnt-orange brand color — they appear as subtle tints, primarily on core buttons, orbital path segments, and particle clouds

#### The Palette

| Core | Color | Hex | Rationale |
|------|-------|-----|-----------|
| **Technology** | **Electric Blue** | `#3D8BE3` | Blue = technology, digital, precision. A saturated but not neon blue that complements burnt-orange as its near-complement. |
| **Leadership** | **Amber Gold** | `#E3B53D` | Gold = authority, excellence, achievement. A warm tone that harmonizes with burnt-orange (analogous neighbor) and evokes leadership trophies, medals, distinction. |
| **Design** | **Violet Magenta** | `#9B3DE3` | Purple = creativity, imagination, artistry. Sits between blue and red on the wheel, bridging Technology's blue and Leadership's warm gold. Feels premium and creative. |

#### Color Application Rules

1. **Core Buttons**: Each orbiting node button gets a subtle border and icon tint in its core color. The glass background remains navy.
2. **Orbital Path**: The torus ring marking the orbit path has three gradient segments, each tinted with the corresponding core's color (very subtle, ~20% opacity).
3. **Point Light**: The inner point light of the central icosahedron subtly shifts hue as the closest node approaches — when Technology is nearest, the glow picks up a blue tint.
4. **Particles**: The ambient particle field uses a mix of all three core colors at very low opacity, plus burnt-orange.
5. **Section Headers**: When navigating into a core section (e.g., Technology), that section's header and accent elements use the core color.
6. **Global Accents Stay Burnt-Orange**: All shared UI (nav buttons, the logo glow, borders, focus rings, the grid pattern) remain burnt-orange. The tri-color is **additive**, not a replacement.

#### CSS Variable Additions

```css
:root {
  /* Existing */
  --navy: #101C36;
  --burnt-orange: #E36B3D;
  
  /* New — Core Colors */
  --core-technology: #3D8BE3;
  --core-leadership: #E3B53D;
  --core-design: #9B3DE3;
}
```

All three new colors share a common **saturation level (~70%)** and **lightness (~55%)**, ensuring they feel like they belong to the same family. Against the dark navy background, they provide clear differentiation without clashing.

---

### 2.7 Full Hybrid Architecture

```
┌─────────────────────────────────────────────┐
│  NexusHub.tsx                               │
│  ┌───────────────────────────────────────┐  │
│  │  <Canvas>  (R3F — background layer)   │  │
│  │  ├── PerspectiveCamera                │  │
│  │  ├── AmbientLight + PointLights       │  │
│  │  ├── CentralComposite                 │  │
│  │  │   ├── IcosahedronWireframe (back)  │  │
│  │  │   ├── PointLight (inside, glow)    │  │
│  │  │   └── LogoPlane (front, billboard) │  │
│  │  ├── OrbitalRing (tri-color gradient) │  │
│  │  ├── ParticleField (instanced points) │  │
│  │  │   └── mixed core colors + orange   │  │
│  │  ├── Bloom postprocessing             │  │
│  │  └── OrbitingNodes × 3 (tilted orbit) │  │
│  │      ├── <mesh> (glowing sphere)      │  │
│  │      │   └── color = core color       │  │
│  │      └── <Html center>                │  │
│  │          └── CoreButton (DOM)         │  │
│  │              ├── Icon (core-tinted)   │  │
│  │              ├── Label (repositions)  │  │
│  │              └── onClick handler      │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Nav buttons (About, Work, Contact,         │
│  WebsterLEADS) — regular DOM, positioned    │
│  outside the Canvas via CSS.                │
└─────────────────────────────────────────────┘
```

### 2.8 New Dependencies

| Package | Size (gz) | Purpose |
|---------|-----------|---------|
| `three` | ~150KB | 3D engine |
| `@react-three/fiber` | ~35KB | React renderer for Three.js |
| `@react-three/drei` | ~variable (tree-shakes) | `Html`, `Float`, `Stars`, `MeshDistortMaterial` helpers |
| `@react-three/postprocessing` | ~20KB | Bloom/glow effects |

**Total added:** ~200-220KB gzipped. Mitigated by lazy-loading the Canvas only when the hub is visible.

### 2.9 Mobile Strategy

> [!IMPORTANT]
> **User Decision: Preserve 3D elements on mobile. Use a "Lite 3D" tier as the default mobile experience, with a graceful fallback chain for genuinely weak hardware.**

The icosahedron + bloom postprocessing is the GPU-expensive part. The logo plane, orbiting nodes, and particles are relatively cheap. The strategy is to keep the 3D signature visuals but eliminate the costly render passes.

#### Quality Tiers

| Tier | Trigger | Experience |
|------|---------|-----------|
| **Full 3D** | Desktop (1024px+) | Bloom, 200–500 particles, rotating icosahedron, camera drift, ~25° tilted orbit. |
| **Lite 3D** | Mobile (<768px), default | **Static** (non-rotating) icosahedron still visible behind logo. Bloom disabled. ~30–50 particles. Orbit tilt reduced to ~10°. `frameloop="demand"` on the R3F Canvas. |
| **CSS 3D** | Low-end mobile detected | No WebGL. GSAP orbit with CSS `perspective`/`rotateX/Y`. No icosahedron or particles, but still a convincing 3D orbital motion. |
| **2D Fallback** | No WebGL support at all | Current Framer Motion flat orbit. |

The key insight for the Lite 3D tier: a **static** wireframe mesh costs almost nothing to render — there are no per-frame matrix updates or postprocessing passes. The icosahedron is still present and still creates the depth layering behind the logo; it just doesn't spin. Most modern mid-range smartphones handle this comfortably at 60fps.

#### Fallback Detection Logic

```js
// Detect low-end mobile at runtime
const isLowEnd = navigator.hardwareConcurrency <= 4 ||
                 /Android/.test(navigator.userAgent);

const quality = isMobile
  ? (isLowEnd ? "css3d" : "lite3d")
  : "full";
```

The `quality` prop is passed into `NexusScene` and controls: bloom on/off, icosahedron rotation on/off, particle count, orbit tilt angle, and `frameloop` mode.

---

## 3. WebsterLEADS Compliance Checklist

| #  | Requirement | Status | Notes |
|----|------------|--------|-------|
| 1  | **Personal Leadership Philosophy / Mission Statement** | **`[FAIL/MISSING]`** | Content exists in `Personal Leadership Project.md` but is not on the website. |
| 2  | **Leadership Growth Discussion** (strengths/weaknesses, then vs. now) | **`[FAIL/MISSING]`** | Content exists in `Personal Leadership Project.md` Part 1 & 3 but is not on the website. |
| 3  | **ETHC 1000 Individual Reflection Paper** | **`[FAIL/MISSING]`** | Content exists in `Ethics Reflection Essay.md` but is not on the website. |
| 4  | **PLE 1 & PLE 2 Reflections** | **`[FAIL/MISSING]`** | Content exists in `PLE1.md` (CS Club President) and `PLE2.md` (Campus Activities) but is not on the website. |
| 5  | **Other Applicable Experiences** | **`[PASS]`** | GSLS Geneva + internships well-covered. |
| —  | **International Distinction** | **`[PARTIAL]`** | GSLS qualifies. Needs explicit callout in the new WebsterLEADS section. |

---

## 4. Content Audit

**Source File Reference:**

| File | Content | Maps to |
|------|---------|---------|
| [Personal Leadership Project.md](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/Personal%20Leadership%20Project.md) | Philosophy, Growth, Core Values | WebsterLEADS Sub-sections A, B |
| [Ethics Reflection Essay.md](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/Ethics%20Reflection%20Essay.md) | ETHC 1000 Reflection | WebsterLEADS Sub-section C |
| [PLE1.md](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/PLE1.md) | CS Club President PLE | WebsterLEADS Sub-section D (PLE 1) |
| [PLE2.md](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/PLE2.md) | Campus Activities PLE | WebsterLEADS Sub-section D (PLE 2) |
| Existing GSLS content in `ContentSection.tsx` | Geneva summit | WebsterLEADS Sub-section E |

---

## 5. Technical & UX Review Summary

### What's Working Well ✅
Visual design, Framer Motion animations, component architecture, responsive layout, accessibility foundations, image gallery UX.

### Key Issues
- **SEO**: Generic `<title>`, no `<meta description>`, no OG tags, no favicon.
- **Performance**: 39 unoptimized PNGs (~27 MB total), 48 unused shadcn/ui components.
- **UX**: No URL routing (no bookmarking/back button), state-based navigation only.
- **Code**: `role="application"` on root div, copyright year is 2025.

---

## 6. Proposed Action Plan

### Phase 1A — 3D Hub Upgrade

#### Step 1: Install 3D dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
npm install -D @types/three
```

#### Step 2: Add CSS variables for core colors

Update [globals.css](file:///c:/Users/muazu/Desktop/Playground/My-Portfolio/src/styles/globals.css) to add the three new core color variables:

```css
:root {
  /* ... existing ... */
  --core-technology: #3D8BE3;
  --core-leadership: #E3B53D;
  --core-design: #9B3DE3;
}
```

#### Step 3: Create `NexusScene.tsx` (R3F 3D scene)

New component containing the R3F Canvas and all 3D elements:

- **`CentralComposite`**: A group containing:
  - Wireframe icosahedron at z = -0.5, slowly rotating
  - Point light inside for inner glow
  - Logo PNG on a billboard plane at z = +1, using `<Float>` for gentle bob
- **`OrbitalRing`**: A thin torus geometry marking the orbital path, tilted ~25° on the X-axis. Three gradient color segments (one per core).
- **`ParticleField`**: Instanced points (200-500 on desktop, 50 on mobile) drifting slowly in 3D space with colors sampled from the tri-color palette + burnt-orange.
- **`OrbitingNode`** (×3): A small emissive sphere mesh orbiting the center on a tilted elliptical path with:
  - Z-clamped to never go behind z = -0.3
  - Dynamic opacity (0.7–1.0) and scale (0.85–1.1) based on z-position
  - Each node's sphere colored with its core color
  - `<Html center>` child containing the clickable DOM button
  - Smart label repositioning (right when in front, above when in back)
- **`SceneCamera`**: Perspective camera with subtle auto-drift for a living feel.
- **Postprocessing**: Bloom effect on emissive materials for glow.

#### Step 4: Refactor `NexusHub.tsx`

- Replace the current Framer Motion orbit with `<NexusScene>`.
- Keep the nav buttons (About, Work, Contact, WebsterLEADS) as regular DOM outside the Canvas.
- Add WebGL detection fallback — if `WebGLRenderingContext` is not available, render the old 2D hub.
- Use `React.lazy` + `Suspense` to lazy-load the 3D scene so it doesn't block initial page load.

#### Step 5: Mobile responsiveness

- Use a `useMediaQuery` hook to detect screen size.
- Use `navigator.hardwareConcurrency` and user-agent sniffing to detect low-end mobile devices at runtime.
- Pass a `quality` prop to `NexusScene`: `"full"` (desktop), `"lite3d"` (mobile default), `"css3d"` (low-end mobile), with automatic 2D Framer Motion fallback if WebGL is unavailable.
- Quality levels control: bloom on/off, icosahedron rotation on/off, particle count (200–500 / 30–50), orbit tilt (~25° / ~10°), orbit radius, and `frameloop` mode (`always` on desktop, `demand` on mobile).

---

### Phase 1B — WebsterLEADS Compliance

#### Step 6: Create `WebsterLEADSSection.tsx`

A new top-level section accessible as a **standalone button** on the NexusHub and from the GlobalNav. Five sub-sections:

- **A — Personal Leadership Philosophy** (from `Personal Leadership Project.md` Part 2)
- **B — My Leadership Growth** (from `Personal Leadership Project.md` Parts 1 & 3)
- **C — Ethics Reflection** (from `Ethics Reflection Essay.md`)
- **D — Practical Leadership Experiences** (from `PLE1.md` and `PLE2.md`)
- **E — International Distinction** (GSLS Geneva callout)

#### Step 7: Update `App.tsx`

- Add `"websterleads"` as a `Section` type.
- Add routing logic for `WebsterLEADSSection`.

#### Step 8: Update `GlobalNav.tsx`

- Add "WebsterLEADS Portfolio" nav item (with `Award` or `GraduationCap` icon).

#### Step 9: Update `NexusHub.tsx`

- Add standalone nav button for WebsterLEADS alongside About/Work/Contact.

#### Step 10: Update WebsterLEADS project card in `ContentSection.tsx`

- Reference the full WebsterLEADS portfolio section.
- Explicitly mention International Distinction with GSLS connection.

---

### Phase 2 — Technical Improvements

#### Step 11: SEO Fixes in `index.html`

- Descriptive `<title>`, `<meta description>`, OG/Twitter tags, favicon.

#### Step 12: Image Optimization

- Convert largest PNGs to WebP. Target: ~27 MB → under ~5 MB.

#### Step 13: Remove Unused UI Components

- Audit and remove unused components from `src/components/ui/`.

#### Step 14: Minor Fixes

- Remove `role="application"` from root div.
- Update copyright year to 2026.

---

## User Review Required

> [!IMPORTANT]
> **All design questions have been resolved. No further input required.**
>
> 1. **Central geometry**: ✅ Wireframe icosahedron behind + logo PNG in front (billboard, always faces camera)
> 2. **Orbital tilt**: ✅ ~25° tilt with three usability mitigations (Z-clamping, dynamic opacity/scale, smart label repositioning)
> 3. **Color scheme**: ✅ Electric Blue `#3D8BE3` for Technology, Amber Gold `#E3B53D` for Leadership, Violet Magenta `#9B3DE3` for Design
> 4. **Mobile**: ✅ Lite 3D tier as default — static icosahedron (no rotation), bloom disabled, ~30–50 particles, `frameloop="demand"`. Falls back to CSS 3D on low-end hardware, then 2D Framer Motion if WebGL is unavailable.

---

## Verification Plan

### Automated
- Build check: `npm run build` must succeed.
- Grep verification: all five WebsterLEADS content areas present in codebase.

### Manual
- 3D scene: renders at 60fps on desktop, degrades gracefully on mobile.
- **Orbital usability test**: Confirm all three nodes remain visible, labelled, and clickable at every point in the orbit. No node goes behind the central geometry.
- WebsterLEADS section: all content from source documents faithfully presented.
- Full navigation test through GlobalNav and Hub.
- Content review by Muaz and/or WebsterLEADS mentor.
- **Color cohesion check**: Ensure the tri-color palette feels unified against the navy background, and that per-core tinting is subtle enough not to overwhelm burnt-orange branding.
