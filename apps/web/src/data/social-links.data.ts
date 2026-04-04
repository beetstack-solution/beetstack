import { Icons } from "@beetstack/icons";

export interface SocialLink {
  id: string;
  icon: keyof typeof Icons;
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    icon: "Github",
    href: "https://github.com/beetstack-solution",
    label: "GitHub",
  },
  {
    id: "linkedin",
    icon: "LinkedIn",
    href: "https://linkedin.com/company/beetstack",
    label: "LinkedIn",
  },
  {
    id: "instagram",
    icon: "Instagram",
    href: "https://instagram.com/beetstack",
    label: "Instagram",
  },
  {
    id: "twitter",
    icon: "Twitter",
    href: "https://twitter.com/beetstack",
    label: "Twitter",
  },
];
