# Process Context Graph

Interactive WebGL process context graphs built on [Sigma.js v3](https://www.sigmajs.org/) + [Graphology](https://graphology.github.io/). LeveeTech terrain palette. Dithered stipple shadows. All-circle nodes sized by hierarchy depth.

![LeveeTech](https://img.shields.io/badge/LeveeTech-Terrain_Palette-B85C38)

## Quick Start

```bash
# Clone
git clone https://github.com/henrylawler/process-context-graph.git
cd process-context-graph

# Serve (any static server works)
npx serve .
# or
python3 -m http.server 8000
# or just open index.html directly in your browser
```

Open `http://localhost:8000` (or `3000` for `npx serve`).

## What You Get

A full-screen interactive graph with:

- **6 hierarchy levels** — Project → Board Owner → Feature → Task → Subtask → Action
- **All circular nodes** — sized and colored by depth level
- **Dithered stipple shadows** — Canvas 2D dot pattern with distance-based falloff
- **Halftone texture** — Ben-Day dot overlay on each node
- **4 views** — Hierarchy, Sync Flow, Lanes (Kanban), Dependencies
- **Edge styling** — Solid (hierarchy), dashed (depends_on), thick dashed (blocks), solid patina (sync_flow)
- **Hover dimming** — Non-neighbors fade on hover
- **Click detail panel** — Node info, dependencies, work items
- **Keyboard shortcuts** — 1-4 views, H halftone, Z depth, L labels, R reset, Esc close

## Architecture

```
index.html     — Self-contained interactive graph (single file, CDN imports)
data.js        — Separated data config (edit this for your project)
```

### Dependencies (CDN, zero install)

| Package | Version | Role |
|---------|---------|------|
| [Sigma.js](https://www.sigmajs.org/) | 3.0.2 | WebGL graph renderer |
| [Graphology](https://graphology.github.io/) | 0.26.0 | Graph data structure |
| Google Fonts | — | Playfair Display, Literata, JetBrains Mono |

### LeveeTech Terrain Palette

| Level | Color | Hex |
|-------|-------|-----|
| L1 Project | Tidal | `#5A7D8A` |
| L2 Board Owner | Sage | `#6B7F5E` |
| L3 Feature | Terracotta | `#B85C38` |
| L4 Task | Desert | `#D4A96A` |
| L5 Subtask | Sandbar | `#C4A77D` |
| L6 Action | Ash | `#9A9590` |

### Edge Types

| Type | Style | Color |
|------|-------|-------|
| Hierarchy | Solid + arrow | Sand `rgba(201,184,150,0.30)` |
| depends_on | Dashed `[8,5]` + arrow | Terracotta `rgba(184,92,56,0.45)` |
| blocks | Thick dashed `[5,4]` + arrow | Juke `rgba(179,66,51,0.55)` |
| sync_flow | Solid + arrow | Patina `rgba(94,139,126,0.45)` |

## Customizing Your Data

Edit `data.js` (or the inline data in `index.html`) to load your own project:

```javascript
// Each node needs: id, label, level, owner, fn, parent
{ id: 'my_project', label: 'My Project', level: 'project', owner: 'Me', fn: 'Platform', parent: null },
{ id: 'my_board', label: 'Engineering', level: 'board_owner', owner: 'Lead', fn: 'Eng', parent: 'my_project' },
// ... and so on through feature → task → subtask → action
```

### Adding Dependencies

```javascript
// src depends on / blocks tgt
{ src: 'node_a', tgt: 'node_b', kind: 'depends_on' },
{ src: 'node_c', tgt: 'node_d', kind: 'blocks' },
```

## Setting Up Interactive Sigma.js Graphs

### 1. HTML skeleton

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #sigma { position: absolute; inset: 0; }
  </style>
</head>
<body>
  <div id="sigma"></div>
  <script type="module">
    import Graph from "https://cdn.jsdelivr.net/npm/graphology@0.26.0/+esm";
    import Sigma from "https://cdn.jsdelivr.net/npm/sigma@3.0.2/+esm";

    const graph = new Graph();

    // Add nodes
    graph.addNode("a", { x: 0, y: 0, size: 20, color: "#5A7D8A", label: "Node A" });
    graph.addNode("b", { x: 1, y: -1, size: 15, color: "#B85C38", label: "Node B" });

    // Add edges
    graph.addEdge("a", "b", { size: 2, color: "rgba(201,184,150,0.3)" });

    // Render
    const sigma = new Sigma(graph, document.getElementById("sigma"), {
      renderLabels: true,
      labelFont: '"JetBrains Mono", monospace',
      labelSize: 10,
    });
  </script>
</body>
</html>
```

### 2. Custom Node Rendering (Dithered Shadows)

Sigma v3 lets you override `defaultDrawNode` for Canvas 2D custom rendering:

```javascript
const settings = {
  defaultDrawNode: (ctx, data, settings) => {
    const { x, y, size, color } = data;

    // Dithered shadow — stipple dots with distance falloff
    const offset = 4; // shadow offset in px
    const spacing = 3;
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + offset, y + offset, size + 1, 0, Math.PI * 2);
    ctx.clip();
    for (let dy = -size - 4; dy <= size + 4; dy += spacing) {
      for (let dx = -size - 4; dx <= size + 4; dx += spacing) {
        const dist = Math.sqrt(dx*dx + dy*dy) / size;
        if (dist < 1.2) {
          const r = 1.2 * (1 - dist * 0.4);
          const a = 0.15 * (1 - dist * 0.5);
          ctx.beginPath();
          ctx.arc(x + offset + dx, y + offset + dy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(42,37,32,${a})`;
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // Main circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(42,37,32,0.45)';
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }
};
```

### 3. Custom Edge Rendering (Dashes + Arrows)

Override via `afterRender` event:

```javascript
sigma.on('afterRender', () => {
  const canvas = sigma.getCanvases().edges;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  graph.forEachEdge((edge, attrs, src, tgt) => {
    const s = sigma.getNodeDisplayData(src);
    const t = sigma.getNodeDisplayData(tgt);
    const angle = Math.atan2(t.y - s.y, t.x - s.x);

    ctx.beginPath();
    ctx.setLineDash(attrs.kind === 'depends_on' ? [8,5] : []);
    ctx.moveTo(s.x + Math.cos(angle) * s.size, s.y + Math.sin(angle) * s.size);
    ctx.lineTo(t.x - Math.cos(angle) * t.size, t.y - Math.sin(angle) * t.size);
    ctx.strokeStyle = attrs.color;
    ctx.lineWidth = attrs.size;
    ctx.stroke();

    // Arrowhead
    const ax = t.x - Math.cos(angle) * t.size;
    const ay = t.y - Math.sin(angle) * t.size;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - 8 * Math.cos(angle - 0.3), ay - 8 * Math.sin(angle - 0.3));
    ctx.lineTo(ax - 8 * Math.cos(angle + 0.3), ay - 8 * Math.sin(angle + 0.3));
    ctx.fillStyle = attrs.color;
    ctx.fill();
  });
});
```

### 4. Hover Interactions

```javascript
sigma.setSetting('nodeReducer', (node, data) => {
  if (hoveredNode && node !== hoveredNode && !graph.neighbors(hoveredNode).includes(node)) {
    return { ...data, color: 'rgba(210,200,185,0.5)', label: null };
  }
  return data;
});

sigma.on('enterNode', ({ node }) => { hoveredNode = node; sigma.refresh(); });
sigma.on('leaveNode', () => { hoveredNode = null; sigma.refresh(); });
```

### 5. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Process context graph v1.0"
git remote add origin https://github.com/YOUR_USER/process-context-graph.git
git push -u origin main

# Enable Pages in repo Settings → Pages → Source: main branch, root
# Access at: https://YOUR_USER.github.io/process-context-graph/
```

## Domain Model Reference

Based on the [Rails + Obsidian Vault Contract v1](https://github.com/henrylawler/process-context-graph):

- **Project** — Root container
- **Node** — Hierarchy layer: project → board_owner → feature → task → subtask → action
- **WorkItem** — Lane cards: backlog → next_up → doing → done
- **Dependency** — depends_on | blocks
- **SyncEvent** — vault_to_db | db_to_vault

## License

MIT
