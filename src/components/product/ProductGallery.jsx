import React from "react";
import { motion } from "framer-motion";

const ProductGallery = ({
  images,
  productTitle,
  currentImage,
  onImageSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-indigo-500/30">
        <img
          src={currentImage}
          alt={productTitle}
          className="w-full h-auto object-cover"
        />
      </div>

      {images && images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onImageSelect(img)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
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
        </div>
      )}
    </motion.div>
  );
};

export default ProductGallery;
