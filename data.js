/**
 * Process Context Graph — Data Configuration
 *
 * Edit this file to load your own project hierarchy.
 * All nodes are rendered as circles. Size and color are driven by `level`.
 *
 * Schema levels:
 *   L1  project      — Root container (largest, Tidal #5A7D8A)
 *   L2  board_owner  — Domain scope (Sage #6B7F5E)
 *   L3  feature      — Deliverable unit (Terracotta #B85C38)
 *   L4  task         — Execution unit (Desert #D4A96A)
 *   L5  subtask      — Granular step (Sandbar #C4A77D)
 *   L6  action       — Atomic leaf (Ash #9A9590)
 *
 * Edge types:
 *   hierarchy   — Parent→child (solid, sand)
 *   depends_on  — Prerequisite (dashed terracotta)
 *   blocks      — Hard blocker (thick dashed juke)
 *   sync_flow   — Vault↔DB sync (solid patina)
 */

export const nodeData = [
  // L1 — Project
  { id: 'n_root', label: 'OpenClaw', level: 'project', owner: 'Hank', fn: 'Platform', parent: null },

  // L2 — Board Owners
  { id: 'n_bux', label: 'UX Engineering', level: 'board_owner', owner: 'Henry', fn: 'UX Eng', parent: 'n_root' },
  { id: 'n_bdata', label: 'Data Platform', level: 'board_owner', owner: 'Hank', fn: 'Backend', parent: 'n_root' },
  { id: 'n_bsync', label: 'Vault Sync', level: 'board_owner', owner: 'Hank', fn: 'Sync', parent: 'n_root' },

  // L3 — Features
  { id: 'n_fwb', label: '2.5D Workbench', level: 'feature', owner: 'Henry', fn: 'UX Eng', parent: 'n_bux', due: '2026-03-01' },
  { id: 'n_fgr', label: 'Context Graph', level: 'feature', owner: 'Henry', fn: 'Visualization', parent: 'n_bux' },
  { id: 'n_fap', label: 'Rails API', level: 'feature', owner: 'Hank', fn: 'Backend', parent: 'n_bdata' },
  { id: 'n_fdb', label: 'DB Schema', level: 'feature', owner: 'Hank', fn: 'Data', parent: 'n_bdata' },
  { id: 'n_fsy', label: 'Sync Engine', level: 'feature', owner: 'Hank', fn: 'Sync', parent: 'n_bsync' },

  // L4 — Tasks
  { id: 'n_tcam', label: 'Camera Depth', level: 'task', owner: 'Henry', fn: 'UX', parent: 'n_fwb' },
  { id: 'n_thier', label: 'Hierarchy Drill', level: 'task', owner: 'Henry', fn: 'UX', parent: 'n_fwb' },
  { id: 'n_tdith', label: 'Dither Shader', level: 'task', owner: 'Henry', fn: 'Rendering', parent: 'n_fgr' },
  { id: 'n_tlay', label: 'Layout Engine', level: 'task', owner: 'Henry', fn: 'Graph', parent: 'n_fgr' },
  { id: 'n_tcrud', label: 'CRUD Endpoints', level: 'task', owner: 'Hank', fn: 'API', parent: 'n_fap' },
  { id: 'n_trt', label: 'ActionCable', level: 'task', owner: 'Hank', fn: 'Realtime', parent: 'n_fap' },
  { id: 'n_tmig', label: 'Migrations', level: 'task', owner: 'Hank', fn: 'DB', parent: 'n_fdb' },
  { id: 'n_tfm', label: 'Frontmatter Parse', level: 'task', owner: 'Hank', fn: 'Sync', parent: 'n_fsy' },
  { id: 'n_tmb', label: 'Managed Blocks', level: 'task', owner: 'Hank', fn: 'Sync', parent: 'n_fsy' },

  // L5 — Subtasks
  { id: 'n_sfov', label: 'FOV Slider', level: 'subtask', owner: 'Henry', fn: 'UX', parent: 'n_tcam' },
  { id: 'n_sorbit', label: 'Orbit Controls', level: 'subtask', owner: 'Henry', fn: 'UX', parent: 'n_tcam' },
  { id: 'n_sbread', label: 'Breadcrumb Trail', level: 'subtask', owner: 'Henry', fn: 'UX', parent: 'n_thier' },
  { id: 'n_shalf', label: 'Halftone Variant', level: 'subtask', owner: 'Henry', fn: 'Rendering', parent: 'n_tdith' },
  { id: 'n_snode', label: 'Node CRUD', level: 'subtask', owner: 'Hank', fn: 'API', parent: 'n_tcrud' },
  { id: 'n_swi', label: 'WorkItem Lanes', level: 'subtask', owner: 'Hank', fn: 'API', parent: 'n_tcrud' },
  { id: 'n_syaml', label: 'YAML Parser', level: 'subtask', owner: 'Hank', fn: 'Sync', parent: 'n_tfm' },
  { id: 'n_swrite', label: 'Block Writer', level: 'subtask', owner: 'Hank', fn: 'Sync', parent: 'n_tmb' },

  // L6 — Actions
  { id: 'n_afov_impl', label: 'Implement slider', level: 'action', owner: 'Henry', fn: 'UX', parent: 'n_sfov' },
  { id: 'n_afov_test', label: 'Range test', level: 'action', owner: 'Henry', fn: 'QA', parent: 'n_sfov' },
  { id: 'n_ayaml_spec', label: 'Write spec', level: 'action', owner: 'Hank', fn: 'Docs', parent: 'n_syaml' },
  { id: 'n_abread_ui', label: 'Render crumbs', level: 'action', owner: 'Henry', fn: 'UX', parent: 'n_sbread' },
  { id: 'n_anode_val', label: 'Validate params', level: 'action', owner: 'Hank', fn: 'API', parent: 'n_snode' },
];

export const depEdges = [
  { src: 'n_fwb', tgt: 'n_fgr', kind: 'depends_on' },
  { src: 'n_fsy', tgt: 'n_fap', kind: 'depends_on' },
  { src: 'n_thier', tgt: 'n_tcam', kind: 'blocks' },
  { src: 'n_trt', tgt: 'n_tcrud', kind: 'depends_on' },
  { src: 'n_tmb', tgt: 'n_tfm', kind: 'depends_on' },
  { src: 'n_fdb', tgt: 'n_fap', kind: 'depends_on' },
  { src: 'n_tmig', tgt: 'n_tcrud', kind: 'blocks' },
  { src: 'n_tdith', tgt: 'n_tlay', kind: 'depends_on' },
];

export const workItems = [
  { id: 'w1', node: 'n_tcam', title: 'Tune camera depth', status: 'doing', who: 'Henry' },
  { id: 'w2', node: 'n_tcam', title: 'FOV slider', status: 'next_up', who: 'Henry' },
  { id: 'w3', node: 'n_thier', title: 'Expand/collapse', status: 'backlog', who: 'Henry' },
  { id: 'w4', node: 'n_thier', title: 'Breadcrumb trail', status: 'backlog', who: null },
  { id: 'w5', node: 'n_tdith', title: 'Ordered dither 4x4', status: 'doing', who: 'Henry' },
  { id: 'w6', node: 'n_tdith', title: 'Halftone variant', status: 'next_up', who: null },
  { id: 'w7', node: 'n_tcrud', title: 'Node CRUD', status: 'done', who: 'Hank' },
  { id: 'w8', node: 'n_tcrud', title: 'Work item lanes', status: 'doing', who: 'Hank' },
  { id: 'w9', node: 'n_trt', title: 'Channel setup', status: 'backlog', who: 'Hank' },
  { id: 'w10', node: 'n_tfm', title: 'YAML parser', status: 'done', who: 'Hank' },
  { id: 'w11', node: 'n_tmb', title: 'Write managed blocks', status: 'next_up', who: 'Hank' },
  { id: 'w12', node: 'n_tlay', title: 'Force-directed fallback', status: 'doing', who: 'Henry' },
  { id: 'w13', node: 'n_tmig', title: 'Run initial migration', status: 'done', who: 'Hank' },
];

export const syncFlowData = [
  { from: 'Obsidian Vault', to: 'Frontmatter Parser', label: 'metadata' },
  { from: 'Frontmatter Parser', to: 'Rails DB', label: 'vault→db' },
  { from: 'Rails DB', to: 'Block Writer', label: 'db→vault' },
  { from: 'Block Writer', to: 'Obsidian Vault', label: 'managed' },
  { from: 'Rails DB', to: 'ActionCable', label: 'events' },
  { from: 'ActionCable', to: 'Workbench UI', label: 'realtime' },
  { from: 'Workbench UI', to: 'Rails API', label: 'mutations' },
  { from: 'Rails API', to: 'Rails DB', label: 'persist' },
];
