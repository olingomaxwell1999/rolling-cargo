// src/types/gallery.types.ts
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  views: number;
  likes: number;
  comments?: number;
}
export interface Category {
  id: string;
  name: string;
  count: number;
}

interface ImageCardProps {
  item: GalleryItem;
  index: number;
  layout?: "grid" | "list";
  liked: boolean;
  toggleLike: () => void;
  handleShare: () => void;
  handleDownload: () => void;
  openLightbox: (item: GalleryItem, index: number) => void;
}
