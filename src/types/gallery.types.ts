export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
  views: number;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}
