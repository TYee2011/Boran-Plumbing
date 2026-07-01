---
name: Boran Plumbing Heating & Gas
description: Premium commercial and residential mechanical plumbing systems
colors:
  primary: "#124773" # Boran Navy Blue
  accent: "#0ea5e9"  # Water Droplet Blue
  neutral-bg: "#f8fafc"
  neutral-text: "#0f172a"
typography:
  display:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontWeight: 900
  body:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontWeight: 400
rounded:
  xl: "16px"
  lg: "12px"
  md: "8px"
---

# Design System: Boran Plumbing (Logo-Matched Aqueous Brand)

## 1. Overview

**Creative North Star: "The Aqueous Mechanical System"**

This visual system is calibrated directly against the corporate logo identity. It integrates the solid corporate navy blue background, white line piping schematics, and sky-blue water droplet accents from the logo into a high-end, responsive marketing landing page.

Instead of strict 90-degree sharp corners, the interface utilizes controlled rounded corner scales (`rounded-2xl`, `rounded-xl`, `rounded-lg`) to mirror the rounded pipe bends, elbow refits, and wrench shapes represented in the corporate logo.

**Key Characteristics:**
*   **Logo-Matched Navy Drench**: Solid Boran Navy Blue (`#124773`) applied to high-impact surfaces (the Hero and Footer blocks) to replicate the logo's color space.
*   **Aqueous Details**: Pure sky-blue water droplet accents (`#0ea5e9`) used for checkmarks, badges, status lights, and interactive states.
*   **Rigid Blueprint Grid with Soft Radius**: Modular compartmentalized grid dividing lines, combined with clean rounded borders.

---

## 2. Colors

The color palette is derived directly from the corporate logo's image palette.

### Primary (Logo Navy)
*   **Boran Navy Blue** (#124773): Represents the core brand background. Used as the main color block for the Hero background, footer background, primary buttons, and key headers.

### Accent (Droplet Blue)
*   **Water Droplet Blue** (#0ea5e9): The primary accent color. Used for active states, ratings, status indicators, checkmarks, and focus overlays.

### Neutral
*   **Substrate Light** (#f8fafc): Main body background for page cards, sections, and grids. Clean, bright, and hygienic.
*   **Slate Ink** (#0f172a): Deep text color to guarantee readability against light backgrounds.

---

## 3. Typography

**Display Font:** Barlow Condensed (Black / Weight 900)
**Body/Interface Font:** Lexend (Regular / Weight 400)

Typography matches the geometric, condensed sans-serif block style of "HEATING & GAS" in the corporate logo, replacing playful fonts with a heavy, technical, industrial feel.

### Hierarchy
*   **Macro Display** (Black, 900 weight, uppercase): Used for H1 headings, tracked tightly (`-0.02em`) with a fluid scale.
*   **Sub-Header** (Black, 900 weight, uppercase): Used for h2-h6, text-transform uppercase, line-height 1.0.
*   **Interface / Body** (300 to 700 weight, sans-serif): Used for body prose, labels, inputs, and listings. Highly legible and accessible.

---

## 4. Geometry & Elevation

*   **Piping Radius**: Grid cards and containers use `rounded-2xl` (16px) or `rounded-xl` (12px) borders, matching the curved profile of plumbing piping elements.
*   **Interactions**: Buttons and inputs use `rounded-lg` (8px) for comfortable touch/click targets.
*   **Elevation**: Flat overall layout with soft outline borders (`1px solid #cbd5e1`) and very soft shadow layers (`box-shadow: 0 4px 6px rgba(18, 71, 115, 0.05)`) on card panels.

---

## 5. Do's and Don'ts

### Do:
*   **Do** display the logo cleanly in headers and footers with a transparent backdrop or clean container.
*   **Do** alternate Navy-drenched sections (Hero, Footer) with clean light-slate sections (Services, Process, Coverage) to maintain visual rhythm.
*   **Do** use high-contrast text on all buttons (white text on Navy or Sky Blue).

### Don't:
*   **Don't** introduce foreign highlight colors (no red, green, or purple accents).
*   **Don't** use sharp, zero-radius corners which clash with the logo's curved pipe outlines.
*   **Don't** mix the primary corporate blue with generic royal blues.
