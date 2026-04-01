export interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  avatar: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajiv Mehta",
    location: "India",
    role: "CTO, FinEdge Labs",
    avatar: "/testimonials/avatar-1.png",
    quote:
      "Beetstack delivered a secure fintech platform that exceeded our expectations. Their attention to engineering detail and zero-trust architecture gave us confidence from day one. The team's technical depth is unmatched in the region.",
  },
  {
    id: 2,
    name: "Priya Nair",
    location: "UAE",
    role: "Head of Product, Nexora",
    avatar: "/testimonials/avatar-2.png",
    quote:
      "Working with Beetstack transformed our product roadmap. They didn't just build what we asked — they challenged our assumptions and delivered something far superior. The UI precision and system performance are extraordinary.",
  },
  {
    id: 3,
    name: "James Holloway",
    location: "United Kingdom",
    role: "Director of Engineering, Solara",
    avatar: "/testimonials/avatar-3.png",
    quote:
      "The monorepo architecture they built for us scaled effortlessly from 3 to 300 engineers. Beetstack's delivery model is disciplined, collaborative, and results-driven. Truly a world-class engineering partner.",
  },
  {
    id: 4,
    name: "Dr. Marcus Klein",
    location: "Germany",
    role: "CEO, MedSync Systems",
    avatar: "/testimonials/avatar-4.png",
    quote:
      "Beetstack handled our compliance-heavy healthcare platform with remarkable expertise. Their documentation standards, testing culture, and deep understanding of secure environments made them the perfect partner for our mission-critical product.",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    location: "France",
    role: "VP Technology, CloudAxis",
    avatar: "/testimonials/avatar-5.png",
    quote:
      "From the first sync call, it was clear Beetstack operates at a different level. Their cloud infrastructure design reduced our AWS costs by 40% while improving uptime to 99.97%. I recommend them without reservation.",
  },
  {
    id: 6,
    name: "Tariq Al-Hassan",
    location: "Saudi Arabia",
    role: "Founder, VentureOS",
    avatar: "/testimonials/avatar-6.png",
    quote:
      "Beetstack built our entire SaaS platform in four months — on time and under budget. Their AI integration pipeline has since become our core competitive advantage. An exceptional team with rare execution capability.",
  },
  {
    id: 7,
    name: "Daniel Park",
    location: "South Korea",
    role: "Principal Engineer, Quantra",
    avatar: "/testimonials/avatar-7.png",
    quote:
      "The quality of code Beetstack delivers is something you rarely see from outsourced teams. Clean architecture, type-safe APIs, and thorough testing at every layer. We've adopted their standards internally across our own engineering org.",
  },
];
