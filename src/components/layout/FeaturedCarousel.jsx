import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Star,
} from "lucide-react";
import NeonButton from "./NeonButton";
import NeonLine from "./NeonLine";
import Particles from "./Particles";
import { products } from "../../data/products";

export const getTopProducts = (
  allProducts,
  filterType = "achievements",
  limit = 5,
  customFilter = null
) => {
  let filteredProducts = [...allProducts];

  switch (filterType) {
    case "discount":
      filteredProducts.sort((a, b) => b.discount - a.discount);
      break;
    case "price":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "AAA-discount":
      filteredProducts = filteredProducts
        .filter((product) => product.type === "AAA" && product.discount > 0)
        .sort((a, b) => b.discount - a.discount);
      break;
    case "AAA":
      filteredProducts = filteredProducts
        .filter((product) => product.type === "AAA")
        .sort((a, b) => b.price - a.price);
      break;
    case "AA":
      filteredProducts = filteredProducts.filter(
        (product) => product.type === "AA"
      );
      break;
    case "A":
      filteredProducts = filteredProducts.filter(
        (product) => product.type === "A"
      );
      break;
    default:
      filteredProducts.sort((a, b) => b.achievements - a.achievements);
  }
  return filteredProducts.slice(0, limit);
};

const FeaturedCarousel = ({
  products: providedProducts,
  filterType = "achievements",
  limit = 5,
  customFilter = null,
  autoplaySpeed = 5000,
  showControls = true,
  showIndicators = true,
  height = "500px",
  onProductClick,
}) => {
  const displayProducts =
    providedProducts ||
    getTopProducts(products, filterType, limit, customFilter);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const slides = displayProducts.map((product) => ({
    id: product.id,
    title: product.title,
    subtitle: `Nivel ${product.accountLevel} • ${product.hoursPlayed}h jugadas • ${product.achievements} logros`,
    description:
      product.discount > 0
        ? `Ahorra un ${product.discount}% en esta cuenta premium`
        : "Cuenta premium con todos los beneficios",
    image: product.image,
    price: product.price,
    discount: product.discount,
    bg:
      product.discount > 0
        ? "bg-gradient-to-r from-purple-900/90 to-pink-900/90"
        : "bg-gradient-to-r from-indigo-900/90 to-blue-900/90",
  }));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let timer;
    if (!isHovering) {
      timer = setInterval(() => {
        nextSlide();
      }, autoplaySpeed);
    }
    return () => clearInterval(timer);
  }, [isHovering, autoplaySpeed, currentSlide]);

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 z-10 overflow-hidden opacity-30">
                  <NeonLine direction="horizontal" className="top-1/4" />
                  <NeonLine direction="horizontal" className="bottom-1/4" />
                  <NeonLine direction="vertical" className="left-1/4" />
                  <NeonLine direction="vertical" className="right-1/4" />
                </div>

                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8 }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center brightness-75"
                      style={{ objectPosition: "center center" }}
                    />
                  </motion.div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10"></div>

                <Particles className="z-10 opacity-30" />

                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="max-w-2xl"
                    >
                      <motion.span
                        className="inline-block px-3 py-1 rounded bg-indigo-500/30 backdrop-blur-sm text-indigo-200 text-sm font-medium mb-3"
                        whileHover={{
                          backgroundColor: "rgba(99, 102, 241, 0.4)",
                        }}
                      >
                        {slide.discount > 0
                          ? `${slide.discount}% DESCUENTO`
                          : "DESTACADO"}
                      </motion.span>

                      <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        {slide.title}
                      </motion.h1>

                      <p className="text-xl text-gray-100 mb-3">
                        {slide.subtitle}
                      </p>

                      <p className="text-lg text-gray-300 mb-6">
                        {slide.description}
                      </p>

                      <div className="mb-8">
                        {slide.discount > 0 ? (
                          <div className="flex items-baseline gap-3">
                            <span className="text-gray-400 line-through text-xl">
                              ${slide.price.toFixed(2)}
                            </span>
                            <span className="text-white font-bold text-3xl">
                              $
                              {calculateDiscountedPrice(
                                slide.price,
                                slide.discount
                              ).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-white font-bold text-3xl">
                            ${slide.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <NeonButton
                          onClick={() =>
                            onProductClick && onProductClick(slide.id)
                          }
                        >
                          <ShoppingCart size={18} />
                          <span>Comprar Ahora</span>
                        </NeonButton>

                        <NeonButton primary={false}>
                          <span>Ver Detalles</span>
                          <ArrowRight size={18} />
                        </NeonButton>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {showControls && slides.length > 1 && (
        <>
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 text-white/80 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/20 text-white/80 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </motion.button>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;
