# Visual thesis — Brutalist concrete and moss

## Product idea

Timezone Slot Proof is an inspection instrument, not a calendar. The interface should feel like a field engineer's proof board: concrete slabs, registration marks, stamped status labels, and living moss used only where the schedule is healthy. The tension between rigid civic infrastructure and seasonal growth mirrors the product's subject: fixed working-hour rules moving through changing civil time.

## Palette

The product is deliberately single-mode so screenshots and exported proof pages have one stable visual language.

- `chalk` `#F2F0E8` — warm paper-like canvas; avoids sterile SaaS white.
- `concrete` `#D7D4C7` — structural panels and quiet bands.
- `concrete-dark` `#B8B4A6` — borders and recessed controls.
- `ink` `#171A16` — primary copy and near-black structure.
- `muted-ink` `#4D5148` — secondary copy; 7:1 on chalk.
- `moss` `#405D36` — primary action and verified state.
- `moss-bright` `#CFE1A6` — selected/healthy fields with dark ink.
- `lichen` `#E4EDCF` — success wash.
- `amber` `#8B4B12` / `#F3D3A5` — DST attention states.
- `rust` `#8F2F26` / `#F2C5BA` — invalid or missing wall time.
- `blueprint` `#244E63` — focus ring and informational marks.

Every status combines color with a word and symbol. All text/background pairs meet WCAG AA.

## Typography

- Headings: `Arial Black`, `Arial Narrow Bold`, system sans-serif. Compressed, infrastructural, upper-case only for short labels.
- Body and controls: `Arial`, `Helvetica`, system sans-serif for fast, self-host-free rendering.
- Data: `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace with tabular figures.

The scale is 14 / 16 / 20 / clamp(30–48) / clamp(44–72) px with 1.45–1.6 body leading. The maximum reading measure is 68 characters.

## Spacing and structure

An 8px base rhythm: 4, 8, 12, 16, 24, 32, 48, 72. Major regions use thick 2px ink rules, while related controls are grouped by proximity rather than card grids. Corners are 0–3px: poured slabs, not soft dashboard bubbles. Buttons and inputs are at least 44px tall. The desktop form is an asymmetric 5/7 drafting grid; at 760px it becomes one column. On a 390px phone, decorative hero copy and less-important table columns collapse, while all proof states and exports remain available.

## Interaction grammar

- Primary action is a moss block with a physical 3px ink offset; pressed state closes the offset.
- Inputs look inset into concrete with an explicit label above and plain-language help below.
- Review results arrive as a stamped proof strip, then the anomaly ledger, then the full test matrix.
- A segmented `Show all bookable times / Show clock changes / Show problems` control filters the table without changing the calculation.
- A weekly review link contains configuration only, never imported calendar contents, and opens a read-only generated check.
- Focus is a 3px blueprint outline plus offset, visible on every control.

## Motion policy

Only state transitions move. Results enter 12px upward over 220ms; buttons move 2px while pressed; expanding rows use 180ms opacity and transform. No ambient or looping motion. Under `prefers-reduced-motion: reduce`, scrolling is instant and transitions/animations are removed.

## Original asset plan and provenance

The hero uses one generated editorial still: an overhead concrete scheduling slab crossed by five thin timezone tracks, with restrained moss growing around correctly aligned apertures and one amber discontinuity. It explains the proof metaphor without depicting a fake UI. A hand-authored SVG registration-mark motif is used decoratively in the footer.

Prompt sheet:

- Subject: abstract top-down time inspection slab with five aligned parallel tracks and one offset seam.
- World: civil infrastructure model / architectural material study.
- Materials: raw pale concrete, oxidized steel pins, soft live moss, paper labels without writing.
- Light: overcast northern daylight, crisp shallow relief, editorial still life.
- Lens/composition: orthographic overhead, wide 3:2 crop, right-weighted detail with calm negative space.
- Palette words: chalk, wet concrete, forest moss, charcoal, tiny amber warning.
- Negative list: people, clocks with numerals, readable text, logos, watermark, glossy 3D, neon, gradients, blue-purple SaaS imagery.

Asset prompt (used verbatim with the factory image generator):

> Use case: stylized-concept. Asset type: responsive landing-page hero illustration. Primary request: an abstract overhead civil-time inspection slab, five precisely aligned parallel timezone tracks cut into pale raw concrete, small oxidized steel registration pins, restrained living forest moss growing around the correctly aligned apertures, and exactly one subtle amber-colored offset seam suggesting a daylight-saving discontinuity. Scene/backdrop: architectural material study on a chalk-colored surface. Style/medium: tactile editorial still-life photography with model-making precision. Composition/framing: orthographic overhead, wide 3:2 crop, visual detail weighted to the right and quiet negative space to the left, no interface mockup. Lighting/mood: overcast northern daylight, crisp shallow relief, calm and trustworthy. Color palette: chalk, wet concrete, forest moss, charcoal, tiny amber warning. Materials/textures: porous concrete, matte paper tabs with no writing, natural moss, oxidized steel. Constraints: no people, no hands, no clocks with numerals, no readable text, no logos, no watermark, no brands. Avoid: glossy 3D, neon, gradients, blue-purple SaaS imagery, illegible pseudo-letters.

Generated with the factory `factory-image` deployment on 2026-08-27. Original project asset; no third-party source material. Final review and optimization are recorded in the handoff.
