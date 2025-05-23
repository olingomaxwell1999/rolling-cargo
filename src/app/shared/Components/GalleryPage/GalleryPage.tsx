"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, GALLERY_ITEMS } from "@/data/data";
import { GalleryItem } from "@/types/gallery.types";
import SearchBar from "../SearchBar/SearchBar";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import GalleryGrid from "../GalleryGrid/GalleryGrid";
import GalleryList from "../GalleryList/GalleryList";
import Lightbox from "../Lightbox/Lightbox";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const GalleryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<"date" | "views" | "likes" | "title">(
    "date"
  );
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isSlideshow, setIsSlideshow] = useState<boolean>(false);

  const filteredImages = useMemo(() => {
    let filtered = GALLERY_ITEMS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "views":
          return b.views - a.views;
        case "likes":
          return b.likes - a.likes;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const navigateImage = React.useCallback(
    (direction: "prev" | "next") => {
      const newIndex =
        direction === "next"
          ? (currentImageIndex + 1) % filteredImages.length
          : (currentImageIndex - 1 + filteredImages.length) %
            filteredImages.length;
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
      setZoom(1);
      setRotation(0);
    },
    [currentImageIndex, filteredImages]
  );

  useEffect(() => {
    if (isSlideshow && isLightboxOpen) {
      const interval = setInterval(() => {
        navigateImage("next");
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshow, isLightboxOpen, currentImageIndex, navigateImage]);

  const openLightbox = (image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    setZoom(1);
    setRotation(0);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    setIsSlideshow(false);
    document.body.style.overflow = "unset";
  };

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleShare = async (image: GalleryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownload = (image: GalleryItem) => {
    const link = document.createElement("a");
    link.href = image.image;
    link.download = `${image.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.click();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
        case "=":
        case "+":
          setZoom((prev) => Math.min(prev + 0.25, 3));
          break;
        case "-":
          setZoom((prev) => Math.max(prev - 0.25, 0.5));
          break;
        case "r":
          setRotation((prev) => (prev + 90) % 360);
          break;
        case " ":
          e.preventDefault();
          setIsSlideshow(!isSlideshow);
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, currentImageIndex, isSlideshow, navigateImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br pt-10 from-slate-50 via-white to-blue-50/30">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white"
      >
        {/* Hero content */}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 space-y-8"
        >
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "date" | "views" | "likes" | "title"
                  )
                }
                className="px-4 py-3 border-2 border-gray-200/50 rounded-xl bg-white/70 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg transition-all duration-300"
              >
                <option value="date">Sort by Date</option>
                <option value="views">Sort by Views</option>
                <option value="likes">Sort by Likes</option>
                <option value="title">Sort by Title</option>
              </select>
              <div className="flex border-2 border-gray-200/50 rounded-xl bg-white/70 backdrop-blur-sm overflow-hidden shadow-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-gray-600 text-lg">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredImages.length}
            </span>{" "}
            of <span className="font-semibold">{GALLERY_ITEMS.length}</span>{" "}
            images
          </p>
        </motion.div>

        {/* Gallery View */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <GalleryGrid
              items={filteredImages}
              likedImages={likedImages}
              toggleLike={toggleLike}
              handleShare={handleShare}
              handleDownload={handleDownload}
              openLightbox={openLightbox}
            />
          ) : (
            <GalleryList
              items={filteredImages}
              likedImages={likedImages}
              toggleLike={toggleLike}
              handleShare={handleShare}
              handleDownload={handleDownload}
              openLightbox={openLightbox}
            />
          )}
        </AnimatePresence>

        {/* No Results */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="text-gray-300 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">
              No images found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Try adjusting your search terms or filters to discover more
              amazing content
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}

        {/* Lightbox */}
        <Lightbox
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          image={selectedImage}
          currentIndex={currentImageIndex}
          totalImages={filteredImages.length}
          onNavigate={navigateImage}
          liked={likedImages.has(selectedImage?.id || 0)}
          onToggleLike={() => toggleLike(selectedImage?.id || 0)}
          onShare={() => handleShare(selectedImage || filteredImages[0])}
          onDownload={() => handleDownload(selectedImage || filteredImages[0])}
          zoom={zoom}
          rotation={rotation}
          isSlideshow={isSlideshow}
          setIsSlideshow={setIsSlideshow}
          setZoom={setZoom}
          setRotation={setRotation}
        />
      </div>
    </div>
  );
};

export default GalleryPage;
