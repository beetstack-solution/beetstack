export interface SliceServiceItem {
  id: number;
  tag: string;
  title: string;
  description: string;
}

export const SLICE_SERVICES: SliceServiceItem[] = [
  { id: 0, tag: "AI / ML", title: "AI & Automation", description: "LLM integrations, intelligent pipelines and workflow automation that multiply your output." },
  { id: 1, tag: "Security", title: "Security & IAM", description: "Zero-trust architectures, identity management and end-to-end encryption for critical systems." },
  { id: 2, tag: "Cloud & DevOps", title: "Cloud Infrastructure", description: "Multi-cloud ecosystems engineered for 99.9% uptime, auto-scaling and cost intelligence." },
  { id: 3, tag: "Architecture", title: "Enterprise Software", description: "Monorepo-first platforms that unify your corporate stack from microservices to full-stack." },
  { id: 4, tag: "Engineering", title: "Product Engineering", description: "Full-cycle product delivery — design systems, QA and iterative, data-driven launch." },
  { id: 5, tag: "Design", title: "UI / UX Design", description: "Premium accessible interfaces with micro-animations and design tokens at scale." },
];

export const ROW1_ITEMS = ["Layers Of Solutions"];

export const RINGS = [
  { inner: 0.000, outer: 0.095, color: "#9b1030" },
  { inner: 0.095, outer: 0.185, color: "#e33765" },
  { inner: 0.185, outer: 0.285, color: "#a21c3c" },
  { inner: 0.285, outer: 0.375, color: "#e33765" },
  { inner: 0.375, outer: 0.475, color: "#a21c3c" },
  { inner: 0.475, outer: 0.565, color: "#e33765" },
  { inner: 0.565, outer: 0.665, color: "#a21c3c" },
  { inner: 0.665, outer: 0.755, color: "#e33765" },
  { inner: 0.755, outer: 0.845, color: "#a21c3c" },
] as const;
