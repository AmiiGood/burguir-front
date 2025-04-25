import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BundleCard from "./BundlesCard";
import { products, offers } from "../../data/products";

const BundleGrid = () => {
  const [bundles, setBundles] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProductsList(products);
    setBundles(offers.filter((offer) => offer.type === "bundle").slice(0, 3));
    setIsLoading(false);
  }, []);

  const getBundleProducts = (bundle) => {
    return bundle.products
      .map((productId) =>
        productsList.find((product) => product.id === productId)
      )
      .filter(Boolean);
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-900">
        <h2 className="text-3xl font-bold text-white mb-8">
          Bundles Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse"
            >
              <div className="h-64 bg-gray-700"></div>
              <div className="p-6">
                <div className="h-8 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-6"></div>
                <div className="space-y-3 mb-6">
                  <div className="h-12 bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                </div>
                <div className="h-12 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8">Bundles Destacados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bundles.map((bundle) => {
          const bundleProducts = getBundleProducts(bundle);

          console.log(
            `Bundle ${bundle.id}: ${bundle.name}`,
            `Products found: ${bundleProducts.length}/${bundle.products.length}`,
            "Product IDs:",
            bundle.products,
            "Found products:",
            bundleProducts
          );

          return bundleProducts.length > 0 ? (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: bundle.id * 0.1 }}
            >
              <BundleCard bundle={bundle} bundleProducts={bundleProducts} />
            </motion.div>
          ) : null;
        })}
      </div>

      {bundles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-xl">
            No se encontraron bundles disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default BundleGrid;
