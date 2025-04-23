import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, Trophy, Tag, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const finalPrice = product.price * (1 - product.discount / 100);

  const formatPrice = (price) => {
    return "$" + price.toFixed(2).replace(".", ",");
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
          {product.type}
        </div>

        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-indigo-600 px-2 py-1 rounded-md text-xs font-bold text-white">
            -{product.discount}%
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="flex-1 flex flex-col p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center text-gray-300">
            <Clock size={14} className="mr-1 text-indigo-400" />
            <span>{product.hoursPlayed}h jugadas</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Trophy size={14} className="mr-1 text-yellow-500" />
            <span>{product.achievements} logros</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Star size={14} className="mr-1 text-purple-400" />
            <span>Nivel {product.accountLevel}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Tag size={14} className="mr-1 text-emerald-400" />
            <span>{product.items} items</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center">
          <div className="flex flex-col">
            {product.discount > 0 ? (
              <>
                <span className="text-gray-400 text-sm line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-white font-bold text-lg">
                  {formatPrice(finalPrice)}
                </span>
              </>
            ) : (
              <span className="text-white font-bold text-lg">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg flex items-center justify-center transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 shadow-lg shadow-indigo-500/50" />
    </motion.div>
  );
};

export default ProductCard;
