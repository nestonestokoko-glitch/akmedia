# AK Media India — Design Intelligence System

> The visual decision system for AK Media India. Every future design decision consults this file before code is written.
>
> **Direction: "The Live Editor's Desk."** AK Media is a working newsroom/brokerage connecting creators and brands. It is designed like a premium editorial publication — not a SaaS dashboard, not a marketing template. Real data typeset as breaking-news numerals, the network rendered as a live board, brand and creator paths side by side like a split screen.
>
> Load-bearing rule from the brief: **Same company. Same business. Same purpose. Completely different digital experience.** Never "the old website with better CSS."

---

## 1. Design Philosophy

- **Typography is the interface.** Scale, weight, color, spacing, case and style do the design work that cards and graphics would otherwise do.
- **Data is the evidence.** Real numbers (2000+ creators, 100+ brands, 1000+ campaigns, 320% ROI, 50K+ signups) are the strongest visual assets. Typeset them like headlines, not like footnote chips.
- **Constraint over decoration.** 6 brand colors, 2 typefaces, one 8px rhythm. Depth comes from layered dark tones, not shadows or gradients.
- **One ecosystem, two experiences** — brands and creators share one design system but each path has its own accent world (blue vs mint) and its own visual texture.
- **Never fabricate.** No invented clients, creators, results, testimonials, statistics, or API responses. When real data is unavailable, show an intentional empty/fallback state.

## 2. Visual Direction

AK Media reads like a cross between a financial desk's data ticker and a culture magazine's type section.

- **Aesthetic pillars:** black + layered dark grays, visible construction grids, huge tabular numerals, hairline rules, oversized sans headlines with serif-italic accent words, grain + grid texture, sparse but meaningful motion.
- **Signature move:** the result numeral as a graphic object — `320%`, `50K+`, `2000+` set at display scale with a micro-label, treated the way a magazine treats a cover number.
- **Working boards** (creator rail, ticker, category marquee) make the platform feel alive and real-time without faking live data.

## 3. Typography System

- **Families (2 only):** Inter (sans — everything UI, numerals, labels) + Instrument Serif italic (accent words and pull-quotes only).
- **Scale (via tokens):**
  - `text-display` — clamp(3.6rem, 11vw, 8rem) / lh 0.98 / ls −0.045em — climax numerals; one per view.
  - `text-h1` — clamp(2.8rem, 7vw, 5.5rem) / lh 1.02 / ls −0.04em — hero and cinema headings.
  - `text-h2` — clamp(2rem, 4.5vw, 3.4rem) / lh 1.06 / ls −0.03em — section headings.
  - `text-h3` — clamp(1.4rem, 2.2vw, 1.9rem) / lh 1.14 — sub-blocks.
  - `text-lead` — 1.125rem / lh 1.6 — body decks; measure ≤ 65ch.
  - `text-meta` — 0.8125rem — supporting labels; `text-caption` — 0.6875rem — micro-labels/kickers.
- **Kickers:** uppercase, `text-caption`–`text-meta`, `tracking-[0.24em]`, `font-semibold`, blue. A field label, not a decorative flourish.
- **Numerals:** always `num-lock` (tabular + lining); heavy weight only at display scale; light/medium elsewhere.
- **Serif italic accent** (`type-accent`): one accent word per major heading maximum. Never a full sat-italic line.

## 4. Color System

Official palette (never extend):
| Name | Hex | Role |
|---|---|---|
| Black `ink` | `#000000` | hero, footer, major/cinematic moments |
| Dark Gray `ink-2` | `#212121` | default section surfaces, rails |
| Muted Green `mint` | `#668156` | creator moments, secondary CTA |
| Blue `blue` | `#52A9E5` | primary CTA, links, results |
| White `bone` | `#FFFFFF` | primary text |
| Light Gray `mist`/`paper` | `#F5F5F5` | supporting text, light surfaces |

Tonal architecture (allowed by user decision — shades/tones keep identity):
- **Elevations:** `ink` → `ink-2` → `ink-3` → `ink-4` → `ink-5` → `ink-6`. Depth by tone step, never by shadow alone.
- **Surface washes:** `blue-60…blue-03`, `mint-60…mint-05` as rgba tints for streaks, glow, hover fills, dividers.
- **Readable accents on dark:** `blue-bright #7CBFEF` and `mint-bright #8FA77E` for small/large text on dark surfaces.
- **Glow:** `shadow-glow-blue` / `shadow-glow-mint` only behind focal numerals (subtle, ≤48px blur).

**Balance guideline (rough):** Black/Dark Gray ≈ 55–60% · White/Light Gray ≈ 25–30% · Blue ≈ 10–12% · Mint ≈ 5–8%. Blue strictly for action + measurable results. Mint strictly for creator moments. Never a rainbow.

## 5. Layout Principles

- **Container widths:** `container-wide` (1400px — default content), `container-narrow` (800px — text/quote), full-bleed for hero, fact rows, split screens, marquees.
- **Full-bleed is a deliberate design statement**, not an accident — reserve it for high-impact moments (data rows, split path, campaign lockups).
- **Editorial asymmetry over symmetry:** 7/5 and 4/3 splits; the dominant column carries content, the minor column carries data or texture.
- **Sticky elements** reserved for on-scroll anchors (quote, numeral) — never more than one sticky per viewport.
- **Whitespace as a layout tool:** "more space around = more importance." Generous `py-section` breathing room; tight clusters for data.

## 6. Grid System

- Base grid: **12 columns** on desktop, 6 on tablet, 4 on mobile. Gutter 24px desktop / 16px mobile.
- **Grids are visible and intentional** — hairline `grid-lines` (72px) at low opacity in hero and major moments. The layout *is* the design.
- Rows and columns align to the 8px spacing rhythm (`--spacing-section` etc.).
- Data blocks (tickers, spec tables, fact rows) use fixed column offsets so numerals align in columns like a ledger.

## 7. Hero Section Principles

- **Purpose:** within 3 seconds communicate (1) what AK Media does, (2) why it is different, (3) who it serves, (4) the action.
- Hero is asymmetric, editorial: **left = story** (kicker, headline, deck, CTAs, brand credits), **right = proof** (live data ticker, real numerals).
- Headline is the composition; 3 lines max, accent serif word on the line that carries the meaning.
- Texture: grain + grid-lines visible, one radial glow. No hero image required — type is the hero.
- Reduced-motion: headline still fully readable; nothing depends on JS.

## 8. Navigation Principles

- Floating `rounded-full` pill (max 960px), `backdrop-blur`, hairline border. It reads as a tool, not a bar.
- One trigger — **"All Paths"** — opens an oversized editorial menu (two columns: For Brands / For Creators) with huge links. Role-based architecture, not a task menu.
- Persistent blue CTA pill ("Start a Campaign") — the single conversion action always reachable.
- Full-screen menu uses staggered link entrance; closes on selection, Esc, and outside click. Keyboard accessible with visible focus.

## 9. Section Composition

Avoid the "heading → paragraph → three cards" grind. The page is a rhythm of distinct forms:
- fact rows (full-bleed data) → split screens (dual path) → horizontal rails (creator board) → type-lockups (campaigns) → hairlined strips (why) → timelines (process) → quotes (founder/testimonials) → conversion (forms).
- Alternate backgrounds `ink` / `ink-2` / `ink-3` to mark chapter changes.
- Every section earns its composition; if two adjacent sections would look the same, force a difference.

## 10. Card Design Principles

- **Cards are a tool, not a default.** Use a card only when it improves grouping, scanning, comparison, or interaction.
- Creator spec-cards exist (the board rail) but they are flat, hairline-bordered spec sheets — not floating rounded SaaS cards.
- No cards for: statistics, founder proof, campaign results, testimonials. Those are typographic.

## 11. Creator Showcase Patterns

- Presented as **spec sheets on a horizontal rail** — name, monogram tile (real initials, blue/mint gradient from data), category, and a 3-cell metric table (Followers / Earned / Campaigns) using `tabular-nums`, the key number in `blue-bright`.
- A category marquee (TECH · LIFESTYLE · GAMING · …) runs beneath to signal scale and diversity — labels, not fake avatars.
- Hover: border brightens to blue/50, monogram gently scales. No image crops, no dummy photos (real initials only).

## 12. Brand Showcase Patterns

- The brand side is a **blue spec sheet** — strategic language, numbered value points, "100+ brand campaigns" as the closing proof line.
- Brand marks appear as uppercase editorial "credits" (Hostinger, Filmora, Manomay, XECH) — text wordmarks, not downloaded logos.

## 13. Campaign / Case Study Patterns

- Campaigns are **type-lockups** — the result numeral is the hero (`320%`, `50K+` at display scale, `blue-bright`), with brand label, headline, result label, campaign-type mint tag, and a reading link.
- Each lockup rides its own gradient wash (from the campaign's data field) — Filmora/mint, Hostinger/blue — and alternates alignment left/right for variety.
- Minor parallax on the numeral while scrolling. Never a rectangular result card.

## 14. Statistics Patterns

- Statistics are **editorial fact rows**: full-bleed, big display figures with a micro-label under each, separated by vertical hairlines, a blue dot before every numeral.
- Counters animate on scroll-in (rAF / Framer); reduced-motion users see final values with no animation.
- Key numbers recur as thematic anchors (hero ticker, fact row, campaign lockups) so the data tells a coherent story.

## 15. Testimonials

- Two stacked full-width **endnote quotes** (hairline-separated), serif pull-quotes at 24px+.
- Each is tagged — "Brand" (blue outline pill) or "Creator" (mint outline pill). The word, not just the color, carries meaning.
- Author + role in `dust`. No stars, no avatars, no carousels. Real testimonials only.

## 16. Forms and Conversion

- Dual-path toggle (Brand quote / Creator application) is the conversion core; keep `role=tablist`, `aria-selected`, keyboard reachable.
- **States (all mandatory):** idle, focused, invalid (inline error, `role=alert`, live on blur), loading (spinner + disabled submit), success (confirmation panel), error (submit-level, retry allowed), duplicate-submit guard.
- Inputs: `bg-ink` on `ink-2` panels, hairline border, blue focus ring, `rounded-lg`. Labels clear; required asterisk in blue.
- All requests go through the typed API client — never raw `fetch` in components.

## 17. Interaction Design

- Every interactive element has a pressed/active/hover state and a visible focus ring (2px blue, offset 3px).
- Hover reveals are subtle and quick (≤300ms, `--ease-out-quart`); nothing transforms layout unexpectedly.
- Whole-row hover areas for principle strips; link-level hover for menus. Cursor changes only where native.
- No decorative interactions. Interaction communicates hierarchy, disambiguation, or affordance.

## 18. Motion Principles

- **Purpose over decoration:** reveals, counters, marquees, numeral parallax, hairline draws — each communicates hierarchy or continuity.
- Entrance: staggered, short (0.6–0.9s, `--ease-out-expo`), masked rises for headings (GSAP SplitText), fade+rise for blocks.
- **Reduced motion:** every animation gated by `prefers-reduced-motion` — GSAP context reverts, Framer `useReducedMotion`, marquees pause. Content never depends on animation to be visible.
- No bouncing, no continuous floating of interactive elements, no scroll-jacking, no layout-shifting keyframes.

## 19. Responsive Design

- Real deliberate mobile layouts, not desktop shrinkage.
- Horizontal rails keep their scroll affordance on touch (`snap-x`, `no-scrollbar`, larger touch targets ≥44px); fact rows wrap into a horizontal scroll strip.
- Split screens stack (brands first). Timeline becomes single column with color-coded nodes.
- Fluid type via clamp everywhere; reduce the cap at each breakpoint; never go below 16px body.
- On mobile: one fact per row, one campaign lockup per viewport, menu becomes the full-screen overlay.

## 20. Accessibility

- Semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), one `h1` (hero), ordered `h2`→`h3`.
- WCAG AA contrast: text ≥4.5:1 (use `blue-bright`/`mint-bright` for accent text on dark); focus visible; color never the only signal (word tags on testimonials, icon+label on CTAs).
- Keyboard: all triggers operable, Esc closes overlays, focus is trapped sensibly in the full-screen menu, focus returns on close.
- SplitText is `aria-hidden` on words with `aria-label` on the parent; reduced-motion renders plain read-form text.
- Forms: `label` for each field, `role=alert` errors, `aria-live` status, disabled submit prevents double-entry.

## 21. Image Direction

- **No stock photography.** Image/tile content is: typographic monograms, editorial numerals, gradient washes, watermarked wordmarks ("AK").
- Where an image exists in future, treat it as magazine crops — 4:3 / 16:9 / vertical editorial, duotone or single-accent overlay, never busy stock.

## 22. Visual Hierarchy

- Size is the primary signal: display numerals > h1/h2 > body > meta. Then weight, then color, then spacing.
- One focal object per viewport. Accents (blue/mint/serif) are reserved and sparse — saturation is expensive.
- Data hierarchy: label (dust) < value (bone for critical, blue-bright for results) < title.

## 23. Spacing System

- 8px rhythm base: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128.
- Section padding: `--spacing-section` clamp(5rem→9rem). Rail gaps 24–32px; hairline-separated rows 40px+.
- Tight tracking pairs with tight leading; wide tracking (kickers) pairs with small size.
- Whitespace guards: measure ≤65ch for paragraphs, 42–55ch for decks next to data.

## 24. Border / Radius / Shadow System

- Hairs: 1px `line-2` (rgba white 8%). Used freely as editorial rules.
- Radius: `sm` 4 (inputs/kickers), `md` 8 (spec cards), `lg` 12 (panels), `xl` 16 (big panels), `full` (pill nav, buttons, toggle).
- Shadows are minimal and dark (no floating white glow cards): `sm`/`md` only under truly layered UI; `glow-blue`/`glow-mint` reserved for focal numerals.
- Never radius + shadow + gradient together on one element (anti-SaaS rule).

## 25. Universal Principles

- One page, one continuous narrative (Attention → Trust → Understanding → Proof → Possibility → Action).
- Real data everywhere it exists; intentional fallbacks where it doesn't (never invent).
- Consistency through tokens — no ad-hoc hex, clamp, or spacing values in components.
- Performance is a design constraint: lazy sections, minimal JS, no heavy parallax chains.

## 26. Contextual Principles

- **Brands need** confidence, strategy, scale, measured results → blue world, spec sheets, campaign proof, ROI numerals.
- **Creators need** opportunity, growth, trust, monetization → mint world, board/rail, earnings and follower counts, application path.
- The duality is expressed in *accent world* and *copy*, with the shared system keeping them one product, never two websites.

## 27. Reference-Specific Insights

Extracted (not copied) from reference analysis + 2025 trends research:
- **Premium dark = layered gray, not flat black** — depth via tone steps (→ `ink`…`ink-6`).
- **Editorial grids are the design** — visible hairlines and offsets beat invisible SaaS grids.
- **Typography-first heroes** — headline scale and rhythm carry the first screen; secondary column carries proof.
- **SplitText on headings only**, with masking and a11y fallbacks (→ `SplitText` component).
- **Stats as narrative** — display numerals + micro-labels over card grids.
- **Role-based navigation** — editorial "All Paths" menu instead of a task bar.
- **Working-board textures** (marquees, rails, tickers) signal life without fake data.

## 28. Anti-Patterns

- The "heading + paragraph + three cards" repetition.
- Generic SaaS stack: gradient hero, logo strip, 3 cards × 3, testimonial carousel, CTA band.
- Excessive rounded corners + shadows everywhere; floating blobs; glassmorphism without purpose.
- Raw `blue #52A9E5` as small text on dark (≈ 8.2:1 on black — passes AAA; `blue-bright` is the softer texture variant).
- Rainbow accents; fabricated stats; stock avatars; downloaded brand logos.
- Animations that block scrolling, bounce, or run under `prefers-reduced-motion`.

## 29. Design Decision Rules

1. Consult this file before every major section.
2. Identify user problem + business objective → hierarchy → layout pattern → interaction → responsive → motion → implement → review.
3. If the answer looks like the old website — pick again.
4. When two layouts feel equivalent, choose the one that typesets data better.
5. Never invent content. Never exceed the palette. Never skip reduced-motion.

## 30. Implementation Guidance

- **Tokens live in `app/globals.css`** (`@theme`): colors, elevations, ramps, radius, shadows, type scale, easing, containers.
- **Heading animation:** `components/ui/SplitText.tsx` (GSAP, masked word rise, a11y-correct).
- **CTAs:** `components/ui/SlideButton.tsx`; **scroll reveals / counters:** `Reveal`, `Counter`.
- **Data pipeline:** typed client in `lib/api/` (base `NEXT_PUBLIC_API_BASE_URL`, default `http://localhost:3000/api`); components render loading/error/empty/success.
- **Texture classes:** `.grain`, `.grid-lines`, `.marquee-track`, `.num-lock`, `.no-scrollbar`, `type-accent`.
- Section components stay modular (`components/sections/*`); composition order lives in `app/page.tsx`.