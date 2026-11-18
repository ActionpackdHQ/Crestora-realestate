export type Room = {
  id: string;
  name: string;
  area: number;
  path: string;
  image: string;
  imageAlt: string;
};

/** SVG floor-plan rooms for the interactive plan (viewBox 0 0 800 520) */
export const rooms: Room[] = [
  {
    id: "living",
    name: "Living",
    area: 420,
    path: "M40 40 H420 V300 H40 Z",
    image: "/assets/2.58bf2fb8.jpg",
    imageAlt: "Sunlit living room with long shadows",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    area: 180,
    path: "M420 40 H760 V220 H420 Z",
    image: "/assets/rent.6736c732.jpg",
    imageAlt: "Open kitchen with warm cabinetry",
  },
  {
    id: "primary",
    name: "Primary",
    area: 260,
    path: "M420 220 H760 V480 H420 Z",
    image: "/assets/buy.fed72bc8.jpg",
    imageAlt: "Primary suite overlooking the city",
  },
  {
    id: "study",
    name: "Study",
    area: 140,
    path: "M40 300 H260 V480 H40 Z",
    image: "/assets/mortgage-services.e92904b1.jpg",
    imageAlt: "Quiet study with lined shelving",
  },
  {
    id: "terrace",
    name: "Terrace",
    area: 190,
    path: "M260 300 H420 V480 H260 Z",
    image: "/assets/house.png",
    imageAlt: "Terrace garden with evening light",
  },
];

export const featuredHome = {
  name: "Harbor House",
  locality: "Waterfront · Floor 04",
  price: "$5,900,000",
  beds: 4,
  baths: 4,
  sqft: 3200,
  coordinates: "N 40.7048 / W 74.0142",
  images: {
    morning: "/assets/back.f53e9773.jpg",
    noon: "/assets/2.41633fa6.jpg",
    golden: "/assets/buy.fed72bc8.jpg",
    night: "/assets/house.png",
  },
} as const;
