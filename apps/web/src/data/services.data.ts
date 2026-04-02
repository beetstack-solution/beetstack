export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const SERVICES: ServiceItem[] = [
  { id: "software", title: "Custom Software", description: "End-to-end digital engineering tailored to your unique business logic. We build scalable, mission-critical systems designed to solve complex industrial challenges.", image: "/images/services/custome-software.png" },
  { id: "saas", title: "SaaS Platforms", description: "Architecting multi-tenant cloud ecosystems for global scale. High-performance software-as-a-service platforms focused on user retention and technical speed.", image: "/images/services/saas.png" },
  { id: "mobile", title: "Mobile Applications", description: "Resilient iOS and Android development with fluid performance. Precision-engineered native experiences that establish a dominant market authority.", image: "/images/services/mobile-app.png" },
  { id: "erp", title: "ERP & Enterprise", description: "Smarter resource planning and enterprise-grade software solutions. Unifying fragmented business processes into a cohesive, high-efficiency digital core.", image: "/images/services/erp-software.png" },
  { id: "website", title: "Modern Websites", description: "High-fidelity digital presences engineered with Next.js and React. Focus on technical SEO, accessibility, and high-conversion web ecosystems.", image: "/images/services/website.png" },
  { id: "seo", title: "SEO & Marketing", description: "Data-driven digital marketing and technical SEO strategies. Dominating search results and scaling your brand presence across the global digital landscape.", image: "/images/services/seo-marketing.png" },
];
