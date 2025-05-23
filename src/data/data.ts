import { GalleryItem, Category } from "../types/gallery.types";

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Air Cargo Operations",
    description:
      "Modern air freight handling at international airport with state-of-the-art equipment and efficient logistics management systems.",
    category: "air-cargo",
    tags: ["logistics", "aviation", "cargo"],
    image: "RC Jan-18.jpg",
    date: "2024-01-15",
    views: 1247,
    likes: 89,
  },
  {
    id: 2,
    title: "Container Ship Loading",
    description:
      "Massive container ship being loaded at port with state-of-the-art equipment and efficient logistics management systems.",
    category: "sea-cargo",
    tags: ["shipping", "containers", "port"],
    image: "RC Jan-37.jpg",
    date: "2024-01-20",
    views: 892,
    likes: 67,
  },
  {
    id: 3,
    title: "Warehouse Operations",
    description:
      "State-of-the-art warehouse management system with efficient storage and automation.",
    category: "warehouse",
    tags: ["storage", "automation", "efficiency"],
    image: "RC Jan-40.jpg",
    date: "2024-01-25",
    views: 654,
    likes: 45,
  },
  {
    id: 4,
    title: "Logistics Management",
    description:
      "Advanced logistics management system with real-time tracking and efficient routing.",
    category: "logistics",
    tags: ["tracking", "routing", "efficiency"],
    image: "RC Jan-53.jpg",
    date: "2024-02-01",
    views: 321,
    likes: 23,
  },
  {
    id: 5,
    title: "Aviation Safety",
    description:
      "State-of-the-art aviation safety systems and protocols in action.",
    category: "aviation",
    tags: ["safety", "protocols", "aviation"],
    image: "RC Jan-57.jpg",
    date: "2024-02-05",
    views: 456,
    likes: 34,
  },
  {
    id: 6,
    title: "Global Network",
    description:
      "Worldwide logistics network visualization with real-time tracking and efficient routing.",
    category: "network",
    tags: ["global", "connectivity", "routes"],
    image: "RC Jan-59.jpg",
    date: "2024-02-10",
    views: 1345,
    likes: 112,
  },
  {
    id: 7,
    title: "Routing Optimization",
    description:
      "Advanced routing optimization algorithms for efficient route planning.",
    category: "routing",
    tags: ["optimization", "routing", "efficiency"],
    image: "RC Jan-62.jpg",
    date: "2024-02-15",
    views: 765,
    likes: 56,
  },
  {
    id: 8,
    title: "Safety Protocols",
    description:
      "State-of-the-art safety protocols for aviation and maritime operations.",
    category: "protocols",
    tags: ["safety", "protocols", "aviation"],
    image: "RC Jan-65.jpg",
    date: "2024-02-20",
    views: 987,
    likes: 78,
  },
  {
    id: 9,
    title: "Cargo Handling",
    description:
      "Efficient cargo handling operations at a modern port with advanced equipment.",
    category: "cargo",
    tags: ["cargo", "port", "logistics"],
    image: "RC Jan-69.jpg",
    date: "2024-02-25",
    views: 543,
    likes: 39,
  },
  {
    id: 10,
    title: "Shipping Logistics",
    description:
      "Advanced shipping logistics management with real-time tracking and efficient routing.",
    category: "shipping",
    tags: ["shipping", "logistics", "tracking"],
    image: "RC Jan-72.jpg",
    date: "2024-03-01",
    views: 876,
    likes: 67,
  },
  {
    id: 11,
    title: "Container Storage",
    description:
      "Efficient container storage solutions at a modern port with advanced equipment.",
    category: "containers",
    tags: ["containers", "storage", "port"],
    image: "RC Jan-86.jpg",
    date: "2024-03-05",
    views: 654,
    likes: 45,
  },
  {
    id: 12,
    title: "Port Operations",
    description:
      "State-of-the-art port operations with efficient cargo handling and logistics management.",
    category: "port",
    tags: ["port", "logistics", "cargo"],
    image: "RC Jan-96.jpg",
    date: "2024-03-10",
    views: 321,
    likes: 23,
  },
  {
    id: 13,
    title: "Storage Solutions",
    description:
      "Advanced storage solutions for efficient cargo handling and logistics management.",
    category: "storage",
    tags: ["storage", "logistics", "cargo"],
    image: "RC Jan-101.jpg",
    date: "2024-03-15",
    views: 456,
    likes: 34,
  },
  {
    id: 14,
    title: "Automation in Logistics",
    description:
      "State-of-the-art automation solutions for efficient logistics management.",
    category: "automation",
    tags: ["automation", "logistics", "efficiency"],
    image: "RC Jan-113.jpg",
    date: "2024-03-20",
    views: 1345,
    likes: 112,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "All Categories",
    count: GALLERY_ITEMS.length,
  },
  {
    id: "air-cargo",
    name: "Air Cargo",
    count: GALLERY_ITEMS.filter((item) => item.category === "air-cargo").length,
  },
  {
    id: "sea-cargo",
    name: "Sea Cargo",
    count: GALLERY_ITEMS.filter((item) => item.category === "sea-cargo").length,
  },
  {
    id: "warehouse",
    name: "Warehouse",
    count: GALLERY_ITEMS.filter((item) => item.category === "warehouse").length,
  },
  {
    id: "cargo",
    name: "Cargo",
    count: GALLERY_ITEMS.filter((item) => item.category === "cargo").length,
  },
  {
    id: "logistics",
    name: "Logistics",
    count: GALLERY_ITEMS.filter((item) => item.category === "logistics").length,
  },
  {
    id: "aviation",
    name: "Aviation",
    count: GALLERY_ITEMS.filter((item) => item.category === "aviation").length,
  },
  {
    id: "shipping",
    name: "Shipping",
    count: GALLERY_ITEMS.filter((item) => item.category === "shipping").length,
  },
  {
    id: "containers",
    name: "Containers",
    count: GALLERY_ITEMS.filter((item) => item.category === "containers")
      .length,
  },
  {
    id: "port",
    name: "Port",
    count: GALLERY_ITEMS.filter((item) => item.category === "port").length,
  },
  {
    id: "storage",
    name: "Storage",
    count: GALLERY_ITEMS.filter((item) => item.category === "storage").length,
  },
  {
    id: "automation",
    name: "Automation",
    count: GALLERY_ITEMS.filter((item) => item.category === "automation")
      .length,
  },
  {
    id: "efficiency",
    name: "Efficiency",
    count: GALLERY_ITEMS.filter((item) => item.category === "efficiency")
      .length,
  },
  {
    id: "tracking",
    name: "Tracking",
    count: GALLERY_ITEMS.filter((item) => item.category === "tracking").length,
  },
  {
    id: "routing",
    name: "Routing",
    count: GALLERY_ITEMS.filter((item) => item.category === "routing").length,
  },
  {
    id: "safety",
    name: "Safety",
    count: GALLERY_ITEMS.filter((item) => item.category === "safety").length,
  },
  {
    id: "protocols",
    name: "Protocols",
    count: GALLERY_ITEMS.filter((item) => item.category === "protocols").length,
  },
];
