import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Clock,
  Trophy,
  Tag,
  ShoppingCart,
  Check,
  Loader2,
} from "lucide-react";
import { useCart } from "./CartContext"; // Asegúrate que la ruta es correcta
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const cart = useCart();
  const isInCart =
    cart?.cartItems?.some((item) => item.id === product.id) || false;

  const formatPrice = (price) =>
    cart?.formatPrice
      ? cart.formatPrice(price)
      : "$" + price.toFixed(2).replace(".", ",");

  const calculateFinalPrice = (price, discount) =>
    cart?.calculateFinalPrice
      ? cart.calculateFinalPrice(price, discount)
      : price * (1 - (discount || 0) / 100); // Agregado fallback para discount

  const finalPrice = calculateFinalPrice(product.price, product.discount);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (cart?.addToCart) {
      cart.addToCart(product);
      setShowAddAnimation(true);
      setTimeout(() => setShowAddAnimation(false), 1000);
    } else {
      console.warn(
        "ProductCard: Cart context o addToCart no disponible. No se puede añadir al carrito."
      );
    }
  };

  const hasVideoPreview =
    product.hoverPreview && product.hoverPreview.toLowerCase().endsWith(".mp4");
  const hasGifPreview =
    product.hoverPreview && product.hoverPreview.toLowerCase().endsWith(".gif");
  const hasValidPreview =
    product.hoverPreview && (hasVideoPreview || hasGifPreview);
  
  const shouldShowPreviewContainer = isHovering && hasValidPreview;

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (hasValidPreview && !isPreviewLoading) { // Evitar recargar si ya está cargando
      setIsPreviewLoading(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // No es necesario setIsPreviewLoading(false) aquí directamente, 
    // se maneja por onLoadedData/onLoad o si el hover termina antes de cargar.
    if (isPreviewLoading && !shouldShowPreviewContainer) { // Si se deja de hacer hover mientras cargaba
        setIsPreviewLoading(false);
    }
  };
  
  const handlePreviewMediaLoaded = () => {
    setIsPreviewLoading(false);
  };

  const handlePreviewMediaError = (mediaType) => {
    console.error(`Error al cargar ${mediaType} preview:`, product.hoverPreview);
    setIsPreviewLoading(false); // Detener el loader también en caso de error
  };


  useEffect(() => {
    // Este useEffect podría no ser necesario si la lógica de carga ya está en handleMouseEnter/Leave
    // y handlePreviewMediaLoaded. Si decides mantenerlo, asegúrate que su lógica es la deseada.
    // Por ejemplo, si se hace hover rápido, `isPreviewLoading` podría quedar en true.
    if (isHovering && hasValidPreview && !product.hoverPreview) { // Si hay preview válido pero no URL (raro)
        setIsPreviewLoading(false);
    }
  }, [product.hoverPreview, isHovering, hasValidPreview]);


  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 h-full flex flex-col relative"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* {showAddAnimation && <motion.div />} Animación de añadir al carrito (si la tienes definida) */}
      <Link
        to={`/producto/${product.id}`}
        className="block cursor-pointer group"
      >
        <div className="relative overflow-hidden h-48"> {/* Contenedor de altura fija */}
          <AnimatePresence initial={false}>
            {!shouldShowPreviewContainer && (
              <motion.img
                key="main-image"
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {shouldShowPreviewContainer && (
              <motion.div
                key="preview-container" // Renombrado para claridad
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-700" // bg-gray-700 es el fondo del contenedor del preview
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isPreviewLoading && (
                  <div className="absolute z-10 text-white">
                    <Loader2 size={48} className="animate-spin" />
                  </div>
                )}
                {hasVideoPreview ? (
                  <motion.video
                    key={`video-${product.id}`} // Clave única basada en el producto
                    className="w-full h-full object-cover" // Asegura que llene el espacio
                    src={product.hoverPreview}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={handlePreviewMediaLoaded}
                    onError={() => handlePreviewMediaError('video')}
                    initial={{ opacity: isPreviewLoading ? 0 : 1 }} // Evitar flash si carga rápido
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }} // Transición para el video mismo
                  />
                ) : hasGifPreview ? ( // Asegurarse que es un GIF
                  <motion.img
                    key={`gif-${product.id}`} // Clave única basada en el producto
                    className="w-full h-full object-cover" // Asegura que llene el espacio
                    src={product.hoverPreview}
                    alt={`${product.title} preview`}
                    onLoad={handlePreviewMediaLoaded}
                    onError={() => handlePreviewMediaError('GIF')}
                    initial={{ opacity: isPreviewLoading ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                ) : null} 
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white z-20">
            {product.type}
          </div>
          {product.discount > 0 && (
            <div className="absolute top-3 right-3 bg-indigo-600 px-2 py-1 rounded-md text-xs font-bold text-white z-20">
              -{product.discount}%
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/70 to-transparent z-20 pointer-events-none" />
        </div>
      </Link>

      <div className="flex-1 flex flex-col p-4">
        <Link
          to={`/producto/${product.id}`}
          className="block hover:text-indigo-400 transition-colors"
        >
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>
        </Link>
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
            className={`${
              isInCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white p-2 rounded-lg flex items-center justify-center transition-colors duration-300 z-10`} // z-10 para que esté sobre otros elementos si es necesario
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={showAddAnimation} // Considera deshabilitar también si isPreviewLoading para evitar clics mientras carga
          >
            {isInCart ? <Check size={20} /> : <ShoppingCart size={20} />}
          </motion.button>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 shadow-lg shadow-indigo-500/50" />
    </motion.div>
  );
};

export default ProductCard;