import { GalleryItem } from "@/types/gallery.types";
import React from "react";
import ImageCard from "../ImageCard/ImageCard";

interface GalleryGridProps {
  items: GalleryItem[];
  likedImages: Set<number>;
  toggleLike: (id: number) => void;
  handleShare: (item: GalleryItem) => void;
  handleDownload: (item: GalleryItem) => void;
  openLightbox: (item: GalleryItem, index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  likedImages,
  toggleLike,
  handleShare,
  handleDownload,
  openLightbox,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {items.map((item, index) => (
        <ImageCard
          key={item.id}
          item={item}
          index={index}
          liked={likedImages.has(item.id)}
          toggleLike={() => toggleLike(item.id)}
          handleShare={() => handleShare(item)}
          handleDownload={() => handleDownload(item)}
          openLightbox={openLightbox}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
