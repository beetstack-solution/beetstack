import type React from "react";
import { Icons } from "@beetstack/icons";

export interface SecurityFeature {
  title: string;
  description: string;
  icon: React.ElementType<{ className?: string }>;
  tags: string[];
}

export const SECURITY_FEATURES: SecurityFeature[] = [
  { title: "Secure Architecture", description: "Fine-grained access control and multilayered technical defense architectures. Our systems minimize attack vectors and ensure data integrity at every transition point.", icon: Icons.Lock, tags: ["AES-256", "Zero-Trust", "Multi-Layered"] },
  { title: "Offline-First", description: "Designed for restricted environments where connectivity is absent or prohibited. Local-first data synchronization ensures operational continuity in air-gapped zones.", icon: Icons.SignalLow, tags: ["Air-Gapped", "Local-Sync", "Sovereignty"] },
  { title: "Critical Reliability", description: "Zero-failure operational parameters for high-stakes institutional use cases. We use resilient technical stacks that withstand extreme stress and uptime requirements.", icon: Icons.Database, tags: ["Zero-Failure", "Institutional", "Uptime"] },
];
