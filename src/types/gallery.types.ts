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
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
