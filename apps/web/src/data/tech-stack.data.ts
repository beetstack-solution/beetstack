import { Icons } from "@beetstack/icons";

export type IconKey = keyof typeof Icons;

export interface TechItem {
  name: string;
  category: string;
  iconKey: IconKey;
  color: string;
  glow: string;
}

export const TECHS: TechItem[] = [
  { name: "Next.js", category: "Framework", iconKey: "Nextjs", color: "#DC382D", glow: "rgba(255,255,255,0.12)" },
  { name: "React", category: "UI Library", iconKey: "React", color: "#61DAFB", glow: "rgba(97,218,251,0.18)" },
  { name: "TypeScript", category: "Language", iconKey: "TypeScript", color: "#3178C6", glow: "rgba(49,120,198,0.22)" },
  { name: "Tailwind CSS", category: "Styling", iconKey: "Tailwind", color: "#38BDF8", glow: "rgba(56,189,248,0.18)" },
  { name: "Three.js", category: "3D / WebGL", iconKey: "ThreeJs", color: "#DC382D", glow: "rgba(255,255,255,0.10)" },
  { name: "Framer", category: "Animations", iconKey: "Framer", color: "#BB4BE8", glow: "rgba(187,75,232,0.18)" },
  { name: "Turborepo", category: "Monorepo", iconKey: "Turborepo", color: "#EF4444", glow: "rgba(239,68,68,0.18)" },
  { name: "Node.js", category: "Runtime", iconKey: "Nodejs", color: "#83CD29", glow: "rgba(131,205,41,0.18)" },
  { name: "PostgreSQL", category: "Database", iconKey: "Postgres", color: "#336791", glow: "rgba(51,103,145,0.22)" },
  { name: "Docker", category: "DevOps", iconKey: "Docker", color: "#2396ED", glow: "rgba(35,150,237,0.18)" },
  { name: "Prisma", category: "ORM", iconKey: "Prisma", color: "#a78bfa", glow: "rgba(167,139,250,0.18)" },
  { name: "Cloudflare", category: "Edge / CDN", iconKey: "Cloudflare", color: "#F38020", glow: "rgba(243,128,32,0.18)" },
  { name: "GraphQL", category: "API", iconKey: "GraphQL", color: "#E535AB", glow: "rgba(229,53,171,0.18)" },
  { name: "Redis", category: "Cache", iconKey: "Redis", color: "#DC382D", glow: "rgba(220,56,45,0.18)" },
  { name: "Vercel", category: "Deployment", iconKey: "Vercel", color: "#DC382D", glow: "rgba(255,255,255,0.10)" },
  { name: "NestJS", category: "Backend", iconKey: "NestJs", color: "#E0234E", glow: "rgba(224,35,78,0.18)" },
  { name: "MongoDB", category: "Database", iconKey: "MongoDB", color: "#47A248", glow: "rgba(71,162,72,0.18)" },
  { name: "Kubernetes", category: "Orchestration", iconKey: "Kubernetes", color: "#326CE5", glow: "rgba(50,108,229,0.18)" },
  { name: "Vite", category: "Build Tool", iconKey: "Vite", color: "#646CFF", glow: "rgba(100,108,255,0.18)" },
  { name: "pnpm", category: "Package Mgr", iconKey: "Pnpm", color: "#F69220", glow: "rgba(246,146,32,0.18)" },
  { name: "Git", category: "Version Ctrl", iconKey: "Git", color: "#F05032", glow: "rgba(240,80,50,0.18)" },
  { name: "ESLint", category: "Linting", iconKey: "ESLint", color: "#4B32C3", glow: "rgba(75,50,195,0.18)" },
  { name: "GCP", category: "Cloud", iconKey: "GoogleCloud", color: "#4285F4", glow: "rgba(66,133,244,0.18)" },
  { name: "OpenAI", category: "AI / LLM", iconKey: "OpenAI", color: "#DC382D", glow: "rgba(255,255,255,0.14)" },
];
