import Image from "next/image";
import React from "react";

interface GalleryItem {
  image: string;
  category: string;
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

const ImageCard: React.FC<ImageCardProps> = ({
  item,
  index,
  layout = "grid",
  liked,
  toggleLike,
  handleShare,
  handleDownload,
  openLightbox,
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      onClick={() => openLightbox(item, index)}
    >
      {/* Image Container */}
      <div className="relative aspect-square">
        <Image
          src={item.image}
          alt={item.category}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 4} // Optimize LCP by prioritizing first few images
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

        {/* Action Buttons (on hover) */}
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
            className={`rounded-full p-3 backdrop-blur-sm ${
              liked
                ? "bg-red-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
            }`}
            aria-label="Toggle Like"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30"
            aria-label="Share"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30 border border-white/30"
            aria-label="Download"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>

        {/* Category Badge (visible always or on hover) */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm border border-white/30">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
