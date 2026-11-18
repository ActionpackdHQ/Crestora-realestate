export type Property = {
  id: string;
  name: string;
  locality: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  category: "Buy" | "Rent" | "Commercial";
  badge?: "New" | "Just Listed";
  image: string;
  imageAlt: string;
};

export const properties: Property[] = [
  {
    id: "1",
    name: "Aurelia Residences",
    locality: "Indiranagar, Bengaluru",
    beds: 3,
    baths: 3,
    sqft: 2140,
    price: "₹3.45 Cr",
    category: "Buy",
    badge: "Just Listed",
    image: "/assets/buy.fed72bc8.jpg",
    imageAlt: "Modern dusk exterior of Aurelia Residences",
  },
  {
    id: "2",
    name: "Orchard Loft 7B",
    locality: "Koramangala, Bengaluru",
    beds: 2,
    baths: 2,
    sqft: 1680,
    price: "₹95,000 / mo",
    category: "Rent",
    badge: "New",
    image: "/assets/2.58bf2fb8.jpg",
    imageAlt: "Sunlit loft interior with warm stone floors",
  },
  {
    id: "3",
    name: "Seafront House",
    locality: "Bandra West, Mumbai",
    beds: 4,
    baths: 4,
    sqft: 3200,
    price: "₹12.9 Cr",
    category: "Buy",
    image: "/assets/house.png",
    imageAlt: "Night-lit luxury terrace residence",
  },
  {
    id: "4",
    name: "Canopy Court Villa",
    locality: "Whitefield, Bengaluru",
    beds: 5,
    baths: 4,
    sqft: 4100,
    price: "₹5.8 Cr",
    category: "Buy",
    badge: "New",
    image: "/assets/2.41633fa6.jpg",
    imageAlt: "Aerial view of tree-lined residential enclave",
  },
  {
    id: "5",
    name: "Atelier Tower Suite",
    locality: "Golf Course Road, Gurugram",
    beds: 1,
    baths: 1,
    sqft: 980,
    price: "₹72,000 / mo",
    category: "Rent",
    image: "/assets/rent.6736c732.jpg",
    imageAlt: "Contemporary rental interior with city views",
  },
  {
    id: "6",
    name: "Stone & Brass Gallery",
    locality: "MG Road, Bengaluru",
    beds: 0,
    baths: 2,
    sqft: 5400,
    price: "₹185 / sq ft",
    category: "Commercial",
    badge: "Just Listed",
    image: "/assets/development.0de63e1b.jpg",
    imageAlt: "Commercial gallery space with architectural detailing",
  },
  {
    id: "7",
    name: "Lumen Penthouse",
    locality: "Worli, Mumbai",
    beds: 4,
    baths: 5,
    sqft: 3890,
    price: "₹18.2 Cr",
    category: "Buy",
    image: "/assets/sell.90b8e66b.jpg",
    imageAlt: "Penthouse living room at golden hour",
  },
  {
    id: "8",
    name: "Willow Row Townhome",
    locality: "Jubilee Hills, Hyderabad",
    beds: 3,
    baths: 3,
    sqft: 2450,
    price: "₹1.1 L / mo",
    category: "Rent",
    badge: "New",
    image: "/assets/bg.ec610793.jpg",
    imageAlt: "Warm family living room in a Crestora listing",
  },
];
