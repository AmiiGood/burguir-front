import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const RelatedProductsSection = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <motion.section
      className="mt-16 pt-10 border-t border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 relative inline-block">
        También te podría interesar
        <span className="block h-1 w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 mt-1"></span>
      </h2>
      <p className="text-gray-400 mb-8">
        Otros jugadores también vieron estos productos.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </motion.section>
  );
};

export default RelatedProductsSection;
