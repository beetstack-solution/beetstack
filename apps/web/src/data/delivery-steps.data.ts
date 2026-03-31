import { Icons } from "@beetstack/icons";

export interface Step {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Icons;
  color: string;
}

export const DELIVERY_STEPS: Step[] = [
  { id: "client", title: "Client", description: "Establishing a deep partnership and understanding your unique vision and business objectives.", icon: "Client", color: "brand-green" },
  { id: "analysis", title: "Analysis", description: "Rigorous technical auditing and requirement gathering to build a foolproof development blueprint.", icon: "Analysis", color: "brand-green" },
  { id: "design", title: "Design", description: "Crafting intuitive, high-fidelity user experiences and scalable system architectures.", icon: "Design", color: "brand-green" },
  { id: "development", title: "Development", description: "Engineering robust, clean-code solutions using state-of-the-art technologies and frameworks.", icon: "Development", color: "brand-green" },
  { id: "testing", title: "Testing", description: "Automated and manual quality assurance ensures zero-defect reliability and optimal performance.", icon: "Testing", color: "brand-green" },
  { id: "deployment", title: "Deployment", description: "Seamless CI/CD integration and cloud orchestration for smooth, incident-free launches.", icon: "Deployment", color: "brand-green" },
  { id: "support", title: "Support", description: "24/7 proactive monitoring and iterative enhancements to keep your platform ahead of the curve.", icon: "Support", color: "brand-green" },
];
