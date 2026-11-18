export type Neighborhood = {
  id: string;
  name: string;
  tag: string;
  median: string;
  walk: string;
  blurb: string;
  x: number;
  y: number;
  image: string;
};

export const neighborhoods: Neighborhood[] = [
  {
    id: "waterfront",
    name: "Waterfront",
    tag: "Horizon living",
    median: "$2.1M",
    walk: "92",
    blurb: "Glass, tide, and private piers — residences tuned to the edge of the city.",
    x: 22,
    y: 58,
    image: "/assets/back.f53e9773.jpg",
  },
  {
    id: "old-town",
    name: "Old Town",
    tag: "Courtyard character",
    median: "$1.4M",
    walk: "97",
    blurb: "Brick, brass, and courtyards with a century of quiet material honesty.",
    x: 48,
    y: 42,
    image: "/assets/2.58bf2fb8.jpg",
  },
  {
    id: "skyline",
    name: "Skyline District",
    tag: "Vertical light",
    median: "$3.2M",
    walk: "88",
    blurb: "Penthouse geometry and blue-hour terraces for the vertical life.",
    x: 68,
    y: 28,
    image: "/assets/buy.fed72bc8.jpg",
  },
  {
    id: "green",
    name: "Green Suburbs",
    tag: "Canopy streets",
    median: "$1.1M",
    walk: "71",
    blurb: "Garden plots, canopy streets, and room for a quieter expansion.",
    x: 78,
    y: 66,
    image: "/assets/2.41633fa6.jpg",
  },
  {
    id: "business",
    name: "Business Quarter",
    tag: "Live / work",
    median: "$1.8M",
    walk: "95",
    blurb: "Live above the workday — walkable towers with hotel-grade service.",
    x: 36,
    y: 30,
    image: "/assets/sell.90b8e66b.jpg",
  },
];
