import React, { useState, useEffect } from "react";
import { Heart, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "../../data/products";

const GameRecommendation = ({
  title = "Recomendados para ti",
  maxItems = 3,
  filterType = "popular",
  onClose,
  formatPrice,
  calculateFinalPrice,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getRecommendations = () => {
      let filteredProducts = [...products];

      switch (filterType) {
        case "popular":
          filteredProducts = filteredProducts.sort(
            (a, b) => b.hoursPlayed - a.hoursPlayed
          );
          break;
        case "discounts":
          filteredProducts = filteredProducts
            .filter((product) => product.discount > 0)
            .sort((a, b) => b.discount - a.discount);
          break;
        case "aaa":
          filteredProducts = filteredProducts
            .filter((product) => product.type === "AAA")
            .sort((a, b) => b.achievements - a.achievements);
          break;
        case "indie":
          filteredProducts = filteredProducts
            .filter((product) => product.type === "A")
            .sort((a, b) => b.achievements - a.achievements);
          break;
        case "highrated":
          filteredProducts = filteredProducts.sort(
            (a, b) => b.achievements - a.achievements
          );
          break;
        default:
          filteredProducts = filteredProducts.sort(() => Math.random() - 0.5);
      }

      return filteredProducts.slice(0, maxItems * 3);
    };

    setRecommendations(getRecommendations());
  }, [filterType, maxItems]);

  const nextSlide = () => {
    if (currentIndex + maxItems < recommendations.length) {
      setCurrentIndex((prevIndex) => prevIndex + maxItems);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex - maxItems >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - maxItems);
    } else {
      setCurrentIndex(Math.max(0, recommendations.length - maxItems));
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  const formatPriceSafe = (price) => {
    if (typeof formatPrice === "function") {
      return formatPrice(price);
    }
    return `$${price.toFixed(2)}`;
  };

  const calculateFinalPriceSafe = (price, discount) => {
    if (typeof calculateFinalPrice === "function") {
      return calculateFinalPrice(price, discount);
    }
    return price * (1 - discount / 100);
  };

  const handleAddToCart = (product) => {
    if (typeof onAddToCart === "function") {
      onAddToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        discount: product.discount,
        quantity: 1,
        type: product.type || "Game",
        accountLevel: product.accountLevel || 1,
      });
    }
  };

  const visibleProducts = recommendations.slice(
    currentIndex,
    currentIndex + maxItems
  );

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mt-2" />
        </div>
        <div className="flex items-center gap-4">
          {recommendations.length > maxItems && (
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="bg-gray-800/70 hover:bg-gray-700/70 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="bg-gray-800/70 hover:bg-gray-700/70 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleProducts.map((product) => (
          <motion.div
            key={product.id}
            className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-lg"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)",
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </div>
              )}
              <button className="absolute top-2 left-2 text-gray-300 hover:text-red-400 transition-colors">
                <Heart size={18} />
              </button>
            </div>
            <div className="p-4">
              <h4 className="text-white font-medium mb-2 truncate">
                {product.title}
              </h4>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <span className="bg-indigo-900/50 px-2 py-0.5 rounded text-xs text-indigo-300 border border-indigo-700/30">
                  {product.type || "Game"}
                </span>
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-indigo-400" />
                  <span>{product.hoursPlayed}h</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">
                    {formatPriceSafe(
                      calculateFinalPriceSafe(product.price, product.discount)
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="text-gray-400 text-xs line-through">
                      {formatPriceSafe(product.price)}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-1 rounded-md transition-colors duration-300"
                >
                  Añadir
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GameRecommendation;
