/**
 * PCG-UX — Process Context Graph Data Configuration
 *
 * This file contains example and placeholder data for the graph.
 * Edit or replace to load your own project hierarchy.
 *
 * Schema levels:
 *   L1  project      — Root container
 *   L2  board_owner  — Domain scope / team
 *   L3  feature      — Deliverable unit
 *   L4  task         — Execution unit
 *   L5  subtask      — Granular step
 *   L6  action       — Atomic leaf
 *
 * Node properties:
 *   id, label, level, owner, fn, parent, notes, due (optional)
 *   shape (optional) — 'circle' | 'roundedRect' | 'diamond' | 'hexagon' |
 *                       'octagon' | 'pill' | 'triangle' | 'pentagon'
 *
 * Edge types:
 *   hierarchy   — Parent→child (solid)
 *   depends_on  — Prerequisite (dashed)
 *   blocks      — Hard blocker (thick dashed)
 *   sync_flow   — Data pipeline flow (solid accent)
 *
 * Palettes:
 *   terrain    — Warm earth tones (default)
 *   estuary    — Cool blue-greens with copper accents
 *   ridgeline  — Muted purples with warm grays
 */

// ─── Example Data: OpenClaw ───
export const nodeData = [
  { id: 'n_root', label: 'OpenClaw', level: 'project', owner: 'Hank', fn: 'Platform', parent: null },
  { id: 'n_bux', label: 'UX Engineering', level: 'board_owner', owner: 'Henry', fn: 'UX Eng', parent: 'n_root' },
  { id: 'n_bdata', label: 'Data Platform', level: 'board_owner', owner: 'Hank', fn: 'Backend', parent: 'n_root' },
  { id: 'n_bsync', label: 'Vault Sync', level: 'board_owner', owner: 'Hank', fn: 'Sync', parent: 'n_root' },
  { id: 'n_fwb', label: '2.5D Workbench', level: 'feature', owner: 'Henry', fn: 'UX Eng', parent: 'n_bux', due: '2026-03-01' },
  { id: 'n_fgr', label: 'Context Graph', level: 'feature', owner: 'Henry', fn: 'Visualization', parent: 'n_bux' },
  { id: 'n_fap', label: 'Rails API', level: 'feature', owner: 'Hank', fn: 'Backend', parent: 'n_bdata' },
  { id: 'n_fdb', label: 'DB Schema', level: 'feature', owner: 'Hank', fn: 'Data', parent: 'n_bdata' },
  { id: 'n_fsy', label: 'Sync Engine', level: 'feature', owner: 'Hank', fn: 'Sync', parent: 'n_bsync' },
  { id: 'n_tcam', label: 'Camera Depth', level: 'task', owner: 'Henry', fn: 'UX', parent: 'n_fwb' },
  { id: 'n_thier', label: 'Hierarchy Drill', level: 'task', owner: 'Henry', fn: 'UX', parent: 'n_fwb' },
  { id: 'n_tdith', label: 'Dither Shader', level: 'task', owner: 'Henry', fn: 'Rendering', parent: 'n_fgr' },
  { id: 'n_tlay', label: 'Layout Engine', level: 'task', owner: 'Henry', fn: 'Graph', parent: 'n_fgr' },
  { id: 'n_tcrud', label: 'CRUD Endpoints', level: 'task', owner: 'Hank', fn: 'API', parent: 'n_fap' },
  { id: 'n_trt', label: 'ActionCable', level: 'task', owner: 'Hank', fn: 'Realtime', parent: 'n_fap' },
  { id: 'n_tmig', label: 'Migrations', level: 'task', owner: 'Hank', fn: 'DB', parent: 'n_fdb' },
  { id: 'n_tfm', label: 'Frontmatter Parse', level: 'task', owner: 'Hank', fn: 'Sync', parent: 'n_fsy' },
  { id: 'n_tmb', label: 'Managed Blocks', level: 'task', owner: 'Hank', fn: 'Sync', parent: 'n_fsy' },
  { id: 'n_sfov', label: 'FOV Slider', level: 'subtask', owner: 'Henry', fn: 'UX', parent: 'n_tcam' },
  { id: 'n_sorbit', label: 'Orbit Controls', level: 'subtask', owner: 'Henry', fn: 'UX', parent: 'n_tcam' },
  { id: 'n_sbread', label: 'Breadcrumb Trail', level: 'subtask', owner: 'Henry', fn: 'UX', parent: 'n_thier' },
  { id: 'n_shalf', label: 'Halftone Variant', level: 'subtask', owner: 'Henry', fn: 'Rendering', parent: 'n_tdith' },
  { id: 'n_snode', label: 'Node CRUD', level: 'subtask', owner: 'Hank', fn: 'API', parent: 'n_tcrud' },
  { id: 'n_swi', label: 'WorkItem Lanes', level: 'subtask', owner: 'Hank', fn: 'API', parent: 'n_tcrud' },
  { id: 'n_syaml', label: 'YAML Parser', level: 'subtask', owner: 'Hank', fn: 'Sync', parent: 'n_tfm' },
  { id: 'n_swrite', label: 'Block Writer', level: 'subtask', owner: 'Hank', fn: 'Sync', parent: 'n_tmb' },
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

// ─── Generic Placeholder Data ───
export const placeholderNodes = [
  { id: 'ph_root', label: 'Project Alpha', level: 'project', owner: 'Lead', fn: 'Platform', parent: null, notes: 'Root project container.' },
  { id: 'ph_b1', label: 'Frontend', level: 'board_owner', owner: 'Alice', fn: 'UI', parent: 'ph_root', notes: 'User-facing surfaces.' },
  { id: 'ph_b2', label: 'Backend', level: 'board_owner', owner: 'Bob', fn: 'API', parent: 'ph_root', notes: 'Server-side services.' },
  { id: 'ph_b3', label: 'Data Ops', level: 'board_owner', owner: 'Carol', fn: 'Data', parent: 'ph_root', notes: 'Data pipeline.' },
  { id: 'ph_f1', label: 'Dashboard', level: 'feature', owner: 'Alice', fn: 'UI', parent: 'ph_b1', notes: 'Main dashboard.' },
  { id: 'ph_f2', label: 'Auth System', level: 'feature', owner: 'Alice', fn: 'Security', parent: 'ph_b1', notes: 'OAuth2 auth.' },
  { id: 'ph_f3', label: 'REST API', level: 'feature', owner: 'Bob', fn: 'API', parent: 'ph_b2', notes: 'RESTful endpoints.' },
  { id: 'ph_f4', label: 'Database', level: 'feature', owner: 'Bob', fn: 'Data', parent: 'ph_b2', notes: 'PostgreSQL schema.' },
  { id: 'ph_f5', label: 'ETL Pipeline', level: 'feature', owner: 'Carol', fn: 'Data', parent: 'ph_b3', notes: 'ETL pipeline.' },
  { id: 'ph_t1', label: 'Widget Grid', level: 'task', owner: 'Alice', fn: 'UI', parent: 'ph_f1' },
  { id: 'ph_t2', label: 'Chart Engine', level: 'task', owner: 'Alice', fn: 'Viz', parent: 'ph_f1' },
  { id: 'ph_t3', label: 'Login Flow', level: 'task', owner: 'Alice', fn: 'Security', parent: 'ph_f2' },
  { id: 'ph_t4', label: 'CRUD Routes', level: 'task', owner: 'Bob', fn: 'API', parent: 'ph_f3' },
  { id: 'ph_t5', label: 'WebSocket', level: 'task', owner: 'Bob', fn: 'Realtime', parent: 'ph_f3' },
  { id: 'ph_t6', label: 'Migrations', level: 'task', owner: 'Bob', fn: 'DB', parent: 'ph_f4' },
  { id: 'ph_t7', label: 'Ingestion', level: 'task', owner: 'Carol', fn: 'Data', parent: 'ph_f5' },
  { id: 'ph_t8', label: 'Transform', level: 'task', owner: 'Carol', fn: 'Data', parent: 'ph_f5' },
  { id: 'ph_s1', label: 'Breakpoints', level: 'subtask', owner: 'Alice', fn: 'UI', parent: 'ph_t1' },
  { id: 'ph_s2', label: 'Drag Resize', level: 'subtask', owner: 'Alice', fn: 'UI', parent: 'ph_t1' },
  { id: 'ph_s3', label: 'Bar Charts', level: 'subtask', owner: 'Alice', fn: 'Viz', parent: 'ph_t2' },
  { id: 'ph_s4', label: 'Token Refresh', level: 'subtask', owner: 'Alice', fn: 'Security', parent: 'ph_t3' },
  { id: 'ph_s5', label: 'Validation', level: 'subtask', owner: 'Bob', fn: 'API', parent: 'ph_t4' },
  { id: 'ph_s6', label: 'Pagination', level: 'subtask', owner: 'Bob', fn: 'API', parent: 'ph_t4' },
  { id: 'ph_s7', label: 'CSV Parser', level: 'subtask', owner: 'Carol', fn: 'Data', parent: 'ph_t7' },
  { id: 'ph_s8', label: 'Rules Engine', level: 'subtask', owner: 'Carol', fn: 'Data', parent: 'ph_t8' },
  { id: 'ph_a1', label: 'Build grid', level: 'action', owner: 'Alice', fn: 'UI', parent: 'ph_s1' },
  { id: 'ph_a2', label: 'Test resize', level: 'action', owner: 'Alice', fn: 'QA', parent: 'ph_s2' },
  { id: 'ph_a3', label: 'Schema v1', level: 'action', owner: 'Bob', fn: 'DB', parent: 'ph_s5' },
  { id: 'ph_a4', label: 'Parse spec', level: 'action', owner: 'Carol', fn: 'Docs', parent: 'ph_s7' },
  { id: 'ph_a5', label: 'Unit tests', level: 'action', owner: 'Bob', fn: 'QA', parent: 'ph_s6' },
];

export const placeholderDeps = [
  { src: 'ph_f1', tgt: 'ph_f3', kind: 'depends_on' },
  { src: 'ph_f5', tgt: 'ph_f4', kind: 'depends_on' },
  { src: 'ph_t3', tgt: 'ph_t4', kind: 'blocks' },
  { src: 'ph_t5', tgt: 'ph_t4', kind: 'depends_on' },
  { src: 'ph_t8', tgt: 'ph_t7', kind: 'depends_on' },
  { src: 'ph_f4', tgt: 'ph_f3', kind: 'depends_on' },
  { src: 'ph_t6', tgt: 'ph_t4', kind: 'blocks' },
  { src: 'ph_t2', tgt: 'ph_t1', kind: 'depends_on' },
];

export const placeholderWorkItems = [
  { id: 'pw1', node: 'ph_t1', title: 'Grid layout', status: 'doing', who: 'Alice' },
  { id: 'pw2', node: 'ph_t1', title: 'Breakpoints', status: 'next_up', who: 'Alice' },
  { id: 'pw3', node: 'ph_t2', title: 'Bar charts', status: 'doing', who: 'Alice' },
  { id: 'pw4', node: 'ph_t3', title: 'OAuth flow', status: 'backlog', who: 'Alice' },
  { id: 'pw5', node: 'ph_t4', title: 'Entity CRUD', status: 'done', who: 'Bob' },
  { id: 'pw6', node: 'ph_t4', title: 'Pagination', status: 'doing', who: 'Bob' },
  { id: 'pw7', node: 'ph_t5', title: 'Socket setup', status: 'backlog', who: 'Bob' },
  { id: 'pw8', node: 'ph_t6', title: 'Migration v1', status: 'done', who: 'Bob' },
  { id: 'pw9', node: 'ph_t7', title: 'CSV parser', status: 'done', who: 'Carol' },
  { id: 'pw10', node: 'ph_t8', title: 'Transform rules', status: 'next_up', who: 'Carol' },
  { id: 'pw11', node: 'ph_t2', title: 'Line charts', status: 'backlog', who: null },
  { id: 'pw12', node: 'ph_t7', title: 'JSON source', status: 'doing', who: 'Carol' },
];

export const placeholderSync = [
  { from: 'Source Database', to: 'Data Ingestion', label: 'extract' },
  { from: 'Data Ingestion', to: 'App Database', label: 'load' },
  { from: 'App Database', to: 'Transform Engine', label: 'transform' },
  { from: 'Transform Engine', to: 'Source Database', label: 'sync' },
  { from: 'App Database', to: 'WebSocket Server', label: 'events' },
  { from: 'WebSocket Server', to: 'Dashboard UI', label: 'realtime' },
  { from: 'Dashboard UI', to: 'REST API', label: 'mutations' },
  { from: 'REST API', to: 'App Database', label: 'persist' },
];
