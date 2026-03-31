import { Icons } from "@beetstack/icons";

export interface Benefit {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

export const BENEFITS: Benefit[] = [
  {
    title: "Strong Expertise",
    description: "Deep technical proficiency in building complex, high-security systems for mission-critical operations.",
    icon: "ShieldCheck",
  },
  {
    title: "Reliable Execution",
    description: "Battle-tested development methodology powered by modern technologies and clean-code principles.",
    icon: "Cpu",
  },
  {
    title: "Scalable Solutions",
    description: "Architectures designed for horizontal growth, ensuring your platform evolves as your business expands.",
    icon: "TrendingUp",
  },
  {
    title: "Future-Ready",
    description: "A forward-looking technical approach aligned with emerging global trends and cloud-native standards.",
    icon: "Globe",
  },
];
