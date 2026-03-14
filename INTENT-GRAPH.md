# Intent Graph — Concept Document

*An evergreen view of process architecture that persists when tools, data sources, and features change.*

---

## Core Insight

Tools and data sources change. Features shift availability over time. Sprint priorities rotate. But **intent** — the underlying *why* behind what a team builds — should be largely evergreen.

The Intent Graph captures this stable layer: a visualization of process architecture organized not by task hierarchy or technical dependency, but by the enduring purposes that drive work.

---

## Visual Metaphor

### Labeled Molecules / Process DNA

The Intent Graph renders as a **molecular diagram** — clusters of nodes arranged radially around a central hub, each cluster representing a distinct intent (User Experience, Security, Data Integrity, etc.).

Think of it as **Process DNA**: the fundamental building blocks that define what an organization does and why, regardless of the specific tools or methods used at any given time.

Each intent cluster is a labeled molecule:
- **Nucleus**: The intent label (e.g., "Security")
- **Atoms**: Individual tasks, features, and actions that serve that intent
- **Bonds**: Cross-intent dependencies showing how intents relate

---

## Six Intents (Default Set)

| Intent | Description | Stability |
|--------|-------------|-----------|
| **User Experience** | Everything that shapes what users see, feel, and do | Very High |
| **Security** | Authentication, authorization, data protection | Very High |
| **Integration** | Connecting systems, APIs, middleware | High |
| **Data Integrity** | Storage, validation, consistency, backup | Very High |
| **Performance** | Speed, efficiency, resource optimization | High |
| **Observability** | Monitoring, logging, alerting, visibility | High |

These are defaults — any process can define its own intent vocabulary. The key property: intents should change **rarely** compared to features, tasks, or tools.

---

## Use in MiniPRDs

### Hero Page (Page 1)

The first page of any MiniPRD should be **decision-ready at a glance**. The Intent Graph serves as the hero visualization:

- Single-page molecular diagram showing all intents
- Color-coded clusters with node counts and completion indicators
- Cross-intent dependency lines highlighting critical paths
- A senior stakeholder should be able to approve/reject from this page alone

### Analysis Pages (Pages 2+)

Subsequent pages provide deep context:
- **Intent Drill-Down**: Expand each cluster into its full task tree
- **Process Mining**: Historical flow analysis within each intent
- **Stability Report**: Which intents have remained constant vs. which have shifted
- **Dependency Matrix**: Cross-intent coupling analysis

---

## Components for Visualization

### 1. Intent Cluster View
Radial layout with labeled sectors. Each intent occupies a wedge of the circle. Nodes within each sector are positioned by hierarchy depth (larger/closer to center = higher level).

### 2. Intent Heatmap
Treemap/Mondrian view colored by intent instead of hierarchy level. Shows relative weight of each intent in the overall process.

### 3. Intent Flow
Sankey or chord diagram showing how work flows between intents. Reveals coupling patterns — e.g., "every Security change triggers Integration work."

### 4. Intent Timeline
Horizontal timeline showing when intents were active. Demonstrates the evergreen property: User Experience and Data Integrity appear continuously, while Performance may spike during optimization phases.

---

## Color Mode Integration

The Intent Graph works with PCG-UX's color mode system:

- **Color by Intent** (default in Intent view): Each intent maps to a palette color slot (l1–l6)
- **Color by Level**: Shows hierarchy depth within intent clusters
- **Color by Owner**: Reveals who owns what across intents
- **Color by Function**: Shows functional area distribution within intents

All three palettes (Terrain, Depths, Signal) work with intent coloring.

---

## Research Visualization Applications

### Process Architecture Studies
- Map organizational intents across departments
- Track intent stability over quarterly planning cycles
- Identify intent gaps (areas with no owning team)

### Knowledge Management
- Categorize documentation by intent rather than tool
- Build evergreen knowledge bases organized by purpose
- Reduce documentation churn when tools change

### Decision Support
- Present complex process decisions through intent lens
- Show stakeholders the *why* before the *what*
- Reduce cognitive load in review meetings

---

## Future Directions

### Visual Explainer Integration
Generate MiniPRD hero pages automatically from Intent Graph data. The Visual Explainer plugin would:
1. Read the Intent Graph structure
2. Render a publication-quality molecular diagram
3. Add summary statistics (nodes per intent, completion %, dependencies)
4. Output a single-page HTML suitable for stakeholder review

### Intent Drift Detection
Monitor how intents evolve over time:
- Alert when a previously stable intent starts accumulating new tasks rapidly
- Flag when an intent loses all active work (potential gap)
- Track when new intents emerge from unclassified work

### Cross-Project Intent Mapping
Compare intent graphs across projects to find:
- Shared intents that could benefit from shared tooling
- Unique intents that differentiate projects
- Intent patterns that predict project success

---

## Implementation Status

- [x] Intent attribute on nodes (`intent` field in data schema)
- [x] Intent Map view in PCG-UX (radial cluster layout)
- [x] Color by Intent mode
- [x] Dynamic legend for intent colors
- [ ] Intent Heatmap (Mondrian + intent coloring)
- [ ] Intent Flow (Sankey/chord diagram)
- [ ] Intent Timeline
- [ ] Visual Explainer integration
- [ ] Intent Drift Detection
- [ ] Cross-Project Intent Mapping

---

*Part of the PCG-UX Style Plugin — Process Context Graph*
