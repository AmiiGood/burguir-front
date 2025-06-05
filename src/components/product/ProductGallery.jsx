import React from "react";
import { motion } from "framer-motion";
import ProductVideoEmbed from "./ProductVideoEmbed";
import { Play } from "lucide-react";

const ProductGallery = ({
  images,
  productTitle,
  currentImage,
  onImageSelect,
  youtubeVideoId,
}) => {
  const videoThumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/0.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-indigo-500/30">
        {currentImage === "video" && youtubeVideoId ? (
          <ProductVideoEmbed
            videoId={youtubeVideoId}
            productTitle={productTitle}
          />
        ) : (
          <img
            src={currentImage}
            alt={productTitle}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onImageSelect(img)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentImage === img
                ? "border-indigo-500 scale-105"
                : "border-gray-700 hover:border-indigo-400"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${productTitle} ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {youtubeVideoId && videoThumbnail && (
          <button
            onClick={() => onImageSelect("video")}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentImage === "video"
                ? "border-indigo-500 scale-105"
                : "border-gray-700 hover:border-indigo-400"
            }`}
          >
            <img
              src={videoThumbnail}
              alt={`Video thumbnail for ${productTitle}`}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
              whileHover={{ scale: 1.1 }}
            >
              <Play className="w-10 h-10 text-white" />
            </motion.div>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductGallery;
