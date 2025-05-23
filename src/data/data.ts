import {
  BarChart3,
  Calendar,
  DollarSign,
  FileText,
  Home,
  MapPin,
  Package,
  Settings,
  Truck,
  Users,
} from "lucide-react";
import { GalleryItem, Category } from "../types/gallery.types";
import { AboutContent, AboutQuote } from "@/types/about.types";
import { NotFoundContent } from "@/types/not-found.types";
import { AirCargoContent } from "@/types/air-cargo-text.types";
import { AppDownloadContent } from "@/types/app-download.types";
import { BannerContent } from "@/types/banner.types";
import { Job } from "@/types/carreers.types";

// Gallery data

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

// Categories data(Gallery)

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

// Dashboard data

export const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 45000, shipments: 120 },
  { month: "Feb", revenue: 52000, shipments: 135 },
  { month: "Mar", revenue: 48000, shipments: 128 },
  { month: "Apr", revenue: 61000, shipments: 165 },
  { month: "May", revenue: 55000, shipments: 142 },
  { month: "Jun", revenue: 67000, shipments: 178 },
];

// Shipment status data

export const shipmentStatusData: ShipmentStatusData[] = [
  { name: "Delivered", value: 342, color: "hsl(142, 76%, 36%)" },
  { name: "In Transit", value: 125, color: "hsl(221, 83%, 53%)" },
  { name: "Pending", value: 43, color: "hsl(48, 96%, 53%)" },
  { name: "Delayed", value: 18, color: "hsl(0, 84%, 60%)" },
];

// Recent shipments data

export const recentShipments: RecentShipment[] = [
  {
    id: "RC001",
    client: "Safaricom Ltd",
    route: "Nairobi → Mombasa",
    status: "delivered",
    amount: 15000,
  },
  {
    id: "RC002",
    client: "KCB Bank",
    route: "Mombasa → Kisumu",
    status: "transit",
    amount: 22000,
  },
  {
    id: "RC003",
    client: "Equity Bank",
    route: "Nairobi → Eldoret",
    status: "pending",
    amount: 18500,
  },
  {
    id: "RC004",
    client: "East African Breweries",
    route: "Mombasa → Nairobi",
    status: "delivered",
    amount: 31000,
  },
];

export const stats: StatCardData[] = [
  {
    title: "Total Revenue",
    value: "KSh 2.8M",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    color: "bg-gradient-to-r from-green-500 to-green-600",
    hoverColor: "hover:bg-green-600",
    description: "View detailed revenue reports",
  },
  {
    title: "Active Shipments",
    value: "168",
    change: "+8.2%",
    changeType: "positive",
    icon: Package,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    hoverColor: "hover:bg-blue-600",
    description: "Create a new shipment order quickly",
  },
  {
    title: "Fleet Utilization",
    value: "94%",
    change: "+5.1%",
    changeType: "positive",
    icon: Truck,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    hoverColor: "hover:bg-green-600",
    description: "Monitor fleet performance and maintenance",
  },
  {
    title: "Active Clients",
    description: "Manage client relationships",
    value: "342",
    change: "+18.7%",
    changeType: "positive",
    icon: Users,
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    hoverColor: "hover:bg-purple-600",
  },
];

// Sidebar menu items

export const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin" },
  {
    id: "shipments",
    label: "Shipments",
    icon: Package,
    href: "/admin/shipments",
  },
  {
    id: "fleet",
    label: "Fleet Management",
    icon: Truck,
    href: "/admin/fleet",
  },
  { id: "clients", label: "Clients", icon: Users, href: "/admin/clients" },
  { id: "routes", label: "Routes", icon: MapPin, href: "/admin/routes" },
  { id: "reports", label: "Reports", icon: FileText, href: "/admin/reports" },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    href: "/admin/schedule",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

// Notifications data

export const notifications = [
  {
    id: 1,
    message: "New shipment RC005 has been created",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    message: "Fleet vehicle KCA 123A maintenance due",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    message: "Payment received from Safaricom Ltd",
    time: "3 hours ago",
    unread: false,
  },
];

//About Us data
export const aboutQuote: AboutQuote = {
  quoteText:
    "Our commitment to excellence in shipping sets us apart. We do not just deliver packages; we deliver peace of mind.",
  authorName: "Mohammed Abdi",
  authorTitle: "Executive Chairman and Founder.",
};

export const aboutContent: AboutContent = {
  title: "Your Shipping Partner",
  description:
    "Rolling Cargo is an established international air and sea freight forwarder with over 15 successful years of trusted and verified expertise... [keep rest of your long paragraph here]",
};

// Not Found page data

export const notFoundContent: NotFoundContent = {
  heading: "404",
  subheading: "Page Not Found",
  description:
    "Oops! The page you are looking for does not exist or has been moved.",
  ctaText: "Return to Home",
};

// Air Cargo text data

export const airCargoContent: AirCargoContent = {
  title: "Fast & Efficient.",
  description: `Air freight transport is the most reliable and efficient way to get your goods worldwide from one location to another. Rolling Cargo delivers fast, safe and sound air freight solutions. We have extensive and well-established partnerships with different industry players. This enables us to offer better and most competitive rates. We deliver using the shortest possible transit time with optimum routings that are cost efficient.

From the point of origin, to consolidation, customs clearance, all the way through to delivery to end customers, we’ve got your business and markets covered anywhere in the world. Through our secure cargo tracking service, customers are able to track their shipments and obtain real-time information regarding their freight anytime. We facilitate the handling, packing, customs, consolidation services and door-to-door deliveries.`,
};

// App download data

export const appDownloadContent: AppDownloadContent = {
  title: "Ship Smarter with Our Mobile App",
  description:
    "Track shipments, get real-time updates, and manage your deliveries on the go with our easy-to-use mobile app.",
  features: [
    "Real-time shipment tracking",
    "Instant notifications",
    "Easy booking and management",
    "24/7 customer support",
  ],
  ctaText: "App Coming Soon",
  ctaUrl: "https://play.google.com/store/apps/details?id=com.yourcompany.app ",
};

// Banner data(About Us)

export const aboutUsBannerContent: BannerContent = {
  title: "About Us",
  breadcrumbs: [
    {
      label: "Homepage",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
  ],
};

// Banner data(Air Cargo)

export const airCargoBannerContent: BannerContent = {
  title: "Air Cargo",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Air Cargo", href: "/air-cargo" }, // corrected URL typo from `/air-cargro` to `/air-cargo`
  ],
};

// Banner data(Sea Cargo)

export const seaCargoBannerContent: BannerContent = {
  title: "Sea Cargo",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Sea Cargo", href: "/sea-cargo" }, // corrected URL typo from `/air-cargro` to `/air-cargo`
  ],
};

// Banner data(Apply)
export const applyBannerContent: BannerContent = {
  title: "Apply",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Apply", href: "/apply" },
  ],
};

// Banner data(Services)
export const servicesBannerContent: BannerContent = {
  title: "Services",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Services", href: "/services" },
  ],
};

// Banner data(Privacy Policy)
export const privacyPolicyBannerContent: BannerContent = {
  title: "Privacy Policy",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

// Banner data(FAQ)
export const faqBannerContent: BannerContent = {
  title: "FAQ",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "FAQ", href: "/faq" },
  ],
};

// Banner data(Shipping)
export const shippingBannerContent: BannerContent = {
  title: "Shipping",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Shipping", href: "/shipping" },
  ],
};

// Banner data(Terms)
export const termsBannerContent: BannerContent = {
  title: "Terms & Conditions",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Terms & Conditions", href: "/terms-&-conditions" },
  ],
};

// Banner data(Tracking)
export const trackingBannerContent: BannerContent = {
  title: "Tracking",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Tracking", href: "/tracking" },
  ],
};

// Banner data(Blog)
export const blogBannerContent: BannerContent = {
  title: "Blog",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Blog", href: "/blog" },
  ],
};

// Banner Data (Feedback)

export const feedbackBannerContent: BannerContent = {
  title: "feedback",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Feedback", href: "/feedback" },
  ],
};

// Banner Data (Online Shopping)

export const onlineShoppingBannerContent: BannerContent = {
  title: "Online Shopping",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Online Shopping", href: "/online-shopping" },
  ],
};

// Banner (Cost Estimator)

export const costEstimatorBannerContent: BannerContent = {
  title: "Cost Estimator",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Cost Estimator", href: "/cost-estimator" },
  ],
};

// Banner (Contact)

export const contactBannerContent: BannerContent = {
  title: "Contact Us",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};

// Banner data(Carrers)

export const careersBannerContent: BannerContent = {
  title: "Careers",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Careers", href: "/careers" },
  ],
};

// Banner Data (Custom Clearence)

export const customClearenceBannerContent: BannerContent = {
  title: "Custom Clearence",
  breadcrumbs: [
    { label: "Homepage", href: "/" },
    { label: "Custom Clearence", href: "/custom-clearence" },
  ],
};

// Jobs Data (Carrers Page)

export const availableJobs: Job[] = [
  {
    title: "Marketing Executive",
    description:
      "The Marketing Executive is responsible for planning, developing, and implementing marketing campaigns to promote the company's products and services.",
    responsibilities: [
      "Develop and implement marketing campaigns across various channels.",
      "Conduct market research to identify target audiences and trends.",
      "Create and manage content for digital and print platforms.",
      "Monitor campaign performance and adjust strategies as needed.",
      "Collaborate with sales team for alignment.",
      "Coordinate events, trade shows, and promotional activities.",
      "Prepare reports on marketing activities.",
      "Stay up-to-date with marketing trends and technologies.",
    ],
    skills: [
      "Creative thinking and problem-solving abilities.",
      "Strong organizational and project management skills.",
      "Ability to analyze data and derive actionable insights.",
      "High attention to detail.",
      "Adaptability in fast-paced environments.",
    ],
  },
  {
    title: "Sales Executive",
    description:
      "The Sales Executive is responsible for driving revenue growth by identifying clients, generating leads, and closing sales.",
    responsibilities: [
      "Identify and develop new business opportunities.",
      "Build and maintain relationships with clients.",
      "Conduct sales presentations and product demos.",
      "Negotiate and close deals ensuring satisfaction.",
      "Meet and exceed sales targets.",
      "Stay updated with industry trends and competitors.",
      "Collaborate with internal teams for seamless delivery.",
      "Submit regular sales reports and forecasts.",
    ],
    skills: [
      "Strong communication and interpersonal skills.",
      "Excellent customer service and relationship-building.",
      "Results-driven mindset with motivation to meet targets.",
      "Problem-solving and strategic thinking.",
      "Resilience in fast-paced sales environments.",
    ],
  },
];
