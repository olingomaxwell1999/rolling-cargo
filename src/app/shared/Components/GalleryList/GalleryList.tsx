import { GalleryItem } from "@/types/gallery.types";
import React from "react";
import ImageCard from "../ImageCard/ImageCard";

interface GalleryListProps {
  items: GalleryItem[];
  likedImages: Set<number>;
  toggleLike: (id: number) => void;
  handleShare: (item: GalleryItem) => void;
  handleDownload: (item: GalleryItem) => void;
  openLightbox: (item: GalleryItem, index: number) => void;
}

const GalleryList: React.FC<GalleryListProps> = ({
  items,
  likedImages,
  toggleLike,
  handleShare,
  handleDownload,
  openLightbox,
}) => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <ImageCard
          key={item.id}
          item={item}
          index={index}
          layout="list"
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

export default GalleryList;
