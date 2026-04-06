export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  avatar: string;
  quote: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Krishnamurthy",
    role: "Co-Founder & CEO",
    avatar: "",
    quote:
      "Beetstack didn't just build our platform — they became genuine stakeholders in our mission. The engineering quality, communication discipline, and delivery speed were unlike anything I've experienced with any other team in India. Our Series A investors were impressed.",
  },
  {
    id: 2,
    name: "Meera Pillai",
    role: "Head of Digital Products",
    avatar: "",
    quote:
      "We handed Beetstack a complex legacy migration project with very tight timelines. They delivered ahead of schedule with zero data loss and a UI our customers actually love. The team's approach to problem-solving is refreshingly thoughtful.",
  },
  {
    id: 3,
    name: "Rahul Devadiga",
    role: "CTO",
    avatar: "",
    quote:
      "The architecture Beetstack designed for our SaaS product is production-grade and genuinely scalable. Their code reviews pushed our own internal standards higher. Six months in, we've had zero critical incidents. That says everything.",
  },
  {
    id: 4,
    name: "Divya Suresh",
    role: "Founder",
    avatar: "",
    quote:
      "I was skeptical about outsourcing our MVP, but Beetstack changed my mind completely. They took ownership like it was their own startup. The product launched in 10 weeks and we crossed 500 sign-ups in the first month.",
  },
  {
    id: 5,
    name: "Sanjay Nambiar",
    role: "Director of Operations",
    avatar: "",
    quote:
      "Our real estate portal had multiple vendors fail us before Beetstack stepped in. They audited the existing mess, rebuilt it cleanly, and delivered a system that actually works under load. Their professionalism is rare in this market.",
  },
  {
    id: 6,
    name: "Anjali Menon",
    role: "Product Manager",
    avatar: "",
    quote:
      "Beetstack helped us launch a public-facing platform for Kerala's startup ecosystem. The UX is clean, the backend is solid, and they were always available when we needed urgent changes. Exactly the kind of partner the government sector needs.",
  },
  {
    id: 7,
    name: "Vivek Rajan",
    role: "Engineering Lead",
    avatar: "",
    quote:
      "The monorepo structure and CI/CD pipeline Beetstack set up for us reduced our deployment time from 3 hours to under 8 minutes. Their engineers write code the way it should be written — with clarity, tests, and future maintainability in mind.",
  },
];
