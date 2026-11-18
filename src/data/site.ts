export const site = {
  name: "CRESTORA",
  tagline: "Rooms worth returning to.",
  concept: "Drawn once. Lived in fully.",
  description:
    "CRESTORA is a modern brokerage for people who care how a home feels after dark — discreet counsel for buying, selling, and leasing well-made spaces.",
  url: "https://crestora.com",
  email: "hello@crestora.com",
  phone: "+1 212 555 0188",
  phoneHref: "tel:+12125550188",
  whatsapp: "https://wa.me/12125550188",
  coordinates: "N 40.7128 / W 74.0060",
  address: {
    label: "Studio",
    lines: ["120 Mercer Street, Suite 4", "New York, NY 10012"],
  },
  nav: [
    { label: "Browse", href: "#services" },
    { label: "Advisors", href: "#agents" },
    { label: "Atlas", href: "#journal" },
  ],
  floors: [
    { id: "hero", label: "G", title: "Threshold" },
    { id: "rewired", label: "1", title: "Method" },
    { id: "services", label: "2", title: "Practice" },
    { id: "agents", label: "3", title: "Studio" },
    { id: "journal", label: "4", title: "Atlas" },
    { id: "finale", label: "PH", title: "Evening" },
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Facebook", href: "#" },
  ],
  process: [
    {
      title: "Start with a conversation",
      body: "We map what matters — pace, budget, neighborhood grain — before a single listing hits the table.",
    },
    {
      title: "See the tradeoffs clearly",
      body: "Orientation, noise, and resale logic laid out side by side, so you choose with your eyes open.",
    },
    {
      title: "Close without the theater",
      body: "Offers, inspections, and handoff handled with quiet precision from first walkthrough to keys.",
    },
  ],
  testimonials: [
    {
      quote:
        "Crestora never rushed us into a tour. They waited until a place matched how we actually live — then the decision felt obvious.",
      name: "Mira Chen",
      role: "Buyer · Fort Greene",
      image: "/assets/1.e7a1ff18.jpg",
    },
    {
      quote:
        "Our sale was priced with restraint and sold with confidence. No theatrics — just a clean process and a stronger number.",
      name: "Jonah Ellis",
      role: "Seller · Chelsea",
      image: "/assets/1.52131ac7.jpg",
    },
    {
      quote:
        "Leasing through Crestora felt like working with an editor, not a conveyor belt. The shortlist was short for a reason.",
      name: "Priya Nair",
      role: "Renter · NoHo",
      image: "/assets/1.f6e8f2e8.jpg",
    },
  ],
  cta: {
    nav: "Reserve a tour",
    agents: "Apply to the studio",
    finale: "Arrange a private tour",
    readMore: "Continue reading →",
    viewAll: "Browse the atlas →",
    search: "Look up",
  },
} as const;

export { services, support } from "./services";
export { articles as insights } from "./articles";
