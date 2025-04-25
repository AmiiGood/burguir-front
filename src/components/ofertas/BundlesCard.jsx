import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package, ArrowRight, Percent } from "lucide-react";

const BundleCard = ({ bundle, bundleProducts }) => {
  const formatPrice = (price) => {
    return "$" + price.toFixed(2).replace(".", ",");
  };

  const savings = bundle.originalPrice - bundle.discountedPrice;

  const getImageStyle = (index, total) => {
    if (total === 1) {
      return {};
    }

    if (total === 2) {
      return {
        clipPath:
          index === 0
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        width: "50%",
        left: index === 0 ? "0" : "50%",
      };
    }

    if (total === 3) {
      if (index === 0) {
        return {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          width: "50%",
          height: "100%",
        };
      } else {
        return {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          width: "50%",
          height: "50%",
          left: "50%",
          top: index === 1 ? "0" : "50%",
        };
      }
    }

    if (total >= 4) {
      const row = Math.floor(index / 2);
      const col = index % 2;

      return {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        width: "50%",
        height: "50%",
        left: col * 50 + "%",
        top: row * 50 + "%",
      };
    }

    return {};
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          {bundleProducts.slice(0, 4).map((product, index) => (
            <div
              key={product.id}
              className="absolute overflow-hidden"
              style={getImageStyle(index, Math.min(bundleProducts.length, 4))}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover scale-110 hover:scale-125 transition-all duration-700"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-10">
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white text-xs font-medium inline-block">
              BUNDLE
            </span>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white text-xs font-bold inline-flex items-center">
              <Percent size={12} className="mr-1" />
              {bundle.discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-white font-bold text-2xl mb-2">
              {bundle.name}
            </h3>
            <div className="flex items-center text-gray-300 text-sm">
              <Package size={16} className="mr-2 text-indigo-400" />
              <span>{bundleProducts.length} juegos incluidos</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-sm line-through">
              {formatPrice(bundle.originalPrice)}
            </span>
            <span className="text-white font-bold text-2xl">
              {formatPrice(bundle.discountedPrice)}
            </span>
            <span className="text-emerald-400 text-sm">
              Ahorras {formatPrice(savings)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 gap-2">
            {bundleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex items-center bg-gray-900/50 rounded-lg p-2 border-l-2 border-indigo-500"
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 mr-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">
                    {product.title}
                  </h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-xs line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-emerald-400 text-xs flex items-center">
                      <ArrowRight size={10} className="mr-1" />
                      {formatPrice(
                        product.price * (1 - bundle.discountPercentage / 100)
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white w-full py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart size={18} className="mr-2" />
          <span className="font-medium">Comprar Bundle</span>
        </motion.button>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 shadow-lg shadow-indigo-500/50" />
    </motion.div>
  );
};

export default BundleCard;
