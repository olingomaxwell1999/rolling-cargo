import React from "react";
import Image from "next/image";
import { GalleryItem } from "@/types/gallery.types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: GalleryItem | null;
  currentIndex: number;
  totalImages: number;
  onNavigate: (direction: "prev" | "next") => void;
  liked: boolean;
  onToggleLike: () => void;
  onShare: () => void;
  onDownload: () => void;
  zoom: number;
  rotation: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setRotation: (rotation: number) => void;
  isSlideshow: boolean;
  setIsSlideshow: (slideshow: boolean) => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  image,
  currentIndex,
  totalImages,
  onNavigate,
  liked,
  onToggleLike,
  onShare,
  onDownload,
  zoom,
  rotation,
  setZoom,
  setRotation,
  isSlideshow,
  setIsSlideshow,
}) => {
  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-60 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("prev");
        }}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline
            points="15 18 9 12 15 6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("next");
        }}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline
            points="9 18 15 12 9 6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Controls */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-60 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoom((prev: number) => Math.max(prev - 0.25, 0.5));
          }}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line
              x1="16"
              y1="16"
              x2="22"
              y2="22"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="text-white text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 font-medium">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoom((prev: number) => Math.min(prev + 0.25, 3));
          }}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line
              x1="21"
              y1="21"
              x2="16"
              y2="16"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRotation((rotation + 90) % 360);
          }}
          className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M2 12a10 10 0 1 0 10 10"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M2 12l6 6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSlideshow(!isSlideshow);
          }}
          className={`p-2 rounded-full backdrop-blur-sm border border-white/20 ${
            isSlideshow
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {isSlideshow ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polygon points="6 4 18 12 6 20" />
            </svg>
          )}
        </button>
      </div>

      {/* Image */}
      <div className="relative max-w-5xl max-h-[80vh] overflow-hidden">
        <Image
          src={image.image}
          alt={image.title}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        />
      </div>

      {/* Info Footer */}
      <div className="absolute bottom-6 left-6 right-6 z-60 bg-white/10 backdrop-blur-md rounded-3xl p-6 text-white border border-white/20">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
            <p className="text-gray-200 mb-4">{image.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span>{new Date(image.date).toLocaleDateString()}</span>
              <span>{image.views.toLocaleString()} Views</span>
              <span>{image.likes + (liked ? 1 : 0)} Likes</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike();
              }}
              className={`p-3 rounded-full ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 12v9h16v-9M12 8v13M12 8l8 5M12 8L4 13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 1 0-2-2v-4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="7 10 12 15 17 10"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="15"
                  x2="12"
                  y2="3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
