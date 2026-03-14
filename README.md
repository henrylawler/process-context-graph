# PCG-UX · Process Context Graph

Interactive WebGL process context graphs built on [Sigma.js v3](https://www.sigmajs.org/) + [Graphology](https://graphology.github.io/). A complete UX style plugin with 3 color palettes, 8-shape component library, leader line callouts, and full light/dark theming.

![pcg-ux](https://img.shields.io/badge/pcg--ux-Style_Plugin_v2.0-B85C38)

## Quick Start

```bash
git clone https://github.com/henrylawler/process-context-graph.git
cd process-context-graph
npx serve .
# or: python3 -m http.server 8000
# or just open index.html directly
```

Live: [https://henrylawler.github.io/process-context-graph/](https://henrylawler.github.io/process-context-graph/)

## Features

### Core Rendering
- **6 hierarchy levels** — Project → Board Owner → Feature → Task → Subtask → Action
- **Dithered stipple shadows** — Canvas 2D dot pattern with distance-based falloff
- **Halftone texture** — Ben-Day dot overlay on each node
- **Gloss highlights** — Subtle highlight on upper portion of each node
- **4 views** — Hierarchy, Sync Flow, Lanes (Kanban), Dependencies

### 3 Color Palettes

All three palettes work together aesthetically — designed to coexist in a single portfolio.

| Palette | Anchor Colors | Feel |
|---------|--------------|------|
| **Terrain** (default) | Terracotta, Sage, Tidal, Desert | Warm earth tones |
| **Estuary** | Deep Navy, Slate Teal, Copper, Warm Stone | Cool blue-greens with warm accents |
| **Ridgeline** | Basalt, Lichen Green, Rust, Wheat | Muted purples and warm grays |

- Press `P` to cycle palettes
- Palette picker swatches in controls bar
- Persists in localStorage

### Shape Component Library (8 shapes)

Two rendering modes:

- **Process Mode** — All circular nodes sized by hierarchy depth. For process flows, dependency graphs, status tracking.
- **Systems Mode** — Mixed shapes per component type. For structured workflows and systems diagrams.

| Shape | Use Case | Toggle with `S` key |
|-------|----------|---------------------|
| Circle | Process nodes, tasks, actions | ● |
| Rounded Rectangle | Services, APIs, databases | ▢ |
| Diamond | Decision points, gates | ◇ |
| Hexagon | Integration points, middleware | ⬡ |
| Octagon | Security/auth components | ⯃ |
| Pill/Stadium | Data stores, queues | ⬭ |
| Triangle | Triggers, events | △ |
| Pentagon | External systems | ⬠ |

All shapes render with: dithered shadow, halftone overlay, gloss highlight, outline stroke, hover glow ring.

### Leader Line Callouts

Click any node to open a hockey-stick annotation line (like medical textbook diagrams):

- Thin leader line extends from node edge with a 90° bend
- Floating label card shows: name, level, owner, notes excerpt
- Multiple callouts can be open simultaneously
- Callouts follow the camera on zoom/pan
- Click again to dismiss

### Light / Dark Theme

Full component theming across every UI element:

- Press `D` to toggle dark mode
- All surfaces, text, borders, shadows, grain overlay themed
- Sigma renderer updates label colors and halos
- Node renderer adjusts shadow dots, outlines, halftone opacity
- Persists in localStorage

### Agent Layer
- **Query mode** — Ask questions about the graph (API hook ready)
- **Feedback mode** — Log tasks, flag issues, request changes tied to specific nodes
- **Review queue** — Pending feedback items with localStorage persistence

### Interactions
- **Hover dimming** — Non-neighbors fade on hover
- **Hover tooltip** — Quick node info on flyover
- **Click detail panel** — Full node info, dependencies, work items
- **Leader line callouts** — Click-to-annotate with hockey-stick lines

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Hierarchy view |
| `2` | Sync flow view |
| `3` | Lanes view |
| `4` | Dependencies view |
| `H` | Toggle halftone |
| `Z` | Toggle depth sizing |
| `L` | Toggle labels |
| `S` | Toggle shape mode (circles ↔ systems) |
| `D` | Toggle dark mode |
| `P` | Cycle color palette |
| `R` | Reset camera |
| `Esc` | Close panels |

## Architecture

```
index.html     — Self-contained interactive graph (single file, CDN imports)
data.js        — Separated data config with example + placeholder datasets
```

### Dependencies (CDN, zero install)

| Package | Version | Role |
|---------|---------|------|
| [Sigma.js](https://www.sigmajs.org/) | 3.0.2 | WebGL graph renderer |
| [Graphology](https://graphology.github.io/) | 0.26.0 | Graph data structure |
| Google Fonts | — | Playfair Display, Literata, JetBrains Mono |

## Data Schema

### Node Schema

```javascript
{
  id: 'node_id',           // Unique identifier
  label: 'Display Name',   // Node label
  level: 'feature',        // Hierarchy: project | board_owner | feature | task | subtask | action
  owner: 'Owner Name',     // Responsible person/team
  fn: 'Function',          // Functional area
  parent: 'parent_id',     // Parent node ID (null for root)
  shape: 'circle',         // Shape: circle | roundedRect | diamond | hexagon | octagon | pill | triangle | pentagon
  notes: 'Description'     // Free-text notes
}
```

### Dependency Schema

```javascript
{ src: 'node_a', tgt: 'node_b', kind: 'depends_on' }  // depends_on | blocks
```

### Edge Types

| Type | Style | Description |
|------|-------|-------------|
| Hierarchy | Solid + arrow | Parent-child relationships |
| depends_on | Dashed `[8,5]` + arrow | Dependency links |
| blocks | Thick dashed `[5,4]` + arrow | Blocking relationships |
| sync_flow | Solid + arrow | Sync flow connections |

### Work Items

```javascript
{
  id: 'wi_1',
  nodeId: 'parent_node',   // Which node this belongs to
  title: 'Item title',
  status: 'doing',         // backlog | next_up | doing | done
  points: 3
}
```

## Data Sources

The project includes two datasets:

1. **Example data** (default) — A seeded example project demonstrating all 6 hierarchy levels with dependencies, work items, and sync flow
2. **Placeholder data** — Generic schema-aligned entries showing the full data model without project-specific content

Toggle between them via the data source dropdown in the controls bar.

## Customizing

Edit `data.js` to add your own project data following the schema above. The graph automatically derives layouts, colors, and shapes from the data attributes.

### Adding a Custom Palette

Add a new `body[data-palette="your-palette"]` block in the CSS with overrides for the `--p-*` variables, and register it in the `PALETTES` config object in JavaScript.

## Deploy

```bash
git add index.html data.js
git commit -m "Update graph data"
git push origin main
# GitHub Pages serves from main branch root
```

## License

MIT
