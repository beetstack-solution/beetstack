export interface SliceServiceItem {
  id: number;
  tag: string;
  title: string;
  description: string;
}

export const SLICE_SERVICES: SliceServiceItem[] = [
  {
    id: 0,
    tag: "Foundation",
    title: "Infrastructure Layer",
    description:
      "Resilient cloud foundations with multi-region deployment, auto-scaling systems, and high-availability architecture."
  },
  {
    id: 1,
    tag: "Security",
    title: "Security & Identity",
    description:
      "Zero-trust security models, identity access management, and end-to-end encryption across every layer."
  },
  {
    id: 2,
    tag: "Data",
    title: "Data & Pipelines",
    description:
      "Scalable data pipelines, real-time processing, and storage systems designed for performance and reliability."
  },
  {
    id: 3,
    tag: "Backend",
    title: "Core Engineering",
    description:
      "Robust backend systems, APIs, and microservices powering high-performance applications at scale."
  },
  {
    id: 4,
    tag: "Product",
    title: "Product Engineering",
    description:
      "End-to-end product development from ideation to deployment with agile and data-driven iterations."
  },
  {
    id: 5,
    tag: "Experience",
    title: "UI / UX Design",
    description:
      "Modern, accessible interfaces with design systems, micro-interactions, and seamless user experiences."
  },
  {
    id: 6,
    tag: "Automation",
    title: "AI & Automation",
    description:
      "LLM integrations, intelligent workflows, and automation systems that enhance productivity and decision-making."
  },
  {
    id: 7,
    tag: "Optimization",
    title: "Performance & DevOps",
    description:
      "Continuous integration, monitoring, and optimization pipelines ensuring speed, reliability, and cost efficiency."
  },
  {
    id: 8,
    tag: "Intelligence",
    title: "Insights & Analytics",
    description:
      "Advanced analytics, dashboards, and AI-driven insights that transform data into strategic decisions and measurable growth."
  }
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
